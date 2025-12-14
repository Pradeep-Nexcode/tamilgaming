"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const words = ["Hotels", "Restaurant", "Ranch", "Gas Station", "Theater"];

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 800);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="relative bg-black text-white h-screen overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/murugesan-banner.png"
          alt="Murugesan"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(246, 89, 0, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(246, 89, 0, 0.25) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-40 w-96 h-96 bg-[var(--tamil-orange)] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--tamil-orange-light)] rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-black/60 border border-[var(--tamil-border)] backdrop-blur-xl relative"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--tamil-orange)]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--tamil-orange)]" />

                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[var(--tamil-orange)] rounded-full"
                />

                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--tamil-white-muted)]">
                  About Murugesan —
                  <span className="ml-2 text-white">
                    {text}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tighter">
                  <span className="text-white drop-shadow-2xl">MURU</span>
                  <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[var(--tamil-orange)] via-[var(--tamil-orange-light)] to-[var(--tamil-orange)] drop-shadow-2xl">
                    GESAN
                  </span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="font-terminal text-lg md:text-2xl text-[var(--tamil-white-muted)] max-w-xl leading-relaxed"
              >
                Experience epic gaming moments and legendary gameplay from Tamil
                Gaming&apos;s most iconic character across multiple universes.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.a
                  href="#videos"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-3 bg-[var(--tamil-orange)] text-black font-black text-xs uppercase tracking-wider overflow-hidden"
                >
                  Watch Videos
                </motion.a>

                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-3 bg-white/5 border border-[var(--tamil-border)] text-white font-black text-xs uppercase tracking-wider backdrop-blur-md"
                >
                  Learn More
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-[var(--tamil-white-muted)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-[var(--tamil-border)] rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-[var(--tamil-orange)] rounded-full" />
        </motion.div>
      </motion.div>

      {/* Corner UI */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[var(--tamil-border)]" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[var(--tamil-border)]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[var(--tamil-border)]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[var(--tamil-border)]" />
    </div>
  );
};

export default Hero;
