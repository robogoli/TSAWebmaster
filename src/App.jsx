/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GameProvider, useGame } from "./context/GameContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DailyChallengeModal } from "./components/DailyChallengeModal";
import { BadgeModal } from "./components/BadgeModal";
import { CertificateModal } from "./components/CertificateModal";
import { SearchModal } from "./components/SearchModal";
import { OnboardingModal } from "./components/OnboardingModal";
import { ToastContainer } from "./components/ToastContainer";
import { HomeView } from "./views/HomeView";
import { LearnView } from "./views/LearnView";
import { ChallengesView } from "./views/ChallengesView";
import { SkillTreeView } from "./views/SkillTreeView";
import { DashboardView } from "./views/DashboardView";
import { FactCheckMissionView } from "./views/FactCheckMissionView";
import { ProfileView } from "./views/ProfileView";
import { ResourcesView } from "./views/ResourcesView";
const MainAppContent = () => {
  const { currentView } = useGame();
  const isHomeView = currentView === "home" || currentView === "learning-path" || currentView === "tool-lab" || currentView === "responsible-ai" || currentView === "practice-missions";
  return <div className="min-h-screen flex flex-col bg-[#070c18] text-slate-100">
      <Navbar />

      <main className="flex-1">
        {isHomeView && <HomeView />}
        {currentView === "fact-check" && <FactCheckMissionView />}
        {currentView === "resources" && <ResourcesView />}
        {currentView === "progress" && <DashboardView />}
        {currentView === "learn" && <LearnView />}
        {currentView === "challenges" && <ChallengesView />}
        {currentView === "detective" && <FactCheckMissionView />}
        {currentView === "skilltree" && <SkillTreeView />}
        {currentView === "profile" && <ProfileView />}
      </main>

      <Footer />

      {
    /* Global Modals & Overlays */
  }
      <OnboardingModal />
      <SearchModal />
      <DailyChallengeModal />
      <BadgeModal />
      <CertificateModal />
      <ToastContainer />
    </div>;
};
export default function App() {
  return <GameProvider>
      <MainAppContent />
    </GameProvider>;
}
