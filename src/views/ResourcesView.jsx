import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileText,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { RESOURCES_DATA } from "../data/gameData";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";

export function ResourcesView() {
  const { setCurrentView, addToast } = useGame();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [customRole, setCustomRole] = useState("brainstorming");
  const [assignmentTopic, setAssignmentTopic] = useState("photosynthesis vs respiration");
  const [customDisclosureCopied, setCustomDisclosureCopied] = useState(false);

  const tabs = [
    { id: "all", label: "All Resources" },
    { id: "cheatsheet", label: "Student AI Cheat Sheet" },
    { id: "evidence", label: "Evidence Starter Kit" },
    { id: "disclosure", label: "Disclosure Generator" },
    { id: "tools", label: "Safe Learning Tools" },
    { id: "glossary", label: "Plain-English Glossary" },
    { id: "standards", label: "TSA / Standards Matrix" }
  ];

  const handleCopy = (text, index) => {
    sound.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    addToast("Copied statement to clipboard!", "success");
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const generatedCustomDisclosure = useMemo(() => {
    if (customRole === "brainstorming") {
      return `I used an AI assistant to help brainstorm initial perspectives on "${assignmentTopic || "this topic"}". I checked all generated claims against our course textbook, verified primary evidence, and wrote the final analysis myself.`;
    }
    if (customRole === "tutoring") {
      return `I used an interactive AI tutor for Socratic practice questions about "${assignmentTopic || "this topic"}". I did not copy or paste any AI-generated answers into this submitted work.`;
    }
    if (customRole === "debugging") {
      return `I authored the core project code for "${assignmentTopic || "this project"}". An AI tool was used exclusively to assist in diagnosing syntax errors and explaining error stack traces.`;
    }
    return `I consulted an AI tool for feedback on my rough draft of "${assignmentTopic || "this assignment"}". All writing and final arguments represent my own human thinking.`;
  }, [customRole, assignmentTopic]);

  const filteredGlossary = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return RESOURCES_DATA.glossaryTerms;
    return RESOURCES_DATA.glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.plainEnglish.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Header Banner */}
      <header className="space-y-4 border-b border-slate-800/80 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>STUDENT TOOLKIT & LEARNING RESOURCES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Resources & Reference Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Everything you need to navigate AI with confidence: practical classroom guidelines, 
              verified textbook citations, one-click teacher disclosure statements, and zero-jargon definitions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCurrentView("fact-check");
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Launch "Fact-Check The Fluent"</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Global Live Search Bar */}
        <div className="relative max-w-2xl pt-2">
          <Search className="absolute left-3.5 top-5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search terms, tools, citations, or rules (e.g. 'tokens', 'OpenStax', 'disclosure')..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-5 text-xs font-mono text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </header>

      {/* Navigation Filter Tabs */}
      <nav aria-label="Resource Categories" className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/60 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ===================================================================== */}
      {/* SECTION 1: STUDENT AI CHEAT SHEET (TRAFFIC LIGHT) */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "cheatsheet") && (
        <section aria-labelledby="cheatsheet-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="cheatsheet-heading" className="text-xl sm:text-2xl font-extrabold text-white">
                {RESOURCES_DATA.cheatSheet.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {RESOURCES_DATA.cheatSheet.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GREEN CARD */}
            <article className="rounded-2xl border border-emerald-500/40 bg-[#091722] p-6 space-y-4 shadow-lg">
              <header className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <h3 className="text-sm font-bold text-emerald-300 font-mono uppercase tracking-wider">
                  GREEN: Allowed &amp; Helpful
                </h3>
              </header>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                {RESOURCES_DATA.cheatSheet.categories[0].items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* YELLOW CARD */}
            <article className="rounded-2xl border border-amber-500/40 bg-[#1e170e] p-6 space-y-4 shadow-lg">
              <header className="flex items-center gap-2 pb-2 border-b border-amber-500/20">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <h3 className="text-sm font-bold text-amber-300 font-mono uppercase tracking-wider">
                  YELLOW: Ask &amp; Disclose
                </h3>
              </header>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                {RESOURCES_DATA.cheatSheet.categories[1].items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* RED CARD */}
            <article className="rounded-2xl border border-rose-500/40 bg-[#200d14] p-6 space-y-4 shadow-lg">
              <header className="flex items-center gap-2 pb-2 border-b border-rose-500/20">
                <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
                <h3 className="text-sm font-bold text-rose-300 font-mono uppercase tracking-wider">
                  RED: Strictly Prohibited
                </h3>
              </header>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                {RESOURCES_DATA.cheatSheet.categories[2].items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: EVIDENCE STARTER KIT (BIOLOGY 2E & FACT-CHECKING) */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "evidence") && (
        <section aria-labelledby="evidence-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 id="evidence-heading" className="text-xl sm:text-2xl font-extrabold text-white">
                Evidence Starter Kit: Real Citations vs AI Guesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Peer-reviewed reference notes from OpenStax Biology 2e used to evaluate AI claims.
              </p>
            </div>
            <a
              href="https://openstax.org/books/biology-2e/pages/1-introduction"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              <span>Explore OpenStax Online Library</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.evidenceKit.sources.map((src, index) => (
              <article
                key={index}
                className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <header>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      SOURCE {index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      {src.citation}
                    </h3>
                  </header>

                  <blockquote className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
                    "{src.summary}"
                  </blockquote>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Relevance:</strong> {src.relevance}
                  </p>
                </div>

                <footer className="pt-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopy(src.summary, `src-${index}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 cursor-pointer"
                  >
                    {copiedIndex === `src-${index}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied note</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy citation note</span>
                      </>
                    )}
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: DISCLOSURE GENERATOR */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "disclosure") && (
        <section aria-labelledby="disclosure-heading" className="rounded-2xl border border-slate-800 bg-[#0a1326] p-6 sm:p-8 space-y-6">
          <header className="space-y-1">
            <h2 id="disclosure-heading" className="text-xl sm:text-2xl font-extrabold text-white">
              Student AI Disclosure Statement Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Honest, crystal-clear statements you can paste at the end of your papers to tell your teacher exactly how AI helped.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">
                  HOW DID YOU USE AI?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "brainstorming", label: "Brainstorming" },
                    { id: "tutoring", label: "Practice Tutor" },
                    { id: "debugging", label: "Code Debugging" },
                    { id: "feedback", label: "Draft Feedback" }
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCustomRole(role.id);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left cursor-pointer transition-all ${
                        customRole === role.id
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold"
                          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">
                  ASSIGNMENT TOPIC OR TITLE
                </label>
                <input
                  type="text"
                  value={assignmentTopic}
                  onChange={(e) => setAssignmentTopic(e.target.value)}
                  placeholder="e.g. Photosynthesis lab report, AP History essay"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  GENERATED DISCLOSURE STATEMENT
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy(generatedCustomDisclosure, "custom-disclosure");
                    setCustomDisclosureCopied(true);
                    setTimeout(() => setCustomDisclosureCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono cursor-pointer transition-all"
                >
                  {customDisclosureCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Statement</span>
                    </>
                  )}
                </button>
              </div>

              <blockquote className="p-4 rounded-lg bg-[#070d1a] border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans">
                "{generatedCustomDisclosure}"
              </blockquote>

              <p className="text-[11px] text-slate-400 italic">
                Tip: Place this right below your Works Cited or Bibliography. High-school teachers and TSA judges love seeing genuine ownership and honesty.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* SECTION 4: SAFE LEARNING TOOLS DIRECTORY */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "tools") && (
        <section aria-labelledby="tools-heading" className="space-y-6">
          <div>
            <h2 id="tools-heading" className="text-xl sm:text-2xl font-extrabold text-white">
              Recommended Safe AI Learning Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Zero-install, browser-based tools designed for ethical exploration without risking private data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.toolsDirectory.map((tool, index) => (
              <article
                key={index}
                className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <header className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                        {tool.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {tool.name}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono shrink-0">
                      {tool.badge}
                    </span>
                  </header>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <footer className="pt-3 border-t border-slate-800/80">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Launch Tool in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* SECTION 5: PLAIN-ENGLISH AI GLOSSARY */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "glossary") && (
        <section aria-labelledby="glossary-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 id="glossary-heading" className="text-xl sm:text-2xl font-extrabold text-white">
                Plain-English AI Glossary
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                No jargon, no corporate fluff. Clear explanations of the core technical terms.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Showing {filteredGlossary.length} of {RESOURCES_DATA.glossaryTerms.length} terms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, index) => (
              <article
                key={index}
                className="p-4 rounded-xl border border-slate-800 bg-[#091122] hover:border-slate-700 transition-all space-y-2"
              >
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{item.term}</span>
                  <span className="text-[10px] font-mono text-emerald-400">DEF</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.plainEnglish}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* SECTION 6: STANDARDS & CURRICULUM ALIGNMENT */}
      {/* ===================================================================== */}
      {(activeTab === "all" || activeTab === "standards") && (
        <section aria-labelledby="standards-heading" className="rounded-2xl border border-slate-800 bg-[#08101e] p-6 sm:p-8 space-y-6">
          <header className="space-y-1">
            <h2 id="standards-heading" className="text-xl sm:text-2xl font-extrabold text-white">
              Educational Standards Alignment (AI4K12 &amp; CSTA)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Documented alignment for TSA Webmaster evaluators, computer science teachers, and curriculum coordinators.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES_DATA.standardsAlignment.map((group, index) => (
              <div key={index} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-emerald-300 font-mono">
                  {group.framework}
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                  {group.guidelines.map((line, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
