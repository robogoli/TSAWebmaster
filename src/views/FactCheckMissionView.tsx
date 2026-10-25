import { useState } from 'react';
import {
  Clock,
  Search,
  PenTool,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

type Verdict = 'Supported' | 'False' | 'Uncertain';

export function FactCheckMissionView() {
  const { setCurrentView, completeMission, addXP, triggerConfetti } = useGame();

  // Interactive user verdicts
  const [verdictA, setVerdictA] = useState<Verdict>('Supported');
  const [reasoningA, setReasoningA] = useState(
    'Biology describes light energy being converted into chemical energy. CO₂ and water are used to produce carbohydrates, so the claim is supported.'
  );

  const [verdictB, setVerdictB] = useState<Verdict | null>('False');
  const [reasoningB, setReasoningB] = useState(
    'According to OpenStax Biology 2e Ch. 7 & 8, plant cells respire continuously in the light as well as in the dark to release energy from sugars. Respiration does not stop during the day.'
  );

  const [verdictC, setVerdictC] = useState<Verdict | null>('False');
  const [reasoningC, setReasoningC] = useState(
    'OpenStax Biology 2e §8.1 reveals that most dry mass actually comes from atmospheric carbon dioxide incorporated during photosynthesis, while soil minerals account for only a small percentage.'
  );

  const [reflectionChecked, setReflectionChecked] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Calculate progress
  const answeredCount = [
    verdictA !== null && reasoningA.trim().length > 10,
    verdictB !== null && reasoningB.trim().length > 10,
    verdictC !== null && reasoningC.trim().length > 10,
  ].filter(Boolean).length;

  const allReady = answeredCount === 3;

  const handleFinish = () => {
    sound.playSuccess();
    triggerConfetti();
    setIsCompleted(true);
    completeMission('detective', 100, 'data-detective');
    addXP(100, 'Fact-check the fluent mission completed');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb row */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setCurrentView('learning-path');
          }}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          AI Quest
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300">Daily challenge</span>
      </nav>

      {/* Hero Headline and Description */}
      <header className="space-y-4 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Fact-check the fluent.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          A confident answer isn’t always a correct one. Investigate three AI claims about photosynthesis, then explain what the evidence actually supports.
        </p>

        {/* 3 Meta Badges */}
        <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-400">10-15 MIN</div>
              <div className="text-[11px] text-slate-400">At your own pace</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-400">3 CLAIMS</div>
              <div className="text-[11px] text-slate-400">Evidence before confidence</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-400">YOUR REASONING</div>
              <div className="text-[11px] text-slate-400">No AI tool required</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper Guide Banner */}
      <section aria-label="Mission Instructions" className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6 space-y-4">
        <h2 className="text-base font-bold text-white">
          Your mission: check it, don't just accept it.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1 border-t border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <span>01</span>
              <span>Read with a skeptical eye</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Separate the response into claims. Decide what you think before checking the evidence.
            </p>
          </div>

          <div className="space-y-1 border-t border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <span>02</span>
              <span>Follow the evidence</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use the source notes and your biology textbook. Mark each claim supported, false, or uncertain.
            </p>
          </div>

          <div className="space-y-1 border-t border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <span>03</span>
              <span>Explain in your own words</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cite a source, correct any error, and name one thing you would still want to check.
            </p>
          </div>
        </div>
      </section>

      {/* Examination Chamber: Output vs Evidence Starter Kit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: The AI Output */}
        <article className="rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-7 space-y-5">
          <header className="border-b border-slate-800/80 pb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              01 / EXAMINE THE OUTPUT
            </span>
            <blockquote className="text-base sm:text-lg font-semibold text-white leading-relaxed m-0">
              “Explain how plants get energy and where a growing tree’s mass comes from.”
            </blockquote>
          </header>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                A
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Plants use light energy to make sugars from carbon dioxide and water during photosynthesis.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                B
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Plants only carry out cellular respiration at night, when photosynthesis stops.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                C
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Most of the dry mass a tree gains as it grows comes from minerals absorbed from the soil.
              </p>
            </div>
          </div>
        </article>

        {/* Right: Evidence Starter Kit */}
        <aside aria-label="Evidence Starter Kit" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-7 space-y-4">
          <header className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white">Evidence starter kit</h2>
              <p className="text-[11px] text-slate-400">
                Adapted source notes, not direct quotations. Check the original context before citing.
              </p>
            </div>
          </header>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                OPENSTAX BIOLOGY 2e — §8.1
              </span>
              <h3 className="font-bold text-white text-xs">Where the energy comes from</h3>
              <p className="text-slate-300 leading-relaxed">
                Photosynthesis converts light energy into chemical energy. Carbon dioxide and water are inputs used to produce carbohydrates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                OPENSTAX BIOLOGY 2e — CH. 7 & 8
              </span>
              <h3 className="font-bold text-white text-xs">Plants respire, too</h3>
              <p className="text-slate-300 leading-relaxed">
                Plant cells use cellular respiration to release energy from sugars. Respiration occurs in the light as well as in the dark.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                OPENSTAX BIOLOGY 2e — §8.1
              </span>
              <h3 className="font-bold text-white text-xs">Where the matter comes from</h3>
              <p className="text-slate-300 leading-relaxed">
                Carbon from atmospheric CO₂ is incorporated into sugars and other organic molecules. Soil minerals are essential nutrients, but are not the main source of a tree's dry mass.
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-500 pt-1">
              Find the original: openstax.org → Biology 2e → Chapters 7-8
            </div>
          </div>
        </aside>
      </div>

      {/* Lower Section: Your Judgment. Your Evidence. */}
      <section aria-label="Cadet Reasoning Workstation" className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Your judgment. Your evidence.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              An example draft is shown for claim A. Make the remaining judgments yourself.
            </p>
          </div>
          <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
            ILLUSTRATIVE DRAFT
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Draft Area (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-xs font-mono text-slate-400">
              Choose one verdict for each claim. “Uncertain” is valid when your evidence isn’t enough.
            </div>

            {/* Claim A Card */}
            <article className="rounded-2xl border border-slate-800 bg-[#091122] p-5 sm:p-6 space-y-4">
              <header className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Claim A · Light energy & sugars
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                  SAMPLE DRAFT
                </span>
              </header>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictA('Supported');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    verdictA === 'Supported'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {verdictA === 'Supported' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Supported</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictA('False');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictA === 'False'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  False
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictA('Uncertain');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictA === 'Uncertain'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Uncertain
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  EVIDENCE + REASONING
                </label>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  {reasoningA}
                </div>
              </div>
            </article>

            {/* Claim B Card */}
            <article className="rounded-2xl border border-slate-800 bg-[#091122] p-5 sm:p-6 space-y-4">
              <header className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Claim B · Respiration timing
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                  TO REVIEW
                </span>
              </header>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictB('Supported');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictB === 'Supported'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Supported
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playSuccess();
                    setVerdictB('False');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    verdictB === 'False'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {verdictB === 'False' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>False</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictB('Uncertain');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictB === 'Uncertain'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Uncertain
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  EVIDENCE + REASONING
                </label>
                <textarea
                  value={reasoningB}
                  onChange={(e) => setReasoningB(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed focus:border-emerald-500 focus:outline-none"
                  placeholder="Explain your verdict in your own words. Add the source title and section; correct the claim if needed."
                />
              </div>
            </article>

            {/* Claim C Card */}
            <article className="rounded-2xl border border-slate-800 bg-[#091122] p-5 sm:p-6 space-y-4">
              <header className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Claim C · A tree’s growing mass
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                  TO REVIEW
                </span>
              </header>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictC('Supported');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictC === 'Supported'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Supported
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playSuccess();
                    setVerdictC('False');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    verdictC === 'False'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {verdictC === 'False' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>False</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setVerdictC('Uncertain');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    verdictC === 'Uncertain'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Uncertain
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  EVIDENCE + REASONING
                </label>
                <textarea
                  value={reasoningC}
                  onChange={(e) => setReasoningC(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed focus:border-emerald-500 focus:outline-none"
                  placeholder="Explain your verdict in your own words. Add the source title and section; correct the claim if needed."
                />
              </div>
            </article>
          </div>

          {/* Right Sidebar: Challenge Progress & Readiness Checklist */}
          <aside aria-label="Challenge Progress Widget" className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-6 sticky top-24">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                CHALLENGE PROGRESS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono">
                  {answeredCount} / 3
                </span>
                <span className="text-xs text-slate-400 font-mono">claims drafted</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {answeredCount < 3
                  ? `${3 - answeredCount} claim(s) remain to evaluate.`
                  : 'All claims reviewed with evidence notes attached!'}
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-4 space-y-3">
              <span className="text-xs font-semibold text-white block">
                Ready when you can...
              </span>

              <ul className="space-y-2 text-xs text-slate-300 list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${verdictA && verdictB && verdictC ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>Give a verdict for all 3 claims</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${reasoningB.length > 20 && reasoningC.length > 20 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>Cite evidence for each verdict</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct errors in your own words</span>
                </li>
                <li className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="next-check"
                    checked={reflectionChecked}
                    onChange={(e) => setReflectionChecked(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0 bg-slate-900 cursor-pointer"
                  />
                  <label htmlFor="next-check" className="cursor-pointer">
                    Name a useful next check
                  </label>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              {!isCompleted ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={!allReady}
                  className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    allReady
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 hover:opacity-90 shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {allReady ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Finish challenge (+100 XP)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Finish challenge</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>MISSION COMPLETE!</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    +100 XP and Data Detective badge credited to your cadet profile.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCurrentView('progress');
                    }}
                    className="w-full mt-2 py-2 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer"
                  >
                    View Progress Dashboard
                  </button>
                </div>
              )}

              <p className="text-[10px] font-mono text-slate-500 text-center">
                Preview only · responses are not saved or submitted.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
