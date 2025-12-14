"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorldsPage() {
  const [worlds, setWorlds] = useState([]);

  useEffect(() => {
    fetch("/api/worlds")
      .then((res) => res.json())
      .then((data) => setWorlds(data.worlds || []));
  }, []);

  return (
    <section className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-black mb-4">
            Worlds of Murugesan
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every game is a world. Every world tells a different story of Murugesan’s journey.
          </p>
        </div>

        {/* Worlds Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {worlds.map((world, i) => (
            <motion.div
              key={world.playlistId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/worlds/${world.playlistId}`}
                className="group block border border-white/10 hover:border-white/30 transition overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={world.thumbnail}
                    alt={world.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-black text-lg mb-2 line-clamp-2">
                    {world.title}
                  </h2>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-4">
                    {world.description || "A unique world in Murugesan’s journey."}
                  </p>

                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-gray-400">
                    <span>{world.itemCount} Videos</span>
                    <span className="group-hover:text-white">
                      Enter World →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
