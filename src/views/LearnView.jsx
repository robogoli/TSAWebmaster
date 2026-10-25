import { useState } from "react";
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  Activity,
  RefreshCw
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { AI_OR_NOT_ITEMS, MISSION_1_QUIZ } from "../data/gameData";
import { sound } from "../utils/sound";
export function LearnView() {
  const { state, completeMission, setCurrentView } = useGame();
  const [currentStep, setCurrentStep] = useState("learn");
  const [hasWheels, setHasWheels] = useState(true);
  const [hasWings, setHasWings] = useState(false);
  const [hasJetEngine, setHasJetEngine] = useState(false);
  const [aiAnswers, setAiAnswers] = useState({});
  const [reviewedItems, setReviewedItems] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const isMissionDone = state.completedMissions.includes("mission_1");
  const getClassification = () => {
    if (hasWings && hasJetEngine) return { label: "Commercial Supersonic Jet \u2708\uFE0F", confidence: 98, type: "Aviation Model" };
    if (hasWings && !hasJetEngine) return { label: "Glider / Drone Aircraft \u{1F6E9}\uFE0F", confidence: 91, type: "Aerodynamic Model" };
    if (hasWheels && !hasWings) return { label: "Autonomous Land Rover \u{1F697}", confidence: 96, type: "Ground Mobility Model" };
    return { label: "Unidentified Cyber Satellite \u{1F6F0}\uFE0F", confidence: 84, type: "Experimental Sensor" };
  };
  const classification = getClassification();
  const handleAiChoice = (item, userPickedAi) => {
    sound.playClick();
    const isCorrect = userPickedAi === item.isAi;
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
    setAiAnswers((prev) => ({ ...prev, [item.id]: userPickedAi }));
    if (!reviewedItems.includes(item.id)) {
      setReviewedItems((prev) => [...prev, item.id]);
    }
  };
  const handleOptionSelect = (qId, optIndex) => {
    if (quizSubmitted) return;
    sound.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };
  const handleQuizSubmit = () => {
    sound.playClick();
    setQuizSubmitted(true);
    const allCorrect = MISSION_1_QUIZ.every(
      (q) => quizAnswers[q.id] !== void 0 && q.options[quizAnswers[q.id]].correct
    );
    if (allCorrect) {
      sound.playSuccess();
      completeMission("mission_1", 50, "ai-rookie");
      setCurrentStep("completed");
    } else {
      sound.playError();
    }
  };
  return <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {
    /* Track Header & Stepper */
  }
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1">
            <span>MISSION 1</span>
            <span aria-hidden="true">·</span>
            <span>FOUNDATIONS</span>
            {isMissionDone && <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px]">
                COMPLETED ✓
              </span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Understand AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Explore how machine learning differs from traditional rules, test your instincts, and earn your AI Rookie badge.
          </p>
        </div>

        {
    /* 3-Step Navigation Bar */
  }
        <nav aria-label="Mission 1 Stages" className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
          <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("learn");
    }}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${currentStep === "learn" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
            1. LEARN
          </button>
          <span className="text-slate-600 text-xs" aria-hidden="true">→</span>
          <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("try");
    }}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${currentStep === "try" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
            2. TRY (AI OR NOT)
          </button>
          <span className="text-slate-600 text-xs" aria-hidden="true">→</span>
          <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("quiz");
    }}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${currentStep === "quiz" || currentStep === "completed" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
            3. QUIZ
          </button>
        </nav>
      </header>

      {
    /* STAGE 1: LEARN */
  }
      {currentStep === "learn" && <section aria-label="Foundational AI Lessons" className="space-y-8 animate-fadeIn">
          {
    /* Concept Explanations */
  }
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
    /* Card 1: What is AI? */
  }
            <article className="rounded-2xl border border-cyan-500/30 bg-[#091124] p-6 space-y-4 hover:border-cyan-400 transition-colors">
              <figure className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 m-0">
                <Brain className="w-6 h-6" />
              </figure>
              <header>
                <h2 className="text-lg font-bold text-white">What is AI?</h2>
                <span className="text-xs text-cyan-400 font-mono">Traditional Code vs AI</span>
              </header>
              <p className="text-xs text-slate-300 leading-relaxed">
                In normal code, programmers write strict manual rules: <code className="text-cyan-300 font-mono">if (x == y)</code>.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                With <mark className="bg-cyan-950 text-cyan-200 px-1 rounded font-semibold">Artificial Intelligence</mark>, the computer is shown thousands of examples and discovers the hidden patterns by itself!
              </p>
            </article>

            {
    /* Card 2: How does AI learn? */
  }
            <article className="rounded-2xl border border-teal-500/30 bg-[#091124] p-6 space-y-4 hover:border-teal-400 transition-colors">
              <figure className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 m-0">
                <Activity className="w-6 h-6" />
              </figure>
              <header>
                <h2 className="text-lg font-bold text-white">How does AI learn?</h2>
                <span className="text-xs text-teal-400 font-mono">Data & Feedback Loops</span>
              </header>
              <p className="text-xs text-slate-300 leading-relaxed">
                Imagine learning to shoot a basketball. At first you miss. Your eyes see the mistake, your brain adjusts muscle force, and you shoot again.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                AI uses <strong>Training Data</strong> and mathematical dials called <strong>Weights</strong>. When it makes an error, it recalculates to become more accurate.
              </p>
            </article>

            {
    /* Card 3: Where is AI used? */
  }
            <article className="rounded-2xl border border-amber-500/30 bg-[#091124] p-6 space-y-4 hover:border-amber-400 transition-colors">
              <figure className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 m-0">
                <Sparkles className="w-6 h-6" />
              </figure>
              <header>
                <h2 className="text-lg font-bold text-white">Where is AI used?</h2>
                <span className="text-xs text-amber-400 font-mono">Everyday Impact</span>
              </header>
              <ul className="text-xs text-slate-300 space-y-2 list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>Healthcare: Detecting diseases in X-rays</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <span>Mobility: Self-driving cars & navigation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>Language: Real-time speech translation</span>
                </li>
              </ul>
            </article>
          </div>

          {
    /* Interactive Neural Classifier Simulator */
  }
          <section aria-label="Interactive Neural Simulator" className="rounded-2xl border border-cyan-800/50 bg-[#080e1e] p-6 sm:p-8 space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  <Layers className="w-4 h-4" /> INTERACTIVE NEURAL SIMULATOR
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  How Neural Nodes Classify Objects
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Toggle input features to see output classification
              </span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {
    /* Feature Toggles (Inputs) */
  }
              <fieldset className="space-y-4 border-0 p-0 m-0">
                <legend className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Layer 1: Input Features (Sensors)
                </legend>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-sm font-medium text-slate-200">Has Wheels / Tires</span>
                  <button
    type="button"
    onClick={() => {
      sound.playClick();
      setHasWheels(!hasWheels);
    }}
    className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${hasWheels ? "bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]" : "bg-slate-800 text-slate-400"}`}
  >
                    {hasWheels ? "YES [1]" : "NO [0]"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-sm font-medium text-slate-200">Has Aerodynamic Wings</span>
                  <button
    type="button"
    onClick={() => {
      sound.playClick();
      setHasWings(!hasWings);
    }}
    className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${hasWings ? "bg-teal-400 text-slate-950 shadow-[0_0_10px_rgba(45,212,191,0.4)]" : "bg-slate-800 text-slate-400"}`}
  >
                    {hasWings ? "YES [1]" : "NO [0]"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-sm font-medium text-slate-200">High-Thrust Jet Engine</span>
                  <button
    type="button"
    onClick={() => {
      sound.playClick();
      setHasJetEngine(!hasJetEngine);
    }}
    className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${hasJetEngine ? "bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.4)]" : "bg-slate-800 text-slate-400"}`}
  >
                    {hasJetEngine ? "YES [1]" : "NO [0]"}
                  </button>
                </div>
              </fieldset>

              {
    /* Classification Prediction Output */
  }
              <article className="rounded-xl border border-cyan-500/30 bg-[#070b18] p-6 text-center space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Layer 3: Neural Output Node
                </span>

                <output className="block p-4 rounded-xl bg-slate-900/90 border border-cyan-800/40">
                  <div className="text-2xl font-black text-white">
                    {classification.label}
                  </div>
                  <div className="mt-2 text-xs font-mono text-cyan-300">
                    Model Confidence: {classification.confidence}% ({classification.type})
                  </div>
                </output>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Notice how toggling an input feature activates different pathways in the model’s mathematical layers to reach a final classification!
                </p>
              </article>
            </div>

            {
    /* Advance to Try */
  }
            <footer className="pt-4 flex justify-end">
              <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("try");
    }}
    className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 transition-opacity flex items-center gap-2 text-xs font-mono tracking-wider uppercase cursor-pointer"
  >
                <span>NEXT: PLAY “AI OR NOT AI?”</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </footer>
          </section>
        </section>}

      {
    /* STAGE 2: TRY (“AI OR NOT AI?”) */
  }
      {currentStep === "try" && <section aria-label="AI or Not AI Challenge" className="space-y-6 animate-fadeIn">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                “AI or Not AI?” Challenge
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Can you distinguish machine learning systems from traditional deterministic software? Click your verdict for each device.
              </p>
            </div>
            <output className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-lg inline-block">
              Evaluated: {reviewedItems.length} / {AI_OR_NOT_ITEMS.length}
            </output>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_OR_NOT_ITEMS.map((item) => {
    const userChoice = aiAnswers[item.id];
    const hasAnswered = userChoice !== void 0;
    const isCorrect = userChoice === item.isAi;
    return <article
      key={item.id}
      className={`rounded-xl border p-5 transition-all ${hasAnswered ? isCorrect ? "border-emerald-500/60 bg-emerald-950/20" : "border-rose-500/60 bg-rose-950/20" : "border-slate-800 bg-[#091124]"}`}
    >
                  <header className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <figure className="text-3xl m-0">{item.icon}</figure>
                      <div>
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.techType}
                        </span>
                      </div>
                    </div>

                    {hasAnswered && <span
      className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}
    >
                        {isCorrect ? "CORRECT" : "INCORRECT"}
                      </span>}
                  </header>

                  {
      /* Buttons */
    }
                  {!hasAnswered ? <footer className="grid grid-cols-2 gap-2 mt-4">
                      <button
      type="button"
      onClick={() => handleAiChoice(item, true)}
      className="py-2 px-4 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-xs font-bold font-mono transition-colors cursor-pointer"
    >
                        🤖 IT'S AI
                      </button>
                      <button
      type="button"
      onClick={() => handleAiChoice(item, false)}
      className="py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold font-mono transition-colors cursor-pointer"
    >
                        🚫 NOT AI
                      </button>
                    </footer> : <footer className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-white block mb-0.5">
                        {item.isAi ? "\u{1F916} Genuine AI:" : "\u{1F9EE} Not AI (Fixed Logic):"}
                      </span>
                      {item.explanation}
                    </footer>}
                </article>;
  })}
          </div>

          <footer className="pt-4 flex items-center justify-between">
            <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("learn");
    }}
    className="text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
  >
              ← Back to Lesson
            </button>

            <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("quiz");
    }}
    className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 transition-opacity flex items-center gap-2 text-xs font-mono tracking-wider uppercase cursor-pointer"
  >
              <span>ADVANCE TO FINAL QUIZ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </footer>
        </section>}

      {
    /* STAGE 3: QUIZ */
  }
      {currentStep === "quiz" && <section aria-label="Cadet Evaluation Quiz" className="space-y-8 animate-fadeIn">
          <header>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Cadet Evaluation Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Answer all 3 questions correctly to earn your <strong className="text-cyan-300">⭐ +50 XP</strong> and unlock the <strong className="text-amber-300">🧠 AI Rookie</strong> badge.
            </p>
          </header>

          <form
    onSubmit={(e) => {
      e.preventDefault();
      handleQuizSubmit();
    }}
    className="space-y-6"
  >
            {MISSION_1_QUIZ.map((q, qIndex) => {
    const selectedOpt = quizAnswers[q.id];
    return <fieldset
      key={q.id}
      className="rounded-2xl border border-slate-800 bg-[#091124] p-6 space-y-4 m-0"
    >
                  <legend className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase px-2">
                    QUESTION {qIndex + 1} OF {MISSION_1_QUIZ.length}
                  </legend>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((opt, oIndex) => {
      const isChosen = selectedOpt === oIndex;
      let optionStyle = "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300";
      if (quizSubmitted) {
        if (opt.correct) {
          optionStyle = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200";
        } else if (isChosen && !opt.correct) {
          optionStyle = "border-rose-500/80 bg-rose-950/40 text-rose-200";
        }
      } else if (isChosen) {
        optionStyle = "border-cyan-500 bg-cyan-950/50 text-cyan-200";
      }
      return <button
        key={oIndex}
        type="button"
        onClick={() => handleOptionSelect(q.id, oIndex)}
        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
      >
                          <span>{opt.text}</span>
                          {quizSubmitted && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                          {quizSubmitted && isChosen && !opt.correct && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                        </button>;
    })}
                  </div>

                  {quizSubmitted && <aside className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="font-semibold text-cyan-300 block mb-1">Concept Insight:</span>
                      {q.explanation}
                    </aside>}
                </fieldset>;
  })}

            <footer className="flex items-center justify-between pt-4">
              <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentStep("try");
    }}
    className="text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
  >
                ← Back to “AI or Not AI”
              </button>

              {!quizSubmitted ? <button
    type="submit"
    disabled={Object.keys(quizAnswers).length < MISSION_1_QUIZ.length}
    className={`px-8 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all ${Object.keys(quizAnswers).length === MISSION_1_QUIZ.length ? "text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 shadow-lg cursor-pointer" : "text-slate-500 bg-slate-800 cursor-not-allowed"}`}
  >
                  SUBMIT FOR GRADING (+50 XP)
                </button> : <button
    type="button"
    onClick={() => {
      sound.playClick();
      setQuizSubmitted(false);
      setQuizAnswers({});
    }}
    className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 cursor-pointer"
  >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                </button>}
            </footer>
          </form>
        </section>}

      {
    /* STAGE 4: COMPLETED CELEBRATION */
  }
      {currentStep === "completed" && <section aria-label="Mission 1 Completion" className="rounded-2xl border border-emerald-500/50 bg-[#071322] p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <figure className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-4xl shadow-[0_0_30px_rgba(16,185,129,0.4)] m-0">
            🧠
          </figure>

          <header>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" /> MISSION 1 COMPLETE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Rookie Badge Acquired!
            </h2>
            <output className="block text-sm font-mono text-cyan-300 font-bold mt-1">
              ⭐ +50 XP ADDED TO YOUR CADET RECORD
            </output>
          </header>

          <p className="max-w-lg mx-auto text-sm text-slate-300 leading-relaxed">
            You now possess the foundational knowledge of how neural networks generalize from data rather than following static rules. Next stop: Learn how to engineer master prompts!
          </p>

          <footer className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentView("challenges");
    }}
    className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:opacity-95 text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
  >
              <span>ADVANCE TO MISSION 2: AI SKILLS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
    type="button"
    onClick={() => {
      sound.playClick();
      setCurrentView("progress");
    }}
    className="px-6 py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
  >
              VIEW DASHBOARD & BADGES
            </button>
          </footer>
        </section>}
    </main>;
}
