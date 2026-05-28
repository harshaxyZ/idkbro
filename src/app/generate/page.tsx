"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Feather, 
  ChevronLeft, 
  HelpCircle, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Eye,
  Image as ImageIcon,
  FileText,
  Upload,
  ArrowRight,
  ShieldAlert,
  Loader2,
  CheckCircle,
  FileCode,
  Download,
  ExternalLink,
  BookOpen
} from "lucide-react";

// ==========================================
// TYPES & OPTIONS CONFIG
// ==========================================

const REPORT_TYPES = ["Assignment", "Research Paper", "Case Study", "Thesis", "Review Article", "Other"];
const ACADEMIC_LEVELS = ["School", "Undergraduate", "Postgraduate", "PhD"];
const CITATION_STYLES = ["APA", "MLA", "Chicago", "Harvard", "IEEE", "ACM"];
const WRITING_STYLES = [
  { id: "Academic / Formal", label: "Academic / Formal", description: "Structured, rigorous, using objective language." },
  { id: "Simple & Readable", label: "Simple & Readable", description: "Accessible, focused on clarity and brevity." },
  { id: "Research-Oriented", label: "Research-Oriented", description: "Heavy focus on literature, methodology, data." },
  { id: "Professional", label: "Professional", description: "Executive summary style, industry focus." },
  { id: "Technical", label: "Technical", description: "Rich in algorithms, terminology, equations." }
];

const FONTS = [
  { id: "Times New Roman", name: "Times New Roman", style: { fontFamily: "'Times New Roman', Times, serif" } },
  { id: "Georgia", name: "Georgia", style: { fontFamily: "Georgia, serif" } },
  { id: "Garamond", name: "Garamond", style: { fontFamily: "'EB Garamond', Garamond, serif" } },
  { id: "Palatino", name: "Palatino", style: { fontFamily: "'Palatino Linotype', Palatino, serif" } },
  { id: "Book Antiqua", name: "Book Antiqua", style: { fontFamily: "'Book Antiqua', Palatino, serif" } },
  { id: "Cambria", name: "Cambria", style: { fontFamily: "Cambria, Georgia, serif" } }
];

const DEFAULT_SECTIONS = [
  "Abstract", "Introduction", "Literature Review", "Methodology", 
  "Case Study", "Analysis", "Discussion", "Conclusion", "References"
];

const MOCK_TEMPLATES = [
  { id: "Climate Change Research", title: "Climate Change Research", desc: "Analysis on global warming projections, policy targets, and mitigation models." },
  { id: "AI in Education", title: "AI in Education", desc: "Socio-technical exploration of generative AI inside modern university teaching." },
  { id: "Blockchain Technology", title: "Blockchain Technology", desc: "Deep architectural dive into consensus algorithms and secure smart contracts." },
  { id: "Indian Economic Growth", title: "Indian Economic Growth", desc: "Post-2020 fiscal policy review, industrial performance, and service sector analysis." },
  { id: "Cybersecurity Fundamentals", title: "Cybersecurity Fundamentals", desc: "Overview of threat intelligence, zero-trust paradigms, and defense vectors." }
];

