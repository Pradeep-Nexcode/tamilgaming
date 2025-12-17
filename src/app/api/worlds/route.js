import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    const world = searchParams.get("world"); // murugesan | all
    const sort = searchParams.get("sort");   // latest | views | videos

    /* =====================
       FILTER BUILDER
    ===================== */
    const query = {};

    if (world === "murugesan") {
      query.isMurugesanWorld = true;
    }

    /* =====================
       SORT BUILDER
    ===================== */
    let sortQuery = { createdAt: -1 }; // default

    if (sort === "views") {
      sortQuery = { viewCount: -1 };
    }

    if (sort === "videos") {
      sortQuery = { itemCount: -1 };
    }

    if (sort === "latest") {
      sortQuery = { createdAt: -1 };
    }

    const playlists = await Playlist.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .select("title description thumbnail itemCount playlistId viewCount");

    const total = await Playlist.countDocuments(query);

    return NextResponse.json({
      worlds: playlists,
      hasMore: skip + playlists.length < total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load worlds" },
      { status: 500 }
    );
  }
}
