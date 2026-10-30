import React, { useState } from "react";
import {
  Terminal,
  Shield,
  MessageSquare,
  Scan,
  BookOpen,
  Scale,
  Lock,
  Fingerprint,
  Target,
  Search
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
export function HomeView() {
  const { state, currentView, setCurrentView, openDailyModal } = useGame();
  React.useEffect(() => {
    if (currentView === "tool-lab") {
      document.getElementById("tool-lab")?.scrollIntoView({ behavior: "smooth" });
    } else if (currentView === "responsible-ai") {
      document.getElementById("responsible-ai")?.scrollIntoView({ behavior: "smooth" });
    } else if (currentView === "practice-missions") {
      document.getElementById("practice-missions")?.scrollIntoView({ behavior: "smooth" });
    } else if (currentView === "learning-path") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentView]);
  const [activePracticeMission, setActivePracticeMission] = useState(null);
  const [techAnswers, setTechAnswers] = useState({});
  const studentGreeting = state.studentName ? state.studentName.toUpperCase() : "CADET";
  const practiceMissions = [
    {
      id: "spot-ai",
      title: "Spot the AI",
      icon: Target,
      desc: "Sort six everyday technologies into rule-based software, predictive AI, or generative AI.",
      deliverable: "CREATE \u2192 An annotated comparison chart",
      action: () => setActivePracticeMission("spot-ai")
    },
    {
      id: "stress-test",
      title: "Stress-test a model",
      icon: Scan,
      desc: "Train on two types of objects. Change the lighting and background; record where predictions fail.",
      deliverable: "CREATE \u2192 A five-test error log",
      action: () => setActivePracticeMission("stress-test")
    },
    {
      id: "prompt-remix",
      title: "The prompt remix",
      icon: Terminal,
      desc: "Compare a vague prompt with a specific one. Change one ingredient and evaluate the difference.",
      deliverable: "CREATE \u2192 Two prompts + a short reflection",
      action: () => setCurrentView("challenges")
    },
    {
      id: "fact-check",
      title: "Fact-check the fluent",
      icon: Search,
      desc: "Check three AI-generated claims using reliable sources. Mark supported, false, or uncertain.",
      deliverable: "CREATE \u2192 A claim-and-source evidence table",
      action: () => setCurrentView("fact-check"),
      isHighlight: true
    },
    {
      id: "missing-voice",
      title: "Find the missing voice",
      icon: Scale,
      desc: "Compare two generated career descriptions. Identify a stereotype and rewrite the prompt fairly.",
      deliverable: "CREATE \u2192 A bias audit + revised prompt",
      action: () => setActivePracticeMission("missing-voice")
    },
    {
      id: "ai-boundary",
      title: "Draw your AI boundary",
      icon: Shield,
      desc: "Apply a sample teacher policy to three scenarios. Explain what is allowed and what needs disclosure.",
      deliverable: "CREATE \u2192 A personal responsible-use checklist",
      action: () => setActivePracticeMission("ai-boundary")
    }
  ];
  return <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-20 animate-fadeIn">
      {
    /* ========================================================================= */
  }
      {
    /* 1. HERO SECTION (Screenshot 2) */
  }
      {
    /* ========================================================================= */
  }
      <section id="hero" aria-label="Hero" className="space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AI QUEST CADET PORTAL • {state.studentName || 'STUDENT'}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{state.studentName || 'Student'}</span>
        </h1>
        <div className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
          Understand AI. Learn AI. Master AI
        </div>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          AI Quest is a learning platform that aims to teach high school students how to properly use AI, spot AI, and how to use it to fit your needs.
        </p>

        {
    /* Stats Row */
  }
        <div className="pt-6 border-b border-slate-800/80 pb-8 flex flex-wrap items-center gap-8 sm:gap-16 font-mono text-xs sm:text-sm text-slate-400">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono">3</span>
            <span>learning tracks</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono">9</span>
            <span>core lessons</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono">6</span>
            <span>practice missions</span>
          </div>
        </div>
      </section>

      {
    /* ========================================================================= */
  }
      {
    /* 2. ALL PATTERNS SECTION (Screenshot 2) */
  }
      {
    /* ========================================================================= */
  }
      <section id="learning-path" aria-label="All Patterns" className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            All Patterns
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            AI uses patterns in data to make predictions or generate content. It doesn't automatically know whether an answer is true.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {
    /* Left Diagram Box (7 cols) */
  }
          <article className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-8 space-y-6">
            <header>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                HOW A MODEL LEARNS
              </span>
            </header>

            {
    /* Visual Process Flow */
  }
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono">
              {
    /* Step 1: Data */
  }
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-bold">
                  DATA
                </span>
                <span className="text-sm font-semibold text-white block">Examples</span>
              </div>

              <span className="text-slate-600 font-bold hidden sm:inline">→</span>

              {
    /* Step 2: Training */
  }
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-bold">
                  TRAINING
                </span>
                <span className="text-sm font-semibold text-white block">Find patterns</span>
              </div>

              <span className="text-slate-600 font-bold hidden sm:inline">→</span>

              {
    /* Step 3: Model */
  }
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-bold">
                  MODEL
                </span>
                <span className="text-sm font-semibold text-white block">Make predictions</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
              A model trained on labeled plant photos can predict a plant type in a new photo. Poor lighting or unfamiliar plants can lead to errors.
            </p>
          </article>

          {
    /* Right 3 Numbered Insights (5 cols) */
  }
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pt-0.5">
                01
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Tell the concepts apart</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Distinguish broad AI, machine learning, and generative AI using everyday examples.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pt-0.5">
                02
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Follow the data</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Describe training data, patterns, and predictions without needing to write code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pt-0.5">
                03
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Recognize the limits</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Explain why incomplete data and hallucinations can produce unreliable answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* ========================================================================= */
  }
      {
    /* 3. THREE TRACKS. THREE THINGS TO KNOW. (Screenshots 1 & 3) */
  }
      {
    /* ========================================================================= */
  }
      <section aria-label="Curriculum Tracks" className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Three tracks. Three things to know.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Build your foundation, experiment with useful tools, then learn to use them responsibly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
    /* Card 1: Track 1 AI Foundations */
  }
          <article
    onClick={() => {
      sound.playClick();
      setCurrentView("learn");
    }}
    className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5 hover:border-emerald-500/60 transition-all flex flex-col justify-between cursor-pointer group"
  >
            <div className="space-y-4">
              <header className="flex items-start justify-between">
                <figure className="text-emerald-400 m-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <rect x="4" y="17" width="6" height="4" rx="1" />
                    <rect x="14" y="17" width="6" height="4" rx="1" />
                    <path d="M12 7v5" />
                    <path d="M7 17v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
                  </svg>
                </figure>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  TRACK 1
                </span>
              </header>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  AI foundations
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Understand the systems behind the screen.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>AI, machine learning & generative AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>How models learn from data</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Why AI can get things wrong</span>
                </li>
              </ul>
            </div>

            <footer className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                2 / 3 COMPLETE
              </span>
              <span className="text-slate-500">45 MIN</span>
            </footer>
          </article>

          {
    /* Card 2: Track 2 Tools & techniques */
  }
          <article
    onClick={() => {
      sound.playClick();
      setCurrentView("challenges");
    }}
    className="rounded-2xl border border-emerald-500/50 bg-[#091326] p-6 space-y-5 shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all flex flex-col justify-between cursor-pointer group"
  >
            <div className="space-y-4">
              <header className="flex items-start justify-between">
                <figure className="text-emerald-400 m-0">
                  <span className="font-mono text-lg font-bold">&gt;_</span>
                </figure>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  TRACK 2
                </span>
              </header>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Tools & techniques
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Turn curiosity into practical, testable skills.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Build a better prompt</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Use AI as a study partner</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Verify and improve an output</span>
                </li>
              </ul>
            </div>

            <footer className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                1 / 3 COMPLETE
              </span>
              <span className="text-slate-500">50 MIN</span>
            </footer>
          </article>

          {
    /* Card 3: Track 3 Responsible AI */
  }
          <article
    onClick={() => {
      sound.playClick();
      setCurrentView("challenges");
    }}
    className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-5 hover:border-emerald-500/60 transition-all flex flex-col justify-between cursor-pointer group"
  >
            <div className="space-y-4">
              <header className="flex items-start justify-between">
                <figure className="text-emerald-400 m-0">
                  <Shield className="w-6 h-6" />
                </figure>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  TRACK 3
                </span>
              </header>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Responsible AI
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Make choices you can explain and defend.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Bias, fairness & representation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Privacy and digital footprints</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Academic integrity & disclosure</span>
                </li>
              </ul>
            </div>

            <footer className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-bold">
                0 / 3 COMPLETE
              </span>
              <span className="text-slate-500">40 MIN</span>
            </footer>
          </article>
        </div>
      </section>

      {
    /* ========================================================================= */
  }
      {
    /* 4. BETTER QUESTIONS. BETTER LEARNING. (Screenshot 3) */
  }
      {
    /* ========================================================================= */
  }
      <section id="tool-lab" aria-label="Tool Lab" className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Better questions. Better learning.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Learn to write specific prompts, use AI for feedback rather than finished work, and verify the result against trusted sources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {
    /* Left Column: Anatomy of a useful prompt (7 cols) */
  }
          <article className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#091122] p-6 sm:p-7 space-y-5">
            <header className="border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Anatomy of a useful prompt</h3>
              <span className="text-xs font-mono text-slate-400 block mt-0.5">
                VAGUE / “Explain photosynthesis.”
              </span>
            </header>

            {
    /* Mint-highlighted prompt example */
  }
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200">
              “<span className="text-emerald-400 font-semibold">Help me practice photosynthesis</span> for grade 10 biology. I mix up light-dependent reactions and the Calvin cycle. <span className="text-emerald-400 font-semibold">Ask one question at a time</span>, wait for my answer, and give a hint before explaining. Don't write my assignment.”
            </div>

            <footer className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                BEFORE YOU TRUST THE RESPONSE
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compare the explanation with your textbook. Check terminology and facts. Refine your prompt if it misses your goal, then explain the concept in your own words.
              </p>
            </footer>
          </article>

          {
    /* Right Column: 3 tool cards (5 cols) */
  }
          <div className="lg:col-span-5 space-y-4">
            {
    /* Tool 1 */
  }
            <article className="p-4 rounded-xl border border-slate-800 bg-[#091122] flex items-start gap-3.5">
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <header className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Conversational AI</h4>
                </header>
                <span className="text-[10px] font-mono text-slate-500 block mb-1">
                  Example: ChatGPT
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Generate practice questions and request feedback. Check every factual claim.
                </p>
              </div>
            </article>

            {
    /* Tool 2 */
  }
            <article className="p-4 rounded-xl border border-slate-800 bg-[#091122] flex items-start gap-3.5">
              <Scan className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <header className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">No-code machine learning</h4>
                </header>
                <span className="text-[10px] font-mono text-slate-500 block mb-1">
                  Example: Teachable Machine
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Train a simple classifier on objects—not faces—and test it with new examples.
                </p>
              </div>
            </article>

            {
    /* Tool 3 */
  }
            <article className="p-4 rounded-xl border border-slate-800 bg-[#091122] flex items-start gap-3.5">
              <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <header className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Source-grounded study</h4>
                </header>
                <span className="text-[10px] font-mono text-slate-500 block mb-1">
                  Example: NotebookLM
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Explore permitted class notes. Follow citations back to the original source.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {
    /* ========================================================================= */
  }
      {
    /* 5. POWERFUL TOOLS. HUMAN RESPONSIBILITY. (Screenshot 4) */
  }
      {
    /* ========================================================================= */
  }
      <section id="responsible-ai" aria-label="Responsible AI" className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Powerful tools. Human responsibility.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Practice spotting bias, protecting privacy, and deciding when AI assistance supports learning—and when it crosses a line.
          </p>
        </div>

        {
    /* 3 Responsibility Cards */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-3">
            <Scale className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Question the bias</h3>
            <span className="text-xs font-semibold text-emerald-400 block">
              Identify whose perspectives are missing.
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Compare two outputs about the same topic. Look for stereotypes, unequal treatment, and gaps in representation.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-3">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Protect the person</h3>
            <span className="text-xs font-semibold text-emerald-400 block">
              Separate safe inputs from private data.
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never upload student records, passwords, personal details, or someone else's work without permission. Use invented examples.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#091122] p-6 space-y-3">
            <Fingerprint className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Own your thinking</h3>
            <span className="text-xs font-semibold text-emerald-400 block">
              Explain and disclose your AI assistance.
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Follow your teacher's rules first. Keep your reasoning and drafts. Credit allowed AI use; never present generated work as your own.
            </p>
          </article>
        </div>

        {
    /* Amber Callout Box (Exact match from Screenshot 4) */
  }
        <aside className="rounded-xl border border-amber-600/40 bg-[#1e170e] p-5 space-y-2 text-slate-200">
          <h4 className="text-sm font-bold text-amber-300">
            No. Small edits don’t make the thinking yours.
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Use allowed brainstorming to explore ideas, then build your own argument. Ask your teacher when unsure and disclose how AI helped.
          </p>
          <p className="text-xs text-slate-400 italic">
            Example: “I used AI to suggest counterarguments; I checked the sources and wrote the final analysis myself.”
          </p>
        </aside>
      </section>

      {
    /* ========================================================================= */
  }
      {
    /* 6. DON'T JUST READ ABOUT IT. TEST IT. (Screenshot 4) */
  }
      {
    /* ========================================================================= */
  }
      <section id="practice-missions" aria-label="Practice Missions" className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Don’t just read about it. Test it.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Small challenges. Real thinking. Use school-approved tools or teacher-provided sample outputs. Each mission ends with something you can explain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceMissions.map((mission) => {
    const Icon = mission.icon;
    return <article
      key={mission.id}
      onClick={mission.action}
      className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all cursor-pointer group ${mission.isHighlight ? "border-emerald-500/60 bg-[#091527] shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-400" : "border-slate-800 bg-[#091122] hover:border-slate-700"}`}
    >
                <div className="space-y-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mission.desc}
                  </p>
                </div>

                <footer className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">
                    {mission.deliverable}
                  </span>
                </footer>
              </article>;
  })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STUDENT RESOURCES & REFERENCE TOOLKIT (EASY TO FIND) */}
      {/* ========================================================================= */}
      <section id="resources" aria-label="Student Learning Resources" className="rounded-2xl border border-slate-800 bg-[#091224] p-6 sm:p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>EASY-TO-FIND STUDENT TOOLKIT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Student Resources &amp; Verification Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Quick access to practical classroom rules, textbook evidence, safe no-code sandboxes, and teacher disclosure templates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCurrentView("resources");
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-300 transition-colors shrink-0 cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            <span>Open Full Resource Hub</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </header>

        {/* 4 Fast-Access Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <article
            onClick={() => {
              sound.playClick();
              setCurrentView("resources");
            }}
            className="p-5 rounded-xl border border-slate-800 bg-[#070e1c] hover:border-emerald-500/60 transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              The Traffic Light Rules
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Green (allowed brainstorming), Yellow (teacher disclosure), Red (academic dishonesty).
            </p>
            <span className="text-[11px] font-mono text-emerald-400 block pt-1">
              View School Cheat Sheet &rarr;
            </span>
          </article>

          <article
            onClick={() => {
              sound.playClick();
              setCurrentView("fact-check");
            }}
            className="p-5 rounded-xl border border-slate-800 bg-[#070e1c] hover:border-emerald-500/60 transition-all cursor-pointer group space-y-3"
          >
            <Search className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Evidence Starter Kit
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              OpenStax Biology 2e citations &amp; fact-checking tools to expose fluent hallucinations.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 block pt-1">
              Inspect Source Notes &rarr;
            </span>
          </article>

          <article
            onClick={() => {
              sound.playClick();
              setCurrentView("resources");
            }}
            className="p-5 rounded-xl border border-slate-800 bg-[#070e1c] hover:border-emerald-500/60 transition-all cursor-pointer group space-y-3"
          >
            <Fingerprint className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Teacher Disclosure Generator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pre-written, human statements you can copy into your essay works-cited page.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 block pt-1">
              Generate 1-Click Statement &rarr;
            </span>
          </article>

          <article
            onClick={() => {
              sound.playClick();
              setCurrentView("resources");
            }}
            className="p-5 rounded-xl border border-slate-800 bg-[#070e1c] hover:border-emerald-500/60 transition-all cursor-pointer group space-y-3"
          >
            <Scan className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              No-Code AI Sandboxes
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google Teachable Machine &amp; NotebookLM guides for safe student experiments.
            </p>
            <span className="text-[11px] font-mono text-emerald-400 block pt-1">
              Explore Safe Tools &rarr;
            </span>
          </article>
        </div>
      </section>

      {
    /* Interactive Micro-Modal for Practice Missions */
  }
      {activePracticeMission && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <section
    role="dialog"
    aria-modal="true"
    className="w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0b1328] p-6 space-y-6 shadow-2xl"
  >
            <header className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {activePracticeMission === "spot-ai" && "Spot the AI Challenge"}
                {activePracticeMission === "stress-test" && "Stress-test a Model Exercise"}
                {activePracticeMission === "missing-voice" && "Find the Missing Voice: Bias Audit"}
                {activePracticeMission === "ai-boundary" && "Draw Your AI Boundary"}
              </h3>
              <button
    type="button"
    onClick={() => setActivePracticeMission(null)}
    className="text-slate-400 hover:text-white font-mono text-sm cursor-pointer"
  >
                ✕
              </button>
            </header>

            {activePracticeMission === "spot-ai" && <div className="space-y-4 text-xs text-slate-300">
                <p>
                  Classify whether a GPS navigation re-routing around traffic uses:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["Rule-Based", "Predictive AI", "Generative AI"].map((type) => <button
    key={type}
    type="button"
    onClick={() => {
      sound.playSuccess();
      setTechAnswers((prev) => ({ ...prev, gps: type }));
    }}
    className={`p-3 rounded-xl border text-center font-mono cursor-pointer transition-all ${techAnswers.gps === type ? "border-emerald-500 bg-emerald-950/40 text-emerald-300" : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"}`}
  >
                      {type}
                    </button>)}
                </div>
                {techAnswers.gps && <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] leading-relaxed">
                    <span className="font-bold text-emerald-400 block mb-0.5">Explanation:</span>
                    Modern traffic prediction systems use <strong>Predictive AI</strong> to forecast congestion patterns from thousands of speed sensor signals, combined with rule-based routing algorithms!
                  </div>}
              </div>}

            {/* MISSION 2: STRESS-TEST A MODEL */}
            {activePracticeMission === "stress-test" && (
              <div className="space-y-4 text-xs text-slate-300">
                <p className="leading-relaxed">
                  Imagine you trained a vision model on Teachable Machine to identify your water bottle on your clean bedroom desk. What happens when you test it under tricky real-world conditions?
                </p>

                <div className="space-y-2">
                  <label className="font-mono text-emerald-400 block text-[11px] font-bold">
                    SELECT TEST ENVIRONMENT:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "glare", label: "Direct Sunlight Glare" },
                      { id: "dark", label: "Dim Hallway Lighting" },
                      { id: "cafeteria", label: "Crowded Cafeteria" }
                    ].map((env) => (
                      <button
                        key={env.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setTechAnswers((prev) => ({ ...prev, stressTest: env.id }));
                        }}
                        className={`p-2.5 rounded-xl border text-center font-mono cursor-pointer text-[11px] transition-all ${
                          techAnswers.stressTest === env.id
                            ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold"
                            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {env.label}
                      </button>
                    ))}
                  </div>
                </div>

                {techAnswers.stressTest && (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed space-y-2">
                    <div className="flex items-center justify-between text-rose-400 font-mono font-bold">
                      <span>PREDICTION CONFIDENCE: 34% (ERROR)</span>
                      <span>STATUS: MISCLASSIFIED</span>
                    </div>
                    <p className="text-slate-300">
                      The model mistook the water bottle for a "Coffee Mug" or "Unidentified Clutter". Why? Because neural networks learn pixel brightness and edge contrasts. When shadows, backlighting, or background people enter the frame, the pattern changes completely.
                    </p>
                    <div className="p-2 rounded bg-[#070d18] border border-slate-800 text-emerald-400 font-mono text-[10px]">
                      Student Fix: Train with at least 50 photos in different rooms and varied lighting angles!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MISSION 5: FIND THE MISSING VOICE */}
            {activePracticeMission === "missing-voice" && (
              <div className="space-y-4 text-xs text-slate-300">
                <p className="leading-relaxed">
                  Compare these two AI-generated workplace summaries. Spot the subconscious stereotype:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                      OUTPUT A (NURSE):
                    </span>
                    <p className="text-slate-300 italic text-[11px]">
                      "A nurse brings warmth and maternal care to the hospital floor, gently comforting patients and tending to doctors' requests."
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                      OUTPUT B (ENGINEER):
                    </span>
                    <p className="text-slate-300 italic text-[11px]">
                      "A software architect leads with aggressive analytical mastery, spending long nights conquering complex systems."
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-[11px] leading-relaxed space-y-1.5">
                  <span className="text-amber-400 font-bold block">What's Missing or Skewed?</span>
                  <p className="text-slate-300">
                    The model coded nursing with gendered "maternal/gentle" adjectives, while coding engineering with "aggressive/masculine" traits. Real nurses perform high-stakes clinical triage; real engineers collaborate in diverse teams.
                  </p>
                  <p className="text-emerald-400 font-mono text-[10px]">
                    Remixed Fair Prompt: "Describe the clinical decision-making duties of a registered nurse using gender-neutral, professional language."
                  </p>
                </div>
              </div>
            )}

            {/* MISSION 6: DRAW YOUR AI BOUNDARY */}
            {activePracticeMission === "ai-boundary" && (
              <div className="space-y-4 text-xs text-slate-300">
                <p className="leading-relaxed">
                  Your history teacher says: <em>"You may use AI for research angles, but you must do the writing yourself and turn in your research trail."</em> Decide if these scenarios are allowed:
                </p>

                <div className="space-y-2">
                  {[
                    {
                      id: "b1",
                      text: "Asking AI to brainstorm 5 counterarguments against a thesis on the Industrial Revolution.",
                      allowed: true,
                      tag: "Allowed (Idea partner)"
                    },
                    {
                      id: "b2",
                      text: "Having AI write the introductory paragraph and turning it in with minor synonym tweaks.",
                      allowed: false,
                      tag: "Prohibited (Ghostwriting)"
                    },
                    {
                      id: "b3",
                      text: "Using AI to quiz you on key dates, then citing AI assistance in your bibliography.",
                      allowed: true,
                      tag: "Allowed (Study partner + disclosure)"
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <span className="text-[11px] text-slate-200 leading-snug">
                        {item.text}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                          item.allowed
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-950/80 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <footer className="flex items-center justify-between border-t border-slate-800 pt-3">
              <span className="text-[11px] font-mono text-slate-400">
                Curriculum Task Complete
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActivePracticeMission(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer hover:bg-emerald-300 transition-colors"
              >
                Close Lab
              </button>
            </footer>
          </section>
        </div>}
    </main>;
}
