import React, { useState } from 'react';
import { 
  Flame, Award, Globe, Moon, Sun, User, Bell, Menu, X, Shield, Sparkles 
} from 'lucide-react';
import { translate } from '../services/i18n';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  xp, 
  streak, 
  lang, 
  setLang, 
  theme, 
  toggleTheme,
  onOpenAuth,
  onStartPlacement,
  onOpenOnboarding
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => setCurrentTab('home')}>
          <div className="brand-logo-icon">
            <Sparkles size={22} className="sparkle-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">EnglishPro</span>
            <span className="brand-badge">UZ</span>
          </div>
        </div>

        {/* Navigation Items (Desktop) */}
        <nav className="desktop-nav">
          <button 
            className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentTab('dashboard')}
          >
            {translate('nav.dashboard', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setCurrentTab('lessons')}
          >
            {translate('nav.lessons', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'ai_tutor' ? 'active' : ''}`}
            onClick={() => setCurrentTab('ai_tutor')}
          >
            <span className="pulse-dot"></span>
            {translate('nav.ai_tutor', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'vocabulary' ? 'active' : ''}`}
            onClick={() => setCurrentTab('vocabulary')}
          >
            {translate('nav.vocabulary', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'ielts' ? 'active' : ''}`}
            onClick={() => setCurrentTab('ielts')}
          >
            <span className="ielts-tag">9.0</span>
            {translate('nav.ielts', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'pronounce' ? 'active' : ''}`}
            onClick={() => setCurrentTab('pronounce')}
          >
            {translate('nav.pronounce', lang)}
          </button>
          <button 
            className={`nav-btn ${currentTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setCurrentTab('grammar')}
          >
            {translate('nav.grammar', lang)}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Streak */}
          <div className="metric-pill streak-pill" title="Daily Streak">
            <Flame size={18} className="flame-icon" />
            <span className="metric-val">{streak.days} {lang === 'uz' ? 'kun' : 'd'}</span>
          </div>

          {/* XP */}
          <div className="metric-pill xp-pill" title="Total XP">
            <Award size={18} className="award-icon" />
            <span className="metric-val">{xp} XP</span>
          </div>

          {/* Language Switcher */}
          <button 
            className="icon-action-btn lang-toggle-btn"
            onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}
            title="Tilni almashtirish (Uzbek 🇺🇿 / English 🇬🇧)"
          >
            <Globe size={16} />
            <span className="lang-code">{lang === 'uz' ? '🇺🇿 UZ' : '🇬🇧 EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="icon-action-btn theme-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile / Auth */}
          {user ? (
            <button 
              className="user-profile-btn"
              onClick={() => setCurrentTab('profile')}
              title="Profil va sozlamalar"
            >
              <div className="user-avatar-badge">{user.avatar || '👨‍🎓'}</div>
              <span className="user-name-label">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button className="login-btn-primary" onClick={onOpenAuth}>
              {translate('nav.login', lang)}
            </button>
          )}

          {/* Mobile menu trigger */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <button onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}>
              Dashboard
            </button>
            <button onClick={() => { setCurrentTab('lessons'); setMobileMenuOpen(false); }}>
              Videodarslar (70 ta dars)
            </button>
            <button onClick={() => { setCurrentTab('ai_tutor'); setMobileMenuOpen(false); }}>
              Ustoz AI (Ovozli suhbat xonasi)
            </button>
            <button onClick={() => { setCurrentTab('ielts'); setMobileMenuOpen(false); }}>
              IELTS 9.0 Tayyorgarlik Simulyatori
            </button>
            <button onClick={() => { setCurrentTab('vocabulary'); setMobileMenuOpen(false); }}>
              Lug'at & Flashcards
            </button>
            <button onClick={() => { setCurrentTab('pronounce'); setMobileMenuOpen(false); }}>
              Talaffuz mashqi
            </button>
            <button onClick={() => { setCurrentTab('grammar'); setMobileMenuOpen(false); }}>
              Grammatika & Writing
            </button>
            <button onClick={() => { setCurrentTab('translator'); setMobileMenuOpen(false); }}>
              Kontekstual Tarjimon
            </button>
            <button onClick={() => { setCurrentTab('mistakes'); setMobileMenuOpen(false); }}>
              Xatolar daftarchasi
            </button>
            <button onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}>
              <Shield size={16} style={{ display: 'inline', marginRight: 6 }} />
              Admin Panel
            </button>
            <button onClick={() => { onOpenOnboarding(); setMobileMenuOpen(false); }}>
              🎯 Shaxsiy o'quv rejasini sozlash
            </button>
            <button onClick={() => { onStartPlacement(); setMobileMenuOpen(false); }}>
              📋 Darajani aniqlash testi
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
