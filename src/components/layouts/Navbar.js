// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "#home" },
//     { name: "Videos", href: "#videos" },
//     { name: "Gallery", href: "#gallery" },
//     { name: "About", href: "#about" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled
//             ? "bg-[#2F312F]/95 backdrop-blur-xl border-b border-[#F65900]/20 shadow-lg shadow-[#F65900]/10"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="container mx-auto px-6 lg:px-12">
//           <div className="flex items-center justify-between h-20">
            
//             {/* Logo */}
//             <motion.a
//               href="#home"
//               className="flex items-center gap-3 group"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="relative w-12 h-12 bg-[#F65900] flex items-center justify-center overflow-hidden">
//                 {/* Corner accents */}
//                 <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
//                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
                
//                 <span className="text-white font-black text-xl">M</span>
//               </div>
//               <div>
//                 <h2 className="text-white font-black text-xl tracking-tight leading-none">
//                   MURUGESAN
//                 </h2>
//                 <p className="text-[#F65900] text-xs font-semibold tracking-wider uppercase">
//                   Gaming
//                 </p>
//               </div>
//             </motion.a>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navLinks.map((link, index) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   className="relative text-white font-semibold text-sm uppercase tracking-wider hover:text-[#F65900] transition-colors group"
//                 >
//                   {link.name}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F65900] group-hover:w-full transition-all duration-300" />
//                 </motion.a>
//               ))}
//             </div>

//             {/* CTA Button (Desktop) */}
//             <motion.a
//               href="#subscribe"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="hidden lg:flex items-center gap-2 px-6 py-3 bg-[#F65900] hover:bg-[#F65900]/90 text-white font-bold text-sm uppercase tracking-wide transition-all relative overflow-hidden group"
//             >
//               <motion.div
//                 className="absolute inset-0 bg-[#FF7020]"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <svg
//                 className="w-5 h-5 relative z-10"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//               </svg>
//               <span className="relative z-10">Subscribe</span>
              
//               {/* Corner accents */}
//               <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white opacity-50" />
//               <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white opacity-50" />
//             </motion.a>

//             {/* Mobile Menu Button */}
//             <motion.button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
//               whileTap={{ scale: 0.9 }}
//             >
//               <motion.span
//                 animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
//                 className="w-6 h-0.5 bg-white transition-all"
//               />
//               <motion.span
//                 animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
//                 className="w-6 h-0.5 bg-white transition-all"
//               />
//               <motion.span
//                 animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
//                 className="w-6 h-0.5 bg-white transition-all"
//               />
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="fixed inset-0 bg-[#2F312F]/90 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="fixed top-0 right-0 bottom-0 w-80 bg-[#2F312F] border-l border-[#F65900]/30 z-50 lg:hidden overflow-y-auto"
//             >
//               <div className="p-8">
//                 {/* Close button area */}
//                 <div className="h-20 flex items-center justify-end mb-8">
//                   <button
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="text-[#4B4A4A] hover:text-white transition-colors"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Mobile Nav Links */}
//                 <div className="space-y-1 mb-8">
//                   {navLinks.map((link, index) => (
//                     <motion.a
//                       key={link.name}
//                       href={link.href}
//                       initial={{ opacity: 0, x: 50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="block px-4 py-4 text-white hover:text-[#F65900] hover:bg-[#F65900]/10 font-semibold text-lg uppercase tracking-wide border-b border-[#4B4A4A]/30 transition-all"
//                     >
//                       {link.name}
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* Mobile CTA */}
//                 <motion.a
//                   href="#subscribe"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.5 }}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#F65900] hover:bg-[#F65900]/90 text-white font-bold text-sm uppercase tracking-wide transition-all relative overflow-hidden"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                   </svg>
//                   Subscribe Now
//                 </motion.a>

//                 {/* Social Links */}
//                 <div className="mt-12 pt-8 border-t border-[#4B4A4A]/30">
//                   <p className="text-[#4B4A4A] text-xs uppercase tracking-widest mb-4">
//                     Follow Murugesan
//                   </p>
//                   <div className="flex gap-4">
//                     {[
//                       { name: "Y", label: "YouTube" },
//                       { name: "T", label: "Twitter" },
//                       { name: "I", label: "Instagram" }
//                     ].map((social) => (
//                       <a
//                         key={social.name}
//                         href={`#${social.label.toLowerCase()}`}
//                         className="w-10 h-10 flex items-center justify-center bg-[#4B4A4A]/20 hover:bg-[#F65900] border border-[#4B4A4A]/30 hover:border-[#F65900] transition-all"
//                       >
//                         <span className="text-white text-xs font-bold">{social.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "Home", href: "#home" },
    { name: "Videos", href: "#videos" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "bg-[var(--tamil-black)]/90 backdrop-blur-xl border-b border-[var(--tamil-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
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
            </motion.a>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-[var(--tamil-white-muted)] text-xs uppercase tracking-widest hover:text-[var(--tamil-orange)]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--tamil-orange)] hover:w-full transition-all duration-300" />
                </a>
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
