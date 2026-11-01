import { User } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";

export const Navbar = () => {
  const { currentView, setCurrentView, state } = useGame();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "learning-path", label: "AI Foundations" },
    { id: "tool-lab", label: "Tools & Techniques" },
    { id: "responsible-ai", label: "Responsible AI" },
    { id: "progress", label: "Progress" }
  ];

  const handleNavClick = (view) => {
    sound.playClick();
    if (view === "home") {
      setCurrentView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (view === "learning-path" || view === "ai-foundations") {
      setCurrentView("learning-path");
      const el = document.getElementById("ai-foundations") || document.getElementById("learning-path");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (view === "tool-lab") {
      setCurrentView("tool-lab");
      document.getElementById("tool-lab")?.scrollIntoView({ behavior: "smooth" });
    } else if (view === "responsible-ai") {
      setCurrentView("responsible-ai");
      document.getElementById("responsible-ai")?.scrollIntoView({ behavior: "smooth" });
    } else if (view === "progress") {
      setCurrentView("progress");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (view === "profile" || view === "account") {
      setCurrentView("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentView(view);
    }
  };

  const isItemActive = (id) => {
    if (id === "home") return currentView === "home";
    if (id === "learning-path") return currentView === "learning-path" || currentView === "learn";
    if (id === "tool-lab") return currentView === "tool-lab";
    if (id === "responsible-ai") return currentView === "responsible-ai";
    if (id === "progress") return currentView === "progress";
    if (id === "profile" || id === "account") return currentView === "profile";
    return currentView === id;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080d1a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Home page with icon */}
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          title="AI Quest - Home"
          aria-label="Home page"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="8" cy="8" r="2.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white group-hover:text-emerald-300 transition-colors">
            AI QUEST
          </span>
        </button>

        {/* Center: Home, the three modules, and progress */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium tracking-wide">
          {navItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-2 relative whitespace-nowrap cursor-pointer ${
                  active ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />}
              </button>
            );
          })}
        </nav>

        {/* Right: Account */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => handleNavClick("profile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              isItemActive("profile")
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            }`}
            title="Cadet Account & Profile"
            aria-label="Account"
          >
            <span className="text-sm leading-none" aria-hidden="true">
              {state.studentAvatar || <User className="w-3.5 h-3.5 text-slate-400" />}
            </span>
            <span>Account</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar: Only home page, the three modules, progress, and account */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/60 px-4 py-2 gap-2 bg-[#060a14] scrollbar-none">
        {navItems.map((item) => {
          const active = isItemActive(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                active ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => handleNavClick("profile")}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            isItemActive("profile") ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>{state.studentAvatar || "👤"}</span>
          <span>Account</span>
        </button>
      </div>
    </header>
  );
};
