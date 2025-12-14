"use client";

import { motion } from "framer-motion";

export default function VideosSearchBar({ value, onChange }) {
  return (
    <section className="bg-[var(--tamil-black)] pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl"
        >
          {/* Terminal frame */}
          <div className="relative border border-[var(--tamil-border)] bg-[var(--tamil-black-soft)] p-4">
            
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--tamil-orange)]" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--tamil-orange)]" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--tamil-orange)]" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--tamil-orange)]" />

            {/* Input row */}
            <div className="flex items-center gap-4">
              {/* Prompt */}
              <span className="font-pixel text-[var(--tamil-orange)] text-xs">
                SEARCH &gt;
              </span>

              {/* Input */}
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type a video title, game, or world..."
                className="
                  flex-1 bg-transparent outline-none border-none
                  font-terminal text-lg
                  text-white placeholder:text-gray-500
                "
              />
            </div>
          </div>

          {/* Helper text */}
          <p className="mt-3 font-terminal text-sm text-gray-500">
            Try searching for <span className="text-white">Simulator</span>,{" "}
            <span className="text-white">Murugesan</span>, or a game name
          </p>
        </motion.div>
      </div>
    </section>
  );
}
