"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Zap, MapPin, ArrowRight, Code, Heart } from "lucide-react";
// import TeamSlider from "../../components/Teamslider";


// --- Sub-Component: Stat Item ---
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{label}</div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="grow pt-32 px-4 md:px-6">

        {/* 1. Hero / Manifesto */}
        <section className="max-w-5xl mx-auto mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tighter">
              We are engineering the <br className="hidden md:block" />
              digital infrastructure for our city.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Teamcobuild is not just a software company; it is a movement. We are a collective of designers, engineers, and thinkers obsessed with solving foundational local problems using global-standard technology.
            </p>
          </motion.div>
        </section>

        {/* 2. The Mission Grid */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left: The Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between min-h-100"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">The Long-Term View</h3>
                <p className="text-slate-300 leading-relaxed mb-8">
                  We aren't interested in quick flips. We are building for the next decade. Our goal is to create a sustainable ecosystem where software solves real logistics, commerce, and community challenges in Nigeria.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium">
                  <span className="h-px w-8 bg-accent" />
                  Building for 2035
                </div>
              </div>
            </motion.div>

            {/* Right: The Method */}
            <div className="grid gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col justify-center h-full"
              >
                <div className="flex items-center gap-3 mb-3 text-primary font-bold text-xl">
                  <Code size={24} />
                  <span>Engineering Excellence</span>
                </div>
                <p className="text-primary/80">
                  We treat every MVP like mission-critical software. Clean code, scalable architecture, and thoughtful UX are our non-negotiables.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center h-full shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3 text-slate-900 font-bold text-xl">
                  <Heart size={24} className="text-red-500" />
                  <span>Community Centered</span>
                </div>
                <p className="text-slate-500">
                  We don't build in a vacuum. We build with, and for, the people around us. Our growth is tied to the growth of the Aba tech ecosystem.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. The Team (Abstract representation for now) */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Builders</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A small, focused team of contributors turning caffeine into code and chaos into structure.
            </p>
          </div>
          {/* <TeamSlider /> */}
        </section>

        {/* 4. Stats / Roadmap (Simple Horizontal Strip) */}
        <section className="w-full bg-slate-50 border-y border-slate-200 py-16 mb-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="0%" label="Revenue Focused" />
            <StatItem value="100%" label="Product Focused" />
            <StatItem value="3+" label="Active MVPs" />
            <StatItem value="∞" label="Possibilities" />
          </div>
        </section>

      </main>

      <Footer />
    </div >
  );
}
