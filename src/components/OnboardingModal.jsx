import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";

const EMBLEMS = ["🚀", "🧠", "🤖", "⚡", "🛸", "👾", "🌟", "🛡️"];

export const OnboardingModal = () => {
  const { isOnboardingOpen, completeOnboarding, state } = useGame();
  const [name, setName] = useState(state.studentName === "Cadet Nova" ? "" : state.studentName);
  const [avatar, setAvatar] = useState(state.studentAvatar || "🚀");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOnboardingOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOnboardingOpen]);

  if (!isOnboardingOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    completeOnboarding(name.trim() || "Cadet Nova", avatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-[#091124] shadow-2xl">
        <header className="border-b border-slate-800 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-amber-950/60 px-6 py-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /><span>AI QUEST</span>
          </div>
          <h2 id="modal-title" className="text-2xl font-black text-white">Enter Your Profile Name</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">Enter your name to personalize your missions, dashboard, and graduation diploma.</p>
        </header>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <div className="space-y-2">
              <label htmlFor="reg-name" className="text-xs font-mono font-bold uppercase text-slate-300 flex justify-between">
                <span>Cadet Call-Sign / Name</span><span className="text-cyan-400 text-[11px]">Required</span>
              </label>
              <input id="reg-name" ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="e.g. Alex, Maya, Nova..." className="w-full px-4 py-3 rounded-xl border-2 border-cyan-500/40 bg-slate-950 text-slate-100 placeholder:text-slate-600 text-base font-semibold focus:border-cyan-400 focus:outline-none" required />
            </div>

            <div className="space-y-2">
              <legend className="text-xs font-mono font-bold uppercase text-slate-300 block">Choose Cadet Emblem</legend>
              <div className="flex flex-wrap gap-2.5">
                {EMBLEMS.map(item => (
                  <button key={item} type="button" onClick={() => { sound.playClick(); setAvatar(item); }} className={`h-11 w-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${avatar === item ? "border-cyan-400 bg-cyan-500/20 scale-110 shadow-lg" : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"}`} aria-label={`Choose ${item}`}>{item}</button>
                ))}
              </div>
            </div>
          </fieldset>

          <aside className="rounded-2xl border border-slate-800 bg-[#060a16] p-4 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">HOMEPAGE PREVIEW:</span>
            <output className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent uppercase truncate block">{avatar} {name.trim() || "CADET NOVA"}.</output>
          </aside>

          <footer className="space-y-3 pt-2">
            <button type="submit" className="w-full py-4 rounded-xl font-extrabold text-sm uppercase text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg">
              <span>🚀 INITIALIZE PROFILE &amp; ENTER ACADEMY</span><ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => { sound.playClick(); completeOnboarding("Cadet Nova", avatar); }} className="w-full py-2 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer">Or continue with default "Cadet Nova"</button>
          </footer>
        </form>
      </section>
    </div>
  );
};
