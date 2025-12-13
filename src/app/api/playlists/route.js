// app/api/playlists/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import TamilGamingPlaylist from "@/models/Playlist";

export async function GET() {
  await connectDB();

  try {
    const allPlaylists = await TamilGamingPlaylist.find().sort({
      publishedAt: -1,
    });

    return NextResponse.json({
      success: true,
      total: allPlaylists.length,
      playlists: allPlaylists,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}