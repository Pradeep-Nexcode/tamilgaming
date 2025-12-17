import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();

    // 1️⃣ Get Murugesan World playlists
    const playlists = await Playlist.find({
      isMurugesanWorld: true,
    }).select("videoIds");

    // 2️⃣ Merge all videoIds into one array
    const allVideoIds = playlists
      .flatMap((p) => p.videoIds || []);

    // 3️⃣ Remove duplicates (IMPORTANT)
    const uniqueVideoIds = [...new Set(allVideoIds)];

    // 4️⃣ Fetch videos ONLY from those IDs
    const videos = await Video.find({
      videoId: { $in: uniqueVideoIds },
      thumbnail: { $exists: true },
    })
      .select("title thumbnail url videoId publishedAt viewCount")
      .limit(50);

    return NextResponse.json({ videos });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
