"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Hammer, TerminalWindow, CircleNotch } from "@phosphor-icons/react";

interface UnderConstructionProps {
  pageName?: string; // e.g. "investors" or "careers"
  title?: string;
  description?: string;
}

export default function UnderConstruction({
  pageName = "feature",
  title = "Work in Progress!",
  description = "We are currently writing the code for this section. Check back in a few sprints."
}: UnderConstructionProps) {

  // Format page name for the "terminal command"
  const commandName = pageName.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-[70vh] md:mt-8 flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto h-[300px] w-[300px] rounded-full bg-slate-900 opacity-5 blur-[100px]" />
      </div>

      <div className="max-w-2xl w-full text-center">

        {/* 1. Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-xs font-medium mb-8"
        >
          <CircleNotch weight="duotone" size={12} className="animate-spin" />
          <span>Construction in Progress</span>
        </motion.div>

        {/* 2. The Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 text-left mx-auto mb-10 max-w-lg w-full"
        >
          {/* Terminal Header */}
          <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <TerminalWindow weight="duotone" size={10} />
              bash — 80x24
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-2">
            <div className="flex gap-2 text-slate-300">
              <span className="text-primary">➜</span>
              <span className="text-blue-400">~/Teamcobuild</span>
              <span>git checkout -b {commandName}</span>
            </div>
            <div className="text-slate-500 pl-4">Switched to a new branch '{commandName}'</div>

            <div className="flex gap-2 text-slate-300 pt-2">
              <span className="text-primary">➜</span>
              <span className="text-blue-400">~/Teamcobuild</span>
              <span>npm run build</span>
            </div>
            <div className="text-slate-500 pl-4">
              <div>Teamcobuild-web@0.1.0 build</div>
              <div>next build</div>
            </div>

            <div className="text-primary pl-4 pt-2">
              info <span className="text-slate-400">- Creating an optimized production build...</span>
            </div>
            <div className="text-primary pl-4">
              info <span className="text-slate-400">- Compiling <span className="text-white font-bold">{pageName}</span> page...</span>
            </div>

            <div className="pl-4 pt-1 flex items-center gap-1">
              <span className="w-2 h-4 bg-primary animate-pulse block" />
            </div>
          </div>
        </motion.div>

        {/* 3. Text & CTA */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl tracking-tighter font-bold text-slate-900 mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 text-lg mb-8 max-w-md mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors hover:border-primary/20">
              <ArrowLeft weight="duotone" size={18} />
              Return to Dashboard
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}