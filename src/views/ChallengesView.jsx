import { useState } from "react";
import {
  Wand2,
  Scale,
  ArrowRight,
  CheckCircle2,
  Send,
  RefreshCw
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { ETHICS_SCENARIOS, PROMPT_CHALLENGE_STAGES } from "../data/gameData";
import { sound } from "../utils/sound";
export function ChallengesView() {
  const { state, completeMission, setCurrentView, challengesTab, setChallengesTab } = useGame();
  const activeTab = challengesTab;
  const setActiveTab = setChallengesTab;
  const [activeStageIndex] = useState(0);
  const [revealedPillars, setRevealedPillars] = useState({});
  const [customPromptText, setCustomPromptText] = useState("");
  const [customGeneratedOutput, setCustomGeneratedOutput] = useState(null);
  const [customScore, setCustomScore] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedEthicsChoices, setSelectedEthicsChoices] = useState({});
  const stage = PROMPT_CHALLENGE_STAGES[activeStageIndex % PROMPT_CHALLENGE_STAGES.length];
  const currentScenario = ETHICS_SCENARIOS[scenarioIndex % ETHICS_SCENARIOS.length];
  const isMission2Done = state.completedMissions.includes("mission_2");
  const isMission3Done = state.completedMissions.includes("mission_3");
  const togglePillar = (key) => {
    sound.playClick();
    setRevealedPillars((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleCompletePromptStage = () => {
    sound.playSuccess();
    completeMission("mission_2", 100, "prompt-master");
  };
  const handleEvaluateCustomPrompt = () => {
    if (!customPromptText.trim()) return;
    sound.playClick();
    setIsGenerating(true);
    setTimeout(() => {
      const lower = customPromptText.toLowerCase();
      const hasTask = /write|explain|summarize|create|compare|analyze|list|design|draft|solve|act as/i.test(lower);
      const hasDetails = lower.length > 40 || /words|steps|specifically|because|focusing|include|example|tone/i.test(lower);
      const hasAudience = /for|audience|students|beginner|expert|children|kids|class|doctor|teacher|cadet/i.test(lower);
      const hasFormat = /table|bullet|bullets|paragraphs|json|markdown|outline|poem|step by step|timeline/i.test(lower);
      const score = { task: hasTask, details: hasDetails, audience: hasAudience, format: hasFormat };
      setCustomScore(score);
      let output = "";
      if (hasTask && hasDetails) {
        output = `💡 Human Coach Evaluation for "${customPromptText.slice(0, 35)}...":

• Why this works: You gave the AI clear marching orders instead of leaving it to guess. By specifying ${hasAudience ? "your exact audience and " : ""}concrete details, the model generates grounded, useful study material instead of generic textbook fluff.
• High school takeaway: The more boundary lines you draw around your prompt, the less room the AI has to hallucinate fake facts!

${hasFormat ? "✓ Clear formatting constraint applied (bullets/table/timeline requested)." : "• Quick tip: Add a format constraint like 'in 3 bullet points' or 'as a comparison table' to make it even easier to study."}`;
      } else {
        output = `⚠️ Why this prompt struggles:

It's too open-ended! When you don't tell the AI who it's talking to or what format you need, it defaults to robotic, generic encyclopedia paragraphs. 
Try remixing it with the 4 Pillars: Add who it's for, what specific details to focus on, and how to format the answer.`;
      }
      setCustomGeneratedOutput(output);
      setIsGenerating(false);
      if (hasTask && hasDetails && (hasAudience || hasFormat)) {
        sound.playSuccess();
        completeMission("mission_2", 100, "prompt-master");
      } else {
        sound.playClick();
      }
    }, 600);
  };
  const handleEthicsSelect = (choice) => {
    sound.playClick();
    setSelectedEthicsChoices((prev) => ({ ...prev, [currentScenario.id]: choice }));
    const option = currentScenario.options.find((o) => o.id === choice);
    if (option?.isBestChoice) {
      sound.playSuccess();
      const updatedChoices = { ...selectedEthicsChoices, [currentScenario.id]: choice };
      const allScenariosDone = ETHICS_SCENARIOS.every((s) => updatedChoices[s.id] !== void 0);
      if (allScenariosDone) {
        completeMission("mission_3", 100, "ethics-expert");
      }
    } else {
      sound.playError();
    }
  };
  return <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {
    /* Top Mission Switcher */
  }
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-1">
            CURRICULUM LABS · TRACKS 2 &amp; 3
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tools, Techniques &amp; Responsible AI
          </h1>
        </div>

        {
    /* Tab switch */
  }
        <nav aria-label="Mission Tab Selection" className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
    type="button"
    onClick={() => {
      sound.playClick();
      setActiveTab("prompt");
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "prompt" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
            <Wand2 className="w-3.5 h-3.5" />
            <span>TRACK 2: TOOLS &amp; TECHNIQUES</span>
            {isMission2Done && <span className="text-emerald-400">✓</span>}
          </button>

          <button
    type="button"
    onClick={() => {
      sound.playClick();
      setActiveTab("ethics");
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "ethics" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
            <Scale className="w-3.5 h-3.5" />
            <span>TRACK 3: RESPONSIBLE AI</span>
            {isMission3Done && <span className="text-emerald-400">✓</span>}
          </button>
        </nav>
      </header>

      {
    /* ========================================================================= */
  }
      {
    /* TAB 1: MISSION 2 - AI SKILLS (FIX THE PROMPT) */
  }
      {
    /* ========================================================================= */
  }
      {activeTab === "prompt" && <section aria-label="Mission 2: Fix the Prompt" className="space-y-8 animate-fadeIn">
          {
    /* Mission Intro Banner */
  }
          <article className="rounded-2xl border border-teal-500/30 bg-[#081224] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                  🎯 CHALLENGE: FIX THE PROMPT
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  How to Command AI Like a Pro
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Most people talk to AI with weak prompts like <span className="italic text-rose-300 font-semibold">“Write about space”</span> and get boring, generic answers. A Master Prompt includes the <strong>4 Core Pillars</strong>.
                </p>
              </div>

              <aside className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full inline-block">
                  🏆 +100 XP REWARD
                </span>
              </aside>
            </div>
          </article>

          {
    /* Before & After Interactive Comparison */
  }
          <section aria-label="Deconstructing Weak Prompts" className="rounded-2xl border border-slate-800 bg-[#091124] p-6 sm:p-8 space-y-6">
            <header className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                Deconstructing a Weak Prompt
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Click each Pillar to reveal how to transform it
              </span>
            </header>

            {
    /* Weak Prompt Banner */
  }
            <article className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20">
              <span className="text-[11px] font-mono font-bold text-rose-300 uppercase tracking-wider block mb-1">
                ORIGINAL WEAK PROMPT (LEVEL 1)
              </span>
              <p className="text-xl font-bold text-white font-mono">
                “{stage.weakPrompt}”
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Too vague! The AI has no idea if you want a poem for a toddler, a doctoral dissertation, or a list of planets.
              </p>
            </article>

            {
    /* The 4 Pillars Grid */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {
    /* Pillar 1: Task */
  }
              <article
    onClick={() => togglePillar("task")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${revealedPillars.task ? "border-teal-500 bg-teal-950/30" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}
  >
                <header className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-teal-300 uppercase">
                    1. TASK
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.task ? "\u2713" : "+"}</span>
                </header>
                <h4 className="text-xs font-semibold text-white mb-1">What you want done</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.task ? stage.pillars.task : "Click to inspect required action & role..."}
                </p>
              </article>

              {
    /* Pillar 2: Details */
  }
              <article
    onClick={() => togglePillar("details")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${revealedPillars.details ? "border-cyan-500 bg-cyan-950/30" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}
  >
                <header className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    2. DETAILS
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.details ? "\u2713" : "+"}</span>
                </header>
                <h4 className="text-xs font-semibold text-white mb-1">Topic, scope & limits</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.details ? stage.pillars.details : "Click to inspect constraints & key elements..."}
                </p>
              </article>

              {
    /* Pillar 3: Audience */
  }
              <article
    onClick={() => togglePillar("audience")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${revealedPillars.audience ? "border-indigo-500 bg-indigo-950/30" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}
  >
                <header className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                    3. AUDIENCE
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.audience ? "\u2713" : "+"}</span>
                </header>
                <h4 className="text-xs font-semibold text-white mb-1">Who is it for?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.audience ? stage.pillars.audience : "Click to inspect reading level & tone..."}
                </p>
              </article>

              {
    /* Pillar 4: Format */
  }
              <article
    onClick={() => togglePillar("format")}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${revealedPillars.format ? "border-amber-500 bg-amber-950/30" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}
  >
                <header className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                    4. FORMAT
                  </span>
                  <span className="text-xs text-slate-400">{revealedPillars.format ? "\u2713" : "+"}</span>
                </header>
                <h4 className="text-xs font-semibold text-white mb-1">Structure & layout</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {revealedPillars.format ? stage.pillars.format : "Click to inspect table/bullet structure..."}
                </p>
              </article>
            </div>

            {
    /* The Master Prompt Reveal */
  }
            <article className="p-5 rounded-xl border border-emerald-500/50 bg-emerald-950/20 space-y-3">
              <header className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  ⭐ THE MASTER ENGINEERED PROMPT (LEVEL 4)
                </span>
                <span className="text-xs text-emerald-400 font-mono">Precision: 100%</span>
              </header>
              <blockquote className="text-sm font-mono text-emerald-100 bg-slate-950/60 p-4 rounded-lg border border-emerald-900/50 leading-relaxed m-0">
                "{stage.improvedPrompt}"
              </blockquote>
            </article>

            {
    /* Sample AI Output Preview */
  }
            <article className="rounded-xl border border-slate-800 bg-[#070b18] p-5">
              <span className="text-xs font-mono uppercase text-slate-400 mb-2 block">
                Simulated AI Model Output for Master Prompt:
              </span>
              <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                {stage.sampleOutput}
              </pre>
            </article>

            <footer className="flex justify-end pt-2">
              <button
    type="button"
    onClick={handleCompletePromptStage}
    className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:opacity-90 transition-opacity text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
  >
                <span>CLAIM PROMPT MASTER XP (+100 XP)</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </footer>
          </section>

          {
    /* Interactive Prompt Sandbox: Craft Your Own! */
  }
          <section aria-label="Cadet Prompt Laboratory" className="rounded-2xl border border-cyan-800/60 bg-[#091124] p-6 sm:p-8 space-y-6">
            <header>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Wand2 className="w-4 h-4" /> CADET PROMPT LABORATORY
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Now Craft Your Own Prompt!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Type an improved prompt below. Our automated auditor evaluates your prompt against all 4 Pillars (Task, Details, Audience, Format) and simulates the AI’s output!
              </p>
            </header>

            {
    /* Input Form */
  }
            <form
    onSubmit={(e) => {
      e.preventDefault();
      handleEvaluateCustomPrompt();
    }}
    className="space-y-3"
  >
              <fieldset className="border-0 p-0 m-0 space-y-2">
                <label htmlFor="cadet-prompt-input" className="sr-only">
                  Cadet Custom Prompt
                </label>
                <textarea
    id="cadet-prompt-input"
    value={customPromptText}
    onChange={(e) => setCustomPromptText(e.target.value)}
    placeholder="Example: Act as a wildlife biologist. Explain photosynthesis to a 6th-grade class in a 3-step bulleted list with an everyday plant analogy..."
    rows={4}
    className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 text-sm focus:border-cyan-500 focus:outline-none font-mono"
  />
              </fieldset>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Tip: Include words like <code className="text-cyan-300 font-mono">Explain</code>, <code className="text-cyan-300 font-mono">for students</code>, <code className="text-cyan-300 font-mono">bullet points</code>.
                </div>
                <button
    type="submit"
    disabled={isGenerating || !customPromptText.trim()}
    className={`px-6 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${!customPromptText.trim() ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md"}`}
  >
                  {isGenerating ? <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Auditing...
                    </> : <>
                      <Send className="w-3.5 h-3.5" />
                      Test & Grade Prompt
                    </>}
                </button>
              </div>
            </form>

            {
    /* Real-time Pillar Rubric */
  }
            {customScore && <output className="block p-4 rounded-xl border border-slate-800 bg-[#070b18] space-y-4 animate-fadeIn">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Pillar Audit Report:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${customScore.task ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-300" : "border-rose-500/60 bg-rose-950/20 text-rose-300"}`}
  >
                    {customScore.task ? "\u2713 Task Clear" : "\u2717 Needs Verb/Task"}
                  </div>
                  <div
    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${customScore.details ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-300" : "border-rose-500/60 bg-rose-950/20 text-rose-300"}`}
  >
                    {customScore.details ? "\u2713 Detailed Scope" : "\u2717 Too Brief"}
                  </div>
                  <div
    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${customScore.audience ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-300" : "border-rose-500/60 bg-rose-950/20 text-rose-300"}`}
  >
                    {customScore.audience ? "\u2713 Audience Set" : "\u2717 Missing Audience"}
                  </div>
                  <div
    className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${customScore.format ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-300" : "border-rose-500/60 bg-rose-950/20 text-rose-300"}`}
  >
                    {customScore.format ? "\u2713 Format Defined" : "\u2717 Missing Format"}
                  </div>
                </div>

                {customGeneratedOutput && <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                      Live AI Output:
                    </span>
                    <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                      {customGeneratedOutput}
                    </pre>
                  </div>}
              </output>}
          </section>
        </section>}

      {
    /* ========================================================================= */
  }
      {
    /* TAB 2: MISSION 3 - AI ETHICS (WHAT WOULD YOU DO?) */
  }
      {
    /* ========================================================================= */
  }
      {activeTab === "ethics" && <section aria-label="Mission 3: AI Ethics" className="space-y-8 animate-fadeIn">
          {
    /* Mission Header */
  }
          <article className="rounded-2xl border border-indigo-500/30 bg-[#090f24] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  🚨 WHAT WOULD YOU DO? · AI ETHICS ARENA
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Responsible AI Decision Game
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  AI gives humans superpowers, but great power requires ethical discipline. Make your choices in realistic academic and personal dilemmas.
                </p>
              </div>

              <aside className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full inline-block">
                  🏆 +100 XP REWARD
                </span>
              </aside>
            </div>
          </article>

          {
    /* Scenario Stepper Indicators */
  }
          <nav aria-label="Ethics Cases" className="flex items-center gap-2 overflow-x-auto pb-2">
            {ETHICS_SCENARIOS.map((sc, idx) => {
    const answered = selectedEthicsChoices[sc.id] !== void 0;
    const isCurrent = idx === scenarioIndex;
    return <button
      key={sc.id}
      type="button"
      onClick={() => {
        sound.playClick();
        setScenarioIndex(idx);
      }}
      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-2 border cursor-pointer ${isCurrent ? "bg-indigo-500/30 text-indigo-200 border-indigo-400" : answered ? "bg-slate-900 text-slate-300 border-emerald-500/40" : "bg-slate-900/60 text-slate-500 border-slate-800"}`}
    >
                  <span>Case 0{idx + 1}</span>
                  {answered && <span className="text-emerald-400">✓</span>}
                </button>;
  })}
          </nav>

          {
    /* Current Scenario Card */
  }
          <article className="rounded-2xl border border-slate-800 bg-[#080d1e] p-6 sm:p-8 space-y-6">
            <header>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                {currentScenario.title}
              </span>
              <blockquote className="text-base sm:text-lg font-semibold text-slate-100 mt-2 leading-relaxed m-0 border-l-2 border-indigo-500 pl-4">
                "{currentScenario.scenario}"
              </blockquote>
            </header>

            {
    /* Options List */
  }
            <div className="space-y-4">
              {currentScenario.options.map((opt) => {
    const isSelected = selectedEthicsChoices[currentScenario.id] === opt.id;
    const hasSelectedAny = selectedEthicsChoices[currentScenario.id] !== void 0;
    let cardStyle = "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-200";
    if (hasSelectedAny) {
      if (opt.isBestChoice) {
        cardStyle = "border-emerald-500/80 bg-emerald-950/30 text-emerald-100";
      } else if (isSelected && !opt.isBestChoice) {
        cardStyle = "border-rose-500/80 bg-rose-950/30 text-rose-100";
      } else {
        cardStyle = "border-slate-800/60 bg-slate-950/40 text-slate-400 opacity-60";
      }
    }
    return <div
      key={opt.id}
      onClick={() => handleEthicsSelect(opt.id)}
      className={`rounded-xl border p-5 transition-all cursor-pointer ${cardStyle}`}
    >
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-bold text-slate-200 shrink-0">
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-relaxed">
                          {opt.text}
                        </div>

                        {
      /* Immediate Explanation on Choice */
    }
                        {hasSelectedAny && <aside className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-1">
                            <div className="font-bold">{opt.feedback}</div>
                            <div className="text-slate-300 italic">
                              Principle: {opt.guideline}
                            </div>
                          </aside>}
                      </div>
                    </div>
                  </div>;
  })}
            </div>

            {
    /* Stepper Navigation */
  }
            <footer className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
    type="button"
    onClick={() => {
      sound.playClick();
      setScenarioIndex((prev) => Math.max(0, prev - 1));
    }}
    disabled={scenarioIndex === 0}
    className="text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer"
  >
                ← Previous Case
              </button>

              {scenarioIndex < ETHICS_SCENARIOS.length - 1 ? <button
    type="button"
    onClick={() => {
      sound.playClick();
      setScenarioIndex((prev) => prev + 1);
    }}
    className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
  >
                  <span>Next Case</span>
                  <ArrowRight className="w-4 h-4" />
                </button> : <button
    type="button"
    onClick={() => {
      sound.playSuccess();
      completeMission("mission_3", 100, "ethics-expert");
      setCurrentView("detective");
    }}
    className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
  >
                  <span>Advance to AI Detective</span>
                  <ArrowRight className="w-4 h-4" />
                </button>}
            </footer>
          </article>
        </section>}
    </main>;
}
