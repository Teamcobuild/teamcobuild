"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Code, Palette, LineChart, ArrowRight, CheckCircle, Layers, Smartphone, Globe } from "lucide-react";
import Link from "next/link";

// --- Sub-Component: Service Card ---
const ServiceCard = ({ icon: Icon, title, description, tags }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 transition-all duration-300 h-full flex flex-col"
  >
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 mb-6 border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors">
      <Icon size={24} />
    </div>

    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed mb-6 flex-grow">
      {description}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag: string) => (
        <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-medium border border-slate-100">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- Sub-Component: Process Step ---
const ProcessStep = ({ number, title, text }: any) => (
  <div className="flex gap-4 relative">
    {/* Line connector (hide for last item if you want, but CSS works too) */}
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
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6">

        {/* 1. Header: The "Not Loud" Pitch */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6">
              <Layers size={12} className="text-emerald-600" />
              <span>Engineering Partnerships</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
              Extend your team with <br className="hidden md:block" />
              <span className="text-emerald-600">our capabilities.</span>
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
              title="Software Development"
              description="We build robust web and mobile applications. We don't just ship code; we ship scalable, secure, and maintainable systems."
              tags={["Web Apps", "Mobile Dev", "APIs", "SaaS MVPs"]}
            />

            <ServiceCard
              icon={Palette}
              title="Product Design & Branding"
              description="Functional aesthetics. We design interfaces that are intuitive for local users and craft brand identities that stand out."
              tags={["UI/UX Design", "Brand Identity", "Design Systems"]}
            />

            <ServiceCard
              icon={LineChart}
              title="Technical Strategy"
              description="Not sure what to build? We help businesses analyze their processes and architect the right digital solutions to solve problems."
              tags={["Consultation", "Tech Audit", "Digitization"]}
            />

          </div>
        </section>

        {/* 3. The "Why Us" Section (Split Layout) */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="bg-slate-50 rounded-[40px] p-8 md:p-16 border border-slate-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left: The Promise */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  The Teamcobuild Standard.
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Most agencies outsource their work or cut corners. We don't. When you work with us, your product is built by the same engineers building our core startups.
                </p>

                <ul className="space-y-4">
                  {[
                    "Code ownership remains with you",
                    "Accessibility and Performance first",
                    "Transparent, weekly sprint updates",
                    "Post-launch support options"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: The Process (Visual) */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-[60px] opacity-50 pointer-events-none" />

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">How we work</h3>

                <div className="flex flex-col">
                  <ProcessStep
                    number="1"
                    title="Discovery"
                    text="We deep dive into your business logic to understand exactly what needs to be solved."
                  />
                  <ProcessStep
                    number="2"
                    title="Build & Iterate"
                    text="Rapid development cycles. You see progress every week, not just at the end."
                  />
                  <ProcessStep
                    number="3"
                    title="Handover"
                    text="We deploy your product and hand over clean, documented code and assets."
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Soft CTA */}
        <section className="max-w-3xl mx-auto text-center pb-20 px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Have a project in mind?
          </h2>
          <p className="text-slate-500 mb-8">
            We take on a limited number of client projects per quarter to ensure quality.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-emerald-600 transition-colors">
            Start a Conversation
            <ArrowRight size={18} />
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}