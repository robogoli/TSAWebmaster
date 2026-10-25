import { useGame } from "../context/GameContext";
export const Footer = () => {
  const { setCurrentView } = useGame();
  return <footer className="w-full border-t border-slate-800/80 bg-[#060a14] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider text-white">
                AI QUEST
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              AI Quest is a learning platform that aims to teach high school students how to properly use AI, spot AI, and how to use it to fit your needs.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
              <span>Grades 09–12</span>
              <span aria-hidden="true">·</span>
              <span>Evidence Before Confidence</span>
              <span aria-hidden="true">·</span>
              <span>Human Responsibility</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 list-none p-0 m-0">
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("learning-path")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Track 1: AI foundations
                </button>
              </li>
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("tool-lab")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Track 2: Tools & techniques
                </button>
              </li>
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("responsible-ai")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Track 3: Responsible AI
                </button>
              </li>
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("fact-check")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-semibold text-emerald-400"
  >
                  Daily: Fact-check the fluent
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Practice & Progress
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 list-none p-0 m-0">
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("practice-missions")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Practice Missions (6 challenges)
                </button>
              </li>
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("progress")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Dashboard & Badges
                </button>
              </li>
              <li>
                <button
    type="button"
    onClick={() => setCurrentView("skilltree")}
    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
  >
                  Skill Tree Topology
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {(/* @__PURE__ */ new Date()).getFullYear()} AI Quest. Built for students, educators, and future AI pioneers.
          </div>
          <div className="flex items-center gap-6">
            <span>Critical Thinking First</span>
            <span aria-hidden="true">·</span>
            <span>Fact-Check Generative Outputs</span>
          </div>
        </div>
      </div>
    </footer>;
};
