"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, GithubLogo, Cube, Layout, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

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
    links: { demo: "#", github: "https://github.com/Teamcobuild/qwikhelp-mobileapp" },
    image: "project-imgs/qwikhelp.png",
  },
];

// --- Sub-Component: Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles =
    {
      Live: "bg-primary/10 text-primary border-primary/20",
      Beta: "bg-accent/10 text-accent border-accent/20",
      Development: "bg-highlight/20 text-slate-800 border-highlight/40",
      Concept: "bg-slate-100 text-slate-600 border-slate-200",
    }[status] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles} inline-flex items-center gap-1.5`}
    >
      {status === "Live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}
      {status === "Development" && (
        <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
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
    whileHover={{ y: -5 }}
    className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full"
  >
    {/* Card Header / Image Area */}
    <div className="h-48 w-full relative p-6 flex flex-col justify-between overflow-hidden bg-slate-100">
      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

      <div className="flex justify-between items-start relative z-10">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
          {project.category}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links.github && (
            <a
              href={project.links.github}
              className="p-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-full hover:bg-white hover:text-primary transition-colors shadow-sm"
            >
              <GithubLogo size={16} weight="fill" />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              className="p-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-full hover:bg-white hover:text-primary transition-colors shadow-sm"
            >
              <ArrowUpRight size={16} weight="fill" />
            </a>
          )}
        </div>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
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
            className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
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
                Our Project
              </h1>
              <p className="text-lg text-slate-500 max-w-xl">
                We are building a portfolio of practical solutions. Currently, our main focus is bringing QwikHelp to life.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 2. Projects Grid */}
        <section className="max-w-7xl mx-auto mb-24">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* "Submit Idea" Card */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Layout className="text-slate-400 group-hover:text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Have an idea?
              </h3>
              <p className="text-slate-500 text-sm mt-3 mb-6 max-w-xs">
                We are always looking for new local problems to solve. Pitch us
                your concept.
              </p>
              <Link href="/contact" className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Submit Proposal <ArrowRight size={16} weight="fill" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
