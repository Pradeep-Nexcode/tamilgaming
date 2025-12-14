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

    // Build regex OR for title & tags
    const keywordRegex = murugesanKeywords.map(
      (word) => new RegExp(word, "i")
    );

    const videos = await Video.find({
      categoryId: "20", // Gaming only
      $or: [
        { title: { $in: keywordRegex } },
        { tags: { $in: keywordRegex } },
        { viewCount: { $gte: 500000 } },
        { likeCount: { $gte: 10000 } },
      ],
    })
      .sort({
        viewCount: -1,
        likeCount: -1,
        publishedAt: -1,
      })
      .limit(6)
      .select(
        "title thumbnail url viewCount likeCount publishedAt"
      );

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("FEATURED VIDEOS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured videos" },
      { status: 500 }
    );
  }
}
