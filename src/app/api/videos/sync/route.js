// app/api/videos/sync/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import TamilGamingVideo from "@/models/Video";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.TAMIL_GAMING_CHANNEL_ID;

export async function POST() {
  await connectDB();

  try {
    // 1. Get Uploads Playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    const uploadsId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsId) {
      return NextResponse.json(
        { error: "Uploads playlist not found" },
        { status: 404 }
      );
    }

    let nextPageToken = "";
    let synced = 0;

    // 2. Loop through ALL playlist pages
    while (true) {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      for (const item of data.items) {
        const videoId = item.snippet.resourceId.videoId;

        // Skip if already stored
        const exists = await TamilGamingVideo.findOne({ videoId });
        if (exists) continue;

        // 3. Fetch advanced video details
        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`
        );

        const detailsData = await detailsRes.json();
        const video = detailsData.items?.[0];
        if (!video) continue;

        // 4. Save full video details to DB
        await TamilGamingVideo.create({
          videoId,

          // Basic
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail:
            video.snippet.thumbnails.maxres?.url ||
            video.snippet.thumbnails.high?.url,
          publishedAt: video.snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${videoId}`,

          // Extra YouTube info
          duration: video.contentDetails.duration,
          definition: video.contentDetails.definition, // hd/sd
          tags: video.snippet.tags || [``],
          categoryId: video.snippet.categoryId,

          // SAFE stats — avoid NaN
          viewCount: Number(video.statistics.viewCount || 0),
          likeCount: Number(video.statistics.likeCount || 0),
          commentCount: Number(video.statistics.commentCount || 0),
        });

        synced++;
      }

      // Stop when no next page
      if (!data.nextPageToken) break;
      nextPageToken = data.nextPageToken;
    }

    return NextResponse.json({
      success: true,
      newVideosAdded: synced,
      message: `Successfully synced ${synced} new videos`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}