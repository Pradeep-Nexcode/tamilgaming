"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function JourneyTimeline() {
  const [eras, setEras] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("/api/videos/timeline")
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
          <p className="text-red-500 text-xs tracking-[0.35em] uppercase mb-4">
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
        <div className="flex gap-6 overflow-x-auto pb-6 mb-10">
          {eras.map((era, index) => (
            <button
              key={era.id}
              onClick={() => setActive(index)}
              className={`relative px-4 py-2 text-left whitespace-nowrap transition ${
                active === index
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
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-600"
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
          transition={{ duration: 0.5 }}
          className="flex gap-6 overflow-x-auto pb-4"
        >
          {current.videos.map((video) => (
            <a
              key={video.url}
              href={video.url}
              target="_blank"
              className="group min-w-[280px] max-w-[280px]"
            >
              <div className="relative overflow-hidden border border-white/10">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={480}
                  height={270}
                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm font-bold line-clamp-2">
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
