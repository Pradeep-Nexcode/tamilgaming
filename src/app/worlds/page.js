"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
/* Timeline Card Component */
function TimelineCard({ world, index }) {
  const rotation = index % 2 === 0 ? -5 + Math.random() * 4 : 3 + Math.random() * 4;


  return (



    <motion.div
      key={world.playlistId}
      initial={{ opacity: 0, scale: 0.8, rotateZ: rotation * 2 }}
      animate={{ opacity: 1, scale: 1, rotateZ: rotation }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative"
      style={{
        marginTop: `${index * 50}px`,
      }}
    >
      {/* Tape Effect at Top */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-yellow-100/20 backdrop-blur-sm z-10"
        style={{
          transform: `translateX(-50%) rotate(${rotation > 0 ? -2 : 2}deg)`,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      <Link
        href={`/worlds/${world.playlistId}`}
        className="group block relative"
      >
        {/* Photo Container with Realistic Effects */}
        <div
          className="bg-white p-4 transition-all duration-500 ease-out cursor-pointer relative"
          style={{
            boxShadow: `
                          0 1px 3px rgba(0,0,0,0.12),
                          0 8px 16px rgba(0,0,0,0.24),
                          0 16px 32px rgba(0,0,0,0.19),
                          inset 0 0 0 1px rgba(0,0,0,0.05)
                        `,
            transform: `rotate(${rotation}deg)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) translateY(-12px) scale(1.05)';
            e.currentTarget.style.boxShadow = `
                          0 4px 8px rgba(0,0,0,0.15),
                          0 16px 32px rgba(0,0,0,0.3),
                          0 24px 48px rgba(0,0,0,0.25),
                          inset 0 0 0 1px rgba(0,0,0,0.05)
                        `;
            e.currentTarget.style.zIndex = '20';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${rotation}deg)`;
            e.currentTarget.style.boxShadow = `
                          0 1px 3px rgba(0,0,0,0.12),
                          0 8px 16px rgba(0,0,0,0.24),
                          0 16px 32px rgba(0,0,0,0.19),
                          inset 0 0 0 1px rgba(0,0,0,0.05)
                        `;
            e.currentTarget.style.zIndex = '10';
          }}
        >

          {/* Image with Film Grain Effect */}
          <div className="relative h-72 overflow-hidden bg-gray-200">
            <Image
              src={world.thumbnail}
              alt={world.title}
              fill
              className="object-cover"
            />
            {/* Subtle Film Grain */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Handwritten Caption Area */}
          <div className="bg-white pt-5 pb-3 px-2">
            <h2
              className="font-bold text-gray-800 text-lg mb-2 text-center leading-tight"
              style={{
                fontFamily: '"Segoe Script", "Comic Sans MS", cursive',
                letterSpacing: '0.5px'
              }}
            >
              {world.title}
            </h2>

            {/* <p
              className="text-xs text-gray-500 text-center mb-2 tracking-wider"
              style={{
                fontFamily: '"Courier New", monospace',
                letterSpacing: '1px'
              }}
            >
              {world.startYear} - {world.endYear || "Now"}
            </p> */}

            <p
              className="text-sm text-gray-600 line-clamp-2 text-center leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}
            >
              {world.description || "A defining world in Murugesan's journey."}
            </p>
          </div>

          {/* Worn Edge Effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)',
          }} />

        </div>

        {/* Pin/Tack Shadow */}
        <div
          className="absolute -top-4 left-1/2 w-2 h-2 rounded-full bg-black/30 blur-sm"
          style={{
            transform: `translateX(-50%)`,
          }}
        />

      </Link>
    </motion.div>



  )
}

/* Main Component */
export default function WorldsPage() {
  const [worlds, setWorlds] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);



  useEffect(() => {
    fetch(`/api/worlds?page=${page}&limit=12&world=murugesan`)
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) {
          setWorlds(data.worlds);
        } else {
          setWorlds(prev => {
            const ids = new Set(prev.map(p => p._id));
            const unique = data.worlds.filter(p => !ids.has(p._id));

            return [...prev, ...unique];
          });
        }
        setHasMore(data.hasMore);
      });
  }, [page]);

  return (
    <section
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: "linear-gradient(180deg, #1a1612 0%, #2c2416 30%, #3a2f1e 60%, #4a3f2e 100%)",
      }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center top, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1
            className="text-6xl md:text-7xl font-black mb-6 text-amber-50"
            style={{
              textShadow: "4px 4px 8px rgba(0,0,0,0.7)",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Worlds of Murugesan
          </h1>
          <p
            className="text-amber-100/60 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A journey through time—newest memories at the top, fading into cherished moments below
          </p>
        </motion.div>

        {/* Timeline - Zigzag Layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)",
              boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          />

          {/* Cards Container */}
          <div className="space-y-32 md:space-y-0">
            {worlds.map((world, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative md:h-[400px] flex items-center"
                >
                  {/* Timeline dot on the center line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full hidden md:block z-30"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, #fbbf24, #d97706)",
                      boxShadow: "0 0 25px rgba(251, 191, 36, 0.6)",
                    }}
                  />

                  {/* Card positioned left or right */}
                  <div
                    className={`w-full md:w-[550px] mx-auto md:mx-0 ${isLeft
                      ? 'md:absolute md:left-0 md:right-auto'
                      : 'md:absolute md:right-0 md:left-auto'
                      }`}
                  >
                    <TimelineCard world={world} index={index} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infinity end */}
          <div className="flex flex-col items-center mt-32 mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-800 flex items-center justify-center shadow-2xl"
            >
              <span className="text-white text-2xl font-bold">∞</span>
            </motion.div>
            <p className="text-amber-100/50 mt-4 text-lg font-serif">
              The journey continues...
            </p>
          </div>
        </div>

        {/* Load More */}
        {/* only show load more button if there are more videos */}

        {hasMore && (
          <div className="flex justify-center my-20" >
            <motion.button
              onClick={() => setPage((p) => p + 1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-amber-900/50 backdrop-blur-md border-2 border-amber-700/70 text-amber-100 text-lg uppercase tracking-[0.4em] hover:bg-amber-900/70 transition-all duration-400 font-semibold rounded-lg"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
            >
              Explore Deeper
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}