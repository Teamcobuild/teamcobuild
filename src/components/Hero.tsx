"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">

        {/* 1. Status Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Building from Aba, Nigeria
        </motion.div> */}

        {/* 2. Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-700 max-w-4xl mb-6"
        >
          Solving local problems with world-class software.
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed"
        >
          We are Teamcobuild. A community-centered collective engineering the
          digital infrastructure for our city and beyond. We build products that matter.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/project"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-secondary px-8 font-medium text-white transition-all duration-300 hover:bg-secondary/90 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20"
          >
            <span className="mr-2">Explore Our Projects</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="https://github.com/CobuildDev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white border border-slate-200 px-8 font-medium text-slate-900 transition-all duration-300 hover:bg-slate-50 hover:scale-105 hover:shadow-lg"
          >
            {/* <GithubLogo weight="duotone" size={18} className="mr-2" /> */}
            <span>Star on GitHub</span>
          </Link>
        </motion.div>

        {/* 5. Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative mt-20 w-full max-w-5xl"
        >
          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/hero-illustration.png"
              alt="Teamcobuild Hero Illustration"
              width={1400}
              height={1000}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}