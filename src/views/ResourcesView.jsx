import React, { useState, useMemo } from "react";
import { BookOpen, Search, Copy, Check, ExternalLink, ShieldAlert, HelpCircle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { RESOURCES_DATA } from "../data/gameData";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const TABS = [
  { id: "all", label: "All Resources" },
  { id: "cheatsheet", label: "Student AI Cheat Sheet" },
  { id: "evidence", label: "Evidence Starter Kit" },
  { id: "disclosure", label: "Disclosure Generator" },
  { id: "tools", label: "Safe Learning Tools" },
  { id: "glossary", label: "Plain-English Glossary" },
  { id: "standards", label: "TSA / Standards Matrix" }
];

export function ResourcesView() {
  const { setCurrentView, addToast } = useGame();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [customRole, setCustomRole] = useState("brainstorming");
  const [topic, setTopic] = useState("photosynthesis vs respiration");

  const handleCopy = (text, key) => {
    sound.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    addToast("Copied statement to clipboard!", "success");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const disclosure = useMemo(() => {
    if (customRole === "brainstorming") return `I used an AI assistant to help brainstorm initial perspectives on "${topic || "this topic"}". I verified all claims against our course textbook and wrote the final analysis myself.`;
    if (customRole === "tutoring") return `I used an interactive AI tutor for Socratic practice questions about "${topic || "this topic"}". No generated answers were copied into this submitted work.`;
    if (customRole === "debugging") return `I authored the core code for "${topic || "this project"}". An AI tool was used exclusively to assist in diagnosing syntax errors.`;
    return `I consulted an AI tool for feedback on my rough draft of "${topic || "this assignment"}". All writing and final arguments represent my own human thinking.`;
  }, [customRole, topic]);

  const filteredGlossary = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return RESOURCES_DATA.glossaryTerms;
    return RESOURCES_DATA.glossaryTerms.filter(item => item.term.toLowerCase().includes(q) || item.plainEnglish.toLowerCase().includes(q));
  }, [searchQuery]);

  const sheetIcons = [CheckCircle2, HelpCircle, ShieldAlert];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <BookOpen className="w-3.5 h-3.5" /><span>STUDENT TOOLKIT &amp; LEARNING RESOURCES</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Resources &amp; Reference Hub</h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">Everything you need to navigate AI with confidence: classroom guidelines, textbook citations, one-click teacher disclosures, and zero-jargon definitions.</p>
          </div>
          <button type="button" onClick={() => { sound.playClick(); setCurrentView("fact-check"); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold transition-all shrink-0 cursor-pointer">
            <Sparkles className="w-4 h-4 text-emerald-400" /><span>Launch "Fact-Check The Fluent"</span><ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative max-w-2xl pt-2">
          <Search className="absolute left-3.5 top-5 w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Quick search terms, tools, citations, or rules (e.g. 'tokens', 'OpenStax', 'disclosure')..." className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-sans" />
          {searchQuery && <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3.5 top-5 text-xs font-mono text-slate-400 hover:text-white cursor-pointer">Clear</button>}
        </div>
      </header>

      <nav aria-label="Categories" className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {TABS.map(t => (
          <button key={t.id} type="button" onClick={() => { sound.playClick(); setActiveTab(t.id); }} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${activeTab === t.id ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200"}`}>{t.label}</button>
        ))}
      </nav>

      {/* 1. CHEAT SHEET */}
      {(activeTab === "all" || activeTab === "cheatsheet") && (
        <ScrollReveal as="section" className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">{RESOURCES_DATA.cheatSheet.title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{RESOURCES_DATA.cheatSheet.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.cheatSheet.categories.map((cat, idx) => {
              const Icon = sheetIcons[idx] || CheckCircle2;
              const bg = cat.color === "emerald" ? "bg-[#091722] border-emerald-500/40" : cat.color === "amber" ? "bg-[#1e170e] border-amber-500/40" : "bg-[#200d14] border-rose-500/40";
              const col = cat.color === "emerald" ? "emerald" : cat.color === "amber" ? "amber" : "rose";
              return (
                <article key={cat.tier} className={`rounded-2xl border ${bg} p-6 space-y-4 shadow-lg`}>
                  <header className={`flex items-center gap-2 pb-2 border-b border-${col}-500/20`}>
                    <span className={`w-3 h-3 rounded-full bg-${col}-400 shrink-0`} />
                    <h3 className={`text-sm font-bold text-${col}-300 font-mono uppercase tracking-wider`}>{cat.tier}</h3>
                  </header>
                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon className={`w-4 h-4 text-${col}-400 shrink-0 mt-0.5`} /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      )}

      {/* 2. EVIDENCE STARTER KIT */}
      {(activeTab === "all" || activeTab === "evidence") && (
        <ScrollReveal as="section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Evidence Starter Kit: Real Citations vs AI Guesses</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Peer-reviewed notes from OpenStax Biology 2e used to evaluate AI claims.</p>
            </div>
            <a href="https://openstax.org/books/biology-2e/pages/1-introduction" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
              <span>OpenStax Library</span><ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.evidenceKit.sources.map((src, idx) => (
              <article key={idx} className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">SOURCE {idx + 1}</span>
                  <h3 className="text-sm font-bold text-white">{src.citation}</h3>
                  <blockquote className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic leading-relaxed">"{src.summary}"</blockquote>
                  <p className="text-xs text-slate-400"><strong className="text-slate-200">Relevance:</strong> {src.relevance}</p>
                </div>
                <footer className="pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => handleCopy(src.summary, `src-${idx}`)} className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 cursor-pointer">
                    {copiedKey === `src-${idx}` ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied note</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy citation note</span></>}
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* 3. DISCLOSURE GENERATOR */}
      {(activeTab === "all" || activeTab === "disclosure") && (
        <ScrollReveal as="section" className="rounded-2xl border border-slate-800 bg-[#0a1326] p-6 sm:p-8 space-y-6">
          <header>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Student AI Disclosure Statement Generator</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Honest statements you can paste below your citations to disclose how AI helped.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">HOW DID YOU USE AI?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "brainstorming", label: "Brainstorming" },
                    { id: "tutoring", label: "Practice Tutor" },
                    { id: "debugging", label: "Debugging" },
                    { id: "feedback", label: "Draft Review" }
                  ].map(r => (
                    <button key={r.id} type="button" onClick={() => { sound.playClick(); setCustomRole(r.id); }} className={`p-2.5 rounded-xl text-xs border text-left cursor-pointer transition-all ${customRole === r.id ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold" : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"}`}>{r.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">ASSIGNMENT TOPIC OR TITLE</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Photosynthesis lab report" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">GENERATED DISCLOSURE STATEMENT</span>
                <button type="button" onClick={() => handleCopy(disclosure, "custom-disclosure")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono cursor-pointer transition-all">
                  {copiedKey === "custom-disclosure" ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy Statement</span></>}
                </button>
              </div>
              <blockquote className="p-4 rounded-lg bg-[#070d1a] border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">"{disclosure}"</blockquote>
              <p className="text-[11px] text-slate-400 italic">Tip: Place this right below your Works Cited. Teachers value genuine intellectual honesty.</p>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* 4. SAFE TOOLS DIRECTORY */}
      {(activeTab === "all" || activeTab === "tools") && (
        <ScrollReveal as="section" className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Recommended Safe AI Learning Tools</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Zero-install browser tools designed for ethical exploration without risking private data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.toolsDirectory.map((t, idx) => (
              <article key={idx} className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <header className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">{t.category}</span>
                      <h3 className="text-base font-bold text-white mt-1">{t.name}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono shrink-0">{t.badge}</span>
                  </header>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
                </div>
                <footer className="pt-3 border-t border-slate-800">
                  <a href={t.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300">
                    <span>Launch Tool</span><ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* 5. GLOSSARY */}
      {(activeTab === "all" || activeTab === "glossary") && (
        <ScrollReveal as="section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Plain-English AI Glossary</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Clear explanations of core technical terms without corporate fluff.</p>
            </div>
            <span className="text-xs font-mono text-slate-500">Showing {filteredGlossary.length} terms</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <article key={idx} className="p-4 rounded-xl border border-slate-800 bg-[#091122] space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{item.term}</span><span className="text-[10px] font-mono text-emerald-400">DEF</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.plainEnglish}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* 6. STANDARDS MATRIX */}
      {(activeTab === "all" || activeTab === "standards") && (
        <ScrollReveal as="section" className="rounded-2xl border border-slate-800 bg-[#08101e] p-6 sm:p-8 space-y-6">
          <header>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Educational Standards Alignment (AI4K12 &amp; CSTA)</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Documented alignment for TSA Webmaster evaluators and CS teachers.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES_DATA.standardsAlignment.map((group, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-emerald-300 font-mono">{group.framework}</h3>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-none p-0 m-0">
                  {group.guidelines.map((line, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">✓</span><span>{line}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </main>
  );
}
