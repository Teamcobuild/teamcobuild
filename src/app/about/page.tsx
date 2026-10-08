"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Lightning, MapPin, ArrowRight, Code, Heart, GlobeHemisphereWest } from "@phosphor-icons/react";
import Image from "next/image";

// --- Sub-Component: Stat Item ---
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col border-l-2 border-primary/20 pl-6">
    <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{value}</div>
    <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">{label}</div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="grow pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full">

        {/* 1. Hero Section (Split Layout with Image) */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-8 border border-primary/20">
              <GlobeHemisphereWest size={16} weight="fill" />
              <span>Our Story</span>
            </div> */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
              Engineering The <br />
              <span className="text-primary">Digital Future</span> <br />
              Of Our City!
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed mb-10">
              Teamcobuild is a collective of designers, engineers, and thinkers obsessed with solving foundational local problems using global-standard technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-200"
          >
            {/* Image Space */}
            <img
              src="team/about-hero.jpg"
              alt="Team collaborating"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </section>

        {/* 2. Stats Strip (Redesigned without shadows, strong borders) */}
        {/* <section className="mb-32">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              <StatItem value="0%" label="Revenue Focus" />
              <StatItem value="100%" label="Product Focus" />
              <StatItem value="3+" label="Active MVPs" />
              <StatItem value="∞" label="Possibilities" />
            </div>
          </div>
        </section> */}

        {/* 3. The Mission Grid (Images included, no shadows) */}
        <section className="mb-32">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Our DNA</h2>
              <p className="text-lg text-slate-500 font-medium max-w-xl">What drives us to build, iterate, and launch products that matter.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mission Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col lg:flex-row gap-10 overflow-hidden relative"
            >
              <div className="flex-1 flex flex-col justify-center z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                  <Target className="text-primary" size={28} weight="fill" />
                </div>
                <h3 className="text-3xl font-bold mb-4">The Long-Term View</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We aren't interested in quick flips. We are building for the next decade. Our goal is to create a sustainable ecosystem where software solves real logistics, commerce, and community challenges.
                </p>
              </div>
              <div className="flex-1 relative min-h-[250px] rounded-[1.5rem] overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                  alt="Long term view"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Mission Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary/10 border border-primary/20 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 text-primary">
                  <Code size={28} weight="fill" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Engineering Excellence</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  We treat every MVP like mission-critical software. Clean code, scalable architecture, and thoughtful UX are our non-negotiables.
                </p>
              </div>
            </motion.div>

            {/* Mission Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-8 text-red-500 border border-red-100">
                  <Heart size={28} weight="fill" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Community Centered</h3>
                <p className="text-slate-600 leading-relaxed">
                  We don't build in a vacuum. We build with, and for, the people around us. Our growth is tied to the ecosystem's growth.
                </p>
              </div>
            </motion.div>

            {/* Image Card for visual balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 relative min-h-[300px] rounded-[2rem] overflow-hidden border border-slate-200"
            >
              <img
                src="team/community-people.jpg"
                alt="Team working together"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white max-w-lg">Building solutions that scale with our ambitions.</h3>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
