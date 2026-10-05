"use client";
import React from "react";
import { Twitter, Linkedin, Github, Instagram, Phone, Mail, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <Link
    href={href}
    className="text-white/70 hover:text-white transition-colors block"
  >
    <Icon size={18} />
  </Link>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-white/60 hover:text-white transition-colors inline-block py-1.5"
    >
      {label}
    </Link>
  </li>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1b1b1b] text-white">
      <div className="max-w-7xl mx-auto px-6 lg: pt-12 pb-8">

        {/* Top Section: Contact & Socials (Wireframe Box) */}
        <div className="relative w-full mb-16 py-8 flex items-center">
          {/* Wireframe horizontal lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />

          {/* Wireframe vertical lines (with overhang) */}
          <div className="absolute -top-6 -bottom-6 left-6 md:left-12 w-px bg-white/20" />
          <div className="absolute -top-6 -bottom-6 right-6 md:right-12 w-px bg-white/20" />

          {/* Content container inside the wireframe */}
          <div className="w-full px-12 md:px-20 flex flex-col md:flex-row justify-between items-center z-10 py-4 md:py-0">
            {/* Left: Socials */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-10 md:mb-0 text-center md:text-left">
              <h4 className="text-sm md:text-base font-semibold text-white tracking-wide md:mr-2">Find And Follow Us</h4>
              <div className="flex items-center justify-center gap-5">
                <SocialLink href="https://facebook.com" icon={Facebook} />
                <SocialLink href="https://instagram.com" icon={Instagram} />
                <SocialLink href="https://x.com" icon={Twitter} />
                <SocialLink href="https://linkedin.com" icon={Linkedin} />
              </div>
            </div>

            {/* Right: Contacts */}
            <div className="flex flex-col sm:flex-row items-center gap-10 md:gap-12">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                <Phone size={28} className="text-[#84cc16] mb-1 md:mb-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">Call us at</span>
                  <span className="text-base font-medium text-white/90">+2348163059312</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                <Mail size={28} className="text-[#84cc16] mb-1 md:mb-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">Mail us at</span>
                  <span className="text-base font-medium text-white/90">cobuildofficial@hotmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white text-base mb-2">Product</h4>
            <ul className="flex flex-col gap-1">
              {/* <FooterLink href="/features" label="Features" /> */}
              <FooterLink href="/integrations" label="Integrations" />
              <FooterLink href="/pricing" label="Pricing" />
              {/* <FooterLink href="/changelog" label="Changelog" /> */}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white text-base mb-2">Company</h4>
            <ul className="flex flex-col gap-1">
              <FooterLink href="/about" label="About" />
              <FooterLink href="/careers" label="Careers" />
              {/* <FooterLink href="/certifications" label="Certifications" /> */}
              <FooterLink href="/blog" label="Blog" />
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white text-base mb-2">Programs</h4>
            <ul className="flex flex-col gap-1">
              {/* <FooterLink href="/programs/code-camp" label="Code Camp" /> */}
              {/* <FooterLink href="/programs/fellowship" label="Fellowship" /> */}
              {/* <FooterLink href="/programs/dyb" label="DYB by Teamcobuild" /> */}
              {/* <FooterLink href="/programs/digipm" label="DigiPM" /> */}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white text-base mb-2">Support Center</h4>
            <ul className="flex flex-col gap-1">
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/ask" label="Ask Support" />
              {/* <FooterLink href="/community" label="Community" /> */}
              {/* <FooterLink href="/startup-school" label="Startup School" /> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Logo & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <Image
            src="/logo-white.png"
            alt="Teamcobuild Logo"
            width={120}
            height={21}
            className="mb-4 md:mb-0 opacity-90"
          />
          <p className="text-xs text-white/50 text-center md:text-right">
            Copyright &copy; <span suppressHydrationWarning>{currentYear}</span> Team Cobuild | Powered by Teamcobuild
          </p>
        </div>

      </div>
    </footer>
  );
}