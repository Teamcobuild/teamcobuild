"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

// Merge and normalize Tailwind class lists
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <motion.div
    whileHover={{ y: -3 }}
  >
    <Link
      href={href}
      className="p-2 bg-white rounded-full text-slate-500 hover:text-primary hover:border-primary/30 transition-colors block"
    >
      <Icon size={18} />
    </Link>
  </motion.div>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-block py-1"
    >
      {label}
    </Link>
  </li>
);

// --- Main Footer Component ---

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="w-full py-6  md:px-6 mt-12">
      <div className="max-w-7xl mx-auto rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative">
        {/* <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">

          {/* Brand & Newsletter column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Image
              src="/icons/teamcobuild.png"
              alt="teamCobuild Logo"
              width={160}
              height={28}
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building the future of local software solutions. Join our community to start building better together.
            </p>

            {/* Newsletter form */}
            <form className="relative max-w-sm" onSubmit={handleSubscribe}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "w-full bg-white border rounded-full py-2.5 pl-10 pr-12 text-sm outline-none transition-all placeholder:text-slate-400",
                  status === "error"
                    ? "border-red-300 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                )}
              />

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all flex items-center justify-center",
                  status === "success"
                    ? "bg-primary text-white cursor-default"
                    : "bg-slate-900 text-white hover:bg-primary"
                )}
              >
                {status === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <ArrowRight size={14} />
                )}
              </button>
            </form>

            {/* Error feedback */}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs flex items-center gap-1 ml-2 -mt-4"
              >
                <AlertCircle size={12} /> Failed to subscribe. Please try again.
              </motion.p>
            )}
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Links group 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-slate-900 text-sm">Product</h4>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/features" label="Features" />
                <FooterLink href="/integrations" label="Integrations" />
                <FooterLink href="/pricing" label="Pricing" />
                <FooterLink href="/changelog" label="Changelog" />
              </ul>
            </div>

            {/* Links group 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-slate-900 text-sm">Company</h4>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/about" label="About" />
                <FooterLink href="/careers" label="Careers" />
                <FooterLink href="/certifications" label="Certifications" />
                <FooterLink href="/blog" label="Blog" />
                <FooterLink href="/contact" label="Contact" />
              </ul>
            </div>

            {/* Links group 3 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-slate-900 text-sm">Resources</h4>
              <ul className="flex flex-col gap-2">
                <FooterLink href="/community" label="Community" />
                <FooterLink href="/helpcenter" label="Help Center" />
                <FooterLink href="/termsofservice" label="Terms of Service" />
                <FooterLink href="/privacyandpolicy" label="Privacy Policy" />
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-400">
            &copy; <span suppressHydrationWarning>{currentYear}</span> Team Cobuild. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialLink href="https://x.com/teamCobuild" icon={Twitter} />
            <SocialLink href="https://www.linkedin.com/company/team-cobuild" icon={Linkedin} />
            <SocialLink href="https://github.com/CobuildDev" icon={Github} />
            <SocialLink href="https://www.instagram.com/team.cobuild/" icon={Instagram} />
          </div>
        </div>
      </div>
    </footer>
  );
}