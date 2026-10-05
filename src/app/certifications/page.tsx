"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { FileText, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

const certifications = [
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "March 2024",
    type: "PDF",
    fileUrl: "#" // Replace with actual path e.g., "/certifications/aws-solutions-architect.pdf"
  },
  {
    id: "google-cloud-developer",
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "January 2024",
    type: "JPG",
    fileUrl: "#"
  },
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "November 2023",
    type: "PDF",
    fileUrl: "#"
  },
  {
    id: "ibm-data-science",
    title: "IBM Data Science Professional",
    issuer: "IBM",
    date: "August 2023",
    type: "JPG",
    fileUrl: "#"
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "May 2023",
    type: "PDF",
    fileUrl: "#"
  },
  {
    id: "cisco-ccna",
    title: "Cisco Certified Network Associate",
    issuer: "Cisco",
    date: "February 2023",
    type: "JPG",
    fileUrl: "#"
  }
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="grow pt-32 px-4 md:px-6 relative">
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Header */}
        <section className="max-w-5xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6">
              <Award size={14} className="text-secondary" />
              <span>Professional Credentials</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tighter">
              Our <span className="text-primary">Certifications</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A showcase of the professional qualifications, technical expertise, and continuous learning achievements of our team.
            </p>
          </motion.div>
        </section>

        {/* Certifications Grid */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
              >
                {/* Visual Header representing a document/certificate */}
                <div className="h-40 bg-slate-50 relative flex items-center justify-center border-b border-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1E7F4110,transparent)] z-10" />
                  
                  {/* Aesthetic geometric icon for dummy thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                    <Award size={32} className="text-primary/40" />
                  </div>
                  
                  {/* File Type Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-slate-600 shadow-sm border border-slate-200 flex items-center gap-1.5">
                      <FileText size={12} className={cert.type === 'PDF' ? "text-red-500" : "text-blue-500"} />
                      {cert.type}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col grow">
                  <div className="text-sm font-semibold text-secondary mb-2 flex items-center justify-between">
                    {cert.issuer}
                    <span className="text-slate-400 font-normal text-xs">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 leading-tight grow">
                    {cert.title}
                  </h3>
                  
                  <Link
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    View Document
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
