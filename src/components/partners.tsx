"use client";
import React from "react";
import Image from "next/image";

// --- Configuration ---
const LOGOS = [
  { name: "Partner 2", src: "/partners/blutech.png" },
  { name: "Partner 1", src: "/partners/opay.png" },
  { name: "Partner 4", src: "/partners/ighub.webp" },
  { name: "Partner 5", src: "/partners/kingdesigns.png" },
  // { name: "Partner 9", src: "/partners/openquanta.png" },
];

export default function Partners() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* <h2 className="font-semibold text-3xl text-black mb-10">
          Building With The Best
        </h2> */}

        {/* Static Grid Container */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-20">
          {LOGOS.map((logo, index) => (
            <div
              key={index}
              className="relative w-32 h-16 flex-shrink-0 opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                sizes="140px"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
