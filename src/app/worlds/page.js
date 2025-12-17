// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function WorldsPage() {
//   const [worlds, setWorlds] = useState([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetch(`/api/worlds?page=${page}&limit=12`)
//       .then((res) => res.json())
//       .then((data) => {
//         setWorlds((prev) => [...prev, ...(data.worlds || [])]);
//       });
//   }, [page]);

//   // Get rotation for more organic feel
//   const getRotation = (index) => {
//     const rotations = [-3, 2, -2, 3, -4, 2.5, -3.5, 4, -2.5, 3.5];
//     return rotations[index % rotations.length];
//   };

//   // Get size variation - older photos get smaller and more faded
//   const getSizeMultiplier = (index, total) => {
//     // Recent photos are bigger, older ones smaller
//     const progress = index / Math.max(total - 1, 1);
//     return 1 - (progress * 0.3); // Range from 1.0 to 0.7
//   };

//   // Get aging effect - older photos look more vintage
//   const getAgingEffect = (index, total) => {
//     const progress = index / Math.max(total - 1, 1);
//     return {
//       sepia: progress * 0.6,
//       brightness: 1 - (progress * 0.2),
//       contrast: 1 - (progress * 0.15),
//     };
//   };

//   // Get offset for left/right scattering
//   const getOffset = (index) => {
//     const isLeft = index % 2 === 0;
//     return isLeft ? -Math.random() * 100 - 50 : Math.random() * 100 + 50; // Random offset for organic feel
//   };

//   return (
//     <section className="min-h-screen relative overflow-hidden py-20" style={{
//       background: 'linear-gradient(180deg, #1a1612 0%, #2c2416 30%, #3a2f1e 60%, #4a3f2e 100%)',
//     }}>

//       {/* Wooden Wall Texture */}
//       <div
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Vignette for depth */}
//       <div className="absolute inset-0" style={{
//         background: 'radial-gradient(ellipse at center top, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)'
//       }} />

//       <div className="container mx-auto px-6 lg:px-16 relative z-10">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1
//             className="text-6xl md:text-7xl font-black mb-6 text-amber-50"
//             style={{
//               textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
//               fontFamily: 'Georgia, serif',
//               letterSpacing: '-0.02em'
//             }}
//           >
//             Worlds of Murugesan
//           </h1>
//           <p
//             className="text-amber-100/60 text-lg max-w-2xl mx-auto leading-relaxed"
//             style={{ fontFamily: 'Georgia, serif' }}
//           >
//             A journey through time—newest memories at the top, fading into cherished moments below
//           </p>
//         </motion.div>

//         {/* Vertical Timeline with Scattered Photos */}
//         <div className="relative max-w-4xl mx-auto">

//           {/* Vertical Timeline Line */}
//           <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block" style={{
//             background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
//             boxShadow: '0 0 20px rgba(255,255,255,0.1)',
//           }} />

//           {/* Timeline Dots */}
//           {worlds.map((_, index) => (
//             <motion.div
//               key={`dot-${index}`}
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
//               className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full hidden md:block z-30"
//               style={{
//                 top: `${100 + index * 450}px`, // Reduced spacing for better flow
//                 background: 'radial-gradient(circle at 30% 30%, #fbbf24, #d97706)',
//                 boxShadow: '0 0 20px rgba(251, 191, 36, 0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
//               }}
//             />
//           ))}

//           {/* Photo Cards */}
//           <div className="space-y-24 md:space-y-32 py-12"> {/* Increased spacing for better separation */}
//             {worlds.map((world, index) => {
//               const rotation = getRotation(index);
//               const isLeft = index % 2 === 0;
//               const sizeMultiplier = getSizeMultiplier(index, worlds.length);
//               const aging = getAgingEffect(index, worlds.length);
//               const offset = getOffset(index);

//               return (
//                 <motion.div
//                   key={world.playlistId}
//                   initial={{ opacity: 0, scale: 0.8, rotateZ: rotation * 2, x: isLeft ? -200 : 200 }}
//                   animate={{ opacity: 1, scale: 1, rotateZ: rotation, x: offset }}
//                   transition={{
//                     duration: 0.8,
//                     delay: index * 0.15,
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 15
//                   }}
//                   className="relative max-w-sm mx-auto md:mx-0" // Centered on mobile, offset on desktop
//                   style={{
//                     filter: `sepia(${aging.sepia}) brightness(${aging.brightness}) contrast(${aging.contrast})`,
//                     transformOrigin: 'center',
//                   }}
//                 >
//                   {/* Tape Effect at Top */}
//                   <div
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-yellow-100/30 backdrop-blur-md z-10 rounded"
//                     style={{
//                       transform: `translateX(-50%) rotate(${rotation > 0 ? -3 : 3}deg)`,
//                       boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)',
//                       border: '1px solid rgba(0,0,0,0.1)',
//                     }}
//                   />

