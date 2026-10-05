import React from 'react';
import { Home, BookOpen, Bot, BookMarked, Award, User } from 'lucide-react';

export default function MobileBottomNav({ currentTab, setCurrentTab, lang }) {
  return (
    <nav className="mobile-bottom-nav">
      <button 
        className={`bottom-nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setCurrentTab('dashboard')}
      >
        <Home size={20} />
        <span>{lang === 'uz' ? 'Asosiy' : 'Home'}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === 'lessons' ? 'active' : ''}`}
        onClick={() => setCurrentTab('lessons')}
      >
        <BookOpen size={20} />
        <span>{lang === 'uz' ? 'Darslar' : 'Lessons'}</span>
      </button>

      <button 
        className={`bottom-nav-item center-ai-btn ${currentTab === 'ai_tutor' ? 'active' : ''}`}
        onClick={() => setCurrentTab('ai_tutor')}
      >
        <div className="glow-circle">
          <Bot size={24} />
        </div>
        <span>AI Ustoz</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === 'vocabulary' ? 'active' : ''}`}
        onClick={() => setCurrentTab('vocabulary')}
      >
        <BookMarked size={20} />
        <span>{lang === 'uz' ? 'Lug\'at' : 'Vocab'}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === 'ielts' ? 'active' : ''}`}
        onClick={() => setCurrentTab('ielts')}
      >
        <Award size={20} />
        <span>IELTS</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => setCurrentTab('profile')}
      >
        <User size={20} />
        <span>{lang === 'uz' ? 'Profil' : 'Profile'}</span>
      </button>
    </nav>
  );
}
