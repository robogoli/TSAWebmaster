import { useRef } from "react";
import { X, Award, Printer } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";

export const CertificateModal = () => {
  const { isCertificateOpen, closeCertificate, state, currentLevel } = useGame();
  const certRef = useRef(null);
  if (!isCertificateOpen) return null;

  const todayStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const certId = `AQ-${Math.abs(state.xp * 7919 + 104729).toString(16).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <section role="dialog" aria-modal="true" aria-label="Official Academy Diploma" className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#070c1a] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#091124]">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
            <Award className="w-4 h-4 text-amber-400" /><span>AI QUEST ACADEMY</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => { sound.playClick(); window.print(); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button type="button" onClick={() => { sound.playClick(); closeCertificate(); }} className="rounded-lg p-1.5 text-slate-400 hover:text-white cursor-pointer" aria-label="Close dialog">
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-8 sm:p-12" ref={certRef}>
          <article className="relative rounded-xl border-4 border-double border-amber-500/40 bg-gradient-to-b from-[#0b142c] via-[#090f22] to-[#070b18] p-8 text-center text-slate-200 shadow-2xl">
            <figure className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 m-0"><Award className="w-8 h-8" /></figure>
            <header>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold mb-1">GLOBAL AI TRAINING ACADEMY</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 font-serif">Certificate of AI Competency</h2>
              <p className="mt-3 text-xs text-slate-400 uppercase tracking-wider">THIS CREDENTIAL IS PROUDLY CONFERRED UPON</p>
            </header>
            <output className="my-3 py-2 text-2xl sm:text-3xl font-bold text-white border-b border-cyan-500/30 inline-block px-8">{state.studentName}</output>
            <p className="max-w-lg mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">For demonstrating mastery in Machine Learning Foundations, Precision Prompt Engineering, Algorithmic Ethics, and Critical Hallucination Fact-Checking.</p>

            <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800">
              {[
                { track: "Track 01", title: "Understand AI", col: "text-cyan-300" },
                { track: "Track 02", title: "Prompt Master", col: "text-teal-300" },
                { track: "Track 03", title: "AI Ethics", col: "text-indigo-300" },
                { track: "Bonus", title: "AI Detective", col: "text-amber-300" }
              ].map(t => (
                <div key={t.track} className="p-2 rounded bg-slate-900/60 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400">{t.track}</div>
                  <div className={`text-xs font-bold ${t.col}`}>{t.title}</div>
                </div>
              ))}
            </div>

            <footer className="mt-6 flex items-center justify-between text-left text-xs border-t border-slate-800 pt-4">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Awarded Standing</div>
                <div className="font-bold text-amber-400 font-mono">LEVEL {currentLevel.level}: {currentLevel.title.toUpperCase()}</div>
                <div className="text-[10px] text-slate-400 font-mono">Total XP: ⭐ {state.xp}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 flex items-center justify-center mx-auto text-amber-400 text-xs font-serif font-black bg-amber-950/40">SEAL</div>
                <div className="text-[9px] font-mono text-amber-400/90 mt-1 uppercase">VERIFIED</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Issue Date &amp; ID</div>
                <time className="text-slate-300 font-medium block">{todayStr}</time>
                <div className="text-[10px] font-mono text-cyan-400">{certId}</div>
              </div>
            </footer>
          </article>
        </div>

        <footer className="border-t border-slate-800 px-6 py-4 bg-[#091124] flex items-center justify-between text-xs text-slate-400">
          <span>Cadets can present this certificate for classroom or competition portfolio credit.</span>
          <button type="button" onClick={() => { sound.playClick(); closeCertificate(); }} className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer">Done</button>
        </footer>
      </section>
    </div>
  );
};
