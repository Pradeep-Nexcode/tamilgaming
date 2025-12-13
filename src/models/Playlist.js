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
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const TamilGamingPlaylist =
  mongoose.models.TamilGamingPlaylist ||
  mongoose.model("TamilGamingPlaylist", PlaylistSchema);

export default TamilGamingPlaylist;