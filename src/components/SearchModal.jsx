import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  Brain,
  Wand2,
  Scale,
  GitBranch,
  Award,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { SKILL_TREE_NODES, INITIAL_BADGES } from "../data/gameData";
import { sound } from "../utils/sound";
export const SearchModal = () => {
  const {
    isSearchOpen,
    closeSearch,
    setCurrentView,
    navigateToChallenges,
    openDailyModal,
    openCertificate,
    state
  } = useGame();
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);
  const allItems = useMemo(() => {
    const list = [];
    list.push({
      id: "m1",
      category: "mission",
      categoryLabel: "Mission 1",
      title: "Understand AI: Foundations",
      subtitle: "Neural networks, machine learning vs traditional rules, and \u201CAI or Not AI\u201D challenge.",
      icon: Brain,
      status: state.completedMissions.includes("mission_1") ? "Completed" : "Available",
      isUnlocked: state.completedMissions.includes("mission_1"),
      action: () => setCurrentView("learn")
    });
    list.push({
      id: "m2",
      category: "mission",
      categoryLabel: "Mission 2",
      title: "AI Skills: Fix The Prompt",
      subtitle: "Master the 4 Pillars (Task, Details, Audience, Format) and test custom prompts.",
      icon: Wand2,
      status: state.completedMissions.includes("mission_2") ? "Completed" : "Available",
      isUnlocked: state.completedMissions.includes("mission_2"),
      action: () => navigateToChallenges("prompt")
    });
    list.push({
      id: "m3",
      category: "mission",
      categoryLabel: "Mission 3",
      title: "AI Ethics Arena: What Would You Do?",
      subtitle: "Interactive ethical decision game on homework integrity, deepfakes, bias & privacy.",
      icon: Scale,
      status: state.completedMissions.includes("mission_3") ? "Completed" : "Available",
      isUnlocked: state.completedMissions.includes("mission_3"),
      action: () => navigateToChallenges("ethics")
    });
    list.push({
      id: "m4",
      category: "mission",
      categoryLabel: "Bonus Mission",
      title: "AI Detective: Can You Catch The AI?",
      subtitle: "Inspect confident AI texts and expose subtle and glaring factual hallucinations.",
      icon: Search,
      status: state.completedMissions.includes("detective") ? "Completed" : "Available",
      isUnlocked: state.completedMissions.includes("detective"),
      action: () => setCurrentView("detective")
    });
    list.push({
      id: "fact-check-fluent",
      category: "mission",
      categoryLabel: "Daily Challenge",
      title: "Fact-check the fluent",
      subtitle: "Investigate 3 AI photosynthesis claims using OpenStax Biology 2e source evidence.",
      icon: Search,
      status: state.completedMissions.includes("detective") ? "Completed" : "Available",
      isUnlocked: true,
      action: () => setCurrentView("fact-check")
    });
    SKILL_TREE_NODES.forEach((node) => {
      let isUnlocked = false;
      if (node.id === "root_ai_basics") isUnlocked = true;
      else if (node.unlockedByMissionId === "ai-master") {
        isUnlocked = ["mission_1", "mission_2", "mission_3", "detective"].every(
          (m) => state.completedMissions.includes(m)
        );
      } else if (node.unlockedByMissionId) {
        isUnlocked = state.completedMissions.includes(node.unlockedByMissionId);
      }
      list.push({
        id: `skill_${node.id}`,
        category: "skill",
        categoryLabel: `Skill \xB7 Tier ${node.tier}`,
        title: node.title,
        subtitle: `${node.keyConcept} \u2014 ${node.shortDesc}`,
        icon: node.icon,
        isCustomIcon: true,
        status: isUnlocked ? "Mastered" : "Locked",
        isUnlocked,
        action: () => setCurrentView("skilltree")
      });
    });
    INITIAL_BADGES.forEach((badge) => {
      const isUnlocked = state.unlockedBadges.includes(badge.id);
      list.push({
        id: `badge_${badge.id}`,
        category: "badge",
        categoryLabel: "Achievement Badge",
        title: badge.name,
        subtitle: badge.description,
        icon: badge.icon,
        isCustomIcon: true,
        status: isUnlocked ? "Unlocked" : "Locked",
        isUnlocked,
        action: () => setCurrentView("progress")
      });
    });
    list.push({
      id: "tool_daily",
      category: "tool",
      categoryLabel: "Daily Practice",
      title: "Today\u2019s AI Challenge",
      subtitle: "Compare two AI responses and choose which one to trust (+25 XP).",
      icon: Sparkles,
      status: state.lastDailyChallengeDate === (/* @__PURE__ */ new Date()).toISOString().split("T")[0] ? "Completed Today" : "Ready",
      isUnlocked: true,
      action: openDailyModal
    });
    list.push({
      id: "tool_tree",
      category: "tool",
      categoryLabel: "Visual Map",
      title: "Neural Skill Tree Topology",
      subtitle: "Explore the full branching AI knowledge network and micro-drills.",
      icon: GitBranch,
      status: "Topology",
      isUnlocked: true,
      action: () => setCurrentView("skilltree")
    });
    list.push({
      id: "tool_cert",
      category: "tool",
      categoryLabel: "Certification",
      title: "Official AI Academy Diploma",
      subtitle: "Inspect and print your verified Certificate of AI Competency.",
      icon: Award,
      status: "Credential",
      isUnlocked: true,
      action: openCertificate
    });
    list.push({
      id: "tool_profile",
      category: "tool",
      categoryLabel: "Cadet Identity",
      title: "Cadet Profile & Settings",
      subtitle: "Update your call-sign, change avatar emblem, and review stats.",
      icon: BookOpen,
      status: "Profile",
      isUnlocked: true,
      action: () => setCurrentView("profile")
    });
    list.push({
      id: "res_cheatsheet",
      category: "resource",
      categoryLabel: "Resource: Guide",
      title: "Student AI Cheat Sheet (Traffic Light System)",
      subtitle: "Green (Allowed), Yellow (Disclose), Red (Cheating) rules for school.",
      icon: BookOpen,
      status: "Resource",
      isUnlocked: true,
      action: () => setCurrentView("resources")
    });
    list.push({
      id: "res_evidence",
      category: "resource",
      categoryLabel: "Resource: Evidence",
      title: "Evidence Starter Kit: OpenStax Biology 2e",
      subtitle: "Verified textbook citations on photosynthesis, cellular respiration, and biomass.",
      icon: BookOpen,
      status: "Resource",
      isUnlocked: true,
      action: () => setCurrentView("resources")
    });
    list.push({
      id: "res_disclosure",
      category: "resource",
      categoryLabel: "Resource: Generator",
      title: "Student AI Disclosure Statement Generator",
      subtitle: "One-click copyable statements to explain your AI assistance to teachers.",
      icon: Sparkles,
      status: "Resource",
      isUnlocked: true,
      action: () => setCurrentView("resources")
    });
    list.push({
      id: "res_tools",
      category: "resource",
      categoryLabel: "Resource: Tools",
      title: "Safe AI Learning Tools (Teachable Machine & NotebookLM)",
      subtitle: "Zero-install tools for testing machine learning and grounded notes.",
      icon: Wand2,
      status: "Resource",
      isUnlocked: true,
      action: () => setCurrentView("resources")
    });
    list.push({
      id: "res_glossary",
      category: "resource",
      categoryLabel: "Resource: Glossary",
      title: "Plain-English AI Terms Glossary",
      subtitle: "Clear definitions for tokens, hallucination, context windows & weights.",
      icon: BookOpen,
      status: "Resource",
      isUnlocked: true,
      action: () => setCurrentView("resources")
    });
    return list;
  }, [state, setCurrentView, navigateToChallenges, openDailyModal, openCertificate]);
  const filteredResults = useMemo(() => {
    let result = allItems;
    if (selectedFilter !== "all") {
      result = result.filter((item) => item.category === selectedFilter);
    }
    if (!query.trim()) {
      return result.slice(0, 8);
    }
    const q = query.toLowerCase().trim();
    return result.filter(
      (item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.categoryLabel.toLowerCase().includes(q)
    );
  }, [allItems, query, selectedFilter]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => prev + 1 < filteredResults.length ? prev + 1 : 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          sound.playClick();
          filteredResults[selectedIndex].action();
          closeSearch();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, filteredResults, selectedIndex, closeSearch]);
  if (!isSearchOpen) return null;
  const handleSelectResult = (action) => {
    sound.playClick();
    action();
    closeSearch();
  };
  const popularKeywords = ["Prompts", "Ethics", "Hallucinations", "Neural Networks", "Daily Challenge", "Deepfakes", "Supervised Learning"];
  return <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <section
    role="dialog"
    aria-modal="true"
    aria-label="Universal Academy Curriculum Search"
    className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#091124] shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)]"
    onClick={(e) => e.stopPropagation()}
  >
        {
    /* Search Input Bar */
  }
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative flex items-center border-b border-slate-800 bg-[#0c1630] px-4 py-3.5">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
    ref={inputRef}
    type="search"
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
      setSelectedIndex(0);
    }}
    placeholder="Search missions, skills, ethics dilemmas, hallucinations, badges..."
    className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
    aria-label="Search academy content"
  />
          {query && <button
    type="button"
    onClick={() => {
      setQuery("");
      inputRef.current?.focus();
    }}
    className="p-1 rounded-md text-slate-400 hover:text-slate-200 mr-2 cursor-pointer"
    aria-label="Clear search input"
  >
              <X className="w-4 h-4" />
            </button>}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
            ESC
          </kbd>
        </form>

        {
    /* Filter Navigation */
  }
        <nav aria-label="Category Filters" className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800/80 px-4 py-2 bg-[#070d1c] scrollbar-none">
          {[
    { id: "all", label: "All Items" },
    { id: "resource", label: "Resources" },
    { id: "mission", label: "Missions" },
    { id: "skill", label: "Skill Tree" },
    { id: "badge", label: "Badges" },
    { id: "tool", label: "Tools" }
  ].map((tab) => <button
    key={tab.id}
    type="button"
    onClick={() => {
      sound.playClick();
      setSelectedFilter(tab.id);
      setSelectedIndex(0);
    }}
    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${selectedFilter === tab.id ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-slate-200"}`}
  >
              {tab.label}
            </button>)}
        </nav>

        {
    /* Popular Quick Suggestions */
  }
        {!query && <aside className="flex items-center gap-2 overflow-x-auto px-4 py-2 bg-[#080f20] border-b border-slate-800/60 text-xs">
            <span className="text-[11px] font-mono text-slate-500 uppercase shrink-0">Popular:</span>
            {popularKeywords.map((kw) => <button
    key={kw}
    type="button"
    onClick={() => {
      sound.playClick();
      setQuery(kw);
    }}
    className="px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap transition-colors cursor-pointer"
  >
                {kw}
              </button>)}
          </aside>}

        {
    /* Search Results List */
  }
        <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? <div className="p-8 text-center text-slate-400 space-y-2">
              <div className="text-2xl">🔍</div>
              <p className="text-sm font-medium text-slate-300">
                No matching topics found for "{query}"
              </p>
              <p className="text-xs text-slate-500">
                Try searching for "Prompts", "Ethics", "Hallucination", "Neural", or "Daily Challenge".
              </p>
            </div> : filteredResults.map((item, idx) => {
    const isSelected = idx === selectedIndex;
    const Icon = item.icon;
    return <article
      key={item.id}
      onClick={() => handleSelectResult(item.action)}
      onMouseEnter={() => setSelectedIndex(idx)}
      className={`group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all ${isSelected ? "bg-cyan-950/60 border border-cyan-500/50 text-white" : "hover:bg-slate-800/50 border border-transparent text-slate-200"}`}
    >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <figure className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-200 group-hover:text-cyan-300 m-0">
                      {item.isCustomIcon ? <span className="text-lg">{item.icon}</span> : <Icon className="w-4 h-4" />}
                    </figure>

                    <div className="overflow-hidden">
                      <header className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cyan-400">
                          {item.categoryLabel}
                        </span>
                        {item.status && <span
      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${item.isUnlocked ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" : "bg-slate-900 text-slate-400 border-slate-800"}`}
    >
                            {item.status}
                          </span>}
                      </header>
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-200">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Jump</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </article>;
  })}
        </div>

        {
    /* Modal Footer */
  }
        <footer className="flex items-center justify-between border-t border-slate-800/80 px-4 py-2.5 bg-[#070c18] text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <output className="text-cyan-400 block">
            {filteredResults.length} matching topics
          </output>
        </footer>
      </section>
    </div>;
};
