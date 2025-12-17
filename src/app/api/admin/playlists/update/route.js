import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";

export async function POST(req) {
  await connectDB();

  const { playlistId, updates } = await req.json();

  if (!playlistId) {
    return NextResponse.json(
      { error: "playlistId required" },
      { status: 400 }
    );
  }

  const updated = await Playlist.findOneAndUpdate(
    { playlistId },
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );

  return NextResponse.json({
    success: true,
    playlist: updated,
  });
}
