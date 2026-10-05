import React, { useState } from 'react';
import { 
  User, Bell, Smartphone, Moon, Sun, Globe, Volume2, 
  Award, Flame, CheckCircle, Download, Save, Sparkles 
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

export default function ProfileAndSettings({ 
  user, 
  xp, 
  streak, 
  lang, 
  setLang, 
  theme, 
  toggleTheme 
}) {
  const [settings, setSettings] = useState(storageService.getSettings());
  const [phoneNumber, setPhoneNumber] = useState(settings.reminderPhone || '+998 90 123 45 67');
  const [reminderTime, setReminderTime] = useState(settings.reminderTime || '19:00');
  const [smsSuccessMsg, setSmsSuccessMsg] = useState('');
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const handleSaveReminder = async () => {
    const updated = {
      ...settings,
      reminderPhone: phoneNumber,
      reminderTime: reminderTime
    };
    setSettings(updated);
    storageService.saveSettings(updated);

    const res = await aiService.scheduleReminder(phoneNumber, reminderTime);
    setSmsSuccessMsg(res.message);
    setTimeout(() => setSmsSuccessMsg(''), 5000);
  };

  const handleInstallPWA = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then(() => {
        setPwaInstalled(true);
      });
    } else {
      alert("Ilovani o'rnatish uchun brauzer menyusidan 'Bosh ekranga qo'shish' (Add to Home screen) yoki 'Install App' tugmasini bosing.");
    }
  };

  return (
    <div className="profile-view">
      <div className="profile-top-card">
        <div className="ptc-avatar-box">
          <div className="big-avatar-circle">{user?.avatar || '👨‍🎓'}</div>
        </div>
        <div className="ptc-info">
          <h2>{user?.name || 'Ali Valiyev'}</h2>
          <p className="ptc-email">{user?.email || 'ali@example.com'}</p>
          <div className="ptc-meta-row">
            <span className="ptc-level-tag">Daraja: <strong>{user?.level || 'A1 — 67%'}</strong></span>
            <span className="ptc-target-tag">Maqsad: <strong>{user?.targetLevel || 'IELTS 9.0'}</strong></span>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="profile-stats-grid">
        <div className="p-stat-box">
          <Flame size={24} className="gold" />
          <div className="psb-content">
            <span className="psb-val">{streak.days} kun</span>
            <span className="psb-lbl">Ketma-ketlik (Streak)</span>
          </div>
        </div>

        <div className="p-stat-box">
          <Award size={24} className="gold" />
          <div className="psb-content">
            <span className="psb-val">{xp} XP</span>
            <span className="psb-lbl">Jami Ballar</span>
          </div>
        </div>

        <div className="p-stat-box">
          <CheckCircle size={24} className="green" />
          <div className="psb-content">
            <span className="psb-val">{storageService.getCompletedLessons().length} ta</span>
            <span className="psb-lbl">Tugatilgan darslar</span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="settings-sections-wrapper">
        {/* SMS Reminder Settings */}
        <div className="settings-card">
          <div className="sc-header">
            <Smartphone size={22} className="card-icon" />
            <div>
              <h3>SMS Dars Eslatmalari (+998)</h3>
              <p>Har kuni dars vaqtini o'tkazib yubormaslik uchun telefoningizga SMS eslatma yuboriladi.</p>
            </div>
          </div>

          <div className="sc-body">
            <div className="input-group-row">
              <div className="input-field">
                <label>Telefon raqamingiz:</label>
                <input 
                  type="text" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="input-field">
                <label>Har kungi eslatma vaqti:</label>
                <input 
                  type="time" 
                  value={reminderTime} 
                  onChange={(e) => setReminderTime(e.target.value)}
                />
              </div>
            </div>

            {smsSuccessMsg && (
              <div className="alert-box success">
                <CheckCircle size={18} />
                <span>{smsSuccessMsg}</span>
              </div>
            )}

            <button className="primary-btn" onClick={handleSaveReminder}>
              <Save size={16} />
              <span>Eslatmani Saqlash (SMS Provider Faol)</span>
            </button>
          </div>
        </div>

        {/* Application Preferences */}
        <div className="settings-card">
          <div className="sc-header">
            <Sparkles size={22} className="card-icon" />
            <div>
              <h3>Platforma Sozlamalari</h3>
              <p>Til, interfeys mavzusi va ovoz preferensiyalari.</p>
            </div>
          </div>

          <div className="sc-body settings-switches">
            <div className="setting-toggle-row">
              <div className="st-info">
                <strong>Platforma tili:</strong>
                <span>Hozirgi til: {lang === 'uz' ? "O'zbek tili" : "English"}</span>
              </div>
              <button className="secondary-btn" onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}>
                <Globe size={16} />
                <span>{lang === 'uz' ? "Switch to English" : "O'zbekchaga o'tish"}</span>
              </button>
            </div>

            <div className="setting-toggle-row">
              <div className="st-info">
                <strong>Ko'rinish rejimi (Theme):</strong>
                <span>{theme === 'dark' ? "Qorong'i rejim (Dark Mode)" : "Yorug' rejim (Light Mode)"}</span>
              </div>
              <button className="secondary-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? "Yorug' Rejim" : "Qorong'i Rejim"}</span>
              </button>
            </div>

            <div className="setting-toggle-row">
              <div className="st-info">
                <strong>AI Ustoz Ovozi:</strong>
                <span>Standart Erkak AI ovozi (Mr. John — Authoritative English)</span>
              </div>
              <span className="badge-male-voice">🔊 Male Voice (Active)</span>
            </div>
          </div>
        </div>

        {/* PWA Mobile App Download Card */}
        <div className="settings-card pwa-install-card">
          <div className="sc-header">
            <Download size={22} className="card-icon gold" />
            <div>
              <h3>📱 Mobil Ilovani O'rnatish (PWA / Android / iOS)</h3>
              <p>Saytni to'liq ilova sifatida telefoningizga o'rnating va offline lug'atdan foydalaning.</p>
            </div>
          </div>

          <div className="sc-body">
            <button className="primary-btn pwa-btn" onClick={handleInstallPWA}>
              <Download size={18} />
              <span>Ilovani Telefonga O'rnatish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
