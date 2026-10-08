"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Lightbulb, PaperPlaneTilt, CheckCircle, WarningCircle, ArrowLeft, SpinnerGap } from "@phosphor-icons/react";
import Link from "next/link";

export default function ProposalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "Commerce",
    problem: "",
    solution: "",
    involvement: "I want to help build it",
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the form data to our API route as JSON
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({
          name: "",
          email: "",
          title: "",
          category: "Commerce",
          problem: "",
          solution: "",
          involvement: "I want to help build it",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6 pb-20">
        
        {/* Header */}
        <section className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-medium mb-6">
            <Lightbulb size={12} weight="fill" />
            <span>RFC: Request for Concepts</span>
          </div>
          <h1 className="text-3xl tracking-tighter md:text-4xl font-bold text-slate-900 mb-4">
            Pitch a Solution
          </h1>
          <p className="text-slate-500 text-lg">
            Have you noticed a broken process in Aba? A struggle in the market? A gap in logistics? Tell us.
          </p>
        </section>

        {/* The Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden relative"
        >
          {/* Decorative Top Bar */}
          {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-amber-500" /> */}

          {isSent ? (
            <div className="p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle size={32} weight="fill" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Proposal Received!</h2>
              <p className="text-slate-500 max-w-sm mb-8">
                Thank you for contributing to the ecosystem. Check your email for a confirmation (if configured).
              </p>
              <div className="flex gap-4">
                <Link href="/projects">
                  <button className="text-sm font-bold text-slate-600 hover:text-emerald-600 hover:underline flex items-center gap-1">
                    <ArrowLeft size={16} weight="fill" />
                    Back to Projects
                  </button>
                </Link>
                <button 
                  onClick={() => setIsSent(false)} 
                  className="text-sm font-bold text-emerald-600 hover:underline"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
              
              {/* Error Message Display */}
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                  <WarningCircle size={16} weight="fill" />
                  {error}
                </div>
              )}

              {/* Section 1: The Idea */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  1. The Concept
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Title
                    </label>
                    <input 
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Aba Traffic Monitor"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                    >
                      <option>Commerce & Retail</option>
                      <option>Logistics & Transport</option>
                      <option>Education</option>
                      <option>Health</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      The Problem <WarningCircle size={14} className="text-slate-400" weight="fill" />
                    </label>
                    <textarea 
                      required
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Who is struggling? Why is the current way failing?"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Proposed Solution
                    </label>
                    <textarea 
                      required
                      name="solution"
                      value={formData.solution}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Briefly describe how software could solve this..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: You */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  2. Your Involvement
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Involvement Level
                    </label>
                    <div className="grid gap-3">
                      {[
                        "I just want to suggest it",
                        "I want to help build it",
                        "I want to lead this project"
                      ].map((option) => (
                        <label key={option} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          formData.involvement === option 
                            ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500" 
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}>
                          <input 
                            type="radio" 
                            name="involvement"
                            value={option}
                            checked={formData.involvement === option}
                            onChange={handleChange}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerGap size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Proposal <PaperPlaneTilt size={18} weight="fill" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  By submitting, you agree to our Terms of Service regarding intellectual property.
                </p>
              </div>

            </form>
          )}
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}