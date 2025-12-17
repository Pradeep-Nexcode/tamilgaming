// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function GalleryMoments() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetch("/api/videos/gallery")
//       .then((res) => res.json())
//       .then((data) => setVideos(data.videos || []));
//   }, []);

//   if (!videos.length) return null;

//   return (
//     <section id="gallery" className="bg-black text-white py-28">
//       <div className="container mx-auto px-6 lg:px-12">

//         {/* Header */}
//         <div className="max-w-2xl mb-16">
//           <p className="text-red-500 text-xs tracking-[0.35em] uppercase mb-4">
//             Moments
//           </p>
//           <h2 className="text-3xl md:text-4xl font-black mb-4">
//             Moments of Murugesan
//           </h2>
//           <p className="text-gray-400 text-sm leading-relaxed">
//             Fleeting frames, unforgettable scenes — moments captured across
//             Murugesan’s journey.
//           </p>
//         </div>

//         {/* Mosaic Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {videos.map((video, index) => (
//             <motion.a
//               key={video.url}
//               href={video.url}
//               target="_blank"
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: index * 0.05 }}
//               className={`group relative overflow-hidden border border-white/10 ${
//                 index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
//               }`}
//             >
//               <Image
//                 src={video.thumbnail}
//                 alt={video.title}
//                 width={640}
//                 height={360}
//                 className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

//               {/* Title */}
//               <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
//                 <h3 className="text-sm font-bold line-clamp-2">
//                   {video.title}
//                 </h3>
//               </div>

//               {/* Glow border */}
//               <div className="absolute inset-0 pointer-events-none border border-red-600/0 group-hover:border-red-600/40 transition duration-300" />
//             </motion.a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ERA_FILTERS = [
  { label: "ALL", from: 0, to: 9999 },
  { label: "2011–2014", from: 2011, to: 2014 },
  { label: "2015–2017", from: 2015, to: 2017 },
  { label: "2018–2020", from: 2018, to: 2020 },
  { label: "2021–2023", from: 2021, to: 2023 },
  { label: "2024–NOW", from: 2024, to: 2100 },
];

export default function GalleryMoments() {
  const [videos, setVideos] = useState([]);
  const [activeEra, setActiveEra] = useState(ERA_FILTERS[0]);
  const [sort, setSort] = useState("POPULAR");

  useEffect(() => {
    fetch("/api/videos/gallery")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  const filtered = videos
    .filter((v) => {
      const year = new Date(v.publishedAt).getFullYear();
      return year >= activeEra.from && year <= activeEra.to;
    })
    .sort((a, b) => {
      if (sort === "POPULAR") return (b.viewCount || 0) - (a.viewCount || 0);
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

  if (!videos.length) return null;

  return (
    <section id="gallery" className="bg-black text-white py-28">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-8">
          <div>
            <p className="text-red-500 text-xs tracking-[0.35em] uppercase mb-4">
              Moments
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Moments of Murugesan
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Explore defining frames across different eras of Murugesan’s
              journey.
            </p>
          </div>

          {/* Sort */}
          <div className="flex gap-4 text-xs uppercase tracking-wider">
            {["POPULAR", "LATEST"].map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-4 py-2 border transition ${sort === s
                    ? "border-red-600 text-white"
                    : "border-white/20 text-gray-400 hover:text-white"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Era Filters */}
        {/* <div className="flex gap-4 overflow-x-auto pb-6 mb-12">
          {ERA_FILTERS.map((era) => (
            <button
              key={era.label}
              onClick={() => setActiveEra(era)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border whitespace-nowrap transition ${
                activeEra.label === era.label
                  ? "border-red-600 text-white"
                  : "border-white/20 text-gray-400 hover:text-white"
              }`}
            >
              {era.label}
            </button>
          ))}
        </div> */}

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {filtered.map((video, index) => (
              <motion.a
                layout
                key={video.url}
                href={video.url}
                target="_blank"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group relative overflow-hidden border border-white/10 ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* Info */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-sm font-bold line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    👁 {video.viewCount?.toLocaleString()}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

