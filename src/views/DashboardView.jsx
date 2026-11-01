import { Award, ArrowRight } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const TRACK_PROGRESS = [
  { name: "AI foundations", ratio: "3 / 3 · 100%", width: "w-full", color: "bg-emerald-400" },
  { name: "Tools & techniques", ratio: "1 / 3 · 33%", width: "w-1/3", color: "bg-emerald-400" },
  { name: "Responsible AI", ratio: "0 / 3 · 0%", width: "w-0", color: "bg-slate-700" }
];

const BADGES_PREVIEW = [
  { name: "AI Pathfinder", desc: "Finish all 3 foundation lessons", icon: "🌀", earned: true },
  { name: "Data Detective", desc: "Finish both foundation missions", icon: "🎯", earned: true },
  { name: "Prompt Pilot", desc: "Finish all 3 tools lessons", icon: ">_", earned: false },
  { name: "Ethics Navigator", desc: "Finish all 3 ethics lessons", icon: "🛡️", earned: false }
];

export function DashboardView() {
  const { state, setCurrentView, openCertificate } = useGame();
  const studentName = state.studentName ? state.studentName.toUpperCase() : "ALEX";
  const xp = state.xp || 600;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <ScrollReveal as="header" animation="fade-up" className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Dashboard Example</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Track your curriculum progress, earned badge constellation, and upcoming milestones.</p>
        </div>
        <button type="button" onClick={() => { sound.playClick(); openCertificate(); }} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer">
          <Award className="w-3.5 h-3.5 text-emerald-400" /><span>Official Cadet Diploma</span>
        </button>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cadet Stats & 40% Radial gauge */}
        <article className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-6">
          <header className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">{studentName} / GRADE 10</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">SAMPLE</span>
          </header>

          <figure className="relative flex flex-col items-center justify-center py-4 m-0">
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#172338" strokeWidth="7" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="7" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.4)} strokeLinecap="round" fill="none" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white font-mono">40%</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">4 / 10 ACTIVITIES</span>
            </div>
          </figure>

          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-white font-mono">{xp} XP</div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">LEVEL 02 / EXPLORER</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-700" style={{ width: "60%" }} />
              </div>
              <div className="text-[11px] font-mono text-slate-400">400 XP to Level 03 · 1,000 XP milestone</div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-2">(4 lessons + 2 missions) × 100 XP = 600 XP. Badges recognize milestones; no bonus XP.</p>
          </div>
        </article>

        {/* Right Column: Module completion & Badge constellation */}
        <div className="lg:col-span-8 space-y-6">
          <section aria-label="Module Completion" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5">
            <header className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white">Module completion</h2>
              <span className="text-xs font-mono text-slate-400">4 / 9 LESSONS</span>
            </header>
            <div className="space-y-4">
              {TRACK_PROGRESS.map(tp => (
                <div key={tp.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200">{tp.name}</span>
                    <span className={tp.width === "w-0" ? "text-slate-500 font-bold" : "text-emerald-400 font-bold"}>{tp.ratio}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className={`h-full ${tp.color} rounded-full ${tp.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Badge Constellation" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5">
            <header className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white">Your badge constellation</h2>
              <span className="text-xs font-mono text-slate-400">2 / 4 EARNED</span>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {BADGES_PREVIEW.map(b => (
                <article key={b.name} className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${b.earned ? "border-emerald-500/30 bg-[#0c1628]" : "border-slate-800 bg-slate-900/40 opacity-60"}`}>
                  <figure className={`h-10 w-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold m-0 ${b.earned ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400" : "bg-slate-800 border border-slate-700 text-slate-400"}`}>{b.icon}</figure>
                  <div>
                    <h3 className={`text-sm font-bold ${b.earned ? "text-white" : "text-slate-300"}`}>{b.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${b.earned ? "text-emerald-400" : "text-slate-500"}`}>{b.earned ? "EARNED" : "NOT YET EARNED"}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* Callout Banner */}
      <ScrollReveal as="section" animation="fade-up" delay={100} aria-label="Ready for First Mission" onClick={() => { sound.playClick(); setCurrentView("learning-path"); }} className="group relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-[#07241c] via-[#091f1b] to-[#0a1524] p-8 sm:p-10 transition-all hover:border-emerald-400 cursor-pointer">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">08 / READY FOR YOUR FIRST MISSION?</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">The future isn’t just artificial.<br />It’s what you make of it.</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Begin with “What is AI?” A 15-minute lesson. A clearer view of the technology around you.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 shadow-inner group-hover:scale-105 transition-transform">
              <div className="absolute inset-1 rounded-full border border-emerald-500/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-white font-mono leading-none">01</div>
                <div className="text-[9px] font-mono text-emerald-400 tracking-wider uppercase mt-1">WHAT IS AI?</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
