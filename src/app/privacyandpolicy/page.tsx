"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Lock, Eye, HardDrive, ShieldCheck, ArrowLeft, EnvelopeSimple } from "@phosphor-icons/react";
import Link from "next/link";

// --- Sub-Component: Section Heading ---
const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">
    {title}
  </h2>
);

export default function PrivacyPage() {
  const lastUpdated = "December 28, 2025";

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-4 md:px-6 pb-20">
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Header */}
        <section className="max-w-3xl tracking-tighter mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium mb-6 shadow-sm">
              <Lock size={12} className="text-emerald-600" weight="fill" />
              <span>Data Protection</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-500 font-normal">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </section>

        {/* The Document "Paper" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-16 relative overflow-hidden"
        >
          {/* Decorative Top Bar */}
          {/* <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900" /> */}

          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
            <p className="mb-8 font-medium italic text-slate-500">
              This Privacy Policy describes how Team CoBuild ("we", "us", or
              "our") collects, uses, and discloses your information when you use
              our website and services.
            </p>

            <SectionHeading title="1. Introduction" />
            <p>
              At <strong>Team CoBuild</strong>, we respect your privacy. As a
              community-centered software company based in Aba, Nigeria, we
              believe in transparency. We do not sell your personal data. We
              only collect the information necessary to improve our products,
              communicate with our community, and ensure the security of our
              services.
            </p>

            <SectionHeading title="2. Information We Collect" />
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong>Information you provide:</strong> This includes your
                email address when you sign up for our newsletter, your name
                when you contact us via forms, or profile details if you
                contribute to our open-source repositories.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect anonymous data on
                how you interact with our website (e.g., pages visited, time
                spent) to help us improve the user experience.
              </li>
            </ul>

            <SectionHeading title="3. How We Use Your Information" />
            <p>
              <strong>Team CoBuild</strong> uses the collected data for the
              following specific purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex gap-3">
                <EnvelopeSimple className="text-emerald-600 shrink-0" size={20} weight="fill" />
                <span className="text-sm">
                  To send you updates about our MVPs and community events.
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex gap-3">
                <ShieldCheck className="text-emerald-600 shrink-0" size={20} weight="fill" />
                <span className="text-sm">
                  To monitor usage patterns and prevent abuse of our systems.
                </span>
              </div>
            </div>

            <SectionHeading title="4. Data Sharing and Disclosure" />
            <p>
              We are builders, not data brokers. <strong>Team CoBuild</strong>{" "}
              does not sell your personal information to third parties. We may
              share data only in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong>Service Providers:</strong> We use trusted third-party
                tools (like Vercel for hosting or Supabase for databases) to
                operate our services. These providers have access to data only
                to perform tasks on our behalf.
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by Nigerian law
                or to protect the rights and safety of Team CoBuild and our
                community.
              </li>
            </ul>

            <SectionHeading title="5. Data Security" />
            <p>
              We implement industry-standard security measures to protect your
              data. However, please be aware that no method of transmission over
              the Internet is 100% secure. While we strive to protect your
              information, we cannot guarantee its absolute security during
              transmission.
            </p>

            <SectionHeading title="6. Your Rights" />
            <p>
              Depending on your location, you may have rights regarding your
              personal data, including the right to access, correct, or delete
              the information we hold about you. To exercise these rights,
              please contact us directly.
            </p>

            <SectionHeading title="7. Contact Us" />
            <p>
              If you have any questions about privacy policy, please contact us at <a href="mailto:cobuildofficial@hotmail.com" className="text-emerald-600 hover:underline">cobuildofficial@hotmail.com</a>.
            </p>
          </article>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} weight="fill" />
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
