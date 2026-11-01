import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, ArrowRight, BookOpen, Cpu, Wrench, Shield, Award, Sparkles } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";

const SEARCH_ITEMS = [
  { id: "mod1", title: "Module 1: AI Foundations", desc: "How models learn, patterns vs code, hallucinations.", view: "learning-path", icon: Cpu },
  { id: "mod2", title: "Module 2: Tools & Techniques", desc: "Guided prompt engineering, no-code ML, source notebooks.", view: "tool-lab", icon: Wrench },
  { id: "mod3", title: "Module 3: Responsible AI", desc: "Question bias, protect privacy, academic integrity.", view: "responsible-ai", icon: Shield },
  { id: "fc", title: "Fact-Check the Fluent", desc: "Expose AI hallucinations using OpenStax Biology 2e.", view: "fact-check", icon: Sparkles },
  { id: "res", title: "Student AI Toolkit & Cheat Sheet", desc: "Traffic light rules, citations, teacher disclosure builder.", view: "resources", icon: BookOpen },
  { id: "prog", title: "Cadet Progress & Badges", desc: "XP levels, earned badges, official graduation diploma.", view: "progress", icon: Award },
  { id: "prof", title: "Account & Profile", desc: "Customize call-sign, avatar emblem, cadet settings.", view: "profile", icon: Award }
];

export const SearchModal = () => {
  const { isSearchOpen, closeSearch, setCurrentView } = useGame();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS;
    return SEARCH_ITEMS.filter((item) => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-[#091122] shadow-2xl">
        <header className="flex items-center gap-3 border-b border-slate-800 px-4 py-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI Quest modules, topics, resources..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button type="button" onClick={closeSearch} className="p-1 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <p className="p-6 text-center text-xs text-slate-400 font-mono">No matching lessons or tools found.</p>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setCurrentView(item.view);
                    closeSearch();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{item.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
