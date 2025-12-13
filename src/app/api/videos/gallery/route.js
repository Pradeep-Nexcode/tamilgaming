// import { NextResponse } from "next/server";
// import connectDB from "@/utils/mongodb";
// import Video from "@/models/Video";

// export async function GET() {
//   try {
//     await connectDB();

//     const videos = await Video.find({
//       thumbnail: { $exists: true },
//     })
//       .sort({
//         viewCount: -1,
//         publishedAt: -1,
//       })
//       .limit(12)
//       .select("title thumbnail url");

//     return NextResponse.json({ videos });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to load gallery moments" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find({
      thumbnail: { $exists: true },
    })
      .select("title thumbnail url publishedAt viewCount")
      .limit(50); // enough for filters

    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}

