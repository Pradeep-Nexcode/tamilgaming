import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();

    const murugesanKeywords = [
      "murugesan",
      "murugesh",
      "simulator",
      "job",
      "life",
      "work",
      "driver",
      "farmer",
      "police",
      "restaurant",
      "hotel",
      "bus",
      "truck",
      "ranch",
      "gas",
    ];

    // Build regex OR query for title
    const titleRegex = murugesanKeywords.map(
      (word) => new RegExp(word, "i")
    );

    const videos = await Video.find({
      $or: [
        { title: { $in: titleRegex } },          // Murugesan / simulator vibe
        { viewCount: { $gte: 500000 } },          // High views
        { likeCount: { $gte: 10000 } },           // High likes
      ],
      categoryId: "20", // Gaming category (safe filter)
    })
      .sort({
        viewCount: -1,
        likeCount: -1,
        publishedAt: -1,
      })
      .limit(6)
      .select("title thumbnail url viewCount likeCount publishedAt");

    return NextResponse.json({ videos });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch featured videos" },
      { status: 500 }
    );
  }
}