//                   <Link
//                     href={`/worlds/${world.playlistId}`}
//                     className="group block relative"
//                   >
//                     {/* Photo Container with Realistic Polaroid Frame */}
//                     <div
//                       className="bg-white p-3 pb-8 transition-all duration-500 ease-out cursor-pointer relative rounded-sm" // Polaroid style with thicker bottom
//                       style={{
//                         boxShadow: `
//                           0 4px 8px rgba(0,0,0,0.2),
//                           0 8px 16px rgba(0,0,0,0.15),
//                           0 16px 32px rgba(0,0,0,0.1),
//                           inset 0 0 2px rgba(0,0,0,0.05)
//                         `,
//                         transform: `rotate(${rotation}deg) scale(${sizeMultiplier})`,
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = `rotate(0deg) translateY(-8px) scale(${sizeMultiplier * 1.05})`;
//                         e.currentTarget.style.boxShadow = `
//                           0 8px 16px rgba(0,0,0,0.25),
//                           0 16px 32px rgba(0,0,0,0.3),
//                           0 24px 48px rgba(0,0,0,0.2),
//                           inset 0 0 2px rgba(0,0,0,0.05)
//                         `;
//                         e.currentTarget.style.zIndex = '20';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = `rotate(${rotation}deg) scale(${sizeMultiplier})`;
//                         e.currentTarget.style.boxShadow = `
//                           0 4px 8px rgba(0,0,0,0.2),
//                           0 8px 16px rgba(0,0,0,0.15),
//                           0 16px 32px rgba(0,0,0,0.1),
//                           inset 0 0 2px rgba(0,0,0,0.05)
//                         `;
//                         e.currentTarget.style.zIndex = '10';
//                       }}
//                     >

//                       {/* Image with 4:5 Ratio and Film Grain */}
//                       <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 rounded-sm">
//                         <Image
//                           src={world.thumbnail}
//                           alt={world.title}
//                           fill
//                           className="object-cover transition-transform duration-500 group-hover:scale-105"
//                         />
//                         {/* Subtle Film Grain */}
//                         <div
//                           className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
//                           style={{
//                             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//                           }}
//                         />
//                       </div>

//                       {/* Handwritten Caption Area */}
//                       <div className="pt-4 px-2">
//                         <h2
//                           className="font-bold text-gray-800 text-lg mb-1 text-center leading-tight"
//                           style={{
//                             fontFamily: '"Segoe Script", "Comic Sans MS", cursive',
//                             letterSpacing: '0.3px',
//                             textShadow: '0 1px 1px rgba(0,0,0,0.05)'
//                           }}
//                         >
//                           {world.title}
//                         </h2>

//                         <p
//                           className="text-xs text-gray-500 text-center mb-1 tracking-wide"
//                           style={{
//                             fontFamily: '"Courier New", monospace',
//                             letterSpacing: '0.8px'
//                           }}
//                         >
//                           {world.startYear} – {world.endYear || "Now"}
//                         </p>

//                         <p
//                           className="text-sm text-gray-600 line-clamp-2 text-center leading-relaxed"
//                           style={{
//                             fontFamily: 'Georgia, serif',
//                             fontStyle: 'italic'
//                           }}
//                         >
//                           {world.description || "A defining world in Murugesan's journey."}
//                         </p>
//                       </div>

//                       {/* Worn Edge Effect */}
//                       <div className="absolute inset-0 pointer-events-none rounded-sm" style={{
//                         boxShadow: 'inset 0 0 15px rgba(0,0,0,0.04)',
//                         border: '1px solid rgba(0,0,0,0.03)'
//                       }} />

//                     </div>

//                     {/* Pin/Tack Shadow */}
//                     <div
//                       className="absolute -top-6 left-1/2 w-3 h-3 rounded-full bg-black/40 blur-md"
//                       style={{
//                         transform: `translateX(-50%)`,
//                       }}
//                     />

//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Timeline End Cap */}
//           <div className="flex flex-col items-center mt-20 mb-16">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center hidden md:flex"
//               style={{
//                 boxShadow: '0 0 30px rgba(251, 191, 36, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
//               }}
//             >
//               <span className="text-white text-xl font-bold">∞</span>
//             </motion.div>
//             <p className="text-amber-100/40 text-sm mt-4 font-serif">The journey continues...</p>
//           </div>
//         </div>