const SUGGESTIONS = [
  "Focus on Indian market dynamics",
  "Use simple and direct academic language",
  "Incorporate recent 2024-2026 statistics",
  "Emphasize socio-economic impacts",
  "Avoid unnecessary technical jargon",
  "Focus on near-term industry applications"
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function GeneratorFlow() {
  const [step, setStep] = useState(1);
  
  // STEP 1: BASICS
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Assignment");
  const [level, setLevel] = useState("Undergraduate");
  const [citation, setCitation] = useState("APA");
  const [pages, setPages] = useState(10);
  
  // STEP 2: STYLE & FONT
  const [writingStyle, setWritingStyle] = useState("Academic / Formal");
  const [fontFamily, setFontFamily] = useState("Times New Roman");

  // STEP 3: IMAGES
  const [includeImages, setIncludeImages] = useState(true);
  const [imageCount, setImageCount] = useState(5);

  // STEP 4: SECTIONS
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "Abstract", "Introduction", "Literature Review", "Methodology", "Conclusion", "References"
  ]);
  const [customSectionInput, setCustomSectionInput] = useState("");

  // STEP 5: EXTRA INSTRUCTIONS
  const [extraInstructions, setExtraInstructions] = useState("");

  // STEP 6: REFERENCES
  const [refType, setRefType] = useState<"upload" | "templates">("templates");
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("AI in Education");
  const [isUploading, setIsUploading] = useState(false);

  // PIPELINE / GENERATION MOCK STATE
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [isGenerationComplete, setIsGenerationComplete] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // PRICING LOGIC
  // ==========================================
  const calculatePricing = () => {
    // Base 10 pages = ₹30, extra page = ₹3
    const basePagePrice = 30;
    const extraPages = Math.max(0, pages - 10);
    const pageCost = basePagePrice + (extraPages * 3);

    // Images: First 5 images = ₹15, additional = ₹3 each
    let imageCost = 0;
    if (includeImages) {
      if (imageCount <= 5) {
        imageCost = 15;
      } else {
        imageCost = 15 + ((imageCount - 5) * 3);
      }
    }

    return {
      pagesCost: pageCost,
      imagesCost: imageCost,
      total: pageCost + imageCost
    };
  };

  const pricing = calculatePricing();

  // Scroll logs to bottom during fake pipeline
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pipelineLogs]);

  // ==========================================
  // PIPELINE SIMULATION
  // ==========================================
  const triggerGenerationPipeline = () => {
    setIsGenerating(true);
    setPipelineIndex(0);
    setPipelineLogs(["Initializing LumiScript autonomous Research Agent..."]);

    const pipelineStages = [
      {
        message: "Searching DuckDuckGo for contextually relevant academic journals...",
        logs: [
          "Searching for: '" + (title || "AI in Education") + "'...",
          "Found 24 high-confidence matches on open repositories.",
          "Scraping citation metadata...",
          "Retrieving full-text PDFs for reading..."
        ],
        delay: 2500
      },
      {
        message: "Synthesizing research content & writing report sections...",
        logs: [
          "Reading references & mapping arguments...",
          "Drafting Abstract & Keywords...",
          "Structuring Literature Review...",
          "Synthesizing findings for: " + selectedSections.filter(s => s !== "References" && s !== "Abstract").join(", ") + "..."
        ],
        delay: 3500
      },
      {
        message: "Formatting document with professional LaTeX macros...",
        logs: [
          "Formatting layout with font family: " + fontFamily + "...",
          "Configuring margins, line spacing, and page markers...",
          "Embedding citation anchors [style: " + citation + "]...",
          "Injecting target page targets (" + pages + " pages density target)..."
        ],
        delay: 2000
      },
      {
        message: "Compiling LaTeX source into PDF via latexmk...",
        logs: [
          "Running latexmk -pdf assignment.tex...",
          "Warning: Underfull hbox on page 3 (Ignored)...",
          "Generating Table of Contents layout...",
          "Generating bibliography index...",
          "Compilation successful. PDF size: 1.2MB."
        ],
        delay: 2500
      },
      {
        message: "Running recursive Self-Review loop for quality assurance...",
        logs: [
          "Analyzing content density: " + (pages * 450) + " words estimated.",
          "Verifying figure captions and citation linkages...",
          "Academic Tone evaluation: 9.4/10 passed.",
          "Self-correction check: No overflow margins detected."
        ],
        delay: 3000
      },
      {
        message: "Finalizing report package. Preparing document preview...",
        logs: [
          "Packaging assignment.tex, assignment.pdf, and images...",
          "LumiScript compilation finished successfully!"
        ],
        delay: 1500
      }
    ];

    let currentStage = 0;

    const runStage = () => {
      if (currentStage >= pipelineStages.length) {
        setIsGenerating(false);
        setIsGenerationComplete(true);
        return;
      }

      const stage = pipelineStages[currentStage];
      setPipelineIndex(currentStage + 1);
      
      // Append core stage message
      setPipelineLogs(prev => [...prev, `\n[STAGE ${currentStage + 1}] — ${stage.message}`]);
      
      // Gradually print detailed logs for that stage
      stage.logs.forEach((logText, idx) => {
        setTimeout(() => {
          setPipelineLogs(prev => [...prev, `  ▸ ${logText}`]);
        }, (stage.delay / stage.logs.length) * idx * 0.8);
      });

      currentStage++;
      setTimeout(runStage, stage.delay);
    };

    setTimeout(runStage, 1000);
  };

  // ==========================================
  // WIZARD NAVIGATION HANDLERS
  // ==========================================
  const handleNext = () => {
    if (step < 7) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      triggerGenerationPipeline();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditJump = (targetStep: number) => {
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Section chip toggle handler
  const toggleSection = (sec: string) => {
    if (selectedSections.includes(sec)) {
      if (selectedSections.length > 2) {
        setSelectedSections(prev => prev.filter(s => s !== sec));
      }
    } else {
      setSelectedSections(prev => [...prev, sec]);
    }
  };

  // Custom section chip adder
  const handleAddCustomSection = () => {
    if (customSectionInput.trim() && !selectedSections.includes(customSectionInput.trim())) {
      setSelectedSections(prev => [...prev, customSectionInput.trim()]);
      setCustomSectionInput("");
    }
  };

  // File upload simulation
  const handleMockFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      }));
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, ...newFiles]);
        setIsUploading(false);
      }, 1500);
    }
  };

  // Cost component on the side or bottom
  const costCardComponent = (
    <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm sticky top-28 flex flex-col gap-5">
      <div className="flex items-center gap-2 pb-3 border-b border-[#FAF7F2]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C59B6D]"></span>
        <h4 className="font-serif text-sm font-bold text-[#0B132B]">Live Pricing Estimate</h4>
      </div>

      <div className="flex flex-col gap-2.5 text-xs text-gray-500 font-light">
        <div className="flex justify-between">
          <span>Base Content ({pages} pages)</span>
          <span className="font-sans font-medium text-[#0B132B]">₹{pricing.pagesCost}</span>
        </div>
        {includeImages && (
          <div className="flex justify-between">
            <span>Embedded Images ({imageCount})</span>
            <span className="font-sans font-medium text-[#0B132B]">₹{pricing.imagesCost}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Formatting & Self-Review</span>
          <span className="text-[#C59B6D] font-medium uppercase text-[10px]">Free</span>
        </div>
      </div>

      <div className="border-t border-[#FAF7F2] pt-4 mt-2 flex justify-between items-baseline">
        <span className="font-serif text-xs font-bold text-[#0B132B]">Estimated Total</span>
        <span className="font-sans text-2xl font-bold text-[#C59B6D]">₹{pricing.total}</span>
      </div>

      <p className="text-[10px] text-gray-400 font-light leading-relaxed">
        Calculated dynamically based on page length and asset density. Backed by the LumiScript guarantee.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#0F172A] font-sans selection:bg-[#EADCC9] selection:text-[#0F172A] pb-24">
      
      {/* ==========================================
          A. HEADER NAVIGATION
          ========================================== */}
      <nav className="w-full bg-[#FCFAF7]/90 backdrop-blur-md border-b border-[#EFEBE4] sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev} 
              disabled={step === 1 || isGenerating || isGenerationComplete}
              className="p-2 border border-[#EFEBE4] hover:bg-[#F7F2EB] disabled:opacity-40 disabled:hover:bg-transparent rounded-full text-[#0B132B] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <Link href="/" className="font-serif text-lg font-bold tracking-tight text-[#0B132B]">
              LumiScript
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#F7F2EB] border border-[#FAF7F2] rounded-full text-[10px] md:text-xs font-medium text-[#C59B6D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B6D] animate-pulse"></span>
            <span>Premium Academic Sandbox</span>
          </div>

          <button className="p-2 border border-[#EFEBE4] hover:bg-[#F7F2EB] rounded-full text-gray-500 transition-colors">
            <HelpCircle size={16} />
          </button>
        </div>
      </nav>

      {/* ==========================================
          B. STEP PROGRESS INDICATOR
          ========================================== */}
      {!isGenerating && !isGenerationComplete && (
        <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-6 sticky top-[69px] bg-[#FCFAF7] z-20">
          <div className="relative flex items-center justify-between">
            {/* Stepper Connecting Lines */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#EFEBE4] z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#C59B6D] z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            ></div>

            {/* Steps Badges */}
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const label = ["Basics", "Style & Font", "Images", "Sections", "Instructions", "References", "Review"][num - 1];
              const isActive = num === step;
              const isCompleted = num < step;
              
              return (
                <div key={num} className="relative z-10 flex flex-col items-center">
                  <button 
                    onClick={() => num <= step && handleEditJump(num)}
                    disabled={num > step}
                    className={`w-9 h-9 rounded-full font-sans text-xs font-semibold flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? "bg-[#C59B6D] text-white ring-4 ring-[#F7F2EB] border border-[#C59B6D]" 
                        : isCompleted 
                          ? "bg-white border-2 border-[#C59B6D] text-[#C59B6D]" 
                          : "bg-white border border-[#EFEBE4] text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {isCompleted ? <Check size={14} className="stroke-[3px]" /> : num}
                  </button>
                  <span className={`absolute top-11 text-[9px] font-sans tracking-wide whitespace-nowrap uppercase transition-all duration-300 font-semibold ${
                    isActive ? "text-[#C59B6D]" : isCompleted ? "text-[#0B132B]/70" : "text-gray-300"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          C. MAIN CONTENT & STEP FORMS
          ========================================== */}
      <main className="max-w-6xl mx-auto w-full px-6 pt-16">
        
        <AnimatePresence mode="wait">
          
          {/* FAKE PIPELINE SCREEN */}
          {isGenerating && (
            <motion.div 
              key="pipeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-[#0B132B] text-white border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Loader2 size={18} className="text-[#C59B6D] animate-spin" />
                  <span className="font-serif text-base font-bold text-white">Compiling Academic Report Package</span>
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  STAGE {pipelineIndex} OF 6
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#C59B6D] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(pipelineIndex / 6) * 100}%` }}
                ></div>
              </div>

              {/* Live Compiler Logs Screen */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 h-72 overflow-y-auto font-mono text-xs text-white/80 leading-relaxed flex flex-col gap-2 relative">
                {pipelineLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith("\n") ? "text-[#C59B6D] font-bold mt-2" : "text-white/60"}>
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef}></div>
              </div>

              <div className="text-center text-[10px] text-white/30 italic">
                LumiScript is autonomously searching, drafting in LaTeX, validating page count and compiles it to PDF. Please stand by.
              </div>
            </motion.div>
          )}

          {/* FAKE GENERATION PREVIEW SCREEN */}
          {isGenerationComplete && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-stretch"
            >
              {/* Left Side: Mock PDF Document Card */}
              <div className="flex-1 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col justify-between items-stretch aspect-[0.70] overflow-hidden text-left relative">
                <div className="w-full flex justify-between items-center text-[10px] text-gray-400 font-mono border-b border-[#FAF7F2] pb-4">
                  <span>LUMISCRIPT PLATFORM PACKAGE</span>
                  <span>JOB-PASSED-QA</span>
                </div>
                
                <div className="my-auto py-12 flex flex-col items-center text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#F7F2EB] flex items-center justify-center mb-6">
                    <Feather size={24} className="text-[#C59B6D]" />
                  </div>
                  
                  {/* Styled mock LaTeX report Cover title */}
                  <h1 className="font-serif text-3xl font-bold leading-tight text-[#0B132B] mb-4">
                    {title || "Impact of Artificial Intelligence on Education"}
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-[#C59B6D] font-semibold mb-8">
                    Prepared autonomously as a {type}
                  </p>

                  <div className="w-10 h-0.5 bg-[#C59B6D] mb-8"></div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs text-gray-500 font-light text-left">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Citation format</span>
                      <strong className="text-[#0B132B] font-semibold">{citation} Style</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Font face</span>
                      <strong className="text-[#0B132B] font-semibold">{fontFamily}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Volume length</span>
                      <strong className="text-[#0B132B] font-semibold">{pages} Pages Density</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Sourcing rating</span>
                      <strong className="text-green-600 font-semibold">9.4/10 QA Passed</strong>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center text-[8px] text-gray-400 border-t border-[#FAF7F2] pt-4 font-mono">
                  <span>DOCUMENT MODEL: MIMOV2.5-LATEX</span>
                  <span>PUBLISHED DATE: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Right Side: Report Metadata & Action buttons */}
              <div className="w-full md:w-80 flex flex-col gap-6">
                
                {/* Generation Details Card */}
                <div className="bg-white border border-[#EFEBE4] rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#FAF7F2]">
                    <CheckCircle size={18} className="text-green-600" />
                    <h3 className="font-serif text-sm font-bold text-[#0B132B]">Package Compiled</h3>
                  </div>

                  <div className="flex flex-col gap-4 text-xs font-light text-gray-500">
                    <p className="leading-relaxed">
                      Your document has been compiled successfully and has passed structural consistency reviews.
                    </p>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                        <span>Format type</span>
                        <strong className="font-semibold text-[#0B132B]">PDF / LaTeX</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                        <span>Estimated Words</span>
                        <strong className="font-semibold text-[#0B132B]">~{(pages * 450).toLocaleString()} words</strong>
                      </div>
                      {includeImages && (
                        <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                          <span>Embedded Images</span>
                          <strong className="font-semibold text-[#0B132B]">{imageCount} Figures</strong>
                        </div>
                      )}
                      <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                        <span>Final Price paid</span>
                        <strong className="font-semibold text-[#C59B6D]">₹{pricing.total}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-3">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#0B132B] text-white hover:bg-[#1C2541] rounded-xl text-xs font-semibold shadow-sm transition-all">
                      <Download size={14} />
                      Download PDF Document
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] rounded-xl text-xs font-semibold transition-all">
                      <FileCode size={14} />
                      View LaTeX Source package
                    </button>
                  </div>
                </div>

                {/* Return button */}
                <button 
                  onClick={() => {
                    setIsGenerationComplete(false);
                    setStep(1);
                  }}
                  className="w-full py-3 bg-[#F7F2EB] hover:bg-[#FAF5EE] text-[#C59B6D] text-xs font-semibold rounded-2xl border border-[#EFEBE4] transition-all"
                >
                  Generate Another Report
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: REPORT BASICS */}
          {step === 1 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <FileText size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">Report Basics</h3>
                    <p className="text-xs text-gray-400 font-light">Tell us the core subject and format details of your document.</p>
                  </div>
                </div>

                {/* Topic / Title Input */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-[#0B132B] tracking-wide uppercase">
                    What is your report about?
                  </label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Impact of Artificial Intelligence on Education"
                    className="w-full px-4 py-3.5 border border-[#EFEBE4] focus:border-[#C59B6D]/50 focus:ring-4 focus:ring-[#F7F2EB] outline-none rounded-xl text-sm font-sans bg-white transition-all shadow-inner"
                  />
                  <span className="text-[10px] text-gray-400 font-light leading-relaxed">
                    Provide a descriptive subject or prompt so the sourcing agent can retrieve the exact arguments.
                  </span>
                </div>

                {/* Grid for Selects */}
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Report Type Select */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-[#0B132B] tracking-wide uppercase">Report Type</label>
                    <div className="relative">
                      <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-3 border border-[#EFEBE4] outline-none rounded-xl text-sm font-sans bg-white text-[#0B132B] transition-all cursor-pointer appearance-none animate-none"
                      >
                        {REPORT_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Academic Level Select */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-[#0B132B] tracking-wide uppercase">Academic Level</label>
                    <div className="relative">
                      <select 
                        value={level} 
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-3 border border-[#EFEBE4] outline-none rounded-xl text-sm font-sans bg-white text-[#0B132B] transition-all cursor-pointer appearance-none animate-none"
                      >
                        {ACADEMIC_LEVELS.map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Citation Style Select */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-[#0B132B] tracking-wide uppercase">Citation Style</label>
                    <div className="relative">
                      <select 
                        value={citation} 
                        onChange={(e) => setCitation(e.target.value)}
                        className="w-full px-4 py-3 border border-[#EFEBE4] outline-none rounded-xl text-sm font-sans bg-white text-[#0B132B] transition-all cursor-pointer appearance-none animate-none"
                      >
                        {CITATION_STYLES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Target Pages Stepper */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-[#0B132B] tracking-wide uppercase">Target Pages</label>
                    <div className="flex items-center justify-between border border-[#EFEBE4] rounded-xl p-1 bg-[#FCFAF7]">
                      <button 
                        type="button" 
                        onClick={() => setPages(p => Math.max(1, p - 1))}
                        className="w-10 h-10 rounded-lg hover:bg-white text-gray-500 border border-transparent hover:border-[#EFEBE4] transition-all flex items-center justify-center font-bold"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-sans text-sm font-bold text-[#0B132B]">{pages} Pages</span>
                      <button 
                        type="button" 
                        onClick={() => setPages(p => p + 1)}
                        className="w-10 h-10 rounded-lg hover:bg-white text-gray-500 border border-transparent hover:border-[#EFEBE4] transition-all flex items-center justify-center font-bold"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Stepper info footer card */}
                <div className="p-4 bg-[#F7F2EB] border border-[#EFEBE4] rounded-2xl flex items-center gap-3">
                  <Sparkles size={16} className="text-[#C59B6D]" />
                  <span className="text-xs font-light text-[#0B132B]/85">
                    Up to 10 pages included in base rate (₹30) • Extra pages calculated at ₹3/page.
                  </span>
                </div>

                {/* Next button */}
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: Style & Font
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Live Cost estimation sidebar */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 2: STYLE & FONT */}
          {step === 2 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <Feather size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">Style & Font</h3>
                    <p className="text-xs text-gray-400 font-light font-sans">Choose the text structure and font style to format your assignment.</p>
                  </div>
                </div>

                {/* Dropdown writing styles */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Writing Tone Style</label>
                  <div className="relative">
                    <select 
                      value={writingStyle} 
                      onChange={(e) => setWritingStyle(e.target.value)}
                      className="w-full px-4 py-3.5 border border-[#EFEBE4] outline-none rounded-xl text-sm font-sans bg-white text-[#0B132B] transition-all cursor-pointer appearance-none animate-none"
                    >
                      {WRITING_STYLES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-light">
                    {WRITING_STYLES.find(s => s.id === writingStyle)?.description}
                  </span>
                </div>

                {/* Font Card Selector Grid */}
                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Choose Font Family</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {FONTS.map(f => {
                      const isSelected = f.id === fontFamily;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFontFamily(f.id)}
                          className={`p-6 rounded-2xl border text-center relative flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-white border-[#C59B6D] ring-4 ring-[#F7F2EB] shadow-sm" 
                              : "bg-[#FCFAF7]/50 border-[#EFEBE4] hover:bg-[#F7F2EB]/50"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#C59B6D] text-white flex items-center justify-center">
                              <Check size={10} className="stroke-[3px]" />
                            </div>
                          )}
                          <span className="text-2xl font-normal text-[#0B132B]" style={f.style}>Aa</span>
                          <span className="text-xs font-medium text-gray-600 font-sans">{f.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Typography Preview card */}
                <div className="p-6 bg-[#F7F2EB] border border-[#EFEBE4] rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C59B6D] uppercase tracking-wider font-sans">
                    <Eye size={14} />
                    <span>Live Typography Preview ({fontFamily})</span>
                  </div>
                  <p 
                    className="text-sm text-gray-600 leading-relaxed italic"
                    style={FONTS.find(f => f.id === fontFamily)?.style}
                  >
                    “LumiScript research synthesis engines analyze datasets to present arguments. Academic reports compiled via LaTeX maintain robust margin alignment, strict paragraph indentation, and clean bibliographies contextually styled.”
                  </p>
                </div>

                {/* Navigation CTA */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: Images
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 3: IMAGES */}
          {step === 3 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <ImageIcon size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">Embedded Assets</h3>
                    <p className="text-xs text-gray-400 font-light">Autonomously search and embed contextual high-resolution diagrams.</p>
                  </div>
                </div>

                {/* Images Enable Toggle */}
                <div className="flex items-center justify-between p-6 border border-[#EFEBE4] rounded-2xl bg-[#FCFAF7]/50">
                  <div className="flex flex-col gap-1 pr-6 text-left">
                    <span className="text-sm font-bold text-[#0B132B]">Include Academic Diagrams & Images</span>
                    <span className="text-xs text-gray-400 font-light">
                      LumiScript will automatically research, validate, and place graphical elements in relevant subsections.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeImages(!includeImages)}
                    className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer shrink-0 ${
                      includeImages ? "bg-[#C59B6D]" : "bg-gray-200"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white transition-all shadow-sm ${
                      includeImages ? "translate-x-6" : "translate-x-0"
                    }`}></div>
                  </button>
                </div>

                {/* Image Count selector stepper */}
                {includeImages && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-col gap-3"
                  >
                    <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Number of figures to include</label>
                    <div className="flex items-center justify-between border border-[#EFEBE4] rounded-xl p-1 bg-[#FCFAF7] max-w-sm">
                      <button 
                        type="button" 
                        onClick={() => setImageCount(c => Math.max(1, c - 1))}
                        className="w-10 h-10 rounded-lg hover:bg-white text-gray-500 border border-transparent hover:border-[#EFEBE4] transition-all flex items-center justify-center font-bold"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-sans text-sm font-bold text-[#0B132B]">{imageCount} Figures</span>
                      <button 
                        type="button" 
                        onClick={() => setImageCount(c => Math.min(20, c + 1))}
                        className="w-10 h-10 rounded-lg hover:bg-white text-gray-500 border border-transparent hover:border-[#EFEBE4] transition-all flex items-center justify-center font-bold"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400 font-light">
                      First 5 figures included in base rate (₹15) • Additional diagrams calculated at ₹3/figure.
                    </span>
                  </motion.div>
                )}

                {/* Pricing info card */}
                <div className="p-4 bg-[#F7F2EB] border border-[#EFEBE4] rounded-2xl flex items-center gap-3">
                  <Sparkles size={16} className="text-[#C59B6D] shrink-0" />
                  <span className="text-xs font-light text-[#0B132B]/85 text-left">
                    Images are automatically indexed, cross-referenced, and embedded contextually inside the generated LaTeX code.
                  </span>
                </div>

                {/* Navigation CTA */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: Report Sections
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 4: REPORT SECTIONS */}
          {step === 4 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <FileCode size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">Report Sections</h3>
                    <p className="text-xs text-gray-400 font-light">Select which chapters and sections should compile inside the LaTeX report.</p>
                  </div>
                </div>

                {/* Chip selectors */}
                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider text-left">Choose Sections</label>
                  <div className="flex flex-wrap gap-3">
                    {DEFAULT_SECTIONS.map(sec => {
                      const isSelected = selectedSections.includes(sec);
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => toggleSection(sec)}
                          className={`px-4 py-2.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected 
                              ? "bg-[#C59B6D]/10 border-[#C59B6D] text-[#C59B6D]" 
                              : "bg-[#FCFAF7] border-[#EFEBE4] text-[#0B132B]/75 hover:bg-[#F7F2EB]"
                          }`}
                        >
                          {isSelected && <Check size={12} className="stroke-[3px]" />}
                          {sec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom tags input */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider text-left">Insert Custom Section</label>
                  <div className="flex gap-3 max-w-md">
                    <input 
                      type="text" 
                      value={customSectionInput}
                      onChange={(e) => setCustomSectionInput(e.target.value)}
                      placeholder="e.g., Historical Context"
                      className="flex-1 px-4 py-3 border border-[#EFEBE4] focus:border-[#C59B6D]/50 focus:ring-4 focus:ring-[#F7F2EB] outline-none rounded-xl text-sm font-sans"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSection}
                      className="px-5 bg-[#C59B6D] hover:bg-[#B0875C] text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                </div>

                {/* Navigation CTA */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: Extra Instructions
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 5: EXTRA INSTRUCTIONS */}
          {step === 5 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <Feather size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">Extra Instructions</h3>
                    <p className="text-xs text-gray-400 font-light">Add custom prompts, constraints, or directives for the writing engine.</p>
                  </div>
                </div>

                {/* Large Textarea */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider text-left">Directives Area</label>
                  <textarea 
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                    placeholder="Provide specific notes e.g., 'Focus heavily on digital transformations post-2022 inside emerging universities.'..."
                    className="w-full px-4 py-4 h-48 border border-[#EFEBE4] focus:border-[#C59B6D]/50 focus:ring-4 focus:ring-[#F7F2EB] outline-none rounded-2xl text-sm font-sans bg-white transition-all resize-none shadow-inner"
                  />
                </div>

                {/* Quick suggestions selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Click to inject suggested prompts</label>
                  <div className="flex flex-wrap gap-2.5">
                    {SUGGESTIONS.map(sug => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => setExtraInstructions(prev => prev ? prev + "\n" + sug : sug)}
                        className="px-3.5 py-2 border border-[#EFEBE4] hover:bg-[#F7F2EB] rounded-lg text-left text-[11px] font-sans text-gray-600 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={10} className="text-[#C59B6D]" />
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation CTA */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: References
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 6: REFERENCES */}
          {step === 6 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7F2EB] flex items-center justify-center">
                    <BookOpen size={20} className="text-[#C59B6D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0B132B]">References</h3>
                    <p className="text-xs text-gray-400 font-light font-sans">Provide reference literature or choose pre-verified templates.</p>
                  </div>
                </div>

                {/* Option Tabs */}
                <div className="flex border-b border-[#EFEBE4] text-xs font-semibold">
                  <button 
                    type="button" 
                    onClick={() => setRefType("templates")}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all cursor-pointer ${
                      refType === "templates" ? "border-[#C59B6D] text-[#C59B6D]" : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Use LumiScript Templates
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setRefType("upload")}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all cursor-pointer ${
                      refType === "upload" ? "border-[#C59B6D] text-[#C59B6D]" : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Upload References
                  </button>
                </div>

                {/* Upload references layout */}
                {refType === "upload" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Mock drag & drop box */}
                    <div className="relative border-2 border-dashed border-[#EFEBE4] rounded-2xl p-8 bg-[#FCFAF7]/50 flex flex-col items-center justify-center gap-3 transition-colors hover:border-[#C59B6D]/30 group">
                      <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.docx,.pptx,.txt"
                        onChange={handleMockFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#EFEBE4] group-hover:border-[#C59B6D]/30 transition-colors">
                        {isUploading ? (
                          <Loader2 size={18} className="text-[#C59B6D] animate-spin" />
                        ) : (
                          <Upload size={18} className="text-[#C59B6D]" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-[#0B132B] mb-1">
                          {isUploading ? "Uploading files..." : "Drag & Drop papers here"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-light font-sans">
                          Supports PDF, DOCX, PPT, TXT up to 15MB
                        </p>
                      </div>
                    </div>

                    {/* Uploaded files listing */}
                    {uploadedFiles.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Uploaded Files</label>
                        <div className="flex flex-col gap-2.5">
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="p-3 bg-white border border-[#EFEBE4] rounded-xl flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-[#0B132B] font-medium truncate">
                                <FileText size={14} className="text-[#C59B6D] shrink-0" />
                                <span className="truncate">{file.name}</span>
                              </div>
                              <span className="font-mono text-[10px] text-gray-400">{file.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* LumiScript Template Cards selector */}
                {refType === "templates" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {MOCK_TEMPLATES.map(tmpl => {
                      const isSelected = selectedTemplate === tmpl.id;
                      return (
                        <button
                          key={tmpl.id}
                          type="button"
                          onClick={() => setSelectedTemplate(tmpl.id)}
                          className={`p-5 rounded-2xl border text-left flex flex-col gap-2 relative transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-white border-[#C59B6D] ring-4 ring-[#F7F2EB] shadow-sm" 
                              : "bg-[#FCFAF7]/50 border-[#EFEBE4] hover:bg-[#F7F2EB]/50"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#C59B6D] text-white flex items-center justify-center">
                              <Check size={10} className="stroke-[3px]" />
                            </div>
                          )}
                          <h4 className="font-serif text-sm font-bold text-[#0B132B]">{tmpl.title}</h4>
                          <p className="text-[10px] text-gray-400 font-light leading-relaxed">{tmpl.desc}</p>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Navigation CTA */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Next: Review & Generate
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

          {/* STEP 7: REVIEW & GENERATE */}
          {step === 7 && !isGenerating && !isGenerationComplete && (
            <motion.div 
              key="step7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-3 gap-8 items-start"
            >
              <div className="md:col-span-2 flex flex-col gap-8">
                
                {/* Intro details */}
                <div className="bg-white border border-[#EFEBE4] rounded-3xl p-8 shadow-sm flex flex-col gap-4 text-left">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B]">Review your Report details</h3>
                  <p className="text-xs text-gray-400 font-light font-sans leading-relaxed">
                    Please review all parameters before launching the autonomous compilation pipeline. You can modify any step instantly.
                  </p>
                </div>

                {/* Summary Collapsible-style cards */}
                <div className="flex flex-col gap-4 text-left">
                  
                  {/* Card 1: Basics */}
                  <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                      <span className="font-serif text-sm font-bold text-[#0B132B]">1. Report Basics</span>
                      <button 
                        onClick={() => handleEditJump(1)}
                        className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 text-xs text-gray-500 font-light">
                      <div>Topic: <strong className="text-[#0B132B] font-semibold block">{title || "Impact of Artificial Intelligence on Education"}</strong></div>
                      <div>Type: <strong className="text-[#0B132B] font-semibold block">{type}</strong></div>
                      <div>Academic Level: <strong className="text-[#0B132B] font-semibold block">{level}</strong></div>
                      <div>Citation Style: <strong className="text-[#0B132B] font-semibold block">{citation} Style</strong></div>
                      <div>Pages density: <strong className="text-[#0B132B] font-semibold block">{pages} Pages</strong></div>
                    </div>
                  </div>

                  {/* Card 2: Style & Font */}
                  <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                      <span className="font-serif text-sm font-bold text-[#0B132B]">2. Style & Font</span>
                      <button 
                        onClick={() => handleEditJump(2)}
                        className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 text-xs text-gray-500 font-light">
                      <div>Writing Tone: <strong className="text-[#0B132B] font-semibold block">{writingStyle}</strong></div>
                      <div>Font Face: <strong className="text-[#0B132B] font-semibold block" style={{ fontFamily: fontFamily }}>{fontFamily}</strong></div>
                    </div>
                  </div>

                  {/* Card 3: Images */}
                  <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                      <span className="font-serif text-sm font-bold text-[#0B132B]">3. Graphical Assets</span>
                      <button 
                        onClick={() => handleEditJump(3)}
                        className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      {includeImages ? (
                        <span>Autonomously include <strong className="text-[#0B132B] font-semibold">{imageCount} Figures</strong> placed contextually.</span>
                      ) : (
                        <span>Do not include graphical diagrams.</span>
                      )}
                    </div>
                  </div>

                  {/* Card 4: Sections */}
                  <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                      <span className="font-serif text-sm font-bold text-[#0B132B]">4. Custom LaTeX Chapters</span>
                      <button 
                        onClick={() => handleEditJump(4)}
                        className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {selectedSections.map(sec => (
                        <span key={sec} className="px-2.5 py-1 bg-[#FCFAF7] border border-[#EFEBE4] rounded-full text-gray-600 font-medium">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 5: Extra Instructions */}
                  {extraInstructions && (
                    <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                      <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                        <span className="font-serif text-sm font-bold text-[#0B132B]">5. Custom Directives</span>
                        <button 
                          onClick={() => handleEditJump(5)}
                          className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed italic">
                        “{extraInstructions}”
                      </p>
                    </div>
                  )}

                  {/* Card 6: References */}
                  <div className="bg-white border border-[#EFEBE4] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#FAF7F2]">
                      <span className="font-serif text-sm font-bold text-[#0B132B]">6. Literature References</span>
                      <button 
                        onClick={() => handleEditJump(6)}
                        className="text-xs font-semibold text-[#C59B6D] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      {refType === "templates" ? (
                        <span>Using pre-verified literature template: <strong className="text-[#0B132B] font-semibold">{selectedTemplate}</strong></span>
                      ) : (
                        <span>Using <strong className="text-[#0B132B] font-semibold">{uploadedFiles.length} uploaded files</strong> as prompt context.</span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Final Navigation generate button CTA */}
                <div className="flex justify-between items-center pt-4">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[#EFEBE4] hover:bg-[#F7F2EB] text-[#0B132B] font-sans text-xs font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-10 py-4 bg-[#0B132B] text-white hover:bg-[#1C2541] font-sans text-sm font-bold rounded-full shadow-lg transition-all cursor-pointer"
                  >
                    Generate Report
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>

              {/* Sidebar Cost card */}
              <div className="w-full">
                {costCardComponent}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

    </div>
  );
}
