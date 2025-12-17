"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WorldsOfMurugesan = () => {

  const [worlds, setWorlds] = useState([]);

  useEffect(() => {
    fetch(
      `/api/worlds?page=${1}&limit=6&sort=views&world=murugesan`
    )
      .then((res) => res.json())
      .then((data) => {
        setWorlds(data.worlds);
        setWorlds((prev) => {
          const ids = new Set(prev.map((p) => p._id));
          const unique = data.worlds.filter(
            (p) => !ids.has(p._id)
          );
          return [...prev, ...unique];
        });

      });
  }, []);

  return (
    <section
      id="worlds"
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 max-w-xl"
        >
          <p className="text-[10px] uppercase tracking-widest text-[var(--tamil-orange)] mb-3">
            Worlds
          </p>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            The Worlds of Murugesan
          </h2>
          <p className="mt-4 text-sm text-[var(--tamil-white-muted)]">
            Different realities. Different rules. One presence.
          </p>
        </motion.div>

        {/* Worlds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {worlds.map((world, i) => (
            <motion.div
              key={world.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative group cursor-pointer overflow-hidden border border-[var(--tamil-border)]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={world.thumbnail}
                  alt={world.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 min-h-[260px] flex flex-col justify-end">
                <h3 className="text-lg font-black mb-2">
                  {world.title}
                </h3>
                <p className="text-xs text-[var(--tamil-white-muted)]">
                  {world.subtitle}
                </p>

                {/* Hover underline */}
                <div className="mt-4 w-0 h-[2px] bg-[var(--tamil-orange)] group-hover:w-16 transition-all duration-300" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--tamil-border)]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--tamil-border)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldsOfMurugesan;
