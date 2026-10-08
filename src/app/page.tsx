"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Partners from "../components/partners";
import Link from "next/link";
import Hero from "../components/Hero";
import Footer from "../components/Footer";  // The Hero component we just created
import { motion } from "framer-motion";
import { Users, Code, Globe, Cpu, Database, Layout } from "lucide-react";
import FAQ from "@/components/FAQ";

// --- Sub-Component: Value Card ---
const ValueCard = ({ gifSrc, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 transition-all duration-300 flex flex-col"
  >
    <img src={gifSrc} alt={title} className="w-full h-48 object-contain mb-6 mix-blend-multiply" />
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

// --- Sub-Component: Tech Stack Item ---
const TechItem = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50/50 text-slate-600 text-sm font-medium">
    <Icon size={16} />
    <span>{label}</span>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary">

      {/* 1. Navigation (Floating) */}
      <Navbar />

      <main className="flex flex-col">

        {/* 2. Hero Section */}
        <Hero />

        <Partners />
        {/* 4. "Why CoBuild?" Values Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl tracking-tighter md:text-4xl font-bold text-slate-900 mb-4">
                Built for impact. Driven by community.
              </h2>
              <p className="text-lg text-slate-500">
                We aren't just writing code. We are establishing a standard for software engineering in Aba, focused on solving real human problems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <ValueCard
                gifSrc="/gifs/global.gif"
                title="Local Roots, Global Standard"
                description="We build solutions tailored for the Nigerian market but engineered to the quality standards of Silicon Valley."
                delay={0.1}
              />
              <ValueCard
                gifSrc="/gifs/community.gif"
                title="Community First"
                description="We believe in open knowledge. We grow by sharing what we learn, mentoring new devs, and building in public."
                delay={0.2}
              />
              <ValueCard
                gifSrc="/gifs/engineering.gif"
                title="Engineering Excellence"
                description="No shortcuts. We focus on performance, accessibility, and clean architecture in every MVP we deploy."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        <FAQ />

      </main>

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}