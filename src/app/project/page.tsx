"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Layers, Info, Zap, Box, Layout, GitBranch, FlaskConical, ArrowRight } from "lucide-react";

// --- Projects ---
const PROJECTS = [
  {
    id: 1,
    title: "QwikHelp",
    category: "Commerce",
    status: "Development",
    description:
      "QwikHelp is a multi-service digital platform that connects people who need everyday help with trusted individuals who can provide it, within their local area.",
    tech: ["Next.js", "Mongodb Atlas", "Figma"],
    links: { demo: "#", github: "#" },
    image: "bg-gradient-to-br from-blue-500 to-cyan-400", // Placeholder for an actual image
  },
  {
    id: 2,
    title: "Oba",
    category: "Commerce",
    status: "Development",
    description:
      "e-commerce platform specialy for groccery shopping only and directly from verifed farmers to ensure security and freshness.",
    tech: ["ReactNative", "Mapbox", "Supabase"],
    links: { github: "#" }, // No demo yet
    image: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
  {
    id: 3,
    title: "EduLink Local",
    category: "Education",
    status: "Concept",
    description:
      "Peer-to-peer learning platform connecting university students with local secondary school students for mentorship.",
    tech: ["React", "Node.js"],
    links: {}, // Concept stage
    image: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Constitui",
    category: "Education",
    status: "Concept",
    description:
      "A tool to help you write a 'Personal Constitution' for your life. Instead of just a to-do list, you actually talk to the AI about your values and fears. It takes that big, scary future and breaks it down into years, months, and finally, just what you need to do today.",
    tech: ["NextJs", "Tailwind", "RAG Models"],
    links: {},
    image: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
];

// --- Sub-Component: Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles =
    {
      Live: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Beta: "bg-blue-100 text-blue-700 border-blue-200",
      Development: "bg-amber-100 text-amber-700 border-amber-200",
      Concept: "bg-slate-100 text-slate-600 border-slate-200",
    }[status] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles} inline-flex items-center gap-1.5`}
    >
      {status === "Live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {status === "Development" && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      )}
      {status}
    </span>
  );
};

// --- Sub-Component: Project Card ---
const ProjectCard = ({ project }: { project: any }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -5 }}
    className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 transition-all duration-300 flex flex-col h-full"
  >
    {/* Card Header / Image Area */}
    <div
      className={`h-48 w-full ${project.image} relative p-6 flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
          {project.category}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links.github && (
            <a
              href={project.links.github}
              className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Decorative Icon (Abstract) */}
      <div className="absolute right-4 bottom-4 text-white/20 transform rotate-12 scale-150 pointer-events-none">
        <Box size={80} />
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
        {project.tech.map((t: string) => (
          <span
            key={t}
            className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "Commerce",
    "Logistics",
    "Education",
    "Open Source",
  ];

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900    flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6">
        {/* 1. Header Section */}
        <section className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              
              <h1 className="text-4xl md:text-5xl tracking-tighter font-bold text-slate-900 mb-4">
                Our Projects
              </h1>
              <p className="text-lg text-slate-500 max-w-xl">
                We are building a portfolio of practical solutions. Some are
                experiments, some are MVPs, and some are ready for the world.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 2. Projects Grid */}
        <section className="max-w-7xl mx-auto mb-24">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>

            {/* "Submit Idea" Card (Always visible or conditionally) */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Layout className="text-slate-400 group-hover:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Have an idea?
              </h3>
              <p className="text-slate-500 text-sm mt-3 mb-6 max-w-xs">
                We are always looking for new local problems to solve. Pitch us
                your concept.
              </p>
              <button className="text-sm font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Submit Proposal <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Open Source Strip */}
        <section className="max-w-7xl mx-auto pb-20">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="text-emerald-400" />
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">
                  Open Source
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                We build in public.
              </h2>
              <p className="text-slate-400 max-w-md">
                All our internal tools, boilerplates, and UI kits are available
                on GitHub. We believe in growing the Aba tech ecosystem by
                sharing code.
              </p>
              <div className="flex opacity-40 mt-4 items-center gap-3 mb-4">
                <Info className="text-emerald-400" />
                <span className="text-emerald-400 font-bold tracking-widest text-xs">
                  Not yet available!
                </span>
              </div>
            </div>

            <div className="relative z-10 flex gap-4">
              <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <Github size={20} />
                GitHub Org
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
