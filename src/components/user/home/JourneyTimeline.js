"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function JourneyTimeline() {
  const [eras, setEras] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("/api/videos/timeline?world=murugesan&sort=likes")
      .then((res) => res.json())
      .then((data) => setEras(data.eras || []));
  }, []);

  if (!eras.length) return null;

  const current = eras[active];

  return (
    <section id="journey" className="bg-black text-white py-28">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-[var(--tamil-orange)] text-xs tracking-[0.35em] uppercase mb-4">
            Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            A Journey Across Years
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every era carries moments, worlds, and stories that shaped Murugesan
            through time.
          </p>
        </div>

        {/* Era Tabs */}
        <div className="flex gap-6 overflow-x-auto myScroll  pb-6 mb-30">
          {eras.map((era, index) => (
            <button
              key={era.id}
              onClick={() => setActive(index)}
              className={`relative px-2 py-2 text-left whitespace-nowrap transition ${active === index
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <span className="block text-xs tracking-widest uppercase">
                {era.years}
              </span>
              <span className="block font-bold text-sm">
                {era.title}
              </span>

              {active === index && (
                <motion.div
                  layoutId="activeEra"
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-[var(--tamil-orange)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Video Rail */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="
    flex gap-6 overflow-x-auto myScroll  pb-4
    scroll-smooth
    snap-x snap-mandatory
    no-scrollbar
  "
        >
          {current.videos.map((video) => (
            <a
              key={video.videoId}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
        snap-start
        group
        flex-shrink-0
        w-[480px]
      "
            >
              {/* Thumbnail */}
              <div className="
        relative
        aspect-video
        overflow-hidden
        rounded-xl
        bg-black
        ring-1 ring-white/10
        transition
        group-hover:ring-white/20
        group-hover:shadow-2xl
      ">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="480px"
                  className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    👁 {video.viewCount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
