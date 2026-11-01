import { ArrowUp, Volume2, VolumeX, Sparkles, User, Cpu, Wrench, Shield, BookOpen, Award } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
import { ScrollReveal } from "./ScrollReveal";

export const Footer = () => {
  const { setCurrentView, state, toggleSound, openOnboarding } = useGame();

  const handleNav = (viewName) => {
    sound.playClick();
    if (["learning-path", "tool-lab", "responsible-ai"].includes(viewName)) {
      setCurrentView(viewName);
      (document.getElementById(viewName === "learning-path" ? "ai-foundations" : viewName) || document.getElementById(viewName))?.scrollIntoView({ behavior: "smooth" });
    } else {
      setCurrentView(viewName);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800 bg-[#050914] text-slate-300 pt-14 pb-10 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <ScrollReveal animation="fade-up" delay={0} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">⚡</div>
              <span className="text-xl font-black tracking-wider text-white">AI QUEST</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">AI Quest is a learning platform that aims to teach high school students how to properly use AI, spot AI, and how to use it to fit your needs.</p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-semibold">Grades 09–12</span>·<span>Evidence Before Confidence</span>·<span>Human Thinking First</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100} className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">The Three Modules</h3>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              {[
                { view: "learning-path", icon: Cpu, label: "Module 1: AI Foundations" },
                { view: "tool-lab", icon: Wrench, label: "Module 2: Tools & Techniques" },
                { view: "responsible-ai", icon: Shield, label: "Module 3: Responsible AI" }
              ].map(({ view, icon: Icon, label }) => (
                <li key={view}>
                  <button type="button" onClick={() => handleNav(view)} className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer text-left py-0.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Student Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { view: "home", label: "Home" },
                { view: "progress", icon: Award, label: "Progress & XP" },
                { view: "resources", icon: BookOpen, label: "Resources & Docs" },
                { view: "fact-check", icon: Sparkles, label: "Fact-Check Quiz" },
                { view: "profile", icon: User, label: "Account Profile" }
              ].map(({ view, icon: Icon, label }) => (
                <button key={view} type="button" onClick={() => handleNav(view)} className="text-left text-slate-300 hover:text-emerald-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5">
                  {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}<span>{label}</span>
                </button>
              ))}
              <button type="button" onClick={() => { sound.playClick(); openOnboarding(); }} className="text-left text-slate-300 hover:text-emerald-400 transition-colors py-1 cursor-pointer">Change Call-Sign</button>
            </div>
            <div className="pt-2">
              <button type="button" onClick={toggleSound} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                {state.soundEnabled ? <><Volume2 className="w-3.5 h-3.5 text-emerald-400" /><span>Sound FX: Enabled</span></> : <><VolumeX className="w-3.5 h-3.5 text-slate-500" /><span>Sound FX: Muted</span></>}
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-in" delay={150}>
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <div>© {new Date().getFullYear()} AI Quest. Built for students, educators, and critical thinkers.</div>
            <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-sans font-medium">
              <span>Back to top</span><ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
