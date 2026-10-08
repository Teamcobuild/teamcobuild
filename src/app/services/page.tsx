"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Code, Palette, ChartLine, ArrowRight, CheckCircle, Stack, DeviceMobile, Globe } from "@phosphor-icons/react";
import Link from "next/link";

// --- Sub-Component: Service Card ---
const ServiceCard = ({ icon: Icon, title, category, image, description, tags }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full"
  >
    {/* Card Header / Image Area */}
    <div className="h-48 w-full relative p-6 flex flex-col justify-between overflow-hidden bg-slate-100">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500"></div>

      <div className="flex justify-between items-start relative z-10">
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
          <Icon size={14} className="text-primary" />
          {category}
        </div>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Tech/Tags Stack */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Sub-Component: Process Step ---
const ProcessStep = ({ number, title, text }: any) => (
  <div className="flex gap-4 relative">
    {/* Line connector */}
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0 z-10 ring-4 ring-white">
        {number}
      </div>
      <div className="w-px h-full bg-slate-200 -mt-2 pb-8 last:hidden" />
    </div>
    <div className="pb-10">
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
        {text}
      </p>
    </div>
  </div>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6">

        {/* 1. Header: The "Not Loud" Pitch */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
              Extend Your Team With Our Capabilities.
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We are primarily a product company building our own ecosystem. However, we occasionally partner with select businesses to build high-impact digital products using our internal standards.
            </p>
          </motion.div>
        </section>

        {/* 2. Services Grid */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-6">

            <ServiceCard
              icon={Code}
              // category="Engineering"
              title="Software Development"
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
              description="We build robust web and mobile applications. We don't just ship code; we ship scalable, secure, and maintainable systems."
              tags={["Web Apps", "Mobile Dev", "APIs", "SaaS MVPs"]}
            />

            <ServiceCard
              icon={Palette}
              // category="Design"
              title="Product Design & Branding"
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
              description="Functional aesthetics. We design interfaces that are intuitive for local users and craft brand identities that stand out."
              tags={["UI/UX Design", "Brand Identity", "Design Systems"]}
            />

            <ServiceCard
              icon={ChartLine}
              // category="Consulting"
              title="Technical Strategy"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              description="Not sure what to build? We help businesses analyze their processes and architect the right digital solutions to solve problems."
              tags={["Consultation", "Tech Audit", "Digitization"]}
            />

          </div>
        </section>

        {/* 3. The "Why Us" Section (Modern Bento Grid) */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              The Teamcobuild Standard.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Most agencies outsource their work or cut corners. We don't. When you work with us, your product is built by the same engineers building our core startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)]">

            {/* Main Promise - Dark Card */}
            <div className="md:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden flex flex-col justify-between group">
              <div className="relative z-10 mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-lg">
                  Quality without compromise.<br /> No shortcuts.
                </h3>
              </div>

              <div className="relative z-10 grid sm:grid-cols-2 gap-6">
                {[
                  "Code ownership remains with you",
                  "Accessibility and Performance first",
                  "Transparent, weekly sprint updates",
                  "Post-launch support options"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={16} className="text-primary" weight="fill" />
                    </div>
                    <span className="text-slate-300 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Step 1 */}
            <div className="md:col-span-4 bg-primary/10 border border-primary/20 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group hover:bg-primary/20 transition-all duration-300">
              <div className="text-8xl font-black text-primary/10 absolute -top-6 -right-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">1</div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Discovery</h4>
              <p className="text-slate-700 relative z-10 leading-relaxed">
                We deep dive into your business logic to understand exactly what needs to be solved.
              </p>
            </div>

            {/* Process Step 2 */}
            <div className="md:col-span-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group  transition-all duration-300 hover:border-slate-200">
              <div className="text-8xl font-black text-slate-200/50 absolute -top-6 -right-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">2</div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Build & Iterate</h4>
              <p className="text-slate-500 relative z-10 max-w-md leading-relaxed">
                Rapid development cycles. You see progress every single week, not just at the end of the project. We adapt on the fly.
              </p>
            </div>

            {/* Process Step 3 */}
            <div className="md:col-span-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group  transition-all duration-300 hover:border-slate-200">
              <div className="text-8xl font-black text-slate-200/50 absolute -top-6 -right-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">3</div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Handover & Launch</h4>
              <p className="text-slate-500 relative z-10 max-w-md leading-relaxed">
                We deploy your product seamlessly and hand over perfectly clean, documented code and assets.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}