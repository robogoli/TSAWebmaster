import { useState } from "react";
import { Wand2, Scale, ArrowRight, CheckCircle2, Send, RefreshCw } from "lucide-react";
import { useGame } from "../context/GameContext";
import { ETHICS_SCENARIOS, PROMPT_CHALLENGE_STAGES } from "../data/gameData";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const PILLARS_CONFIG = [
  { key: "task", title: "1. TASK", sub: "What you want done", border: "teal" },
  { key: "details", title: "2. DETAILS", sub: "Topic, scope & limits", border: "cyan" },
  { key: "audience", title: "3. AUDIENCE", sub: "Who is it for?", border: "indigo" },
  { key: "format", title: "4. FORMAT", sub: "Structure & layout", border: "amber" }
];

export function ChallengesView() {
  const { state, completeMission, setCurrentView, challengesTab, setChallengesTab } = useGame();
  const [revealedPillars, setRevealedPillars] = useState({});
  const [customText, setCustomText] = useState("");
  const [customOutput, setCustomOutput] = useState(null);
  const [customScore, setCustomScore] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [ethicsChoices, setEthicsChoices] = useState({});

  const stage = PROMPT_CHALLENGE_STAGES[0];
  const currentScenario = ETHICS_SCENARIOS[scenarioIndex % ETHICS_SCENARIOS.length];
  const isM2Done = state.completedMissions.includes("mission_2");
  const isM3Done = state.completedMissions.includes("mission_3");

  const togglePillar = (key) => {
    sound.playClick();
    setRevealedPillars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEvaluateCustomPrompt = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    sound.playClick();
    setIsGenerating(true);
    setTimeout(() => {
      const lower = customText.toLowerCase();
      const score = {
        task: /write|explain|summarize|create|compare|analyze|list|design|draft|solve|act as/i.test(lower),
        details: lower.length > 40 || /words|steps|specifically|because|focusing|include|example|tone/i.test(lower),
        audience: /for|audience|students|beginner|expert|children|kids|class|doctor|teacher|cadet/i.test(lower),
        format: /table|bullet|bullets|paragraphs|json|markdown|outline|poem|step by step|timeline/i.test(lower)
      };
      setCustomScore(score);
      const passed = score.task && score.details;
      setCustomOutput(passed
        ? `💡 Coach Feedback for "${customText.slice(0, 35)}...":\n\n• Why this works: You gave the AI clear marching orders instead of vague instructions. By specifying concrete details, the model generates grounded, useful material.\n• Lesson: Tight boundary conditions leave far less room for hallucinations!\n\n${score.format ? "✓ Structured format requested." : "• Tip: Add a format constraint like 'in 3 bullet points' to make studying even faster."}`
        : `⚠️ Why this prompt struggles:\n\nIt's too open-ended! Without an explicit audience or format, AI defaults to robotic generic paragraphs.\nRemix with the 4 Pillars: Add who it's for, what specific details to focus on, and how to format the answer.`);
      setIsGenerating(false);
      if (passed && (score.audience || score.format)) {
        sound.playSuccess();
        completeMission("mission_2", 100, "prompt-master");
      } else sound.playClick();
    }, 500);
  };

  const handleEthicsSelect = (choiceId) => {
    sound.playClick();
    setEthicsChoices(prev => ({ ...prev, [currentScenario.id]: choiceId }));
    const opt = currentScenario.options.find(o => o.id === choiceId);
    if (opt?.isBestChoice) {
      sound.playSuccess();
      const updated = { ...ethicsChoices, [currentScenario.id]: choiceId };
      if (ETHICS_SCENARIOS.every(s => updated[s.id] !== undefined)) {
        completeMission("mission_3", 100, "ethics-expert");
      }
    } else {
      sound.playError();
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ScrollReveal as="header" animation="fade-up" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-1">CURRICULUM LABS · TRACKS 2 &amp; 3</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Tools, Techniques &amp; Responsible AI</h1>
        </div>
        <nav aria-label="Mission Tab Selection" className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button type="button" onClick={() => { sound.playClick(); setChallengesTab("prompt"); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${challengesTab === "prompt" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400 hover:text-slate-200"}`}>
            <Wand2 className="w-3.5 h-3.5" /><span>TRACK 2: TOOLS &amp; TECHNIQUES</span>{isM2Done && <span className="text-emerald-400">✓</span>}
          </button>
          <button type="button" onClick={() => { sound.playClick(); setChallengesTab("ethics"); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${challengesTab === "ethics" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400 hover:text-slate-200"}`}>
            <Scale className="w-3.5 h-3.5" /><span>TRACK 3: RESPONSIBLE AI</span>{isM3Done && <span className="text-emerald-400">✓</span>}
          </button>
        </nav>
      </ScrollReveal>

      {/* TRACK 2: TOOLS & PROMPTING */}
      {challengesTab === "prompt" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="space-y-8 animate-fadeIn">
          <article className="rounded-2xl border border-teal-500/30 bg-[#081224] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">🎯 CHALLENGE: FIX THE PROMPT</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">How to Command AI Like a Pro</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">Vague prompts like <span className="italic text-rose-300 font-semibold">“Write about space”</span> produce boring, generic output. Master prompts use the <strong>4 Core Pillars</strong>.</p>
            </div>
            <aside className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full inline-block">🏆 +100 XP REWARD</span>
            </aside>
          </article>

          <section aria-label="Deconstructing Weak Prompts" className="rounded-2xl border border-slate-800 bg-[#091124] p-6 sm:p-8 space-y-6">
            <header className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Deconstructing a Weak Prompt</h3>
              <span className="text-xs text-slate-400 font-mono">Click each Pillar to reveal the transformation</span>
            </header>

            <article className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20">
              <span className="text-[11px] font-mono font-bold text-rose-300 uppercase tracking-wider block mb-1">ORIGINAL WEAK PROMPT (LEVEL 1)</span>
              <p className="text-xl font-bold text-white font-mono">“{stage.weakPrompt}”</p>
              <p className="text-xs text-slate-300 mt-1">Too vague! The AI has no clue whether you need a preschool poem, college paper, or quick summary.</p>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PILLARS_CONFIG.map(({ key, title, sub, border }) => (
                <article key={key} onClick={() => togglePillar(key)} className={`p-4 rounded-xl border cursor-pointer transition-all ${revealedPillars[key] ? `border-${border}-500 bg-${border}-950/30` : "border-slate-800 bg-slate-900/60 hover:border-slate-700"}`}>
                  <header className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold text-${border}-300 uppercase`}>{title}</span>
                    <span className="text-xs text-slate-400">{revealedPillars[key] ? "✓" : "+"}</span>
                  </header>
                  <h4 className="text-xs font-semibold text-white mb-1">{sub}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{revealedPillars[key] ? stage.pillars[key] : "Click to inspect pillar..."}</p>
                </article>
              ))}
            </div>

            <article className="p-5 rounded-xl border border-emerald-500/50 bg-emerald-950/20 space-y-3">
              <header className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">⭐ THE MASTER ENGINEERED PROMPT (LEVEL 4)</span>
                <span className="text-xs text-emerald-400 font-mono">Precision: 100%</span>
              </header>
              <blockquote className="text-sm font-mono text-emerald-100 bg-slate-950/60 p-4 rounded-lg border border-emerald-900/50 leading-relaxed m-0">"{stage.improvedPrompt}"</blockquote>
            </article>

            <article className="rounded-xl border border-slate-800 bg-[#070b18] p-5">
              <span className="text-xs font-mono uppercase text-slate-400 mb-2 block">Simulated Output for Master Prompt:</span>
              <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">{stage.sampleOutput}</pre>
            </article>

            <footer className="flex justify-end pt-2">
              <button type="button" onClick={() => { sound.playSuccess(); completeMission("mission_2", 100, "prompt-master"); }} className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:opacity-90 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                <span>CLAIM PROMPT MASTER XP (+100 XP)</span><CheckCircle2 className="w-4 h-4" />
              </button>
            </footer>
          </section>

          {/* PROMPT SANDBOX */}
          <section aria-label="Cadet Prompt Laboratory" className="rounded-2xl border border-cyan-800/60 bg-[#091124] p-6 sm:p-8 space-y-6">
            <header>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400"><Wand2 className="w-4 h-4" /> CADET PROMPT LABORATORY</div>
              <h3 className="text-xl font-bold text-white mt-1">Now Craft Your Own Prompt!</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Type an improved prompt below. Our automated coach grades it against the 4 Pillars.</p>
            </header>

            <form onSubmit={handleEvaluateCustomPrompt} className="space-y-3">
              <textarea value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Example: Act as a biology tutor. Explain the Calvin cycle to an 8th grader in 3 bullet points with a cooking analogy..." rows={4} className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 text-sm focus:border-cyan-500 focus:outline-none font-mono" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">Include: <code className="text-cyan-300 font-mono">Explain</code>, <code className="text-cyan-300 font-mono">for students</code>, <code className="text-cyan-300 font-mono">bullet points</code>.</div>
                <button type="submit" disabled={isGenerating || !customText.trim()} className={`px-6 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${!customText.trim() ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer shadow-md"}`}>
                  {isGenerating ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Auditing...</> : <><Send className="w-3.5 h-3.5" /> Test &amp; Grade Prompt</>}
                </button>
              </div>
            </form>

            {customScore && (
              <output className="block p-4 rounded-xl border border-slate-800 bg-[#070b18] space-y-4 animate-fadeIn">
                <span className="text-xs font-mono uppercase text-slate-400 block">Pillar Audit Report:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: customScore.task ? "✓ Task Clear" : "✗ Needs Verb", pass: customScore.task },
                    { label: customScore.details ? "✓ Detailed Scope" : "✗ Too Brief", pass: customScore.details },
                    { label: customScore.audience ? "✓ Audience Set" : "✗ Missing Audience", pass: customScore.audience },
                    { label: customScore.format ? "✓ Format Defined" : "✗ Missing Format", pass: customScore.format }
                  ].map(b => (
                    <div key={b.label} className={`p-3 rounded-lg border text-center text-xs font-bold font-mono ${b.pass ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-300" : "border-rose-500/60 bg-rose-950/20 text-rose-300"}`}>{b.label}</div>
                  ))}
                </div>
                {customOutput && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800">{customOutput}</pre>
                  </div>
                )}
              </output>
            )}
          </section>
        </ScrollReveal>
      )}

      {/* TRACK 3: RESPONSIBLE AI */}
      {challengesTab === "ethics" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="space-y-8 animate-fadeIn">
          <article className="rounded-2xl border border-indigo-500/30 bg-[#090f24] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">🚨 WHAT WOULD YOU DO? · AI ETHICS ARENA</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Responsible AI Decision Game</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">AI gives humans superpowers, but great tools require ethical discipline. Make your choices in realistic academic dilemmas.</p>
            </div>
            <aside className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-full inline-block">🏆 +100 XP REWARD</span>
            </aside>
          </article>

          <nav aria-label="Ethics Cases" className="flex items-center gap-2 overflow-x-auto pb-2">
            {ETHICS_SCENARIOS.map((sc, idx) => (
              <button key={sc.id} type="button" onClick={() => { sound.playClick(); setScenarioIndex(idx); }} className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 border cursor-pointer ${idx === scenarioIndex ? "bg-indigo-500/30 text-indigo-200 border-indigo-400" : ethicsChoices[sc.id] ? "bg-slate-900 text-slate-300 border-emerald-500/40" : "bg-slate-900/60 text-slate-500 border-slate-800"}`}>
                <span>Case 0{idx + 1}</span>{ethicsChoices[sc.id] && <span className="text-emerald-400">✓</span>}
              </button>
            ))}
          </nav>

          <article className="rounded-2xl border border-slate-800 bg-[#080d1e] p-6 sm:p-8 space-y-6">
            <header>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">{currentScenario.title}</span>
              <blockquote className="text-base sm:text-lg font-semibold text-slate-100 mt-2 leading-relaxed m-0 border-l-2 border-indigo-500 pl-4">"{currentScenario.scenario}"</blockquote>
            </header>

            <div className="space-y-4">
              {currentScenario.options.map(opt => {
                const isSelected = ethicsChoices[currentScenario.id] === opt.id;
                const hasSelected = ethicsChoices[currentScenario.id] !== undefined;
                const style = hasSelected
                  ? opt.isBestChoice ? "border-emerald-500/80 bg-emerald-950/30 text-emerald-100" : isSelected ? "border-rose-500/80 bg-rose-950/30 text-rose-100" : "border-slate-800 bg-slate-950/40 text-slate-400 opacity-60"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-200";
                return (
                  <div key={opt.id} onClick={() => handleEthicsSelect(opt.id)} className={`rounded-xl border p-5 transition-all cursor-pointer ${style}`}>
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-bold text-slate-200 shrink-0">{opt.id}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-relaxed">{opt.text}</div>
                        {hasSelected && (
                          <aside className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1">
                            <div className="font-bold">{opt.feedback}</div>
                            <div className="text-slate-300 italic">Principle: {opt.guideline}</div>
                          </aside>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button type="button" onClick={() => { sound.playClick(); setScenarioIndex(p => Math.max(0, p - 1)); }} disabled={scenarioIndex === 0} className="text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer">← Previous Case</button>
              {scenarioIndex < ETHICS_SCENARIOS.length - 1 ? (
                <button type="button" onClick={() => { sound.playClick(); setScenarioIndex(p => p + 1); }} className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                  <span>Next Case</span><ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={() => { sound.playSuccess(); completeMission("mission_3", 100, "ethics-expert"); setCurrentView("fact-check"); }} className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                  <span>Advance to Fact-Check Mission</span><ArrowRight className="w-4 h-4" />
                </button>
              )}
            </footer>
          </article>
        </ScrollReveal>
      )}
    </main>
  );
}
