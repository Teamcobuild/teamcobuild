"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Partners from "../components/partners";
import Link from "next/link";
import Hero from "../components/Hero";
import Footer from "../components/Footer";  // The Hero component we just created
import { motion } from "framer-motion";
import { Users, Code, Globe, Cpu, Database, Layout } from "lucide-react";

// --- Sub-Component: Value Card ---
const ValueCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
      <Icon size={24} />
    </div>
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

        {/* 3. Tech Stack Strip (Infinite scroll vibe) */}
        <section className="w-full border-y border-slate-100 py-8 bg-slate-50/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Our Engineering Foundation
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 opacity-70">
              <TechItem icon={Code} label="Next.js" />
              <TechItem icon={Code} label="ReactNative" />
              <TechItem icon={Code} label="TypeScript" />
              <TechItem icon={Code} label="Python" />
              <TechItem icon={Layout} label="Tailwind CSS" />
              <TechItem icon={Database} label="NodeJs" />
              <TechItem icon={Layout} label="Figma" />
            </div>
          </div>
        </section>

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
                icon={Globe}
                title="Local Roots, Global Standard"
                description="We build solutions tailored for the Nigerian market but engineered to the quality standards of Silicon Valley."
                delay={0.1}
              />
              <ValueCard
                icon={Users}
                title="Community First"
                description="We believe in open knowledge. We grow by sharing what we learn, mentoring new devs, and building in public."
                delay={0.2}
              />
              <ValueCard
                icon={Cpu}
                title="Engineering Excellence"
                description="No shortcuts. We focus on performance, accessibility, and clean architecture in every MVP we deploy."
                delay={0.3}
              />
            </div>
          </div>
        </section>
        <Partners />
        {/* 5. Pre-Launch CTA */}
        <section className="px-4 md:px-6 pb-20">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-slate-900 to-slate-900 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Join the build process.
              </h2>
              <p className="text-slate-300 text-lg max-w-xl mb-8">
                We are currently in the ideation and development phase. Follow us on GitHub to see what we are cooking up next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://github.com/CobuildDev" className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full transition-colors">
                  View GitHub Organization
                </Link>
                <Link href="/contact" className="px-8 py-3 bg-transparent border border-slate-700 text-white hover:bg-slate-800 font-medium rounded-full transition-colors">
                  Contact the Team
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}