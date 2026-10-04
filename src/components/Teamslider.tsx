"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GithubLogo, LinkedinLogo, TwitterLogo, Lightning, ArrowRight } from "@phosphor-icons/react";

// team members
const TEAM_DATA = [
  {
    id: 1,
    name: "Emeka Victor",
    role: "Founder",
    image:
      "team/emekavictor.png",
    bio: "Fullstack Developer and Computer Engineer, obsessed with scalable architecture.",
    socials: { twitter: "https://x.com/devemmy001_", github: "https://github.com/dev-emmy001", linkedin: "https://www.linkedin.com/in/victor-chukwuemeka-a70156310/" },
  },
  {
    id: 2,
    name: "Nwabueze",
    role: "Lead Product Designer",
    image:
      "team/nwabueze.avif",
    bio: "Crafting intuitive interfaces that solve real problems.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Christabel Chijioke",
    role: "Marketing and Publicity Team Lead",
    image:
      "team/christabel.avif",
    // bio: "Ensuring 99.9% uptime and database integrity.",
    socials: { linkedin: "#" },
  },
  {
    id: 4,
    name: "Chidinma Innocent",
    role: "Client Relationship Executive",
    image:
      "team/nancy.avif",
    // bio: "Connecting the dots between tech and the people.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: 5,
    name: "Prosper Alex",
    role: "Content Writer",
    image:
      "team/alex.avif",
    // bio: "Pixel perfectionist and React enthusiast.",
    socials: { github: "#", twitter: "#" },
  },
  // Special "Hiring" Card
  {
    id: 99,
    type: "hiring",
  },
];

// Individual Card
const Card = ({ member }: { member: any }) => {
  // Render Hiring Card
  if (member.type === "hiring") {
    return (
      <a href="/careers">
        <div className="min-w-[280px] h-[420px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all group">
          <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <Lightning weight="duotone" className="text-slate-400 group-hover:text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">You?</h3>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            We are looking for builders.
            <br />
            Join the collective.
          </p>
        </div>
      </a>
    );
  }

  // Render Member Card
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group w-2 relative min-w-[280px] h-[420px] rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="h-[280px] w-full relative overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Social Overlay Buttons */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          {member.socials?.github && (
            <a
              href={member.socials.github}
              className="p-2 bg-white/90 text-slate-900 rounded-full hover:bg-white hover:text-black transition-colors shadow-lg"
            >
              <GithubLogo weight="duotone" size={16} />
            </a>
          )}
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              className="p-2 bg-white/90 text-slate-900 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors shadow-lg"
            >
              <LinkedinLogo weight="duotone" size={16} />
            </a>
          )}
          {member.socials?.twitter && (
            <a
              href={member.socials.twitter}
              className="p-2 bg-white/90 text-slate-900 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
            >
              <TwitterLogo weight="duotone" size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
          {member.role}
        </p>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Slider Component ---
export default function TeamSlider() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      // Calculate draggable width: ScrollWidth - VisibleWidth
      // We add a small buffer (50px) to ensure the last card is fully reachable
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth + 50
      );
    }
  }, []);

  return (
    <div className="w-full relative">
      {/* Header / Controls Hint */}
      <div className="flex items-center justify-end px-4 md:px-0 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest select-none">
          Drag to explore <ArrowRight weight="duotone" size={14} />
        </div>
      </div>

      {/* The Draggable Area */}
      <motion.div
        ref={carouselRef}
        className="cursor-grab active:cursor-grabbing overflow-hidden py-4 -my-4 px-4 md:px-0" // Negative margin hack to prevent shadow clipping
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-6 w-max"
        >
          {TEAM_DATA.map((member) => (
            <Card key={member.id} member={member} />
          ))}
        </motion.div>
      </motion.div>

      {/* Optional: Left/Right Fade Gradient to indicate more content */}
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
