"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VideoCard({ video }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="
        group relative block
        border border-[var(--tamil-border)]
        bg-[var(--tamil-black-soft)]
        overflow-hidden
      "
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="w-14 h-14 border-2 border-white flex items-center justify-center bg-black/40">
            ▶
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-pixel text-sm leading-snug line-clamp-2">
          {video.title}
        </h3>

        <p className="font-terminal text-sm text-[var(--tamil-white-muted)] line-clamp-2">
          {video.description || "A defining moment from Murugesan’s journey."}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 font-terminal">
          <span>{new Date(video.publishedAt).getFullYear()}</span>
          <span>{video.viewCount?.toLocaleString()} views</span>
        </div>
      </div>

      {/* Retro corner */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--tamil-orange)]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--tamil-orange)]" />
    </motion.a>
  );
}
