"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ChefHat, Sparkle, Rocket, Storefront, Brain, CircleNotch, PaperPlaneRight } from "@phosphor-icons/react";

// --- Sub-Component: Order Modal (The "Waiter" taking the order) ---
const PricingFormModal = ({ isOpen, onClose, packageName }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "Not specified",
    details: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pricing", // Hitting the 'pricing' switch in your API
          data: {
            name: formData.name,
            email: formData.email,
            package: packageName,
            budget: formData.budget,
            details: formData.details
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
        {/* Modal Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wider mb-1">
              <ChefHat weight="duotone" size={16} />
              Start Cooking
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Inquiry: <span className="text-emerald-600">{packageName}</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-300 transition-colors"
          >
            <X weight="duotone" size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {isSent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce">
                <Check weight="duotone" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Received!</h3>
              <p className="text-slate-500">
                We've received your request for the <strong>{packageName}</strong>. We will review your details and send a custom quote to your email shortly.
              </p>
              <button onClick={onClose} className="mt-8 text-emerald-600 font-bold hover:underline">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Chinedu..."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range (Optional)</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option>Not specified</option>
                  <option>₦200k - ₦500k</option>
                  <option>₦500k - ₦1M</option>
                  <option>₦1M - ₦5M</option>
                  <option>₦5M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Tell us a bit about what you want to build..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <> <CircleNotch weight="duotone" size={18} className="animate-spin" /> Sending Request... </>
                ) : (
                  <> Start Discussion <PaperPlaneRight weight="duotone" size={18} /> </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Pricing Card ---
const PricingCard = ({ 
  title, 
  icon: Icon, 
  description, 
  features, 
  highlight = false,
  delay,
  onSelect // New Prop
}: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`relative flex flex-col h-full rounded-3xl p-8 border ${
      highlight 
        ? "bg-slate-900 border-slate-800 text-white shadow-2xl scale-105 z-10" 
        : "bg-white border-slate-200 text-slate-900 shadow-sm hover:border-emerald-200"
    }`}
  >
    {highlight && (
      <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
        Most Popular
      </div>
    )}

    {/* Header */}
    <div className="mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
        highlight ? "bg-slate-800 text-emerald-400" : "bg-slate-50 text-slate-600"
      }`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`text-sm ${highlight ? "text-slate-400" : "text-slate-500"}`}>
        {description}
      </p>
    </div>

    {/* The "Cooking" Price Tag */}
    <div className={`mb-8 p-4 rounded-xl border border-dashed flex items-center justify-between ${
      highlight ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"
    }`}>
      <div>
        <span className={`text-xs font-bold uppercase tracking-wider block ${
          highlight ? "text-slate-500" : "text-slate-400"
        }`}>
          Est. Cost
        </span>
        <div className="flex items-center gap-2">
          <ChefHat weight="duotone" size={20} className="text-emerald-500" />
          <span className={`text-lg font-bold font-mono ${highlight ? "text-white" : "text-slate-900"}`}>
            Cooking...
          </span>
        </div>
      </div>
    </div>

    {/* Deliverables List */}
    <div className="grow space-y-4 mb-8">
      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
        highlight ? "text-slate-500" : "text-slate-400"
      }`}>
        What's included:
      </p>
      {features.map((feature: string, idx: number) => (
        <div key={idx} className="flex items-start gap-3">
          <div className={`mt-0.5 p-0.5 rounded-full ${
            highlight ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600"
          }`}>
            <Check weight="duotone" size={12} strokeWidth={3} />
          </div>
          <span className={`text-sm ${highlight ? "text-slate-300" : "text-slate-600"}`}>
            {feature}
          </span>
        </div>
      ))}
    </div>

    {/* CTA Button - Triggers onSelect */}
    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
      highlight 
        ? "bg-emerald-500 hover:bg-emerald-400 text-slate-900" 
        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
    }`}>
      Start Discussion
      <ArrowRight weight="duotone" size={18} />
    </button>
  </motion.div>
);

export default function PricingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="grow pt-32 px-4 md:px-6">
        
        {/* 1. Header */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6">
              <Sparkle weight="duotone" size={12} className="text-emerald-600" />
              <span>Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tighter font-bold text-slate-900 mb-6">
              Menu & Deliverables
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We are currently structuring our standard packages. For now, every project gets a custom quote based on complexity. Here is a breakdown of what we typically deliver.
            </p>
          </motion.div>
        </section>

        {/* 2. Pricing Grid */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            
            <PricingCard 
              delay={0.1}
              title="Digital Presence"
              icon={Store}
              description="Perfect for local businesses needing a modern website and brand identity."
              onSelect={() => setSelectedPackage("Digital Presence")}
              features={[
                "Custom Landing Page Design",
                "Next.js High Performance Site",
                "Mobile Responsiveness",
                "Brand Style Guide",
                "Domain & Hosting Setup",
                "Google Business Profile Setup"
              ]}
            />

            <PricingCard 
              delay={0.2}
              highlight={true}
              title="MVP Build"
              icon={Rocket}
              description="For founders who need to get a functional product to market fast."
              onSelect={() => setSelectedPackage("MVP Build")}
              features={[
                "Product Strategy Workshop",
                "High-Fidelity UI/UX Design",
                "Full-Stack Dev (React/Supabase)",
                "Authentication & Database",
                "Payment Integration (Paystack)",
                "Admin Dashboard",
                "30 Days Post-Launch Support"
              ]}
            />

            <PricingCard 
              delay={0.3}
              title="Custom Engineering"
              icon={BrainCircuit}
              description="Complex systems, automations, and long-term technical partnership."
              onSelect={() => setSelectedPackage("Custom Engineering")}
              features={[
                "System Architecture Design",
                "Custom API Development",
                "Third-party Integrations",
                "Legacy System Migration",
                "Performance Optimization",
                "Dedicated Engineering Team"
              ]}
            />

          </div>
        </section>

        {/* 3. The FAQ */}
        <section className="max-w-3xl mx-auto pb-20">
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex gap-4">
            <div className="hidden md:block bg-white p-3 rounded-full h-max shadow-sm text-emerald-600">
               <ChefHat weight="duotone" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Why does it say "Cooking"?</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We believe in honest pricing. Since every problem is unique—especially in software—giving a fixed price tag often leads to cutting corners or overcharging.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We analyze your specific needs first, then give you a price that covers <strong>high-quality execution</strong> without hidden fees.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* 4. The Modal Triggered by State */}
      <AnimatePresence>
        {selectedPackage && (
          <PricingFormModal 
            isOpen={!!selectedPackage}
            onClose={() => setSelectedPackage(null)}
            packageName={selectedPackage}
          />
        )}
      </AnimatePresence>

    </div>
  );
}