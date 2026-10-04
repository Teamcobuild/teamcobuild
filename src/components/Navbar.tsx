"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Main Navbar ---

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Services", href: "/services" },
    { title: "Projects", href: "/project" },
    { title: "About", href: "/about" },
    // { title: "Pricing", href: "/pricing" },
    { title: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-4 inset-x-0 mx-auto z-50 max-w-5xl px-4 md:px-6 transition-all duration-300",
          isOpen ? "h-auto" : "h-auto"
        )}
      >
        {/* The Glass Island Container */}
        <div
          className={cn(
            "relative flex items-center justify-between rounded-full border transition-all duration-300",
            scrolled || isOpen
              ? "bg-white border-slate-200/60 shadow-lg shadow-slate-200/20 py-3 pl-6 pr-3"
              : "bg-white  border-transparent py-3 pl-6 pr-3"
          )}
        >
          <Link href="/">
            <Image
              src="/icons/Teamcobuild.png"
              alt="Teamcobuild Logo"
              width={160}
              height={28}
            />
          </Link>

          {/* 2. Desktop Nav with Sliding Pill Animation */}
          <div className="hidden md:flex items-center gap-1 p-1 ml-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.title}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
              >
                {/* The Sliding Background Pill */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/50 -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{link.title}</span>
              </Link>
            ))}
          </div>

          {/* 3. Actions (Desktop) */}
          <Link href="/contact" className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary/90 transition-all"
            >
              Contact
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.button>
          </Link>

          {/* 4. Mobile Toggle */}
          <button
          className="md:hidden p-2 text-gray-800 z-50 relative flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
            className="block w-10 h-0.5 bg-current rounded-full origin-center"
          ></motion.span>
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
            className="block w-10 h-0.5 bg-current rounded-full origin-center"
          ></motion.span>
        </button>
           
        </div>

        {/* 5. Mobile Menu (Detached Popup style) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 md:hidden"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-2">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="h-px bg-slate-100 my-1" />
                  <Link
                    href="/contact"
                    className="flex items-center justify-between px-4 py-3 font-semibold text-white bg-secondary rounded-xl hover:bg-secondary/90 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
