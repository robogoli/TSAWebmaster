import { createContext, useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { INITIAL_BADGES, LEVELS } from "../data/gameData";
import { sound } from "../utils/sound";

const STORAGE_KEY = "ai_quest_cadet_state_v1";
const defaultState = {
  xp: 0,
  studentName: "Cadet Nova",
  studentAvatar: "🚀",
  completedMissions: [],
  unlockedBadges: [],
  dailyStreak: 0,
  lastDailyChallengeDate: null,
  soundEnabled: true,
  hasSeenIntro: false
};

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultState, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return defaultState;
  });

  const [currentView, setCurrentView] = useState("home");
  const [challengesTab, setChallengesTab] = useState("prompt");
  const [toasts, setToasts] = useState([]);
  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState(null);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !state.hasSeenIntro);

  useEffect(() => { sound.enabled = state.soundEnabled; }, [state.soundEnabled]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(p => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const currentLevel = LEVELS.reduce((acc, lvl) => (state.xp >= lvl.minXp ? lvl : acc), LEVELS[0]);
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1) || null;
  const levelProgressPercent = Math.min(100, Math.max(0, nextLevel ? Math.round(((state.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100) : 100));
  const badges = INITIAL_BADGES.map(b => ({ ...b, unlocked: state.unlockedBadges.includes(b.id) }));

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b"] });
    } catch { /* ignore */ }
  };

  const showToast = (message, type = "info", xp) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, xp }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const unlockBadge = (badgeId) => {
    const badge = INITIAL_BADGES.find(b => b.id === badgeId);
    if (!badge || state.unlockedBadges.includes(badgeId)) return;
    sound.playLevelUp();
    triggerConfetti();
    setState(prev => ({ ...prev, unlockedBadges: [...prev.unlockedBadges, badgeId], xp: prev.xp + badge.xpValue }));
    showToast(`Badge Unlocked: ${badge.name}!`, "badge", badge.xpValue);
    setActiveBadgeCelebration(badge);
  };

  const addXP = (amount, reason) => {
    if (amount <= 0) return;
    sound.playSuccess();
    const oldLevel = currentLevel.level;
    setState(prev => {
      const newXp = prev.xp + amount;
      const newLevel = LEVELS.reduce((acc, lvl) => (newXp >= lvl.minXp ? lvl : acc), LEVELS[0]);
      if (newLevel.level > oldLevel) {
        setTimeout(() => {
          sound.playLevelUp();
          triggerConfetti();
          showToast(`Level Up! Level ${newLevel.level}: ${newLevel.title}!`, "level");
        }, 500);
      }
      return { ...prev, xp: newXp };
    });
    showToast(`+${amount} XP: ${reason}`, "xp", amount);
  };

  const completeMission = (missionId, xpReward, badgeId) => {
    if (!state.completedMissions.includes(missionId)) {
      setState(prev => ({ ...prev, completedMissions: [...prev.completedMissions, missionId] }));
      addXP(xpReward, `Mission Completed: ${missionId.toUpperCase()}`);
      if (badgeId) setTimeout(() => unlockBadge(badgeId), 700);
    }
  };

  const completeDailyChallenge = (isTrustworthy) => {
    if (isTrustworthy) {
      sound.playSuccess();
      const today = new Date().toISOString().split("T")[0];
      setState(prev => ({ ...prev, lastDailyChallengeDate: today, dailyStreak: (prev.dailyStreak || 0) + 1 }));
      addXP(25, "Today's AI Challenge Solved");
      if (!state.unlockedBadges.includes("daily-striker")) setTimeout(() => unlockBadge("daily-striker"), 600);
    } else {
      sound.playError();
    }
  };

  useEffect(() => {
    const core = ["mission_1", "mission_2", "mission_3", "detective"];
    if (core.every(m => state.completedMissions.includes(m)) && !state.unlockedBadges.includes("ai-master")) {
      setTimeout(() => unlockBadge("ai-master"), 1000);
    }
  }, [state.completedMissions]);

  const toggleSound = () => {
    setState(prev => {
      const next = !prev.soundEnabled;
      sound.enabled = next;
      if (next) sound.playClick();
      return { ...prev, soundEnabled: next };
    });
  };

  const updateProfile = (name, avatar) => {
    sound.playClick();
    setState(prev => ({ ...prev, studentName: name.trim() || "Cadet Nova", studentAvatar: avatar || "🚀" }));
    showToast("Profile updated successfully!", "info");
  };

  const resetProgress = () => {
    sound.playClick();
    setState(defaultState);
    setCurrentView("home");
    showToast("Progress reset to Rookie state.", "info");
  };

  const completeOnboarding = (name, avatar) => {
    sound.playSuccess();
    triggerConfetti();
    setState(prev => ({ ...prev, studentName: name.trim() || "Cadet Nova", studentAvatar: avatar || "🚀", hasSeenIntro: true }));
    setIsOnboardingOpen(false);
    showToast(`Welcome aboard, ${name || "Cadet"}!`, "info");
  };

  return (
    <GameContext.Provider
      value={{
        state,
        currentLevel,
        nextLevel,
        levelProgressPercent,
        badges,
        currentView,
        setCurrentView,
        challengesTab,
        setChallengesTab,
        navigateToChallenges: (tab) => { sound.playClick(); setChallengesTab(tab); setCurrentView("challenges"); },
        addXP,
        completeMission,
        unlockBadge,
        completeDailyChallenge,
        toggleSound,
        updateProfile,
        resetProgress,
        toasts,
        activeBadgeCelebration,
        closeBadgeCelebration: () => setActiveBadgeCelebration(null),
        isDailyModalOpen,
        openDailyModal: () => { sound.playClick(); setIsDailyModalOpen(true); },
        closeDailyModal: () => setIsDailyModalOpen(false),
        isCertificateOpen,
        openCertificate: () => { sound.playClick(); setIsCertificateOpen(true); },
        closeCertificate: () => setIsCertificateOpen(false),
        isSearchOpen,
        openSearch: () => { sound.playClick(); setIsSearchOpen(true); },
        closeSearch: () => setIsSearchOpen(false),
        toggleSearch: () => { sound.playClick(); setIsSearchOpen(p => !p); },
        isOnboardingOpen,
        openOnboarding: () => { sound.playClick(); setIsOnboardingOpen(true); },
        closeOnboarding: () => setIsOnboardingOpen(false),
        completeOnboarding,
        triggerConfetti
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be within GameProvider");
  return ctx;
};
