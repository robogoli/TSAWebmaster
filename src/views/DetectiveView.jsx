import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  FileText
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { DETECTIVE_CASES } from "../data/gameData";
import { sound } from "../utils/sound";
export function DetectiveView() {
  const { state, completeMission, setCurrentView } = useGame();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [clickedSentenceIds, setClickedSentenceIds] = useState([]);
  const [showCaseSummary, setShowCaseSummary] = useState(false);
  const currentCase = DETECTIVE_CASES[currentCaseIndex % DETECTIVE_CASES.length];
  const totalErrors = currentCase.aiResponseSentences.filter((s) => s.isError).length;
  const caughtErrors = currentCase.aiResponseSentences.filter(
    (s) => s.isError && clickedSentenceIds.includes(s.id)
  ).length;
  const handleSentenceClick = (sentence) => {
    if (clickedSentenceIds.includes(sentence.id)) return;
    setClickedSentenceIds((prev) => [...prev, sentence.id]);
    if (sentence.isError) {
      sound.playDetectiveCatch();
      if (caughtErrors + 1 >= totalErrors) {
        setTimeout(() => {
          sound.playSuccess();
          setShowCaseSummary(true);
          completeMission("detective", 100, "ai-detective");
        }, 600);
      }
    } else {
      sound.playError();
    }
  };
  const handleNextCase = () => {
    sound.playClick();
    setClickedSentenceIds([]);
    setShowCaseSummary(false);
    setCurrentCaseIndex((prev) => (prev + 1) % DETECTIVE_CASES.length);
  };
  const handleResetCase = () => {
    sound.playClick();
    setClickedSentenceIds([]);
    setShowCaseSummary(false);
  };
  return <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {
    /* Header Banner */
  }
      <header className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#141224] via-[#0d1326] to-[#0a1824] p-6 sm:p-10 shadow-2xl">
        <figure className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none mix-blend-screen hidden md:block m-0">
          <img
    src="/src/assets/images/detective_dossier_1791140983849.jpg"
    alt="AI Detective Dossier Station"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
        </figure>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>BONUS MISSION · CRITICAL AUDITING</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            CAN YOU CATCH THE AI? 🔎
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            AI chatbots sound authoritative, persuasive, and 100% sure of themselves—even when inventing total nonsense! Inspect the generated text below, click on suspected inaccuracies, and expose the AI’s hallucinations.
          </p>

          <footer className="mt-4 flex items-center gap-4 text-xs font-mono text-cyan-300">
            <span>Dossier: Case 0{currentCaseIndex + 1} of 0{DETECTIVE_CASES.length}</span>
            <span aria-hidden="true">·</span>
            <output className="text-amber-400 font-bold">Hallucinations Found: {caughtErrors} / {totalErrors}</output>
          </footer>
        </div>
      </header>

      {
    /* Case Selector Tabs */
  }
      <nav aria-label="Investigation Cases" className="flex items-center gap-2 overflow-x-auto pb-2">
        {DETECTIVE_CASES.map((c, index) => {
    const isActive = index === currentCaseIndex;
    return <button
      key={c.id}
      type="button"
      onClick={() => {
        sound.playClick();
        setCurrentCaseIndex(index);
        setClickedSentenceIds([]);
        setShowCaseSummary(false);
      }}
      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap border cursor-pointer ${isActive ? "bg-amber-500/20 text-amber-300 border-amber-400/80 shadow-md" : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"}`}
    >
              {c.title}
            </button>;
  })}
      </nav>

      {
    /* Investigation Dossier Workstation */
  }
      <section aria-label="Investigation Dossier Workstation" className="rounded-2xl border border-slate-800 bg-[#080d1c] p-6 sm:p-8 space-y-6">
        {
    /* Terminal Header */
  }
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <figure className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 m-0">
              <FileText className="w-5 h-5" />
            </figure>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase block">
                Incoming Transcript Inspection
              </span>
              <h2 className="text-lg font-bold text-white">{currentCase.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
    type="button"
    onClick={handleResetCase}
    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
  >
              <RotateCcw className="w-3 h-3" /> Reset Scan
            </button>
          </div>
        </header>

        {
    /* Prompt Given to AI */
  }
        <article className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Prompt Executed by Cadet:
          </span>
          <blockquote className="text-xs sm:text-sm font-mono text-cyan-200 m-0">
            "{currentCase.aiPrompt}"
          </blockquote>
        </article>

        {
    /* Interactive Highlightable Document Body */
  }
        <article className="space-y-2">
          <header className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>AI Generated Response (Click any sentence to fact-check):</span>
            <span className="text-amber-400 text-[11px]">Hover & click suspected mistakes</span>
          </header>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#091124] to-[#070b18] border border-cyan-900/40 space-y-3 leading-relaxed">
            {currentCase.aiResponseSentences.map((sentence) => {
    const isClicked = clickedSentenceIds.includes(sentence.id);
    let sentenceStyle = "hover:bg-cyan-500/10 cursor-pointer rounded px-1.5 py-1 transition-all inline-block text-slate-200";
    if (isClicked) {
      if (sentence.isError) {
        sentenceStyle = "bg-rose-500/20 text-rose-200 border-b-2 border-rose-500 font-medium px-2 py-1 rounded";
      } else {
        sentenceStyle = "bg-slate-800/60 text-slate-400 border-b-2 border-slate-600 px-2 py-1 rounded";
      }
    }
    return <mark
      key={sentence.id}
      onClick={() => handleSentenceClick(sentence)}
      className={`text-sm sm:text-base mr-1.5 leading-relaxed bg-transparent ${sentenceStyle}`}
      title={isClicked ? "Already audited" : "Click to flag as inaccurate hallucination"}
    >
                  {sentence.text}
                  {isClicked && sentence.isError && <span className="inline-flex items-center ml-1 text-xs font-mono font-bold text-rose-400 bg-rose-950/80 px-1.5 rounded">
                      [HALLUCINATION!]
                    </span>}
                  {isClicked && !sentence.isError && <span className="inline-flex items-center ml-1 text-xs font-mono text-slate-400 bg-slate-900 px-1.5 rounded">
                      [VERIFIED TRUE]
                    </span>}
                </mark>;
  })}
          </div>
        </article>

        {
    /* Inspector Findings Feed */
  }
        {clickedSentenceIds.length > 0 && <aside aria-label="Audit Findings Log" className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Audit Findings Log:
            </h3>
            <div className="space-y-2">
              {currentCase.aiResponseSentences.filter((s) => clickedSentenceIds.includes(s.id)).map((s) => <article
    key={s.id}
    className={`p-4 rounded-xl border text-xs sm:text-sm animate-fadeIn ${s.isError ? "border-rose-500/60 bg-rose-950/20 text-rose-100" : "border-slate-800 bg-slate-900/40 text-slate-300"}`}
  >
                    {s.isError ? <div className="space-y-1">
                        <header className="flex items-center gap-2 font-bold text-rose-300">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>🎉 You caught an AI mistake!</span>
                        </header>
                        <p className="text-slate-200">
                          <strong>Correction:</strong> {s.correction}
                        </p>
                        <p className="text-xs text-rose-300/90 italic">
                          {s.explanation}
                        </p>
                      </div> : <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          <strong>Accurate Statement:</strong> This sentence is historically and scientifically factual.
                        </span>
                      </div>}
                  </article>)}
            </div>
          </aside>}

        {
    /* Completion & Victory Box */
  }
        {showCaseSummary && <section role="status" aria-label="Case Solved" className="rounded-2xl border border-amber-500/50 bg-amber-950/20 p-6 sm:p-8 space-y-4 animate-fadeIn">
            <header className="flex items-center gap-3">
              <figure className="p-3 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xl m-0">
                🔎
              </figure>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                  CASE SOLVED · 100% HALLUCINATIONS EXPOSED
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Master Detective Status Confirmed!
                </h3>
              </div>
            </header>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentCase.verdictTip}
            </p>

            <footer className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-amber-500/30">
              <output className="text-xs font-mono text-cyan-300 font-bold block">
                ⭐ +100 XP CREDITED TO CADET PROFILE
              </output>

              <div className="flex items-center gap-2">
                <button
    type="button"
    onClick={handleNextCase}
    className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
  >
                  <span>Next Detective Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentView("progress");
    }}
    className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-300 hover:text-white bg-slate-800 transition-colors uppercase tracking-wider cursor-pointer"
  >
                  View Dashboard
                </button>
              </div>
            </footer>
          </section>}
      </section>
    </main>;
}
