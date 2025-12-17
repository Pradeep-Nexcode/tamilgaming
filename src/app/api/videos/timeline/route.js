import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Video from "@/models/Video";
import Playlist from "@/models/Playlist";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const world = searchParams.get("world"); // murugesan | all
    const sort = searchParams.get("sort");   // views | likes

    /* =====================
       ERA CONFIG
    ===================== */
    const eras = [
      { id: "era1", title: "The Rise", from: 2020, to: 2020 },
      { id: "era2", title: "Murugesan Universe Begins", from: 2021, to: 2021 },
      { id: "era3", title: "Expansion Phase", from: 2022, to: 2022 },
      { id: "era4", title: "Peak Murugesan Era", from: 2023, to: 2023 },
      { id: "era5", title: "Modern Murugesan World", from: 2024, to: 2100 },
    ];


    /* =====================
       VIDEO IDS FILTER
    ===================== */
    let allowedVideoIds = null;

    if (world === "murugesan") {
      const playlists = await Playlist.find({
        isMurugesanWorld: true,
      }).select("videoIds");

      allowedVideoIds = [
        ...new Set(playlists.flatMap(p => p.videoIds || []))
      ];


      // Safety check
      if (!allowedVideoIds.length) {
        return NextResponse.json({ eras: [] });
      }
    }

    /* =====================
       SORT BUILDER
    ===================== */
    let sortQuery = { viewCount: -1 };

    if (sort === "likes") {
      sortQuery = { likeCount: -1 };
    }

    /* =====================
       ERA LOOP
    ===================== */
    const results = [];

    for (const era of eras) {
      let query = {
        publishedAt: {
          $gte: new Date(`${era.from}-01-01T00:00:00Z`),
          $lte: new Date(`${era.to}-12-31T23:59:59Z`),
        },
      };
      if (allowedVideoIds) {
        query.videoId = { $in: allowedVideoIds };
      }


      const videos = await Video.find(query)
        .sort(sortQuery)
        .limit(10)
        .select("title thumbnail url publishedAt viewCount likeCount videoId");
      if (videos.length) {
        results.push({
          id: era.id,
          title: era.title,
          years:
            era.from === era.to
              ? `${era.from}`
              : `${era.from} - ${era.to === 2100 ? "Now" : era.to}`,

          videos,
        });
      }
    }

    return NextResponse.json({ eras: results.reverse() });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load journey eras" },
      { status: 500 }
    );
  }
}
