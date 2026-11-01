import { useState } from "react";
import { Brain, Sparkles, ArrowRight, CheckCircle2, XCircle, Layers, Activity, RefreshCw } from "lucide-react";
import { useGame } from "../context/GameContext";
import { AI_OR_NOT_ITEMS, MISSION_1_QUIZ } from "../data/gameData";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const LESSONS = [
  { icon: Brain, num: "01", color: "cyan", title: "Tell the concepts apart", sub: "AI, machine learning & generative AI", p1: "Traditional software follows human-written rules (if red light, stop).", p2: "With Machine Learning, the computer studies thousands of photos to detect patterns itself. Generative AI goes further: it creates brand new text, images, or code!", footer: "Rule of thumb: A pocket calculator does math, but it never learns." },
  { icon: Activity, num: "02", color: "teal", title: "Follow the data", sub: "How models learn from data", p1: "Think about shooting a basketball: you shoot, miss, and adjust your wrist based on the outcome.", p2: "AI does the same with Training Data and mathematical dials called Weights. It nudges weights after every error to improve.", footer: "The golden rule: If your training data is flawed or biased, the AI will be too." },
  { icon: Sparkles, num: "03", color: "amber", title: "Recognize the limits", sub: "Why AI can get things wrong", p1: "Chatbots are high-speed autocomplete. They calculate which word sounds most natural next, not which is true.", p2: "When an AI does not know, it stitches together believable sentences with complete confidence: a hallucination.", footer: "Never confuse a confident tone with factual accuracy." }
];

