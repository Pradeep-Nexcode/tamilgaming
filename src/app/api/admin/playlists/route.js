import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";

export async function GET() {
  await connectDB();

  const playlists = await Playlist.find().sort({ publishedAt: -1 });

  return NextResponse.json({
    success: true,
    playlists,
  });
}
