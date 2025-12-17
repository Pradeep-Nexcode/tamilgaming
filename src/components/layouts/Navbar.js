

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Videos", href: "videos" },
    { name: "Worlds", href: "worlds" },
    { name: "About", href: "about" },
    // { name: "Contact", href: "contact" },
  ];

  

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled
          ? "bg-[var(--tamil-black)]/90 backdrop-blur-xl border-b border-[var(--tamil-border)]"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <motion.div

              whileHover={{ scale: 1.05 }}
            >
              <Link href="/"
                className="flex items-center gap-4"
              >

                <div className="w-12 h-12 flex items-center justify-center border border-[var(--tamil-border)] bg-black">
                  <span className="text-[var(--tamil-orange)] text-xl font-black">
                    M
                  </span>
                </div>

                <div className="leading-none">
                  <h2 className="text-white text-sm font-black tracking-tight">
                    MURUGESAN
                  </h2>
                  <p className="text-[var(--tamil-white-muted)] text-[10px] uppercase tracking-widest">
                    Tamil Gaming
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[var(--tamil-white-muted)] text-xs uppercase tracking-widest hover:text-[var(--tamil-orange)]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--tamil-orange)] hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#subscribe"
              className="hidden lg:flex items-center px-6 py-3 bg-[var(--tamil-orange)] text-black text-xs font-black uppercase tracking-widest hover:bg-[var(--tamil-orange-light)]"
            >
              Subscribe
            </a>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center gap-1"
            >
              <span className="h-[2px] bg-white" />
              <span className="h-[2px] bg-white" />
              <span className="h-[2px] bg-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-80 bg-[var(--tamil-black)] border-l border-[var(--tamil-border)] z-50"
            >
              <div className="p-8 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white text-sm uppercase tracking-widest hover:text-[var(--tamil-orange)]"
                  >
                    {link.name}
                  </a>
                ))}

                <a
                  href="#subscribe"
                  className="block mt-10 px-6 py-4 text-center bg-[var(--tamil-orange)] text-black font-black uppercase text-xs"
                >
                  Subscribe
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
