"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Shield, Scales, FileText, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

// --- Sub-Component: Section Heading ---
const SectionHeading = ({ number, title }: { number: string; title: string }) => (
  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm font-bold border border-slate-200">
      {number}
    </span>
    {title}
  </h2>
);

export default function TermsPage() {
  const lastUpdated = "December 28, 2025"; // Update manually as needed

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6 pb-20">

        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Header */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium mb-6 shadow-sm">
              <Scales size={12} className="text-emerald-600" weight="fill" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-500">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </section>

        {/* The Document "Paper" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 md:p-16 relative overflow-hidden"
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5" />

          <article className="prose prose-slate max-w-none text-slate-600 leading-relaxed">

            <p className="text-lg mb-8">
              Welcome to <strong>Teamcobuild</strong> ("we," "our," or "us"). By accessing or using our website, services, and experimental software (collectively, the "Services"), you agree to be bound by these Terms.
            </p>

            <SectionHeading number="1" title="Acceptance of Terms" />
            <p>
              By accessing our website or using any of our MVPs, you agree to these Terms. If you do not agree, you may not use our Services. We are a pre-launch startup, and many of our tools are in active development. Use them at your own discretion.
            </p>

            <SectionHeading number="2" title="The 'Lab' Nature of Services" />
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl my-4 text-sm text-amber-800 flex gap-3 items-start">
              <Shield className="shrink-0 mt-0.5" size={18} weight="fill" />
              <div>
                <strong>Important Notice:</strong> Many of our products are "MVPs" (Minimum Viable Products) or "Experiments." They may contain bugs, experience downtime, or change significantly without notice.
              </div>
            </div>
            <p>
              You acknowledge that our Services are provided for testing and feedback purposes. We do not guarantee that the Services will be error-free or that data stored within them will be preserved indefinitely.
            </p>

            <SectionHeading number="3" title="Intellectual Property" />
            <p>
              <strong>Our Content:</strong> The CoBuild name, logo, visual design, and underlying code (unless marked as Open Source) are the intellectual property of Team CoBuild.
            </p>
            <p className="mt-4">
              <strong>Open Source:</strong> We love Open Source. Projects hosted on our GitHub that carry an MIT or Apache license are subject to those specific licenses, not these general terms regarding proprietary content.
            </p>

            <SectionHeading number="4" title="User Responsibilities" />
            <p>
              When using our Services, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Use the Services for any illegal purpose or in violation of Nigerian laws.</li>
              <li>Attempt to reverse engineer, decompile, or hack our proprietary infrastructure.</li>
              <li>Harass, abuse, or harm another person via our community channels.</li>
            </ul>

            <SectionHeading number="5" title="Limitation of Liability" />
            <p>
              To the fullest extent permitted by law, Team CoBuild shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, arising out of your use of our Services.
            </p>

            <SectionHeading number="6" title="Governing Law" />
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles. Any disputes shall be resolved in the courts located in Abia State, Nigeria.
            </p>

            <SectionHeading number="7" title="Changes to Terms" />
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of significant changes by updating the "Last Updated" date at the top of this page.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Questions?</h3>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:cobuildofficial@hotmail.com" className="text-emerald-600 hover:underline">cobuildofficial@hotmail.com</a>.
              </p>
            </div>

          </article>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-sm font-medium">
            <ArrowLeft size={16} weight="fill" />
            Back to Home
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}