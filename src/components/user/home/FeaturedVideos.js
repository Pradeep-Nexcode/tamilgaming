// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const FeaturedVideos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/videos/featured")
//       .then((res) => res.json())
//       .then((data) => {
//         setVideos(data.videos || []);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="bg-black py-28 text-center text-[var(--tamil-white-muted)]">
//         Loading featured moments…
//       </section>
//     );
//   }

//   if (!videos.length) return null;

//   const mainVideo = videos[0];
//   const sideVideos = videos.slice(1);

//   return (
//     <section
//       id="videos"
//       className="relative bg-[var(--tamil-black)] text-white py-28"
//     >
//       <div className="container mx-auto px-6 lg:px-12">

//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mb-14 max-w-xl"
//         >
//           <p className="text-[10px] uppercase tracking-widest text-[var(--tamil-orange)] mb-3">
//             Featured
//           </p>
//           <h2 className="text-3xl md:text-4xl font-black leading-tight">
//             Featured Moments
//           </h2>
//           <p className="mt-4 text-sm text-[var(--tamil-white-muted)]">
//             A few moments that define Murugesan across different worlds.
//           </p>
//         </motion.div>

//         {/* Layout */}
//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Main Featured */}
//           <motion.a
//             href={mainVideo.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.02 }}
//             className="relative lg:col-span-2 overflow-hidden border border-[var(--tamil-border)] group"
//           >
//             <div className="absolute inset-0">
//               <Image
//                 src={mainVideo.thumbnail}
//                 alt={mainVideo.title}
//                 fill
//                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//               />
//               <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all" />
//             </div>

//             <div className="relative z-10 p-8 min-h-[360px] flex flex-col justify-end">
//               <p className="text-[10px] uppercase tracking-widest text-[var(--tamil-orange)] mb-3">
//                 Featured
//               </p>
//               <h3 className="text-2xl font-black max-w-lg leading-snug">
//                 {mainVideo.title}
//               </h3>
//             </div>
//           </motion.a>

//           {/* Side Videos */}
//           <div className="flex flex-col gap-6">
//             {sideVideos.map((video) => (
//               <motion.a
//                 key={video._id}
//                 href={video.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.03 }}
//                 className="relative overflow-hidden border border-[var(--tamil-border)] group"
//               >
//                 <div className="absolute inset-0">
//                   <Image
//                     src={video.thumbnail}
//                     alt={video.title}
//                     fill
//                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all" />
//                 </div>

//                 <div className="relative z-10 p-5 min-h-[120px] flex items-end">
//                   <h4 className="text-sm font-black leading-snug">
//                     {video.title}
//                   </h4>
//                 </div>
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedVideos;


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos/featured")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  if (!videos.length) return null;

  const [main, ...others] = videos;

  return (
    <section id="featured" className="bg-black text-white py-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[var(--tamil-orange)] text-xs tracking-[0.35em] uppercase mb-3">
            Highlights
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Featured Moments of Tamil Gaming
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Featured */}
          <motion.a
            href={main.url}
            target="_blank"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 group relative overflow-hidden border border-white/10"
          >
            <Image
              src={main.thumbnail}
              alt={main.title}
              width={1280}
              height={720}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl md:text-2xl font-black mb-3">
                {main.title}
              </h3>
              <div className="flex gap-6 text-xs text-gray-300">
                <span>👁 {main.viewCount?.toLocaleString()}</span>
                <span>❤️ {main.likeCount?.toLocaleString()}</span>
              </div>
            </div>
          </motion.a>

          {/* Side Videos */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
            {others.slice(0, 4).map((video, i) => (
              <motion.a
                key={i}
                href={video.url}
                target="_blank"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex gap-4 items-center border border-white/10 p-3 hover:bg-white/5 transition"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={160}
                  height={90}
                  className="w-28 h-16 object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    👁 {video.viewCount?.toLocaleString()}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
