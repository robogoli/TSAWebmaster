import React from "react";
import { Sparkles, ArrowRight, Cpu, Wrench, Shield, MessageSquare, Scan, BookOpen, Scale, Lock, Fingerprint, ChevronRight, CheckCircle2 } from "lucide-react";
import { useGame } from "../context/GameContext";
import { sound } from "../utils/sound";
import { ScrollReveal } from "../components/ScrollReveal";

const M1_LESSONS = [
  { num: "01", title: "AI, Machine Learning & Generative AI", desc: "Distinguish traditional rule-based programs from predictive models and generative systems using real-life examples." },
  { num: "02", title: "How Models Learn from Data", desc: "Explore how training sets, labeled examples, and pattern recognition engines make predictions without hardcoded rules." },
  { num: "03", title: "Why AI Can Get Things Wrong", desc: "Unpack statistical hallucinations: an AI doesn't know truth from falsehood—it predicts the most probable next token." }
];

const M2_TOOLS = [
  { icon: MessageSquare, badge: "Conversational AI", title: "Prompt Crafting Partner", desc: "Ask AI for practice quizzes, counter-arguments, and explanations rather than finished homework paragraphs." },
  { icon: Scan, badge: "No-Code ML", title: "Classifier Sandbox", desc: "Train custom vision classifiers with camera snapshots. Stress-test under varied angles and lighting." },
  { icon: BookOpen, badge: "Source-Grounded Study", title: "Evidence Notebooks", desc: "Upload teacher-approved study guides or textbooks. Every summary links directly back to the original text." }
];

const M3_PILLARS = [
  { icon: Scale, title: "Question the Bias", sub: "Identify whose perspectives are missing.", desc: "Compare AI outputs on career paths and culture. Learn to spot skewed representations and rebalance prompts fairly." },
  { icon: Lock, title: "Protect the Person", sub: "Separate safe queries from private data.", desc: "Never share student records, passwords, or personal homework into public LLMs. Use synthetic scenarios instead." },
  { icon: Fingerprint, title: "Own Your Thinking", sub: "Disclose AI assistance transparently.", desc: "Follow your school policy. Keep revision drafts and cite permitted brainstorming. Never pass off generated text as your own." }
];

