"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[var(--tamil-orange)]/10 blur-3xl" />

      <div className="relative container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-black tracking-tight mb-3">
              MURUGESAN
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              A character shaped by many worlds.  
              A journey lived through Tamil Gaming.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Navigate
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Videos", href: "/videos" },
                { label: "Worlds", href: "/worlds" },
                { label: "About", href: "/about" },
                // { label: "Subscribe", href: "/subscribe" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tamil Gaming */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Original Source
            </p>

            <motion.a
              href="https://www.youtube.com/@tamilgaming"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-5 py-3 border border-[var(--tamil-orange)]/40 text-[var(--tamil-orange)] hover:bg-[var(--tamil-orange)] hover:text-white transition font-bold text-xs uppercase tracking-widest"
            >
              Visit Tamil Gaming
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 tracking-wider">
            © {new Date().getFullYear()} Murugesan. Fan-made tribute site.
          </p>

          <p className="text-xs text-gray-600 tracking-widest uppercase">
            Built with respect for Tamil Gaming
          </p>
        </div>
      </div>
    </footer>
  );
}
