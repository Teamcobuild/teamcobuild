"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What services does Teamcobuild offer?",
    a: "We offer end-to-end technology solutions including custom web development, mobile app development (iOS & Android), UI/UX design, cloud infrastructure, and digital marketing. We handle the full software development lifecycle from concept to deployment.",
  },
  {
    q: "How much does a typical project cost?",
    a: "Project costs vary based on scope, complexity, and timeline. We pride ourselves on delivering affordable, scalable solutions for businesses of all sizes. Reach out via our contact page for a free, no-obligation quote tailored to your needs.",
  },
  {
    q: "How long does it take to build a product?",
    a: "Timelines depend on the project type. A simple MVP can be ready in a few weeks, while a full-scale web or mobile app typically takes a few months. We provide a clear roadmap and regular progress updates throughout the build.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Absolutely. We believe every business deserves a strong tech foundation regardless of size or budget. We've partnered with early-stage startups, growing SMEs, and established enterprises across multiple industries.",
  },
  {
    q: "Can I get ongoing support after launch?",
    a: "Yes. We offer post-launch maintenance, performance monitoring, feature updates, and dedicated support plans. We build long-term relationships with our clients to ensure their products keep growing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 items-start">

        {/* Left — Heading */}
        <div className="md:sticky md:top-32">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
            Frequently Asked <br className="hidden md:block" /> Questions
          </h2>
          <p className="mt-4 text-slate-500 text-sm md:text-base leading-relaxed max-w-xs">
            Can&apos;t find your answer here? {" "}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Right — Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-colors duration-300 overflow-hidden border ${isOpen
                  ? "bg-primary border-primary text-white"
                  : "bg-slate-50 border-slate-100 text-slate-900 hover:bg-slate-100"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base md:text-lg leading-snug ${isOpen ? "text-white" : "text-slate-900"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "text-white" : "text-slate-400"}`}>
                    {isOpen
                      ? <Minus size={20} />
                      : <Plus size={20} />
                    }
                  </span>
                </button>

                {/* Answer — smooth height transition */}
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-64 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                    }`}
                >
                  <p className={`text-sm md:text-base leading-relaxed ${isOpen ? "text-white/90" : "text-slate-600"}`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
