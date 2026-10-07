"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

import FAQ from "../../components/FAQ";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-32 px-4 md:px-6 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-[60vh] w-full bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]">
          <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute left-0 top-32 -z-10 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 flex items-center justify-center mb-6"
            >
              {/* Abstract Logo matching the image slightly */}
              {/* <Layers className="w-8 h-8 text-slate-800 rotate-45" /> */}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl tracking-tight md:text-5xl font-bold text-slate-900 mb-4"
            >
              Contact Our Friendly Team!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500"
            >
              Let us know how we can Help.
            </motion.p>
          </div>

          {/* Welcoming Picture Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-7xl mx-auto mb-24 rounded-3xl overflow-hidden shadow-2xl relative h-[300px] md:h-[450px]"
          >
            <img
              src="/contact.jpg"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
          </motion.div>

          {/* Contact Cards Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-32"
          >
            {/* Email Us (Cyan / Accent) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-accent rounded-[2rem] p-8 flex flex-col relative overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2 z-10">Email Us</h3>
              <p className="text-slate-900/80 mb-8 flex-grow z-10">Send us an email and we will get back to you as soon as possible.</p>
              <a href="mailto:cobuildofficial@hotmail.com" className="text-base font-semibold text-slate-900 hover:text-slate-700 transition-colors z-10">
                cobuildofficial@hotmail.com
              </a>
              {/* Subtle wave/gradient background effect */}
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-white/20 to-transparent rounded-tl-[100px] -z-0" />
            </motion.div>

            {/* Chat to support (Yellow / Highlight) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-highlight rounded-[2rem] p-8 flex flex-col relative overflow-hidden hover:shadow-2xl hover:shadow-highlight/20 transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2 z-10">Chat to support</h3>
              <p className="text-slate-900/80 mb-8 flex-grow z-10">We're here to help.</p>
              <a href="mailto:support@teamcobuild.com" className="text-base font-semibold text-slate-900 hover:text-slate-700 transition-colors z-10">
                support@teamcobuild.com
              </a>
              {/* Subtle wave/gradient background effect */}
              <div className="absolute bottom-0 right-0 w-full h-3/4 bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[120px] -z-0" />
            </motion.div>

            {/* Visit us (Green / Primary) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-primary rounded-[2rem] p-8 flex flex-col relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2 z-10">Visit Us</h3>
              <p className="text-white/80 mb-8 flex-grow z-10">Workstation: IGHub No 10 Calabar street, opp ogbonnaya onu polytechnic Aba, Abia state</p>
              <a href="https://maps.app.goo.gl/HSvvKPjGAtbsP6XQ8" className="text-base font-semibold text-white hover:text-slate-100 transition-colors z-10">
                View on Google Maps
              </a>
              {/* Subtle wave/gradient background effect */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-black/10 to-transparent rounded-tr-[100px] -z-0" />
            </motion.div>

            {/* Call us (Orange / Secondary) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-secondary rounded-[2rem] p-8 flex flex-col relative overflow-hidden hover:shadow-2xl hover:shadow-secondary/20 transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2 z-10">Call Or Text Us</h3>
              <p className="text-white/80 mb-8 flex-grow z-10">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+2348163059312" className="text-base font-semibold text-white hover:text-slate-100 transition-colors z-10">
                +234 816 305 9312
              </a>
              {/* Subtle wave/gradient background effect */}
              <div className="absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-tl-[100px] -z-0" />
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <FAQ />

        </div>
      </main>

      <Footer />
    </div>
  );
}