export function HomeView() {
  const { state, currentView, setCurrentView } = useGame();

  React.useEffect(() => {
    if (currentView === "tool-lab") document.getElementById("tool-lab")?.scrollIntoView({ behavior: "smooth" });
    else if (currentView === "responsible-ai") document.getElementById("responsible-ai")?.scrollIntoView({ behavior: "smooth" });
    else if (["learning-path", "ai-foundations"].includes(currentView)) (document.getElementById("ai-foundations") || document.getElementById("learning-path"))?.scrollIntoView({ behavior: "smooth" });
    else if (currentView === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  const scrollTo = (id) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const launch = (view) => {
    sound.playClick();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-24">
      {/* HERO SECTION */}
      <section id="hero" aria-label="Welcome to AI Quest" className="space-y-6 pt-2">
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI QUEST STUDENT PORTAL • {state.studentName ? state.studentName.toUpperCase() : "STUDENT"}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={80}>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{state.studentName || "Student"}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={140}>
          <div className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">Understand AI. Learn AI. Master AI.</div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            AI Quest is a learning platform that aims to teach high school students how to properly use AI, spot AI, and how to use it to fit your needs. Scroll down to explore each module overview, or jump directly into any section.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={260}>
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {[
              { id: "ai-foundations", icon: Cpu, label: "Module 1: AI Foundations" },
              { id: "tool-lab", icon: Wrench, label: "Module 2: Tools & Techniques" },
              { id: "responsible-ai", icon: Shield, label: "Module 3: Responsible AI" }
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:text-emerald-300 text-slate-300 text-xs font-semibold tracking-wide transition-all cursor-pointer">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={320}>
          <div className="pt-6 border-b border-slate-800/80 pb-8 flex flex-wrap items-center gap-8 sm:gap-16 font-mono text-xs sm:text-sm text-slate-400">
            {[{ num: "3", label: "Core Modules" }, { num: "9", label: "Guided Lessons" }, { num: "100%", label: "Human-Tested Curriculum" }].map(({ num, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">{num}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* MODULE 1 — AI FOUNDATIONS */}
      <ScrollReveal as="section" id="ai-foundations" aria-label="Module 1: AI Foundations" animation="fade-up" threshold={0.15} className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#091224] to-[#070b16] p-6 sm:p-10 space-y-8 scroll-mt-20">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" /><span>MODULE 1 • CORE CONCEPTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">AI Foundations</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Understand the systems behind the screen: pattern spotting, generative language construction, and why models can sound fluent even when hallucinating.</p>
          </div>
          <button type="button" onClick={() => launch("learn")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-300 transition-all shrink-0 cursor-pointer shadow-lg shadow-emerald-500/10 group">
            <span>Enter Module 1: AI Foundations</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {M1_LESSONS.map((lesson, idx) => (
            <ScrollReveal key={lesson.num} animation="fade-up" delay={idx * 80 + 80}>
              <article className="rounded-2xl border border-slate-800 bg-[#060c18] p-5 space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="text-xs font-mono font-bold text-emerald-400">LESSON {lesson.num}</span><CheckCircle2 className="w-4 h-4 text-emerald-500/60" /></div>
                  <h3 className="text-base font-bold text-white">{lesson.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{lesson.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="scale-up" delay={120}>
          <div className="rounded-2xl border border-slate-800/80 bg-[#070e1c] p-5 sm:p-6 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">CORE CONCEPT PREVIEW • HOW A MODEL LEARNS</span>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono">
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1"><span className="text-[10px] uppercase text-emerald-400 block font-bold">1. DATA</span><span className="text-sm font-semibold text-white block">Labeled Examples</span></div>
              <span className="text-slate-600 font-bold hidden sm:inline">&rarr;</span>
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1"><span className="text-[10px] uppercase text-emerald-400 block font-bold">2. TRAINING</span><span className="text-sm font-semibold text-white block">Find Patterns</span></div>
              <span className="text-slate-600 font-bold hidden sm:inline">&rarr;</span>
              <div className="w-full sm:w-1/3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1"><span className="text-[10px] uppercase text-emerald-400 block font-bold">3. MODEL</span><span className="text-sm font-semibold text-white block">Make Predictions</span></div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">A model trained on thousands of plant photos predicts species in a new photo. If lighting changes or an unseen plant appears, errors occur.</p>
          </div>
        </ScrollReveal>
      </ScrollReveal>

      {/* MODULE 2 — TOOLS & TECHNIQUES */}
      <ScrollReveal as="section" id="tool-lab" aria-label="Module 2: Tools and Techniques" animation="fade-up" threshold={0.15} className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#091224] to-[#070b16] p-6 sm:p-10 space-y-8 scroll-mt-20">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" /><span>MODULE 2 • PRACTICAL SKILLS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Tools &amp; Techniques</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Better questions. Better learning. Master conversational prompting for guided study, build no-code models, and ground research in verified sources.</p>
          </div>
          <button type="button" onClick={() => launch("challenges")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-300 transition-all shrink-0 cursor-pointer shadow-lg shadow-emerald-500/10 group">
            <span>Enter Module 2: Tools &amp; Techniques</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {M2_TOOLS.map(({ icon: Icon, badge, title, desc }, idx) => (
            <ScrollReveal key={title} animation="fade-up" delay={idx * 80 + 80}>
              <article className="rounded-2xl border border-slate-800 bg-[#060c18] p-5 space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">{badge}</span>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="scale-up" delay={120}>
          <div className="rounded-2xl border border-slate-800/80 bg-[#070e1c] p-5 sm:p-6 space-y-4">
            <header className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white">Anatomy of a Useful Prompt</h4>
              <span className="text-xs font-mono text-slate-400">VAGUE: “Explain photosynthesis.”</span>
            </header>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 font-mono">
              “<span className="text-emerald-400 font-semibold">Help me practice photosynthesis</span> for grade 10 biology. I mix up light-dependent reactions and the Calvin cycle. <span className="text-emerald-400 font-semibold">Ask one question at a time</span>, wait for my answer, and give a hint before explaining. Don&apos;t write my assignment.”
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Guiding AI to act as an interactive tutor instead of a ghostwriter helps you retain full ownership of your learning.</p>
          </div>
        </ScrollReveal>
      </ScrollReveal>

      {/* MODULE 3 — RESPONSIBLE AI */}
      <ScrollReveal as="section" id="responsible-ai" aria-label="Module 3: Responsible AI" animation="fade-up" threshold={0.15} className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#091224] to-[#070b16] p-6 sm:p-10 space-y-8 scroll-mt-20">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" /><span>MODULE 3 • ETHICS &amp; INTEGRITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Responsible AI</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Powerful tools. Human responsibility. Identify missing voices, safeguard privacy, and navigate academic honesty with confidence.</p>
          </div>
          <button type="button" onClick={() => launch("fact-check")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-300 transition-all shrink-0 cursor-pointer shadow-lg shadow-emerald-500/10 group">
            <span>Enter Module 3: Responsible AI</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {M3_PILLARS.map(({ icon: Icon, title, sub, desc }, idx) => (
            <ScrollReveal key={title} animation="fade-up" delay={idx * 80 + 80}>
              <article className="rounded-2xl border border-slate-800 bg-[#060c18] p-5 space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <Icon className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <span className="text-xs font-semibold text-emerald-400 block">{sub}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="scale-up" delay={120}>
          <aside className="rounded-xl border border-amber-600/40 bg-[#1e170e] p-5 space-y-2 text-slate-200">
            <h4 className="text-sm font-bold text-amber-300">Guiding Rule: Small edits don&apos;t make the thinking yours.</h4>
            <p className="text-xs text-slate-300 leading-relaxed">Use allowed brainstorming to explore questions, then build your own argument. When turning in work, be ready to explain every concept in your own words.</p>
            <p className="text-xs text-slate-400 italic">Example Disclosure: “I used AI to brainstorm counter-arguments; I verified facts against OpenStax Biology and wrote the final essay independently.”</p>
          </aside>
        </ScrollReveal>
      </ScrollReveal>
    </main>
  );
}
