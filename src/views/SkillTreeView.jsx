import { useState } from "react";
import {
  GitBranch,
  Lock,
  CheckCircle2,
  Sparkles,
  X,
  Play,
  ChevronRight
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { SKILL_TREE_NODES } from "../data/gameData";
import { sound } from "../utils/sound";
export function SkillTreeView() {
  const { state, setCurrentView, triggerConfetti } = useGame();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [activeNode, setActiveNode] = useState(null);
  const [drillAnswer, setDrillAnswer] = useState(null);
  const [drillSubmitted, setDrillSubmitted] = useState(false);
  const getNodeStatus = (node) => {
    if (node.id === "root_ai_basics") return "unlocked";
    const parentsUnlocked = node.parentIds.every((parentId) => {
      const parent = SKILL_TREE_NODES.find((n) => n.id === parentId);
      if (!parent) return true;
      return getNodeStatus(parent) === "unlocked";
    });
    let missionComplete = true;
    if (node.unlockedByMissionId === "ai-master") {
      const coreMissions = ["mission_1", "mission_2", "mission_3", "detective"];
      missionComplete = coreMissions.every((m) => state.completedMissions.includes(m));
    } else if (node.unlockedByMissionId) {
      missionComplete = state.completedMissions.includes(node.unlockedByMissionId);
    }
    const xpMet = (node.requiredXp || 0) <= state.xp;
    if (missionComplete && xpMet) {
      return "unlocked";
    }
    if (parentsUnlocked) {
      return "available";
    }
    return "locked";
  };
  const handleNodeClick = (node) => {
    sound.playClick();
    setActiveNode(node);
    setDrillAnswer(null);
    setDrillSubmitted(false);
  };
  const handleDrillSubmit = () => {
    if (drillAnswer === null || !activeNode) return;
    setDrillSubmitted(true);
    if (drillAnswer === activeNode.practicalDrill.correctIndex) {
      sound.playSuccess();
      triggerConfetti();
    } else {
      sound.playError();
    }
  };
  const handleTeleportToMission = (missionId) => {
    sound.playClick();
    setActiveNode(null);
    if (missionId === "mission_1") {
      setCurrentView("learn");
    } else if (missionId === "mission_2" || missionId === "mission_3") {
      setCurrentView("challenges");
    } else if (missionId === "detective") {
      setCurrentView("detective");
    } else {
      setCurrentView("learn");
    }
  };
  const filteredNodes = SKILL_TREE_NODES.filter((n) => {
    if (selectedBranch === "all") return true;
    return n.branch === selectedBranch || n.id === "root_ai_basics" || n.branch === "apex";
  });
  const totalNodes = SKILL_TREE_NODES.length;
  const unlockedNodesCount = SKILL_TREE_NODES.filter((n) => getNodeStatus(n) === "unlocked").length;
  const treeCompletionPercent = Math.round(unlockedNodesCount / totalNodes * 100);
  const branchMetadata = {
    foundations: {
      label: "Core Foundations",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      icon: "\u{1F331}"
    },
    machine_learning: {
      label: "Machine Learning",
      color: "text-cyan-400",
      border: "border-cyan-500/40",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
      icon: "\u{1F9E0}"
    },
    prompt_engineering: {
      label: "Prompt Craft",
      color: "text-teal-400",
      border: "border-teal-500/40",
      glow: "shadow-[0_0_20px_rgba(45,212,191,0.3)]",
      icon: "\u{1F4A1}"
    },
    ai_ethics: {
      label: "AI Ethics",
      color: "text-indigo-400",
      border: "border-indigo-500/40",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]",
      icon: "\u2696\uFE0F"
    },
    ai_detective: {
      label: "AI Detective",
      color: "text-amber-400",
      border: "border-amber-500/40",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      icon: "\u{1F50E}"
    },
    apex: {
      label: "Apex Master",
      color: "text-yellow-300",
      border: "border-yellow-400/60",
      glow: "shadow-[0_0_30px_rgba(250,204,21,0.5)]",
      icon: "\u{1F451}"
    }
  };
  return <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {
    /* Header Banner */
  }
      <header className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-[#0d162e] via-[#091124] to-[#070b18] p-8 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span>AI QUEST ACADEMY</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                ACADEMY SKILL TREE
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Start at the root with fundamental AI concepts. Complete missions in the academy to unlock advanced branches in Machine Learning, Deep Learning, Prompt Craft, and Ethics, climbing toward the Apex AI Master node.
              </p>
            </div>

            <aside aria-label="Synapse Density" className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shrink-0 space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Tree Unlocked:</span>
                <output className="text-cyan-300 font-bold tabular-nums">
                  {unlockedNodesCount} / {totalNodes}
                </output>
              </div>

              {
    /* Semantic meter */
  }
              <meter
    min={0}
    max={totalNodes}
    value={unlockedNodesCount}
    className="sr-only"
  >
                {treeCompletionPercent}%
              </meter>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-700"
    style={{ width: `${treeCompletionPercent}%` }}
  />
              </div>
              <div className="text-[11px] font-mono text-slate-400 text-right">
                {treeCompletionPercent}% Total Synapse Density
              </div>
            </aside>
          </div>
        </div>
      </header>

      {
    /* Branch Filter Selector */
  }
      <nav aria-label="Branch Filters" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
    type="button"
    onClick={() => {
      sound.playClick();
      setSelectedBranch("all");
    }}
    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap border cursor-pointer ${selectedBranch === "all" ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm" : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"}`}
  >
          All Branches ({totalNodes})
        </button>

        {[
    "foundations",
    "machine_learning",
    "prompt_engineering",
    "ai_ethics",
    "ai_detective",
    "apex"
  ].map((b) => {
    const meta = branchMetadata[b];
    const count = SKILL_TREE_NODES.filter((n) => n.branch === b).length;
    const isSelected = selectedBranch === b;
    return <button
      key={b}
      type="button"
      onClick={() => {
        sound.playClick();
        setSelectedBranch(b);
      }}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-1.5 border cursor-pointer ${isSelected ? `bg-slate-800 text-white ${meta.border} ${meta.glow}` : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"}`}
    >
              <span>{meta.icon}</span>
              <span>{meta.label}</span>
              <span className="text-[10px] text-slate-500">({count})</span>
            </button>;
  })}
      </nav>

      {
    /* Legend & Guide */
  }
      <aside aria-label="Skill Tree Legend" className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800/80 bg-[#091124] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-slate-200">Mastered / Unlocked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-slate-200">Available to Unlock</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span>Locked Branch</span>
          </div>
        </div>
        <div className="text-[11px] text-cyan-300">
          Click any node to inspect deep concept, test your skill, or launch the required mission.
        </div>
      </aside>

      {
    /* Visual Tree Stages (Tier 0 -> Tier 1 -> Tier 2 -> Tier 3) */
  }
      <div className="relative space-y-12">
        {
    /* TIER 0: ROOT FOUNDATION */
  }
        {(selectedBranch === "all" || selectedBranch === "foundations") && <section aria-label="Tier 0: Root Foundation" className="space-y-4">
            <header className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-800" />
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40">
                🌱 TIER 0: THE ROOT FOUNDATION
              </div>
              <span className="h-px flex-1 bg-slate-800" />
            </header>

            <div className="flex justify-center">
              {SKILL_TREE_NODES.filter((n) => n.tier === 0).map((node) => <article
    key={node.id}
    onClick={() => handleNodeClick(node)}
    className="group relative cursor-pointer max-w-md w-full"
  >
                  <div className="p-6 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-b from-[#0e1f30] to-[#08121f] shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-400 transition-all text-center space-y-2">
                    <figure className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform m-0">
                      {node.icon}
                    </figure>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      ROOT ORIGIN
                    </span>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-200">
                      {node.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {node.shortDesc}
                    </p>
                    <footer className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-300 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SYNAPSE ACTIVE (DEFAULT UNLOCKED)</span>
                    </footer>
                  </div>
                </article>)}
            </div>

            {
    /* Connecting visual spine */
  }
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500/60 to-cyan-500/60" />
            </div>
          </section>}

        {
    /* TIER 1: CORE BRANCHES */
  }
        <section aria-label="Tier 1: Core Specialization Branches" className="space-y-4">
          <header className="flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-800" />
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40">
              ⚡ TIER 1: ACADEMY SPECIALIZATION BRANCHES
            </div>
            <span className="h-px flex-1 bg-slate-800" />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredNodes.filter((n) => n.tier === 1).map((node) => {
    const status = getNodeStatus(node);
    const meta = branchMetadata[node.branch];
    let cardStyle = "border-slate-800 bg-[#091124] hover:border-slate-700 opacity-60";
    if (status === "unlocked") {
      cardStyle = `${meta.border} bg-[#091326] ${meta.glow} hover:scale-[1.02]`;
    } else if (status === "available") {
      cardStyle = "border-amber-500/60 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-400";
    }
    return <article
      key={node.id}
      onClick={() => handleNodeClick(node)}
      className={`rounded-2xl border p-5 cursor-pointer transition-all space-y-3 flex flex-col justify-between ${cardStyle}`}
    >
                    <div>
                      <header className="flex items-start justify-between gap-2 mb-2">
                        <figure className="text-2xl m-0">{node.icon}</figure>
                        {status === "unlocked" && <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" /> ACTIVE
                          </span>}
                        {status === "available" && <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 animate-pulse">
                            <Sparkles className="w-3 h-3" /> READY
                          </span>}
                        {status === "locked" && <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            <Lock className="w-3 h-3" /> LOCKED
                          </span>}
                      </header>

                      <span className={`text-[11px] font-mono uppercase font-bold tracking-wider block ${meta.color}`}>
                        {meta.label}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{node.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        {node.shortDesc}
                      </p>
                    </div>

                    <footer className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">
                        {node.unlockedByMissionId ? `Req: ${node.unlockedByMissionId.toUpperCase()}` : "Core"}
                      </span>
                      <span className="text-cyan-400 flex items-center gap-0.5">
                        Inspect <ChevronRight className="w-3 h-3" />
                      </span>
                    </footer>
                  </article>;
  })}
          </div>

          {
    /* Connecting spine */
  }
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500/60 to-purple-500/60" />
          </div>
        </section>

        {
    /* TIER 2: ADVANCED TOPICS */
  }
        <section aria-label="Tier 2: Advanced Topics" className="space-y-4">
          <header className="flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-800" />
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40">
              🔮 TIER 2: ADVANCED SYSTEM SYNTHESIS
            </div>
            <span className="h-px flex-1 bg-slate-800" />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredNodes.filter((n) => n.tier === 2).map((node) => {
    const status = getNodeStatus(node);
    const meta = branchMetadata[node.branch];
    let cardStyle = "border-slate-800 bg-[#091124] hover:border-slate-700 opacity-60";
    if (status === "unlocked") {
      cardStyle = `${meta.border} bg-[#091326] ${meta.glow} hover:scale-[1.02]`;
    } else if (status === "available") {
      cardStyle = "border-amber-500/60 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-400";
    }
    return <article
      key={node.id}
      onClick={() => handleNodeClick(node)}
      className={`rounded-2xl border p-5 cursor-pointer transition-all space-y-3 flex flex-col justify-between ${cardStyle}`}
    >
                    <div>
                      <header className="flex items-start justify-between gap-2 mb-2">
                        <figure className="text-2xl m-0">{node.icon}</figure>
                        {status === "unlocked" && <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" /> ACTIVE
                          </span>}
                        {status === "available" && <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 animate-pulse">
                            <Sparkles className="w-3 h-3" /> READY
                          </span>}
                        {status === "locked" && <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            <Lock className="w-3 h-3" /> LOCKED
                          </span>}
                      </header>

                      <span className={`text-[11px] font-mono uppercase font-bold tracking-wider block ${meta.color}`}>
                        {meta.label}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{node.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        {node.shortDesc}
                      </p>
                    </div>

                    <footer className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">
                        {node.requiredXp ? `\u2B50 ${node.requiredXp} XP` : "Advanced"}
                      </span>
                      <span className="text-cyan-400 flex items-center gap-0.5">
                        Inspect <ChevronRight className="w-3 h-3" />
                      </span>
                    </footer>
                  </article>;
  })}
          </div>

          {
    /* Connecting spine */
  }
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/60 to-amber-500/60" />
          </div>
        </section>

        {
    /* TIER 3: APEX MASTER NODE */
  }
        {(selectedBranch === "all" || selectedBranch === "apex") && <section aria-label="Tier 3: Apex Master Node" className="space-y-4">
            <header className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-800" />
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40">
                👑 TIER 3: THE APEX AI MASTER ARCHITECT
              </div>
              <span className="h-px flex-1 bg-slate-800" />
            </header>

            <div className="flex justify-center">
              {SKILL_TREE_NODES.filter((n) => n.tier === 3).map((node) => {
    const status = getNodeStatus(node);
    const isMastered = status === "unlocked";
    return <article
      key={node.id}
      onClick={() => handleNodeClick(node)}
      className="group relative cursor-pointer max-w-lg w-full"
    >
                    <div
      className={`p-8 rounded-3xl border-2 transition-all text-center space-y-4 ${isMastered ? "border-amber-400/90 bg-gradient-to-b from-[#1c1608] via-[#120f06] to-[#070b18] shadow-[0_0_50px_rgba(245,158,11,0.4)]" : "border-slate-800 bg-[#091124] opacity-70 hover:opacity-90"}`}
    >
                      <figure
      className={`mx-auto h-20 w-20 rounded-3xl flex items-center justify-center text-5xl border shadow-xl m-0 ${isMastered ? "bg-amber-500/20 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.5)]" : "bg-slate-800 border-slate-700 text-slate-500"}`}
    >
                        {node.icon}
                      </figure>

                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          CROWN CAPSTONE
                        </span>
                        <h3 className="text-2xl font-black text-white group-hover:text-amber-200 mt-1">
                          {node.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2 max-w-md mx-auto">
                          {node.shortDesc}
                        </p>
                      </div>

                      <footer className="pt-2 flex items-center justify-center gap-2 text-xs font-mono">
                        {isMastered ? <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>SUPREME ARCHITECT STATUS ATTAINED</span>
                          </span> : <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-slate-500" />
                            <span>Unlock all 4 Missions + 350 XP required</span>
                          </span>}
                      </footer>
                    </div>
                  </article>;
  })}
            </div>
          </section>}
      </div>

      {
    /* NODE INSPECTOR MODAL & MICRO-DRILL */
  }
      {activeNode && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <section
    role="dialog"
    aria-modal="true"
    aria-label={`Skill Node: ${activeNode.title}`}
    className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#0b1328] shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)]"
  >
            {
    /* Modal Header */
  }
            <header className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-[#091124]">
              <div className="flex items-center gap-3">
                <figure className="text-3xl m-0">{activeNode.icon}</figure>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      TIER {activeNode.tier} · {branchMetadata[activeNode.branch].label.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500" aria-hidden="true">·</span>
                    {getNodeStatus(activeNode) === "unlocked" && <span className="text-xs font-mono font-bold text-emerald-400">Mastered ✓</span>}
                    {getNodeStatus(activeNode) === "available" && <span className="text-xs font-mono font-bold text-amber-300">Ready to Unlock</span>}
                    {getNodeStatus(activeNode) === "locked" && <span className="text-xs font-mono text-slate-500">Locked</span>}
                  </div>
                  <h2 className="text-lg font-bold text-white">{activeNode.title}</h2>
                </div>
              </div>

              <button
    type="button"
    onClick={() => {
      sound.playClick();
      setActiveNode(null);
    }}
    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
    aria-label="Close dialog"
  >
                <X className="w-5 h-5" />
              </button>
            </header>

            {
    /* Modal Body */
  }
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {
    /* Core Concept Definition */
  }
              <article className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Core Concept:
                </span>
                <p className="text-sm font-semibold text-cyan-200">
                  {activeNode.keyConcept}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {activeNode.fullExplanation}
                </p>
              </article>

              {
    /* Real World Application */
  }
              <article>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Real-World Deployment:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeNode.realWorldApplication}
                </p>
              </article>

              {
    /* Interactive Quick Drill */
  }
              <form
    onSubmit={(e) => {
      e.preventDefault();
      handleDrillSubmit();
    }}
    className="rounded-xl border border-cyan-800/50 bg-[#070c1a] p-5 space-y-4"
  >
                <fieldset className="border-0 p-0 m-0 space-y-3">
                  <legend className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> MICRO-DRILL: PROVE MASTERY
                    </span>
                    <span className="text-xs text-slate-400 font-mono">1 Quick Question</span>
                  </legend>

                  <p className="text-xs sm:text-sm font-medium text-slate-100">
                    {activeNode.practicalDrill.question}
                  </p>

                  <div className="space-y-2">
                    {activeNode.practicalDrill.options.map((opt, idx) => {
    const isSelected = drillAnswer === idx;
    const isCorrect = idx === activeNode.practicalDrill.correctIndex;
    let optStyle = "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300";
    if (drillSubmitted) {
      if (isCorrect) {
        optStyle = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200";
      } else if (isSelected && !isCorrect) {
        optStyle = "border-rose-500/80 bg-rose-950/40 text-rose-200";
      }
    } else if (isSelected) {
      optStyle = "border-cyan-500 bg-cyan-950/40 text-cyan-200";
    }
    return <button
      key={idx}
      type="button"
      onClick={() => {
        if (drillSubmitted) return;
        sound.playClick();
        setDrillAnswer(idx);
      }}
      className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
    >
                          <span>{opt}</span>
                          {drillSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                        </button>;
  })}
                  </div>

                  {drillSubmitted && <aside className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-cyan-300 block mb-0.5">
                        {drillAnswer === activeNode.practicalDrill.correctIndex ? "\u2B50 Excellent! Concept mastered." : "\u26A0\uFE0F Concept Insight:"}
                      </span>
                      {activeNode.practicalDrill.explanation}
                    </aside>}

                  {!drillSubmitted && <button
    type="submit"
    disabled={drillAnswer === null}
    className={`w-full py-2.5 rounded-lg font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${drillAnswer !== null ? "bg-gradient-to-r from-cyan-400 to-amber-300 text-slate-950 hover:opacity-90" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
  >
                      Check Answer
                    </button>}
                </fieldset>
              </form>
            </div>

            {
    /* Modal Footer / Teleport Action */
  }
            <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80 px-6 py-4 bg-[#091124]">
              <span className="text-xs text-slate-400">
                {getNodeStatus(activeNode) === "unlocked" ? "This neural branch is fully active in your cadet profile." : `Complete ${activeNode.unlockedByMissionId || "required tracks"} to unlock.`}
              </span>

              <div className="flex items-center gap-3">
                {getNodeStatus(activeNode) !== "unlocked" && activeNode.unlockedByMissionId && <button
    type="button"
    onClick={() => handleTeleportToMission(activeNode.unlockedByMissionId)}
    className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-90 transition-opacity uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Launch Mission Chamber</span>
                  </button>}
                <button
    type="button"
    onClick={() => {
      sound.playClick();
      setActiveNode(null);
    }}
    className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-300 hover:text-white bg-slate-800 transition-colors cursor-pointer"
  >
                  Close
                </button>
              </div>
            </footer>
          </section>
        </div>}
    </main>;
}
