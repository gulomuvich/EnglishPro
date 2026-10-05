import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PlacementTestModal from './components/PlacementTestModal';
import AITutorChat from './components/AITutorChat';
import PronunciationCoach from './components/PronunciationCoach';
import GrammarLessonsView from './components/GrammarLessonsView';
import VideoLessonsView from './components/VideoLessonsView';
import VocabularyFlashcards from './components/VocabularyFlashcards';
import IELTSSimulator from './components/IELTSSimulator';
import SmartTranslator from './components/SmartTranslator';
import ErrorNotebook from './components/ErrorNotebook';
import ProfileAndSettings from './components/ProfileAndSettings';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { storageService } from './services/storageService';

export default function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [user, setUser] = useState(storageService.getUser());
  const [xp, setXp] = useState(storageService.getXP());
  const [streak, setStreak] = useState(storageService.getStreak());
  const [settings, setSettings] = useState(storageService.getSettings());
  const [lang, setLang] = useState(settings.language || 'uz');
  const [theme, setTheme] = useState(settings.theme || 'dark');
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync theme with body class
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    const updated = { ...settings, theme, language: lang };
    storageService.saveSettings(updated);
  }, [theme, lang]);

  // Keep XP updated
  const refreshXP = () => {
    setXp(storageService.getXP());
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleStartPlacement = () => {
    setIsPlacementOpen(true);
  };

  const handlePlacementFinish = (newLevel) => {
    refreshXP();
    const updatedUser = storageService.getUser();
    setUser({ ...updatedUser, level: newLevel });
    setCurrentTab('dashboard');
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    refreshXP();
    setCurrentTab('dashboard');
  };

  return (
    <div className={`app-root ${theme}-mode`}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        xp={xp}
        streak={streak}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAuth={() => setIsAuthOpen(true)}
        onStartPlacement={handleStartPlacement}
      />

      {/* Main View Router */}
      <main className="main-viewport-content">
        {currentTab === 'landing' && (
          <LandingPage
            onStart={() => setCurrentTab('dashboard')}
            onOpenAITutor={() => setCurrentTab('ai_tutor')}
            onStartPlacement={handleStartPlacement}
            lang={lang}
          />
        )}

        {currentTab === 'home' && (
          <LandingPage
            onStart={() => setCurrentTab('dashboard')}
            onOpenAITutor={() => setCurrentTab('ai_tutor')}
            onStartPlacement={handleStartPlacement}
            lang={lang}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            user={user}
            xp={xp}
            streak={streak}
            setCurrentTab={setCurrentTab}
            onStartPlacement={handleStartPlacement}
            lang={lang}
          />
        )}

        {currentTab === 'lessons' && (
          <VideoLessonsView />
        )}

        {currentTab === 'ai_tutor' && (
          <AITutorChat lang={lang} />
        )}

        {currentTab === 'vocabulary' && (
          <VocabularyFlashcards />
        )}

        {currentTab === 'ielts' && (
          <IELTSSimulator />
        )}

        {currentTab === 'pronounce' && (
          <PronunciationCoach />
        )}

        {currentTab === 'grammar' && (
          <GrammarLessonsView />
        )}

        {currentTab === 'translator' && (
          <SmartTranslator />
        )}

        {currentTab === 'mistakes' && (
          <ErrorNotebook />
        )}

        {currentTab === 'profile' && (
          <ProfileAndSettings
            user={user}
            xp={xp}
            streak={streak}
            lang={lang}
            setLang={setLang}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      {currentTab !== 'landing' && (
        <MobileBottomNav
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          lang={lang}
        />
      )}

      {/* Placement Test Modal */}
      <PlacementTestModal
        isOpen={isPlacementOpen}
        onClose={() => setIsPlacementOpen(false)}
        onFinish={handlePlacementFinish}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
