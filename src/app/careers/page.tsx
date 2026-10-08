"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Cpu, Handshake, Terminal, X, SpinnerGap, CheckCircle, Link as LinkIcon } from "@phosphor-icons/react";

// --- Data: Open Roles ---
const ROLES = [
  {
    id: 1,
    title: "Founding Frontend Engineer",
    type: "Equity / Part-time",
    location: "Remote / Aba",
    department: "Engineering",
    description: "We need a React specialist who breathes Next.js and Tailwind. You will own the frontend architecture of our flagship commerce MVP.",
    stack: ["React", "TypeScript", "Framer Motion"]
  },
  {
    id: 2,
    title: "Product Designer (UI/UX)",
    type: "Project-based",
    location: "Remote",
    department: "Design",
    description: "Translate complex local logistics problems into clean, accessible interfaces. We value function over flash.",
    stack: ["Figma", "Design Systems", "Prototyping"]
  },
  {
    id: 3,
    title: "Community Advocate",
    type: "Volunteer",
    location: "Aba, Nigeria",
    department: "Community",
    description: "Help us organize local meetups (GDG/LinkedIn Local) and build the tech ecosystem on the ground in Aba.",
    stack: ["Events", "Social Media", "Public Speaking"]
  }
];

// --- Sub-Component: Application Modal ---
const ApplicationModal = ({ isOpen, onClose, roleTitle }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    link: "",
    coverLetter: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "job", // Switches to the 'Job' template in your API
          data: {
            role: roleTitle,
            ...formData
          }
        }),
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wider mb-1">
              <Terminal size={16} weight="fill" />
              Application
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {roleTitle}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-300 transition-colors"
          >
            <X size={16} weight="fill" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {isSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce">
                <CheckCircle size={32} weight="fill" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Sent!</h3>
              <p className="text-slate-500 mb-8">
                We've received your pitch. We'll review your links and get back to you if there's a fit.
              </p>
              <button onClick={onClose} className="text-emerald-600 font-bold hover:underline">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Chinedu..."
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <LinkIcon size={14} weight="fill" /> Link to CV / Portfolio / GitHub
                </label>
                <input 
                  required
                  type="url"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Why do you want to join?</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Tell us about what you've built before..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? <SpinnerGap size={18} className="animate-spin" /> : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Role Card ---
const RoleCard = ({ role, index, onClick }: { role: any, index: number, onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden cursor-pointer active:scale-[0.98]"
  >
    <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
       <ArrowRight className="text-emerald-500 -translate-x-4 group-hover:translate-x-0 transition-transform duration-300" />
    </div>

    <div className="mb-4">
      <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter mb-2 block">
        {role.department}
      </span>
      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
        {role.title}
      </h3>
    </div>

    <div className="flex flex-wrap gap-3 mb-6 text-sm text-slate-500">
      <div className="flex items-center gap-1.5">
        <Briefcase size={14} weight="fill" />
        {role.type}
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin size={14} weight="fill" />
        {role.location}
      </div>
    </div>

    <p className="text-slate-600 text-sm leading-relaxed mb-6">
      {role.description}
    </p>

    <div className="flex gap-2">
      {role.stack.map((tech: string) => (
        <span key={tech} className="bg-slate-50 text-slate-500 text-xs px-2 py-1 rounded border border-slate-100">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- Sub-Component: Culture Value ---
const CultureValue = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4 items-start">
    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6">
        
        {/* 1. Hero Section */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6">
              <Users size={12} className="text-emerald-600" weight="fill" />
              <span>Join the Core Team</span>
            </div>
            <h1 className="text-4xl tracking-tighter md:text-5xl font-bold text-slate-900 mb-6">
              Don't just get a job. <br className="hidden md:block" />
              <span className="text-emerald-600">Build a legacy.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We are in the "garage phase." We can't offer big corporate perks yet, but we can offer equity, autonomy, and the chance to build the foundational tech layer for Aba.
            </p>
          </motion.div>
        </section>

        {/* 2. Culture / Why Join? */}
        <section className="max-w-5xl mx-auto mb-24">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">The Builder's Manifesto</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <CultureValue 
                icon={Cpu}
                title="Engineering First"
                desc="We are led by engineers, not marketing. We prioritize clean code, documentation, and scalable architecture over hype."
              />
              <CultureValue 
                icon={Users}
                title="Local Impact"
                desc="Your code will directly affect how people in your city trade, learn, and move. We solve problems you can see out your window."
              />
              <CultureValue 
                icon={Handshake}
                title="Ownership"
                desc="We are looking for partners, not just employees. Early members get significant equity stakes in what we build."
              />
              <CultureValue 
                icon={Clock}
                title="Async & Flexible"
                desc="We don't care about 9-to-5. We care about shipping. Work when you feel most creative."
              />
            </div>
          </div>
        </section>

        {/* 3. Open Roles Grid */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Open Positions</h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {ROLES.length} active roles
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map((role, idx) => (
              <RoleCard 
                key={role.id} 
                role={role} 
                index={idx} 
                onClick={() => setSelectedRole(role.title)}
              />
            ))}
            
            {/* "General Application" Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedRole("General Application")}
              className="bg-slate-900 rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98] transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                   <Terminal size={20} weight="fill" />
                </div>
                <h3 className="text-xl font-bold mb-2">Role not listed?</h3>
                <p className="text-slate-400 text-sm">
                  If you are a talented builder (Backend, Mobile, Marketing), pitch us. We create roles for the right people.
                </p>
              </div>
              
              <button className="mt-8 w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                Pitch Yourself
              </button>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />

      {/* 4. Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <ApplicationModal 
            isOpen={!!selectedRole}
            roleTitle={selectedRole}
            onClose={() => setSelectedRole(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}