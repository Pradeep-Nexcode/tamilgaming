// app/api/playlists/sync/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import TamilGamingPlaylist from "@/models/Playlist";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.TAMIL_GAMING_CHANNEL_ID;

export async function POST() {
  await connectDB();

  try {
    let nextPageToken = "";
    let synced = 0;

    // Loop through all playlists pages
    while (true) {
      const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.items || data.items.length === 0) break;

      for (const playlist of data.items) {
        const playlistId = playlist.id;

        // Skip if already stored
        const exists = await TamilGamingPlaylist.findOne({ playlistId });
        if (exists) continue;

        // Get all video IDs in this playlist
        const videoIds = await fetchPlaylistVideos(playlistId);

        // Save playlist to DB
        await TamilGamingPlaylist.create({
          playlistId,
          title: playlist.snippet.title,
          description: playlist.snippet.description || "",
          thumbnail:
            playlist.snippet.thumbnails.maxres?.url ||
            playlist.snippet.thumbnails.high?.url ||
            playlist.snippet.thumbnails.medium?.url,
          publishedAt: playlist.snippet.publishedAt,
          url: `https://www.youtube.com/playlist?list=${playlistId}`,
          itemCount: playlist.contentDetails.itemCount || 0,
          videoIds: videoIds,
        });

        synced++;
      }

      // Stop when no next page
      if (!data.nextPageToken) break;
      nextPageToken = data.nextPageToken;
    }

    return NextResponse.json({
      success: true,
      newPlaylistsAdded: synced,
      message: `Successfully synced ${synced} new playlists`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to fetch all video IDs in a playlist
async function fetchPlaylistVideos(playlistId) {
  const videoIds = [];
  let nextPageToken = "";

  try {
    while (true) {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.items) break;

      for (const item of data.items) {
        videoIds.push(item.contentDetails.videoId);
      }

      if (!data.nextPageToken) break;
      nextPageToken = data.nextPageToken;
    }
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
  }

  return videoIds;
}