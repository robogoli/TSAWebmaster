import { useState } from "react";
import { X, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { useGame } from "../context/GameContext";
import { DAILY_CHALLENGES } from "../data/gameData";
import { sound } from "../utils/sound";

export const DailyChallengeModal = () => {
  const { isDailyModalOpen, closeDailyModal, completeDailyChallenge, state } = useGame();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  if (!isDailyModalOpen) return null;
  const challenge = DAILY_CHALLENGES[index % DAILY_CHALLENGES.length];

  const handleSelect = (choice) => {
    if (revealed) return;
    sound.playClick();
    setSelected(choice);
    setRevealed(true);
    completeDailyChallenge(choice === "A" ? challenge.responseA.isTrustworthy : challenge.responseB.isTrustworthy);
  };

  const handleNext = () => {
    sound.playClick();
    setSelected(null);
    setRevealed(false);
    setIndex((prev) => prev + 1);
  };

  const renderCard = (key, data) => (
    <article
      onClick={() => handleSelect(key)}
      className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
        revealed
          ? data.isTrustworthy
            ? "border-emerald-500/80 bg-emerald-950/30 text-emerald-100 ring-2 ring-emerald-500/50"
            : "border-rose-500/80 bg-rose-950/30 text-rose-100 ring-2 ring-rose-500/50"
          : selected === key
          ? "border-cyan-400 bg-cyan-950/40"
          : "border-slate-800 bg-[#070b18] hover:border-slate-700"
      }`}
    >
      <div className="space-y-3">
        <header className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">Option {key}</span>
          {revealed && (
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${data.isTrustworthy ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
              {data.isTrustworthy ? "TRUSTWORTHY" : "HALLUCINATED"}
            </span>
          )}
        </header>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">"{data.text}"</p>
      </div>
      {revealed && (
        <footer className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="font-semibold text-amber-300 mb-1">Critique:</div>
          {data.critique}
        </footer>
      )}
    </article>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <section role="dialog" aria-modal="true" aria-label="Daily AI Challenge" className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#0b1329] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-gradient-to-r from-cyan-950/60 via-slate-900/40 to-amber-950/40">
          <div className="flex items-center gap-3">
            <figure className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 m-0"><Sparkles className="w-5 h-5" /></figure>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-bold text-amber-400">⚡ DAILY CHALLENGE</span>
                <span className="text-slate-400">·</span>
                <span className="text-cyan-300">Streak: {state.dailyStreak} days</span>
              </div>
              <h2 className="text-lg font-bold text-white">Which AI response should you trust?</h2>
            </div>
          </div>
          <button type="button" onClick={() => { sound.playClick(); closeDailyModal(); }} className="rounded-lg p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <article className="rounded-xl border border-slate-800 bg-[#080d1e] p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Topic: {challenge.promptTopic}</div>
            <p className="text-sm sm:text-base font-semibold text-slate-100">{challenge.question}</p>
          </article>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCard("A", challenge.responseA)}
            {renderCard("B", challenge.responseB)}
          </div>
          {revealed && (
            <aside className="rounded-xl border border-cyan-800/50 bg-[#071120] p-4 text-xs sm:text-sm space-y-1 text-slate-200 animate-fadeIn">
              <header className="font-bold text-cyan-300 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Critical Takeaway:</header>
              <p>{challenge.keyTakeaway}</p>
            </aside>
          )}
        </div>

        <footer className="border-t border-slate-800 px-6 py-4 bg-[#091124] flex items-center justify-between">
          <span className="text-xs text-slate-400">{revealed ? "⭐ +25 XP credited to your streak!" : "Click the AI answer you believe is factual and safe."}</span>
          <div className="flex items-center gap-2">
            {revealed && (
              <button type="button" onClick={handleNext} className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                <span>Next Dilemma</span><ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button type="button" onClick={() => { sound.playClick(); closeDailyModal(); }} className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800 transition-colors cursor-pointer">Done</button>
          </div>
        </footer>
      </section>
    </div>
  );
};
