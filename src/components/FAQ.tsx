"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs = [
  {
    q: "What is Teamcobuild's core mission?",
    a: "We are a community-centered software startup based in Aba, Nigeria. Our core mission is to build practical digital solutions that solve local problems and empower communities through accessible technology.",
  },
  {
    q: "How does Teamcobuild empower the local community?",
    a: "We believe in the power of homegrown talent. We focus on hiring, training, and collaborating with local tech enthusiasts and businesses in Aba and across Nigeria, ensuring the technology we build directly benefits the people around us.",
  },
  {
    q: "What kind of solutions do you build?",
    a: "We build everything from custom web and mobile applications to full-scale digital infrastructure. Our priority is always on practical, scalable solutions that address real-world challenges faced by startups, SMEs, and everyday users.",
  },
  {
    q: "Do you only work with clients in Aba?",
    a: "Not at all! While our roots and heart are firmly planted in Aba, our digital solutions serve clients across Nigeria and globally. We pride ourselves on delivering world-class technology from our local hub.",
  },
  {
    q: "How can I get involved or partner with you?",
    a: "We are always eager to collaborate with passionate builders, innovators, and businesses. You can reach out to us via our contact page to discuss project ideas, partnerships, or joining our community initiatives.",
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
                      ? <Minus size={20} weight="fill" />
                      : <Plus size={20} weight="fill" />
                    }
                  </span>
                </button>

                {/* Answer — smooth height transition */}
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-64 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                    }`}
                >
                  <p className={`text-sm md:text-base leading-relaxed ${isOpen ? "text-white" : "text-slate-600"}`}>
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
