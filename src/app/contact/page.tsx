"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact", // Switches to the 'Contact' template in your API
          data: formData
        }),
      });

      if (response.ok) {
        setIsSent(true);
        // Optional: Reset form
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-6 relative">

        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-10 blur-[100px]" />
          <div className="absolute left-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-500 opacity-10 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl tracking-tighter md:text-5xl font-bold text-slate-900 mb-6"
            >
              Let's build something together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500"
            >
              Whether you have a project idea, want to join the collective, or just want to chat about the future of tech in Aba — we are all ears.
            </motion.p>
          </div>

          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-5 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
          >

            {/* Left Column: Info & Context (2/5 width) */}
            <div className="lg:col-span-2 bg-slate-50/50 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Email us</p>
                      <a href="mailto:cobuildofficial@hotmail.com" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">cobuildofficial@hotmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Headquarters</p>
                      <p className="text-slate-500 text-sm">Aba, Abia State, Nigeria</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100/50 text-emerald-700 text-[10px] font-medium border border-emerald-100">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Operating Remotely
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Community</p>
                      <p className="text-slate-500 text-sm mb-2">Join the conversation.</p>
                      <div className="flex gap-3">
                        {/* Social placeholders */}
                        <div className="w-8 h-8 rounded bg-slate-200/50 hover:bg-emerald-100 transition-colors cursor-pointer" />
                        <div className="w-8 h-8 rounded bg-slate-200/50 hover:bg-emerald-100 transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <blockquote className="text-slate-500 text-sm italic border-l-2 border-emerald-500 pl-4 py-1">
                  "The best way to predict the future is to create it. Let's build it here."
                </blockquote>
              </div>
            </div>

            {/* Right Column: The Form (3/5 width) */}
            <div className="lg:col-span-3 p-8 md:p-12 bg-white relative">
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">
                    Thanks for reaching out to Team CoBuild. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="text-sm font-medium text-slate-900 hover:text-emerald-600 underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                      <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Chinedu..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                      <input
                        required
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-600"
                    >
                      <option>General Inquiry</option>
                      <option>I want to join the team</option>
                      <option>I have a project idea</option>
                      <option>Partnership Proposal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      required
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us a bit about what you're building or how we can help..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white font-semibold h-12 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}