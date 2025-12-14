import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Video from "@/models/Video";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const world = searchParams.get("world") || "All";
    const sort = searchParams.get("sort") || "new";
    const year = searchParams.get("year") || "All";

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    /* =========================
       QUERY BUILDER
       ========================= */
    const query = {};

    // 🔍 Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // 🎮 World filter
    if (world !== "All") {
      query.tags = { $regex: world, $options: "i" };
    }

    // 📅 Year filter
    if (year !== "All") {
      let from = "1900-01-01";
      let to = "2100-12-31";

      if (year === "2024+") from = "2024-01-01";
      if (year === "2020–2023") {
        from = "2020-01-01";
        to = "2023-12-31";
      }
      if (year === "2015–2019") {
        from = "2015-01-01";
        to = "2019-12-31";
      }
      if (year === "Classic") to = "2014-12-31";

      query.publishedAt = { $gte: from, $lte: to };
    }

    /* =========================
       SORT
       ========================= */
    let sortQuery = { publishedAt: -1 };

    if (sort === "views") sortQuery = { viewCount: -1 };
    if (sort === "likes") sortQuery = { likeCount: -1 };

    /* =========================
       DB QUERY
       ========================= */
    const [videos, total] = await Promise.all([
      Video.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .select(
          "videoId title description thumbnail publishedAt url viewCount likeCount"
        ),
      Video.countDocuments(query),
    ]);

    return NextResponse.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("VIDEOS PAGINATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }

    );
  }
}
