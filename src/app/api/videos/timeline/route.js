import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();

    const eras = [
      { id: "era1", title: "The Beginning", from: 2011, to: 2014 },
      { id: "era2", title: "Growth Years", from: 2015, to: 2017 },
      { id: "era3", title: "Expanding Worlds", from: 2018, to: 2020 },
      { id: "era4", title: "Murugesan Era", from: 2021, to: 2023 },
      { id: "era5", title: "Modern Age", from: 2024, to: 2100 },
    ];

    const results = [];

    for (const era of eras) {
      const videos = await Video.find({
        publishedAt: {
          $gte: `${era.from}-01-01`,
          $lte: `${era.to}-12-31`,
        },
      })
        .sort({ viewCount: -1, likeCount: -1 })
        .limit(5)
        .select("title thumbnail url publishedAt viewCount");

      if (videos.length) {
        results.push({
          id: era.id,
          title: era.title,
          years: `${era.from} – ${era.to === 2100 ? "Now" : era.to}`,
          videos,
        });
      }
    }

    return NextResponse.json({ eras: results });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load journey eras" },
      { status: 500 }
    );
  }
}
