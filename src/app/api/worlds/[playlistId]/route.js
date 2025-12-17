// import { NextResponse } from "next/server";
// import connectDB from "@/utils/mongodb";
// import Playlist from "@/models/Playlist";
// import Video from "@/models/Video";
// import { detectWorldProfile } from "@/lib/worldEngine";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
//     const { playlistId } = params;

//     const playlist = await Playlist.findOne({ playlistId });
//     if (!playlist) {
//       return NextResponse.json({ error: "World not found" }, { status: 404 });
//     }

//     const videos = await Video.find({
//       videoId: { $in: playlist.videoIds },
//     }).select("videoId title thumbnail url viewCount likeCount publishedAt");

//     // Detect world theme
//     const combinedText = `${playlist.title} ${playlist.description || ""}`;
//     const worldProfile = detectWorldProfile(combinedText);

//     // Iconic moment
//     const iconic = [...videos].sort((a, b) => {
//       const scoreA =
//         (a.viewCount || 0) * 0.7 + (a.likeCount || 0) * 0.3;
//       const scoreB =
//         (b.viewCount || 0) * 0.7 + (b.likeCount || 0) * 0.3;
//       return scoreB - scoreA;
//     })[0];

//     // Timeline
//     const timeline = videos.reduce((acc, v) => {
//       const year = new Date(v.publishedAt).getFullYear();
//       acc[year] = acc[year] || [];
//       acc[year].push(v);
//       return acc;
//     }, {});

//     return NextResponse.json({
//       world: {
//         title: playlist.title,
//         description: worldProfile.description,
//         color: worldProfile.color,
//         label: worldProfile.label,
//         thumbnail: playlist.thumbnail, // ✅ IMPORTANT FIX
//       },
//       iconic,
//       timeline,
//       videos,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to load world" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";
import Video from "@/models/Video";
import { detectWorldProfile } from "@/lib/worldEngine";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { playlistId } = params;

    const playlist = await Playlist.findOne({ playlistId });
    if (!playlist) {
      return NextResponse.json({ error: "World not found" }, { status: 404 });
    }

    const videos = await Video.find({
      videoId: { $in: playlist.videoIds },
    }).select("title thumbnail url viewCount likeCount publishedAt");

    // WORLD PROFILE
    const worldProfile = detectWorldProfile(
      `${playlist.title} ${playlist.description}`
    );

    // ICONIC VIDEO
    const iconic = [...videos].sort((a, b) => {
      const scoreA = (a.viewCount || 0) * 0.7 + (a.likeCount || 0) * 0.3;
      const scoreB = (b.viewCount || 0) * 0.7 + (b.likeCount || 0) * 0.3;
      return scoreB - scoreA;
    })[0];

    // TIME RANGE
    const years = videos.map(
      (v) => new Date(v.publishedAt).getFullYear()
    );
    const fromYear = Math.min(...years);
    const toYear = Math.max(...years);

    // AUTO-GENERATED CREDITS
    const credits = {
      source: "Tamil Gaming",
      platform: "YouTube",
      videoCount: videos.length,
      timeSpan: `${fromYear} - ${toYear}`,
      iconicTitle: iconic?.title || null,
      disclaimer:
        "All videos and thumbnails belong to Tamil Gaming. This world is part of a non-commercial, fan-made tribute project.",
    };

    return NextResponse.json({
      world: {
        title: playlist.title,
        description: worldProfile.description,
        color: worldProfile.color,
        label: worldProfile.label,
        thumbnail: playlist.thumbnail,
      },
      videos,
      iconic,
      credits,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load world" },
      { status: 500 }
    );
  }
}
