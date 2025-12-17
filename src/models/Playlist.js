// models/Playlist.js
import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    playlistId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      index: true,
    }
,
    url: {
      type: String,
      required: true,
    },
    // Playlist stats
    itemCount: {
      type: Number,
      default: 0,
    },
    // Store video IDs in this playlist
    videoIds: [
      {
        type: String,
      },
    ],
    // 🔥 ADMIN CONTROLS
    isFeatured: { type: Boolean, default: false },
    isMurugesanWorld: { type: Boolean, default: false },

    worldType: {
      type: String,
      enum: [
        "Simulator",
        "Horror",
        "Urban",
        "Transport",
        "Service",
        "Survival",
        "Other",
      ],
      default: "Other",
    },

    customDescription: String,
    color: String, // optional override
  },
  {
    timestamps: true,
  }
);

const Playlist =
  mongoose.models.Playlist ??
  mongoose.model("Playlist", PlaylistSchema);
export default Playlist;