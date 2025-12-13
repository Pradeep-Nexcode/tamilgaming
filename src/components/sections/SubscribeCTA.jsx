"use client";

import { motion } from "framer-motion";

export default function SubscribeCTA() {
  return (
    <section
      id="subscribe"
      className="relative bg-black text-white py-32 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/20 blur-3xl rounded-full" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-xs tracking-[0.35em] uppercase mb-6"
        >
          Join the Journey
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight"
        >
          Every World Has a Story.
          <br />
          <span className="text-red-500">This One Continues on YouTube.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          New worlds. New moments. New journeys.
          <br />
          Subscribe to Tamil Gaming and continue the journey with Murugesan.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="https://www.youtube.com/@tamilgaming"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest relative overflow-hidden"
        >
          {/* Hover glow */}
          <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 hover:opacity-100 transition" />

          {/* Content */}
          <span className="relative z-10 flex items-center gap-4">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </span>

          {/* Animated Corners */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
        </motion.a>

        {/* Footer Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-xs text-gray-600 tracking-widest uppercase"
        >
          Tamil Gaming • Murugesan • Since 2011
        </motion.p>
      </div>
    </section>
  );
}
