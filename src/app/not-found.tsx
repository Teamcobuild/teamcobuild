"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { House, ArrowLeft } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20 px-4">

        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-slate-900 opacity-5 blur-[100px]" />
        </div>

        <div className="max-w-2xl w-full text-center flex flex-col items-center">

          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src="/error-404.svg"
            alt="Page not found illustration"
            className="w-full max-w-lg mx-auto mb-8"
          />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* <Link href="/">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary transition-colors shadow-lg shadow-primary/10">
                <House size={18} />
                Return Home
              </button>
            </Link> */}

            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft size={18} weight="fill" />
              Go Back
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12"
          >
            <a
              href="https://storyset.com/web"
              className="text-[10px] text-slate-200 hover:text-slate-300 transition-colors opacity-50 select-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web illustrations by Storyset
            </a>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}