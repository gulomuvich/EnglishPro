import React, { useState } from 'react';
import { 
  Flame, Award, CheckSquare, Square, Volume2, ArrowRight, 
  Sparkles, Bot, Video, BookOpen, Mic, HelpCircle, Compass, Target
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';

export default function Dashboard({ 
  user, 
  xp, 
  streak, 
  setCurrentTab, 
  onStartPlacement,
  lang 
}) {
  const [tasks, setTasks] = useState(storageService.getDailyTasks());
  const [quickPracticeOpen, setQuickPracticeOpen] = useState(false);
  const [quickQuestionAnswered, setQuickQuestionAnswered] = useState(false);
  const [selectedQuickAnswer, setSelectedQuickAnswer] = useState(null);

  const toggleTask = (taskId) => {
    const updated = storageService.toggleDailyTask(taskId);
    setTasks(updated);
  };

  const playWordAudio = (word) => {
    speechService.speak(word);
  };

  const handleQuickAnswer = (index) => {
    setSelectedQuickAnswer(index);
    setQuickQuestionAnswered(true);
    if (index === 1) {
      storageService.addXP(20);
    }
  };

  return (
    <div className="dashboard-view">
      {/* Top Welcome Bar */}
      <div className="welcome-banner">
        <div className="welcome-text-col">
          <div className="welcome-greeting">
            <h1>Salom, {user?.name || 'O\'quvchi'} 👋</h1>
            <p className="welcome-sub">
              Bugun 15–20 daqiqa ingliz tilini o‘rganamiz. Har bir qadam sizni IELTS 9.0 ga yaqinlashtiradi!
            </p>
          </div>
          
          <div className="banner-stats-badges">
            <div className="stat-badge">
              <span className="badge-lbl">Hozirgi Daraja:</span>
              <span className="badge-val level-badge-text">{user?.level || 'A1 — 67%'}</span>
            </div>
            <div className="stat-badge">
              <span className="badge-lbl">Bugungi Maqsad:</span>
              <span className="badge-val">🔥 20 daqiqa</span>
            </div>
            <div className="stat-badge">
              <span className="badge-lbl">Streak:</span>
              <span className="badge-val">🔥 {streak.days} kun</span>
            </div>
            <div className="stat-badge">
              <span className="badge-lbl">Jami XP:</span>
              <span className="badge-val">🏆 {xp} XP</span>
            </div>
          </div>
        </div>

        <div className="welcome-cta-col">
          <button className="quick-practice-btn" onClick={() => setQuickPracticeOpen(true)}>
            <Zap size={18} />
            <span>5 daqiqalik tezkor mashq</span>
          </button>
          <button className="placement-cta-btn" onClick={onStartPlacement}>
            <Compass size={16} />
            <span>Daraja testini qayta topshirish</span>
          </button>
        </div>
      </div>

      {/* Grid: Tasks & Word of the Day */}
      <div className="dashboard-grid-2">
        {/* Today's Tasks */}
        <div className="dash-card tasks-card">
          <div className="dash-card-header">
            <div className="dash-header-title">
              <Target size={20} className="card-header-icon" />
              <h3>Bugungi Reja (Daily Plan)</h3>
            </div>
            <span className="tasks-progress-badge">
              {tasks.filter(t => t.completed).length} / {tasks.length} bajarildi
            </span>
          </div>

          <div className="tasks-checklist">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`task-row ${task.completed ? 'task-done' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="task-checkbox">
                  {task.completed ? <CheckSquare size={20} className="check-done" /> : <Square size={20} />}
                </div>
                <span className="task-name">{task.titleUz}</span>
                <span className="task-xp">+{task.xp} XP</span>
              </div>
            ))}
          </div>

          <div className="task-actions-row">
            <button className="start-today-btn" onClick={() => setCurrentTab('lessons')}>
              Bugungi darsni boshlash
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Word of the Day */}
        <div className="dash-card word-of-day-card">
          <div className="dash-card-header">
            <div className="dash-header-title">
              <Sparkles size={20} className="card-header-icon gold" />
              <h3>Bugungi So‘z (Word of the Day)</h3>
            </div>
            <span className="wod-tag">Spaced Repetition</span>
          </div>

          <div className="wod-content">
            <div className="wod-main-row">
              <div className="wod-word-info">
                <span className="wod-english">CONSIDER</span>
                <span className="wod-ipa">/kənˈsɪd.ər/</span>
              </div>
              <button 
                className="wod-audio-btn" 
                onClick={() => playWordAudio("consider. Please consider my proposal before making a decision.")}
                title="Erkak AI ovozida eshitish"
              >
                <Volume2 size={22} />
              </button>
            </div>

            <div className="wod-meaning-box">
              <span className="wod-meaning-lbl">O'zbekcha ma'nosi:</span>
              <p className="wod-meaning-text">hisobga olmoq, o'ylab ko'rmoq</p>
            </div>

            <div className="wod-example-box">
              <span className="wod-ex-lbl">Misol:</span>
              <p className="wod-ex-en">"Please consider my idea carefully."</p>
              <p className="wod-ex-uz">"Iltimos, mening g'oyamni sinchiklab o'ylab ko'ring."</p>
            </div>

            <div className="wod-smart-synonyms">
              <span className="syn-title">AI Tavsiya qilgan sinonimlar:</span>
              <div className="syn-chips">
                <span className="syn-chip">contemplate</span>
                <span className="syn-chip">deliberate</span>
                <span className="syn-chip">ponder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="dash-features-title">
        <h3>Ta'lim Xonalari</h3>
        <p>Quyidagi bo'limlardan birini tanlang va mashg'ulotni davom ettiring:</p>
      </div>

      <div className="feature-nav-grid">
        <div className="nav-feature-card" onClick={() => setCurrentTab('ai_tutor')}>
          <div className="nfc-icon" style={{ background: '#4F46E520', color: '#4F46E5' }}>
            <Bot size={26} />
          </div>
          <h4>AI Ustoz (Mr. John)</h4>
          <p>Erkak ovozli intellektual ustoz bilan har qanday mavzuda dialog qiling va xatolarni tahlil qiling.</p>
          <span className="nfc-link">Suhbatni boshlash →</span>
        </div>

        <div className="nav-feature-card" onClick={() => setCurrentTab('lessons')}>
          <div className="nfc-icon" style={{ background: '#0EA5E920', color: '#0EA5E9' }}>
            <Video size={26} />
          </div>
          <h4>Videodarslar</h4>
          <p>0 dan IELTS gacha tartiblangan video darsliklar, transkriptlar va har dars so'ngida testlar.</p>
          <span className="nfc-link">Darslarni ko'rish →</span>
        </div>

        <div className="nav-feature-card" onClick={() => setCurrentTab('ielts')}>
          <div className="nfc-icon" style={{ background: '#EF444420', color: '#EF4444' }}>
            <Award size={26} />
          </div>
          <h4>IELTS 9.0 Simulyatori</h4>
          <p>Listening, Reading (taymerli), Writing (AI tekshiruvchi) va Speaking imtihoni.</p>
          <span className="nfc-link">Mock test topshirish →</span>
        </div>

        <div className="nav-feature-card" onClick={() => setCurrentTab('pronounce')}>
          <div className="nfc-icon" style={{ background: '#10B98120', color: '#10B981' }}>
            <Mic size={26} />
          </div>
          <h4>Talaffuz Tekshiruvchisi</h4>
          <p>Murakkab inglizcha so'zlarni mikrofonga ayting va necha foiz to'g'riligini bilib oling.</p>
          <span className="nfc-link">Talaffuzni o'lchash →</span>
        </div>

        <div className="nav-feature-card" onClick={() => setCurrentTab('vocabulary')}>
          <div className="nfc-icon" style={{ background: '#8B5CF620', color: '#8B5CF6' }}>
            <BookOpen size={26} />
          </div>
          <h4>Spaced Repetition Lug'at</h4>
          <p>1, 3, 7, 14, 30 kunlik intervalli takrorlash tizimi orqali so'zlarni umrbod eslab qoling.</p>
          <span className="nfc-link">So'zlarni yodlash →</span>
        </div>

        <div className="nav-feature-card" onClick={() => setCurrentTab('grammar')}>
          <div className="nfc-icon" style={{ background: '#F59E0B20', color: '#F59E0B' }}>
            <Sparkles size={26} />
          </div>
          <h4>Grammatika & AI Writing</h4>
          <p>Barcha grammatik mavzular, insholarni AI orqali tekshirish va xatolarni tuzatish.</p>
          <span className="nfc-link">Qoidalarni o'rganish →</span>
        </div>
      </div>

      {/* Quick 5-Minute Practice Modal */}
      {quickPracticeOpen && (
        <div className="modal-overlay" onClick={() => setQuickPracticeOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚡ 5 Daqiqalik Tezkor Mashq</h3>
              <button className="close-btn" onClick={() => setQuickPracticeOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="qp-intro">
                AI sizning oxirgi xatolaringizdan kelib chiqib, <strong>Past Simple</strong> bo'yicha tezkor savol tayyorladi:
              </p>
              <div className="qp-question-card">
                <span className="qp-sentence">"Yesterday evening, we _______ delicious Uzbek food in Samarkand."</span>
                <div className="qp-options">
                  {["eat", "ate", "have eaten"].map((opt, i) => (
                    <button 
                      key={i} 
                      className={`qp-opt-btn ${selectedQuickAnswer === i ? (i === 1 ? 'correct' : 'wrong') : ''}`}
                      disabled={quickQuestionAnswered}
                      onClick={() => handleQuickAnswer(i)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quickQuestionAnswered && (
                  <div className={`qp-feedback-box ${selectedQuickAnswer === 1 ? 'success' : 'alert'}`}>
                    {selectedQuickAnswer === 1 ? (
                      <p>🎉 <strong>Barakalla! To'g'ri javob (+20 XP).</strong> "Yesterday" o'tgan zamon bo'lgani uchun "eat" fe'lining V2 shakli "ate" ishlatiladi.</p>
                    ) : (
                      <p>💡 <strong>Yaxshi urinish!</strong> To'g'ri javob: <strong>"ate"</strong>. Sababi: Yesterday aniq o'tgan vaqtni bildiradi.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="primary-btn" onClick={() => setQuickPracticeOpen(false)}>
                Davom etish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Zap({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