export function LearnView() {
  const { state, completeMission, setCurrentView } = useGame();
  const [step, setStep] = useState("learn");
  const [wheels, setWheels] = useState(true);
  const [wings, setWings] = useState(false);
  const [jet, setJet] = useState(false);
  const [aiAnswers, setAiAnswers] = useState({});
  const [reviewed, setReviewed] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isDone = state.completedMissions.includes("mission_1");

  const classification = wings && jet
    ? { label: "Commercial Supersonic Jet ✈️", conf: 98, type: "Aviation Model" }
    : wings && !jet
    ? { label: "Glider / Drone Aircraft 🛫", conf: 91, type: "Aerodynamic Model" }
    : wheels && !wings
    ? { label: "Autonomous Land Rover 🚗", conf: 96, type: "Ground Mobility Model" }
    : { label: "Unidentified Cyber Satellite 🛰️", conf: 84, type: "Experimental Sensor" };

  const handleAiChoice = (item, choice) => {
    sound.playClick();
    if (choice === item.isAi) sound.playSuccess(); else sound.playError();
    setAiAnswers(prev => ({ ...prev, [item.id]: choice }));
    if (!reviewed.includes(item.id)) setReviewed(prev => [...prev, item.id]);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    setSubmitted(true);
    const allCorrect = MISSION_1_QUIZ.every(q => quizAnswers[q.id] !== undefined && q.options[quizAnswers[q.id]].correct);
    if (allCorrect) {
      sound.playSuccess();
      completeMission("mission_1", 50, "ai-rookie");
      setStep("completed");
    } else {
      sound.playError();
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ScrollReveal as="header" animation="fade-up" className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1">
            <span>MISSION 1</span>·<span>FOUNDATIONS</span>
            {isDone && <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px]">COMPLETED ✓</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Track 1: AI Foundations</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">Understand the systems behind the screen: how models learn from data and why they can get things wrong.</p>
        </div>

        <nav aria-label="Stages" className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
          {[
            { id: "learn", label: "1. 3 CORE LESSONS" },
            { id: "try", label: "2. TRY (AI OR NOT)" },
            { id: "quiz", label: "3. VERIFICATION QUIZ" }
          ].map((s, idx) => (
            <span key={s.id} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-slate-600 text-xs">→</span>}
              <button type="button" onClick={() => { sound.playClick(); setStep(s.id); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${step === s.id || (s.id === "quiz" && step === "completed") ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>{s.label}</button>
            </span>
          ))}
        </nav>
      </ScrollReveal>

      {/* STAGE 1: LESSONS & SIMULATOR */}
      {step === "learn" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LESSONS.map((l) => {
              const Icon = l.icon;
              return (
                <article key={l.num} className={`rounded-2xl border border-${l.color}-500/30 bg-[#091124] p-6 space-y-4 hover:border-${l.color}-400 transition-colors flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <figure className={`h-10 w-10 rounded-xl bg-${l.color}-500/10 border border-${l.color}-500/30 flex items-center justify-center text-${l.color}-300 m-0`}><Icon className="w-5 h-5" /></figure>
                      <span className={`text-[11px] font-mono font-bold text-${l.color}-400`}>LESSON {l.num}</span>
                    </div>
                    <header>
                      <h2 className="text-base font-bold text-white">{l.title}</h2>
                      <span className={`text-xs text-${l.color}-300 font-mono`}>{l.sub}</span>
                    </header>
                    <p className="text-xs text-slate-300 leading-relaxed">{l.p1}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{l.p2}</p>
                  </div>
                  <footer className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic">{l.footer}</footer>
                </article>
              );
            })}
          </div>

          <section aria-label="Interactive Simulator" className="rounded-2xl border border-cyan-800/50 bg-[#080e1e] p-6 sm:p-8 space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400"><Layers className="w-4 h-4" /> INTERACTIVE NEURAL SIMULATOR</div>
                <h2 className="text-xl font-bold text-white mt-1">How Neural Nodes Classify Objects</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Toggle input features to see predictions</span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <fieldset className="space-y-4 border-0 p-0 m-0">
                <legend className="text-xs font-mono uppercase text-slate-400 block mb-2">Layer 1: Input Features (Sensors)</legend>
                {[
                  { label: "Has Wheels / Tires", val: wheels, setVal: setWheels, color: "bg-cyan-500" },
                  { label: "Has Aerodynamic Wings", val: wings, setVal: setWings, color: "bg-teal-400" },
                  { label: "High-Thrust Jet Engine", val: jet, setVal: setJet, color: "bg-amber-400" }
                ].map(({ label, val, setVal, color }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-sm font-medium text-slate-200">{label}</span>
                    <button type="button" onClick={() => { sound.playClick(); setVal(!val); }} className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${val ? `${color} text-slate-950` : "bg-slate-800 text-slate-400"}`}>
                      {val ? "YES [1]" : "NO [0]"}
                    </button>
                  </div>
                ))}
              </fieldset>

              <article className="rounded-xl border border-cyan-500/30 bg-[#070b18] p-6 text-center space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400 block">Layer 3: Neural Output Node</span>
                <output className="block p-4 rounded-xl bg-slate-900/90 border border-cyan-800/40">
                  <div className="text-2xl font-black text-white">{classification.label}</div>
                  <div className="mt-2 text-xs font-mono text-cyan-300">Confidence: {classification.conf}% ({classification.type})</div>
                </output>
                <p className="text-xs text-slate-400 leading-relaxed">Toggling features changes activation pathways across mathematical layers to reach a final classification.</p>
              </article>
            </div>

            <footer className="pt-4 flex justify-end">
              <button type="button" onClick={() => { sound.playClick(); setStep("try"); }} className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 flex items-center gap-2 text-xs font-mono tracking-wider uppercase cursor-pointer">
                <span>NEXT: PLAY “AI OR NOT AI?”</span><ArrowRight className="w-4 h-4" />
              </button>
            </footer>
          </section>
        </ScrollReveal>
      )}

      {/* STAGE 2: TRY (AI OR NOT) */}
      {step === "try" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="space-y-6 animate-fadeIn">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">“AI or Not AI?” Challenge</h2>
              <p className="text-xs sm:text-sm text-slate-400">Can you distinguish machine learning systems from fixed code? Click your verdict.</p>
            </div>
            <output className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-lg inline-block">Evaluated: {reviewed.length} / {AI_OR_NOT_ITEMS.length}</output>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_OR_NOT_ITEMS.map((item) => {
              const choice = aiAnswers[item.id];
              const answered = choice !== undefined;
              const isCorrect = choice === item.isAi;
              return (
                <article key={item.id} className={`rounded-xl border p-5 transition-all ${answered ? (isCorrect ? "border-emerald-500/60 bg-emerald-950/20" : "border-rose-500/60 bg-rose-950/20") : "border-slate-800 bg-[#091124]"}`}>
                  <header className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <figure className="text-3xl m-0">{item.icon}</figure>
                      <div>
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <span className="text-[11px] font-mono text-slate-400">{item.techType}</span>
                      </div>
                    </div>
                    {answered && <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>{isCorrect ? "CORRECT" : "INCORRECT"}</span>}
                  </header>
                  {!answered ? (
                    <footer className="grid grid-cols-2 gap-2 mt-4">
                      <button type="button" onClick={() => handleAiChoice(item, true)} className="py-2 px-4 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-xs font-bold font-mono transition-colors cursor-pointer">🤖 IT'S AI</button>
                      <button type="button" onClick={() => handleAiChoice(item, false)} className="py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold font-mono transition-colors cursor-pointer">🚫 NOT AI</button>
                    </footer>
                  ) : (
                    <footer className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-white block mb-0.5">{item.isAi ? "🤖 Genuine AI:" : "🧮 Fixed Logic:"}</span>
                      {item.explanation}
                    </footer>
                  )}
                </article>
              );
            })}
          </div>

          <footer className="pt-4 flex items-center justify-between">
            <button type="button" onClick={() => { sound.playClick(); setStep("learn"); }} className="text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer">← Back to Lesson</button>
            <button type="button" onClick={() => { sound.playClick(); setStep("quiz"); }} className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 flex items-center gap-2 text-xs font-mono tracking-wider uppercase cursor-pointer">
              <span>ADVANCE TO FINAL QUIZ</span><ArrowRight className="w-4 h-4" />
            </button>
          </footer>
        </ScrollReveal>
      )}

      {/* STAGE 3: QUIZ */}
      {step === "quiz" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="space-y-8 animate-fadeIn">
          <header>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Cadet Evaluation Quiz</h2>
            <p className="text-xs sm:text-sm text-slate-400">Answer all questions correctly to earn <strong className="text-cyan-300">⭐ +50 XP</strong> and unlock the <strong className="text-amber-300">🧠 AI Rookie</strong> badge.</p>
          </header>

          <form onSubmit={handleQuizSubmit} className="space-y-6">
            {MISSION_1_QUIZ.map((q, qIndex) => {
              const selectedOpt = quizAnswers[q.id];
              return (
                <fieldset key={q.id} className="rounded-2xl border border-slate-800 bg-[#091124] p-6 space-y-4 m-0">
                  <legend className="text-xs font-mono text-cyan-400 font-bold uppercase px-2">QUESTION {qIndex + 1} OF {MISSION_1_QUIZ.length}</legend>
                  <h3 className="text-base sm:text-lg font-bold text-white">{q.question}</h3>
                  <div className="space-y-2">
                    {q.options.map((opt, oIndex) => {
                      const isChosen = selectedOpt === oIndex;
                      const style = submitted
                        ? opt.correct ? "border-emerald-500/80 bg-emerald-950/40 text-emerald-200" : isChosen ? "border-rose-500/80 bg-rose-950/40 text-rose-200" : "border-slate-800 bg-slate-900/60 text-slate-400"
                        : isChosen ? "border-cyan-500 bg-cyan-950/50 text-cyan-200" : "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300";
                      return (
                        <button key={oIndex} type="button" onClick={() => { if (!submitted) { sound.playClick(); setQuizAnswers(prev => ({ ...prev, [q.id]: oIndex })); } }} className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}>
                          <span>{opt.text}</span>
                          {submitted && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                          {submitted && isChosen && !opt.correct && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && <aside className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"><span className="font-semibold text-cyan-300 block mb-1">Concept Insight:</span>{q.explanation}</aside>}
                </fieldset>
              );
            })}

            <footer className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => { sound.playClick(); setStep("try"); }} className="text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer">← Back to “AI or Not AI”</button>
              {!submitted ? (
                <button type="submit" disabled={Object.keys(quizAnswers).length < MISSION_1_QUIZ.length} className={`px-8 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all ${Object.keys(quizAnswers).length === MISSION_1_QUIZ.length ? "text-slate-950 bg-gradient-to-r from-cyan-400 to-amber-300 hover:opacity-90 cursor-pointer shadow-lg" : "text-slate-500 bg-slate-800 cursor-not-allowed"}`}>
                  SUBMIT FOR GRADING (+50 XP)
                </button>
              ) : (
                <button type="button" onClick={() => { sound.playClick(); setSubmitted(false); setQuizAnswers({}); }} className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
              )}
            </footer>
          </form>
        </ScrollReveal>
      )}

      {/* STAGE 4: COMPLETED */}
      {step === "completed" && (
        <ScrollReveal as="section" animation="fade-up" delay={80} className="rounded-2xl border border-emerald-500/50 bg-[#071322] p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <figure className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-4xl shadow-lg m-0">🧠</figure>
          <header>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase mb-2"><CheckCircle2 className="w-4 h-4" /> MISSION 1 COMPLETE</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">AI Rookie Badge Acquired!</h2>
            <output className="block text-sm font-mono text-cyan-300 font-bold mt-1">⭐ +50 XP ADDED TO YOUR RECORD</output>
          </header>
          <p className="max-w-lg mx-auto text-sm text-slate-300 leading-relaxed">You now know how neural networks generalize from data rather than following static rules. Next: master prompt engineering!</p>
          <footer className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button type="button" onClick={() => { sound.playClick(); setCurrentView("challenges"); }} className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:opacity-95 text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer">
              <span>ADVANCE TO MISSION 2: AI SKILLS</span><ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => { sound.playClick(); setCurrentView("progress"); }} className="px-6 py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer">
              VIEW DASHBOARD & BADGES
            </button>
          </footer>
        </ScrollReveal>
      )}
    </main>
  );
}