//         {/* Load More Button */}
//         <div className="flex justify-center mt-12">
//           <motion.button
//             onClick={() => setPage((p) => p + 1)}
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-10 py-4 bg-amber-900/40 backdrop-blur-sm border-2 border-amber-700/50 text-amber-100 text-sm uppercase tracking-[0.3em] hover:bg-amber-900/60 hover:border-amber-600 transition-all duration-300 font-bold"
//             style={{
//               fontFamily: 'Georgia, serif',
//               boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
//             }}
//           >
//             Explore Deeper
//           </motion.button>
//         </div>

//       </div>
//     </section>
//   );
// }

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

            <p
              className="text-xs text-gray-500 text-center mb-2 tracking-wider"
              style={{
                fontFamily: '"Courier New", monospace',
                letterSpacing: '1px'
              }}
            >
              {world.startYear} – {world.endYear || "Now"}
            </p>

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

    // <motion.div
    //   initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
    //   whileInView={{ opacity: 1, y: 0, rotate: rotation }}
    //   viewport={{ once: true, margin: "-100px" }}
    //   transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    //   className="relative w-full"
    // >
    //   {/* Tape at the top */}
    //   <div
    //     className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-100/60 backdrop-blur-sm rounded-sm z-10"
    //     style={{
    //       transform: `translateX(-50%) rotate(${rotation / 2}deg)`,
    //       boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    //     }}
    //   />

    //   <a
    //     href={`/worlds/${world.playlistId}`}
    //     className="group block relative"
    //   >
    //     {/* Polaroid Frame */}
    //     <div
    //       className="bg-white p-4 pb-12 rounded-sm transition-all duration-500 cursor-pointer"
    //       style={{
    //         boxShadow: `
    //           0 10px 20px rgba(0,0,0,0.3),
    //           0 20px 40px rgba(0,0,0,0.2),
    //           0 30px 60px rgba(0,0,0,0.15)
    //         `,
    //         transform: `rotate(${rotation}deg)`,
    //       }}
    //       onMouseEnter={(e) => {
    //         e.currentTarget.style.transform = `rotate(0deg) translateY(-16px) scale(1.06)`;
    //         e.currentTarget.style.boxShadow = `
    //           0 20px 40px rgba(0,0,0,0.4),
    //           0 30px 60px rgba(0,0,0,0.3),
    //           0 40px 80px rgba(0,0,0,0.25)
    //         `;
    //       }}
    //       onMouseLeave={(e) => {
    //         e.currentTarget.style.transform = `rotate(${rotation}deg)`;
    //         e.currentTarget.style.boxShadow = `
    //           0 10px 20px rgba(0,0,0,0.3),
    //           0 20px 40px rgba(0,0,0,0.2),
    //           0 30px 60px rgba(0,0,0,0.15)
    //         `;
    //       }}
    //     >
    //       {/* Image with 4:5 aspect ratio */}
    //       <div className="relative aspect-[5/5] overflow-hidden bg-gray-100 rounded-sm">
    //         <img
    //           src={world.thumbnail}
    //           alt={world.title}
    //           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //         />
    //         {/* Film grain overlay */}
    //         <div
    //           className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
    //           style={{
    //             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    //           }}
    //         />
    //       </div>

    //       {/* Caption area */}
    //       <div className="mt-6 px-4 text-center">
    //         <h3
    //           className="text-2xl font-bold text-gray-900 mb-2 leading-tight"
    //           style={{
    //             fontFamily: '"Dancing Script", "Brush Script MT", cursive',
    //             letterSpacing: "0.5px",
    //           }}
    //         >
    //           {world.title}
    //         </h3>

    //         <p
    //           className="text-sm text-gray-600 tracking-wider uppercase"
    //           style={{ fontFamily: '"Courier New", monospace', letterSpacing: "1.5px" }}
    //         >
    //           {world.startYear} – {world.endYear || "Present"}
    //         </p>

    //         <p
    //           className="mt-4 text-gray-700 italic text-base leading-relaxed"
    //           style={{ fontFamily: "Georgia, serif" }}
    //         >
    //           {world.description || "A defining world in Murugesan's journey."}
    //         </p>
    //       </div>

    //       {/* Inner worn edge effect */}
    //       <div
    //         className="absolute inset-0 pointer-events-none rounded-sm"
    //         style={{
    //           boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
    //         }}
    //       />
    //     </div>

    //     {/* Pin shadow */}
    //     <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black/30 blur-md z-0" />
    //   </a>
    // </motion.div>
  );
}

/* Main Component */
export default function WorldsPage() {
  const [worlds, setWorlds] = useState([]);
  const [page, setPage] = useState(1);



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
        <div className="flex justify-center my-20">
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
      </div>
    </section>
  );
}