// import mongoose from "mongoose";

// const VideoSchema = new mongoose.Schema(
//   {
//     videoId: { type: String, unique: true },

//     // Basic
//     title: String,
//     description: String,
//     thumbnail: String,
//     publishedAt: String,
//     url: String,

//     // Extra details
//     duration: String,
//     tags: [String],
//     categoryId: String,

//     // Statistics
//     viewCount: Number,
//     likeCount: Number,
//     commentCount: Number,

//     // Quality
//     definition: String, // hd or sd
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Video || mongoose.model("Video", VideoSchema);


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
    definition: String,
  },
  { timestamps: true }
);

/* =========================
   INDEXES (PERFORMANCE)
   ========================= */

// Text search index (search bar)
VideoSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

// Sorting & filtering indexes
VideoSchema.index({ publishedAt: -1 });
VideoSchema.index({ viewCount: -1 });
VideoSchema.index({ likeCount: -1 });

// Tag-based filtering
VideoSchema.index({ tags: 1 });

export default mongoose.models.Video ||
  mongoose.model("Video", VideoSchema);
