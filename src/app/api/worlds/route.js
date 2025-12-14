import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Playlist from "@/models/Playlist";

export async function GET() {
    try {
        await connectDB();

        const murugesanKeywords = [
            "simulator",
            "simulation",
            "job",
            "work",
            "life",
            "career",
            "ranch",
            "restaurant",
            "hotel",
            "gas",
            "station",
            "truck",
            "bus",
            "driver",
            "taxi",
            "farmer",
            "farm",
            "forest",
            "police",
            "city",
            "store",
            "shop",
            "murugesan",
            "murugesh",
            // "tamil"
        ];

        // Convert keywords → regex
        const regexList = murugesanKeywords.map(
            (word) => new RegExp(word, "i")
        );

        const playlists = await Playlist.find({
            $or: [
                { title: { $in: regexList } },
                { description: { $in: regexList } }
            ]
        })
            .sort({ itemCount: -1 }) // Big worlds first
            .select("title description thumbnail itemCount playlistId");

        return NextResponse.json({ worlds: playlists });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to load worlds" },
            { status: 500 }
        );
    }
}
