"use client";

import { motion } from "framer-motion";

const worlds = [
  "All",
  "Simulator",
  "Horror",
  "Open World",
  "Multiplayer",
];

const sorts = [
  { label: "Newest", value: "new" },
  { label: "Most Viewed", value: "views" },
  { label: "Most Liked", value: "likes" },
];

const years = ["All", "2024+", "2020–2023", "2015–2019", "Classic"];

export default function VideosFilters({
  world,
  setWorld,
  sort,
  setSort,
  year,
  setYear,
}) {
  return (
    <section className="bg-[var(--tamil-black)] pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* WORLD FILTER */}
          <div>
            <p className="font-pixel text-xs tracking-[0.35em] uppercase text-[var(--tamil-orange)] mb-4">
              Worlds
            </p>
            <div className="flex flex-wrap gap-3">
              {worlds.map((item) => (
                <button
                  key={item}
                  onClick={() => setWorld(item)}
                  className={`
                    font-terminal px-4 py-2 border
                    ${
                      world === item
                        ? "border-[var(--tamil-orange)] text-white"
                        : "border-[var(--tamil-border)] text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* SORT + YEAR */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* SORT */}
            <div>
              <p className="font-pixel text-xs tracking-[0.35em] uppercase text-[var(--tamil-orange)] mb-4">
                Sort By
              </p>
              <div className="flex flex-wrap gap-3">
                {sorts.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSort(s.value)}
                    className={`
                      font-terminal px-4 py-2 border
                      ${
                        sort === s.value
                          ? "border-[var(--tamil-orange)] text-white"
                          : "border-[var(--tamil-border)] text-gray-400 hover:text-white"
                      }
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* YEAR */}
            <div>
              <p className="font-pixel text-xs tracking-[0.35em] uppercase text-[var(--tamil-orange)] mb-4">
                Era
              </p>
              <div className="flex flex-wrap gap-3">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`
                      font-terminal px-4 py-2 border
                      ${
                        year === y
                          ? "border-[var(--tamil-orange)] text-white"
                          : "border-[var(--tamil-border)] text-gray-400 hover:text-white"
                      }
                    `}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
