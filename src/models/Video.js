import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    videoId: { type: String, unique: true },

    // Basic
    title: String,
    description: String,
    thumbnail: String,
    publishedAt: String,
    url: String,

    // Extra details
    duration: String,
    tags: [String],
    categoryId: String,

    // Statistics
    viewCount: Number,
    likeCount: Number,
    commentCount: Number,

    // Quality
    definition: String, // hd or sd
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
