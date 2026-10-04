"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { House, ArrowLeft, } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20 px-4">

        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-slate-900 opacity-5 blur-[100px]" />
        </div>

        <div className="max-w-2xl w-full text-center">


          <h2 className="text-2xl md:text-3xl mt-10 md:mt-0 font-bold text-slate-900 mb-4">
            Blueprint not found.
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">
            You've wandered into an empty lot. We haven't built this part of the infrastructure yet.
          </p>

          {/* imitation Terminal Log */}
          <div className="bg-slate-950 rounded-xl p-4 max-w-md mx-auto mb-10 text-left font-mono text-xs md:text-sm shadow-2xl border border-slate-800">
            <div className="flex gap-1.5 mb-3 pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-slate-400">
                <span className="text-primary">➜</span> ~ cobuild locate --path="{typeof window !== 'undefined' ? window.location.pathname : '/unknown'}"
              </p>
              <p className="text-red-400">Error: Route definition missing.</p>
              <p className="text-slate-500">Initiating recovery protocol...</p>
              <p className="text-slate-300 animate-pulse">_</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary transition-colors shadow-lg shadow-primary/10">
                <House size={18} />
                Return Home
              </button>
            </Link>

            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}