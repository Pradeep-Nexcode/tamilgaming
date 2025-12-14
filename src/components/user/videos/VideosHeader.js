"use client";

import { motion } from "framer-motion";

export default function VideosHeader() {
  return (
    <section
      className="relative bg-[var(--tamil-black)] text-white pt-36 pb-20 overflow-hidden"
      id="videos"
    >
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--tamil-orange)]/10 blur-[160px]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-pixel text-xs tracking-[0.4em] uppercase text-[var(--tamil-orange)] mb-6"
        >
          Archive
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-pixel text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
        >
          Videos
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-terminal text-2xl text-[var(--tamil-white-muted)] max-w-2xl leading-relaxed"
        >
          Every world Murugesan has stepped into — across years, games, and
          unforgettable moments from Tamil Gaming.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 h-px w-40 bg-[var(--tamil-orange)] origin-left"
        />
      </div>
    </section>
  );
}
