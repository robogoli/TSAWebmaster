import { useState } from "react";
import { Clock, Search, PenTool, BookOpen, CheckCircle2, Lock, ChevronRight, Sparkles } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const SOURCES = [
  { section: "OPENSTAX BIOLOGY 2e — §8.1", title: "Where the energy comes from", text: "Photosynthesis converts light energy into chemical energy. Carbon dioxide and water are inputs used to produce carbohydrates." },
  { section: "OPENSTAX BIOLOGY 2e — CH. 7 & 8", title: "Plants respire, too", text: "Plant cells use cellular respiration to release energy from sugars. Respiration occurs in the light as well as in the dark." },
  { section: "OPENSTAX BIOLOGY 2e — §8.1", title: "Where the matter comes from", text: "Carbon from atmospheric CO₂ is incorporated into sugars and other organic molecules. Soil minerals are essential nutrients, but are not the main source of a tree's dry mass." }
];

export function FactCheckMissionView() {
  const { setCurrentView, completeMission, addXP, triggerConfetti } = useGame();
  const [verdicts, setVerdicts] = useState({ A: "Supported", B: "False", C: "False" });
  const [reasonings, setReasonings] = useState({
    A: "Biology describes light energy being converted into chemical energy. CO₂ and water produce carbohydrates, so claim is supported.",
    B: "According to OpenStax Biology 2e Ch. 7 & 8, plant cells respire continuously in the light as well as in the dark to release energy.",
    C: "OpenStax Biology 2e §8.1 reveals that most dry mass comes from atmospheric carbon dioxide, while soil minerals account for a tiny percentage."
  });
  const [reflectionChecked, setReflectionChecked] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const claims = [
    { id: "A", title: "Claim A · Light energy & sugars", text: "Plants use light energy to make sugars from carbon dioxide and water during photosynthesis.", isSample: true },
    { id: "B", title: "Claim B · Respiration timing", text: "Plants only carry out cellular respiration at night, when photosynthesis stops.", isSample: false },
    { id: "C", title: "Claim C · A tree’s growing mass", text: "Most of the dry mass a tree gains as it grows comes from minerals absorbed from the soil.", isSample: false }
  ];

  const answeredCount = claims.filter(c => verdicts[c.id] && reasonings[c.id]?.trim().length > 10).length;
  const allReady = answeredCount === 3;

  const handleFinish = () => {
    sound.playSuccess();
    triggerConfetti();
    setIsCompleted(true);
    completeMission("detective", 100, "data-detective");
    addXP(100, "Fact-check the fluent mission completed");
  };

  const handleVerdict = (id, choice) => {
    if (choice === "False") sound.playSuccess(); else sound.playClick();
    setVerdicts(prev => ({ ...prev, [id]: choice }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button type="button" onClick={() => { sound.playClick(); setCurrentView("learning-path"); }} className="hover:text-emerald-400 transition-colors cursor-pointer">AI Quest</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300">Daily challenge</span>
      </nav>

      <ScrollReveal as="header" animation="fade-up" className="space-y-4 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Fact-check the fluent.</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">A confident answer isn’t always correct. Investigate three AI claims about photosynthesis, then explain what the evidence actually supports.</p>
        <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono">
          {[
            { icon: Clock, title: "10-15 MIN", sub: "At your own pace" },
            { icon: Search, title: "3 CLAIMS", sub: "Evidence before confidence" },
            { icon: PenTool, title: "YOUR REASONING", sub: "No AI tool required" }
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-emerald-400" />
              <div><div className="font-bold text-emerald-400">{title}</div><div className="text-[11px] text-slate-400">{sub}</div></div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" animation="fade-up" delay={80} aria-label="Mission Instructions" className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Your mission: check it, don't just accept it.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {[
            { num: "01", title: "Read with a skeptical eye", desc: "Separate the response into claims. Decide what you think before checking evidence." },
            { num: "02", title: "Follow the evidence", desc: "Use source notes and your textbook. Mark each claim supported, false, or uncertain." },
            { num: "03", title: "Explain in your own words", desc: "Cite a source, correct any error, and name one thing you would still check." }
          ].map(s => (
            <div key={s.num} className="space-y-1 border-t border-slate-800 pt-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400"><span>{s.num}</span><span>{s.title}</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* OUTPUT VS EVIDENCE */}
      <ScrollReveal animation="fade-up" delay={100} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <article className="rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-7 space-y-5">
          <header className="border-b border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">01 / EXAMINE THE OUTPUT</span>
            <blockquote className="text-base sm:text-lg font-semibold text-white leading-relaxed m-0">“Explain how plants get energy and where a growing tree’s mass comes from.”</blockquote>
          </header>
          <div className="space-y-4">
            {claims.map(c => (
              <div key={c.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">{c.id}</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside aria-label="Evidence Starter Kit" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-7 space-y-4">
          <header className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white">Evidence starter kit</h2>
              <p className="text-[11px] text-slate-400">Adapted source notes from OpenStax Biology 2e.</p>
            </div>
          </header>
          <div className="space-y-4 text-xs">
            {SOURCES.map(s => (
              <div key={s.title} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">{s.section}</span>
                <h3 className="font-bold text-white text-xs">{s.title}</h3>
                <p className="text-slate-300 leading-relaxed">{s.text}</p>
              </div>
            ))}
            <button type="button" onClick={() => { sound.playClick(); setCurrentView("resources"); }} className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <BookOpen className="w-3.5 h-3.5" /><span>Open Full Student Resource Hub &amp; Citations</span>
            </button>
          </div>
        </aside>
      </ScrollReveal>

      {/* REASONING WORKSTATION */}
      <ScrollReveal as="section" animation="fade-up" delay={80} aria-label="Cadet Reasoning Workstation" className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Your judgment. Your evidence.</h2>
            <p className="text-xs sm:text-sm text-slate-400">An example draft is shown for claim A. Make the remaining judgments yourself.</p>
          </div>
          <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">ILLUSTRATIVE DRAFT</span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {claims.map(c => (
              <article key={c.id} className="rounded-2xl border border-slate-800 bg-[#091122] p-5 sm:p-6 space-y-4">
                <header className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{c.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${c.isSample ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-slate-900 border border-slate-800 text-slate-400"}`}>{c.isSample ? "SAMPLE DRAFT" : "TO REVIEW"}</span>
                </header>
                <div className="flex items-center gap-2">
                  {["Supported", "False", "Uncertain"].map(v => {
                    const active = verdicts[c.id] === v;
                    const col = v === "Supported" ? "emerald" : v === "False" ? "rose" : "amber";
                    return (
                      <button key={v} type="button" onClick={() => handleVerdict(c.id, v)} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${active ? `bg-${col}-500/20 text-${col}-300 border border-${col}-500/50 shadow-sm` : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"}`}>
                        {active && <CheckCircle2 className="w-3.5 h-3.5" />}<span>{v}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">EVIDENCE + REASONING</label>
                  {c.isSample ? (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">{reasonings[c.id]}</div>
                  ) : (
                    <textarea value={reasonings[c.id]} onChange={e => setReasonings(prev => ({ ...prev, [c.id]: e.target.value }))} rows={3} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed focus:border-emerald-500 focus:outline-none" placeholder="Explain your verdict in your own words. Add the source title and section; correct the claim if needed." />
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside aria-label="Progress Widget" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-6 sticky top-24">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">CHALLENGE PROGRESS</span>
              <div className="flex items-baseline gap-2"><span className="text-4xl font-black text-white font-mono">{answeredCount} / 3</span><span className="text-xs text-slate-400 font-mono">claims drafted</span></div>
              <p className="text-xs text-slate-400 mt-2">{answeredCount < 3 ? `${3 - answeredCount} claim(s) remain to evaluate.` : "All claims reviewed with evidence notes attached!"}</p>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <span className="text-xs font-semibold text-white block">Ready when you can...</span>
              <ul className="space-y-2 text-xs text-slate-300 list-none p-0 m-0">
                <li className="flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${verdicts.A && verdicts.B && verdicts.C ? "text-emerald-400" : "text-slate-600"}`} /><span>Give a verdict for all 3 claims</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${reasonings.B.length > 20 && reasonings.C.length > 20 ? "text-emerald-400" : "text-slate-600"}`} /><span>Cite evidence for each verdict</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Correct errors in your own words</span></li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="next-check" checked={reflectionChecked} onChange={e => setReflectionChecked(e.target.checked)} className="rounded border-slate-700 text-emerald-500 focus:ring-0 bg-slate-900 cursor-pointer" />
                  <label htmlFor="next-check" className="cursor-pointer">Name a useful next check</label>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              {!isCompleted ? (
                <button type="button" onClick={handleFinish} disabled={!allReady} className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${allReady ? "bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 hover:opacity-90 shadow-md cursor-pointer" : "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"}`}>
                  {allReady ? <><Sparkles className="w-4 h-4" /><span>Finish challenge (+100 XP)</span></> : <><Lock className="w-3.5 h-3.5" /><span>Finish challenge</span></>}
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>MISSION COMPLETE!</span></div>
                  <p className="text-[11px] text-slate-300">+100 XP and Data Detective badge credited to your cadet profile.</p>
                  <button type="button" onClick={() => { sound.playClick(); setCurrentView("progress"); }} className="w-full mt-2 py-2 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer">View Progress Dashboard</button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </ScrollReveal>
    </main>
  );
}
