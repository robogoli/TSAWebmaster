import { Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export function DashboardView() {
  const { state, setCurrentView, openCertificate } = useGame();

  const studentName = state.studentName ? state.studentName.toUpperCase() : 'ALEX';
  const xp = state.xp || 600;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Page Title */}
      <header className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Dashboard Example
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your curriculum progress, earned badge constellation, and upcoming milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              openCertificate();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Cadet Diploma</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Left Cadet Card + Right Module & Badge Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Cadet Alex / Grade 10 & 40% Radial progress */}
        <article className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-6">
          <header className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              {studentName} / GRADE 10
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
              SAMPLE
            </span>
          </header>

          {/* 40% Circular Progress Gauge */}
          <figure className="relative flex flex-col items-center justify-center py-4 m-0">
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background ring track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#172338"
                strokeWidth="7"
                fill="none"
              />
              {/* Active mint stroke */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10b981"
                strokeWidth="7"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.4)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white font-mono">40%</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                4 / 10 ACTIVITIES
              </span>
            </div>
          </figure>

          {/* XP & Level Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-white font-mono">
                {xp} XP
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                LEVEL 02 / EXPLORER
              </span>
            </div>

            {/* Progress bar to Level 03 */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: '60%' }}
                />
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                400 XP to Level 03 · 1,000 XP milestone
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
              (4 lessons + 2 missions) × 100 XP = 600 XP. Badges recognize milestones; no bonus XP.
            </p>
          </div>
        </article>

        {/* Right Column (8 cols): Module completion & Badge constellation */}
        <div className="lg:col-span-8 space-y-6">
          {/* Module Completion Card */}
          <section aria-label="Module Completion" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5">
            <header className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-sm font-bold text-white">Module completion</h2>
              <span className="text-xs font-mono text-slate-400">4 / 9 LESSONS</span>
            </header>

            <div className="space-y-4">
              {/* Track 1: AI foundations */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">AI foundations</span>
                  <span className="text-emerald-400 font-bold">3 / 3 · 100%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-full" />
                </div>
              </div>

              {/* Track 2: Tools & techniques */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Tools & techniques</span>
                  <span className="text-emerald-400 font-bold">1 / 3 · 33%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-1/3" />
                </div>
              </div>

              {/* Track 3: Responsible AI */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Responsible AI</span>
                  <span className="text-slate-500 font-bold">0 / 3 · 0%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="h-full bg-slate-700 rounded-full w-0" />
                </div>
              </div>
            </div>
          </section>

          {/* Your badge constellation Card */}
          <section aria-label="Badge Constellation" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5">
            <header className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-sm font-bold text-white">Your badge constellation</h2>
              <span className="text-xs font-mono text-slate-400">2 / 4 EARNED</span>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Badge 1: AI Pathfinder */}
              <article className="p-4 rounded-xl border border-emerald-500/30 bg-[#0c1628] flex flex-col justify-between space-y-3">
                <figure className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 m-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" strokeDasharray="30 10" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </figure>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Pathfinder</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Finish all 3 foundation lessons
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  EARNED
                </span>
              </article>

              {/* Badge 2: Data Detective */}
              <article className="p-4 rounded-xl border border-emerald-500/30 bg-[#0c1628] flex flex-col justify-between space-y-3">
                <figure className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 m-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 8V4h4" />
                    <path d="M20 8V4h-4" />
                    <path d="M4 16v4h4" />
                    <path d="M20 16v4h-4" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </figure>
                <div>
                  <h3 className="text-sm font-bold text-white">Data Detective</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Finish both foundation missions
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  EARNED
                </span>
              </article>

              {/* Badge 3: Prompt Pilot */}
              <article className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between space-y-3 opacity-60">
                <figure className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 m-0">
                  <span className="font-mono text-sm font-bold">&gt;_</span>
                </figure>
                <div>
                  <h3 className="text-sm font-bold text-slate-300">Prompt Pilot</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Finish all 3 tools lessons
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  NOT YET EARNED
                </span>
              </article>

              {/* Badge 4: Ethics Navigator */}
              <article className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between space-y-3 opacity-60">
                <figure className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 m-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </figure>
                <div>
                  <h3 className="text-sm font-bold text-slate-300">Ethics Navigator</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Finish all 3 ethics lessons
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  NOT YET EARNED
                </span>
              </article>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Banner Card (The future isn't just artificial) matching Screenshot 5 */}
      <section
        aria-label="Ready for First Mission"
        onClick={() => {
          sound.playClick();
          setCurrentView('learning-path');
        }}
        className="group relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-[#07241c] via-[#091f1b] to-[#0a1524] p-8 sm:p-10 transition-all hover:border-emerald-400 cursor-pointer"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              08 / READY FOR YOUR FIRST MISSION?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              The future isn’t just artificial.
              <br />
              It’s what you make of it.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Begin with “What is AI?” A 15-minute lesson. A clearer view of the technology around you.
            </p>
          </div>

          {/* Right Graphic: Circular Dial 01 WHAT IS AI? */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 shadow-inner group-hover:scale-105 transition-transform">
              <div className="absolute inset-1 rounded-full border border-emerald-500/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-white font-mono leading-none">01</div>
                <div className="text-[9px] font-mono text-emerald-400 tracking-wider uppercase mt-1">
                  WHAT IS AI?
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>
    </main>
  );
}
