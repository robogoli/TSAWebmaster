import React from 'react';
import { Volume2, VolumeX, Search, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ViewMode } from '../types/game';
import { sound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    state,
    toggleSound,
    openDailyModal,
    openSearch,
  } = useGame();

  const navItems: { id: ViewMode; label: string; anchor?: string }[] = [
    { id: 'learning-path', label: 'Learning path' },
    { id: 'tool-lab', label: 'Tool lab' },
    { id: 'responsible-ai', label: 'Responsible AI' },
    { id: 'practice-missions', label: 'Practice missions' },
    { id: 'progress', label: 'Your progress' },
  ];

  const handleNavClick = (view: ViewMode) => {
    sound.playClick();
    setCurrentView(view);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080d1a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: AI QUEST wordmark with concentric orbit glyph */}
        <button
          type="button"
          onClick={() => handleNavClick('learning-path')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="8" cy="8" r="2.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white group-hover:text-emerald-300 transition-colors">
            AI QUEST
          </span>
        </button>

        {/* Center: Navigation Links matching Screenshots */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'learning-path' && (currentView === 'home' || currentView === 'learn'));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-2 relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Pill badge & quick utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* GRADES 09-12 pill badge directly from Screenshot 2 */}
          <div className="hidden lg:inline-flex items-center rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono tracking-wider text-slate-400 font-semibold">
            GRADES 09-12
          </div>

          {/* Quick Search trigger (Cmd+K) */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            title="Search topics & missions (⌘K)"
            aria-label="Search curriculum"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <kbd className="hidden sm:inline-block rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800/80">
              ⌘K
            </kbd>
          </button>

          {/* Fact-check Daily Challenge shortcut */}
          <button
            type="button"
            onClick={() => handleNavClick('fact-check')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              currentView === 'fact-check'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title="Open 'Fact-check the fluent' Mission"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">DAILY CHALLENGE</span>
            <span className="sm:hidden">DAILY</span>
          </button>

          {/* Cadet XP summary */}
          <button
            type="button"
            onClick={() => handleNavClick('progress')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 hover:border-slate-700 transition-colors cursor-pointer"
            title="View Your Progress Dashboard"
          >
            <span className="text-slate-400">XP</span>
            <span className="font-bold">{state.xp}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={state.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle sound"
          >
            {state.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/60 px-4 py-2 gap-2 bg-[#060a14] scrollbar-none">
        {navItems.map((item) => {
          const isActive =
            currentView === item.id ||
            (item.id === 'learning-path' && (currentView === 'home' || currentView === 'learn'));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
