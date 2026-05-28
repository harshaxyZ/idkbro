"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Feather, 
  Menu, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Search, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] text-[#0F172A] font-sans selection:bg-[#EADCC9] selection:text-[#0F172A]">
      
      {/* 1. HERO SECTION (Dark Mode Navy - Matches homepage.png exactly) */}
      <div className="relative overflow-hidden bg-[#0B132B] text-white py-12 md:py-20 px-6 border-b border-[#1C2541]">
        
        {/* Decorative Grid and Soft Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C2541] via-[#0B132B] to-[#0A1128] opacity-90 z-0"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C59B6D] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto z-10 flex flex-col items-center">
          
          {/* Header */}
          <header className="w-full flex items-center justify-between mb-16 md:mb-24">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                LumiScript
              </span>
            </div>
            <button className="p-2 text-white hover:text-[#C59B6D] transition-colors rounded-full hover:bg-white/5 sm:hidden">
              <Menu size={22} />
            </button>
            <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-white/80">
              <a href="#why-lumiscript" className="hover:text-[#C59B6D] transition-colors">Why LumiScript?</a>
              <a href="#workflow" className="hover:text-[#C59B6D] transition-colors">Workflow</a>
              <a href="#features" className="hover:text-[#C59B6D] transition-colors">Features</a>
              <Link 
                href="/generate" 
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-medium rounded-full border border-white/20 transition-all text-xs"
              >
                Launch App
              </Link>
            </nav>
          </header>

          {/* Hero Content */}
          <div className="text-center max-w-3xl flex flex-col items-center">
            
            {/* Elegant Feather Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-16 h-16 rounded-full bg-[#1C2541] border border-[#C59B6D]/30 flex items-center justify-center mb-8 shadow-inner relative"
            >
              <Feather size={24} className="text-[#C59B6D]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#C59B6D] animate-ping opacity-30"></div>
            </motion.div>

            {/* Typography Heading */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white mb-6"
            >
              From Research<br className="sm:hidden" /> to Refined Report.<br />
              <span className="italic text-[#C59B6D] font-serif font-light">Automatically.</span>
            </motion.h1>

            {/* Tagline Description */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-base md:text-lg max-w-xl font-light leading-relaxed mb-10"
            >
              LumiScript is an AI-powered platform that researches, writes, formats, and refines academic reports with precision and credibility.
            </motion.p>

            {/* Generate Reports Button */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/generate" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#EADCC9] via-[#C59B6D] to-[#B0875C] text-[#0B132B] font-medium text-sm rounded-full shadow-lg shadow-[#C59B6D]/15 hover:shadow-xl hover:shadow-[#C59B6D]/20 transition-all font-sans tracking-wide"
              >
                Generate Reports
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-y-4 gap-x-8 md:gap-x-12 mt-16 md:mt-20 pt-8 border-t border-white/10 w-full max-w-2xl text-xs md:text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C59B6D]/60" />
                <span>Trusted by Students</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C59B6D]/60" />
                <span>AI-Powered Accuracy</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#C59B6D]/60" />
                <span>Secure & Private</span>
              </div>
            </motion.div>

            {/* Tilted Floating Mockup Document */}
            <motion.div 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, type: "spring" }}
              className="mt-16 md:mt-24 relative w-full max-w-xl aspect-[1.6] rounded-t-2xl bg-[#1C2541] border border-white/10 shadow-2xl overflow-hidden flex items-stretch p-4 gap-4"
              style={{
                perspective: "1000px",
                transform: "rotateX(10deg)"
              }}
            >
              {/* Report Cover Page mockup */}
              <div className="flex-1 bg-[#0B132B] border border-white/5 rounded-lg p-6 flex flex-col justify-between items-start text-left relative overflow-hidden">
                <div className="w-full flex justify-between items-center text-[10px] text-white/40 font-mono border-b border-white/5 pb-3">
                  <span>DEPARTMENT OF PHYSICS</span>
                  <span>JOB-7489</span>
                </div>
                <div className="my-auto">
                  <h4 className="font-serif text-[#C59B6D] text-lg font-bold leading-tight mb-2">LumiScript</h4>
                  <p className="text-white/60 text-xs font-light">Intelligent Report Generation</p>
                  <div className="w-8 h-0.5 bg-[#C59B6D] mt-4"></div>
                </div>
                <div className="w-full flex justify-between items-center text-[8px] text-white/30 border-t border-white/5 pt-3">
                  <span>LATEX SYSTEM V2.5</span>
                  <span>PAGE 1 OF 12</span>
                </div>
              </div>

              {/* Behind report pages */}
              <div className="w-1/3 bg-[#FCFAF7] border border-[#EFEBE4] rounded-lg p-4 text-[#0F172A] hidden sm:flex flex-col gap-2 overflow-hidden shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#F7F2EB] flex items-center justify-center self-end mb-2">
                  <Feather size={12} className="text-[#C59B6D]" />
                </div>
                <div className="w-full h-2 bg-[#EFEBE4] rounded-full"></div>
                <div className="w-3/4 h-2 bg-[#EFEBE4] rounded-full"></div>
                <div className="w-5/6 h-1.5 bg-[#F0ECE6] rounded-full mt-2"></div>
                <div className="w-2/3 h-1.5 bg-[#F0ECE6] rounded-full"></div>
                <div className="w-full h-1.5 bg-[#F0ECE6] rounded-full"></div>
                <div className="w-1/2 h-1.5 bg-[#F0ECE6] rounded-full"></div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* 2. WHY LUMISCRIPT SECTION (Warm Ivory - Matches homepage.png) */}
      <section id="why-lumiscript" className="py-20 md:py-28 px-6 bg-[#FCFAF7] relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-xs font-semibold tracking-widest text-[#C59B6D] uppercase mb-3 block">
              Built for Academic Excellence
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#0B132B] mb-4">
              Why LumiScript?
            </h2>
            <div className="w-12 h-[1px] bg-[#C59B6D] mx-auto mb-6"></div>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
              More than just writing. A complete, autonomous academic workflow engineered to research deep sources, compile beautifully in LaTeX, and automatically review page constraints.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-[#EFEBE4] rounded-2xl shadow-sm hover:shadow-md hover:border-[#C59B6D]/30 transition-all flex flex-col items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                <Search size={20} className="text-[#C59B6D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B132B]">
                Deep Sourcing & Verification
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                Autonomous web agents search DuckDuckGo, fetch verified articles, compile robust bibliographies, and contextually download relevant high-resolution images.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-[#EFEBE4] rounded-2xl shadow-sm hover:shadow-md hover:border-[#C59B6D]/30 transition-all flex flex-col items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                <FileText size={20} className="text-[#C59B6D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B132B]">
                LaTeX Document Generation
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                Generates a robust, beautifully-structured LaTeX package including custom sections, table of contents, figures, references, and citation styles (IEEE, APA, MLA).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-[#EFEBE4] rounded-2xl shadow-sm hover:shadow-md hover:border-[#C59B6D]/30 transition-all flex flex-col items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#C59B6D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B132B]">
                Self-Review & Correction Loop
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                A recursive self-evaluation agent reviews PDF layout warnings, counts words, checks figure captions, and auto-revises formatting up to 3 times to guarantee perfection.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WORKFLOW TIMELINE SECTION */}
      <section id="workflow" className="py-20 bg-[#FAF7F2] px-6 border-y border-[#EFEBE4]">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#C59B6D] uppercase mb-3 block">
              Rigorous and Transparent
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#0B132B] mb-4">
              The Academic Pipeline
            </h2>
            <div className="w-12 h-[1px] bg-[#C59B6D] mx-auto mb-6"></div>
          </div>

          <div className="relative pl-8 md:pl-16 border-l border-[#C59B6D]/20 flex flex-col gap-16 ml-4 md:ml-12">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[73px] top-0 w-6 h-6 rounded-full bg-[#C59B6D] text-white font-sans text-xs font-bold flex items-center justify-center border-4 border-[#FAF7F2]">
                1
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B132B] mb-2">Input Sizing & Parameters</h4>
              <p className="text-xs md:text-sm text-gray-500 font-light max-w-xl leading-relaxed">
                Define title, academic depth, formatting, citation formats, and target page count. LumiScript dynamically establishes target densities and calculates prices in real time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[73px] top-0 w-6 h-6 rounded-full bg-[#EADCC9] text-[#C59B6D] font-sans text-xs font-bold flex items-center justify-center border-4 border-[#FAF7F2]">
                2
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B132B] mb-2">Deep Sourcing Agent</h4>
              <p className="text-xs md:text-sm text-gray-500 font-light max-w-xl leading-relaxed">
                The agent performs structured web search, scrapes article metadata, retrieves full text, saves citations, and collects high-resolution diagrams to support theories.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[73px] top-0 w-6 h-6 rounded-full bg-[#EADCC9] text-[#C59B6D] font-sans text-xs font-bold flex items-center justify-center border-4 border-[#FAF7F2]">
                3
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B132B] mb-2">LaTeX Engineering & Review</h4>
              <p className="text-xs md:text-sm text-gray-500 font-light max-w-xl leading-relaxed">
                The content is drafted in clean, beautiful academic LaTeX code, compiled directly to PDF. The system loops recursively to trim or extend paragraphs depending on margins and page targets.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-[#0B132B] text-white/50 py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-lg font-bold text-white mb-2">LumiScript</span>
            <p className="text-xs font-light text-white/40 max-w-xs leading-relaxed">
              Autonomous AI agent for high-fidelity, peer-ready academic LaTeX reports and document compilation.
            </p>
          </div>

          <div className="flex gap-8 text-xs font-light">
            <a href="#" className="hover:text-[#C59B6D] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#C59B6D] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#C59B6D] transition-colors">Documentation</a>
            <a href="mailto:support@lumiscript.ai" className="hover:text-[#C59B6D] transition-colors">Contact Support</a>
          </div>

        </div>
        <div className="max-w-5xl mx-auto border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-white/30">
          &copy; {new Date().getFullYear()} LumiScript Inc. Designed for Academic Integrity and Scientific Accuracy.
        </div>
      </footer>

    </div>
  );
}

