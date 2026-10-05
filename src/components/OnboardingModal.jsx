import React, { useState } from 'react';
import { Target, Compass, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { storageService } from '../services/storageService';

const GOALS = [
  { id: 'ielts', title: '🎯 IELTS 7.5 - 9.0 Tayyorgarlik', desc: 'Xorijiy universitetlar va viza imtihonlari uchun' },
  { id: 'job', title: '💼 Ish va Karyera', desc: 'IT, xalqaro kompaniyalar va ish suhbatlari' },
  { id: 'university', title: '🎓 Universitet & O\'qish', desc: 'Akademik tadqiqotlar va xorijda ta\'lim' },
  { id: 'travel', title: '✈️ Sayohat & Xorijiy Safarlar', desc: 'Aeroport, mehmonxona va erkin sayohat muloqoti' },
  { id: 'conversation', title: '🗣 Kundalik Suhbat', desc: 'Do\'stlar bilan to\'xtalmay erkin gaplashish' },
  { id: 'self', title: '🧠 Shaxsiy Rivojlanish', desc: 'Xotirani kuchaytirish va yangi madaniyatni o\'rganish' }
];

const LEVELS = [
  { code: 'A0', title: 'A0 — Absolute Beginner', desc: 'Alifbo va eng oddiy so\'zlarni ham bilmayman' },
  { code: 'A1', title: 'A1 — Elementary', desc: 'Oddiy so\'zlarni bilaman, lekin gap tuza olmayman' },
  { code: 'A2', title: 'A2 — Pre-Intermediate', desc: 'O\'tgan zamon va oddiy mavzularda tushunaman' },
  { code: 'B1', title: 'B1 — Intermediate', desc: 'Fikrimni ifodalay olaman, lekin xatolar ko\'p' },
  { code: 'B2', title: 'B2 — Upper-Intermediate', desc: 'Ravon gapiraman, murakkab grammatika kerak' },
  { code: 'C1', title: 'C1 — Advanced', desc: 'Akademik til va IELTS 7.5+ kerak' },
  { code: 'C2', title: 'C2 — Mastery', desc: 'Ona tili darajasi va nozik uslublar' }
];

const TIMES = [
  { min: 10, label: '10 daqiqa / kun', desc: 'Yengil va muntazam odat' },
  { min: 20, label: '20 daqiqa / kun', desc: 'Tavsiya etiladi (Eng samarali)' },
  { min: 30, label: '30 daqiqa / kun', desc: 'Tez sur'atda rivojlanish' },
  { min: 45, label: '45 daqiqa / kun', desc: 'Jiddiy akademik tayyorgarlik' },
  { min: 60, label: '60 daqiqa / kun', desc: 'Intensiv ekspress kurs' }
];

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('ielts');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedTime, setSelectedTime] = useState(20);

  if (!isOpen) return null;

  const handleFinish = () => {
    const user = storageService.getUser();
    user.learningGoal = selectedGoal;
    user.level = selectedLevel;
    user.dailyGoalMin = selectedTime;
    storageService.saveUser(user);

    storageService.addXP(50);
    if (onComplete) onComplete(user);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box onboarding-modal" onClick={e => e.stopPropagation()}>
        {/* Step Indicator */}
        <div className="onboarding-steps-bar">
          <div className={`ob-step-dot ${step >= 1 ? 'active' : ''}`}>1. Maqsad</div>
          <div className="ob-step-line"></div>
          <div className={`ob-step-dot ${step >= 2 ? 'active' : ''}`}>2. Daraja</div>
          <div className="ob-step-line"></div>
          <div className={`ob-step-dot ${step >= 3 ? 'active' : ''}`}>3. Vaqt</div>
          <div className="ob-step-line"></div>
          <div className={`ob-step-dot ${step >= 4 ? 'active' : ''}`}>4. Reja</div>
        </div>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div className="ob-content-pane">
            <div className="ob-header">
              <Target size={32} className="gold" />
              <h3>Ingliz tilini nima uchun o‘rganmoqchisiz?</h3>
              <p>AI Ustoz shaxsiy darslaringizni aynan shu maqsadingizga moslashtiradi.</p>
            </div>

            <div className="ob-options-list">
              {GOALS.map(g => (
                <div 
                  key={g.id}
                  className={`ob-option-card ${selectedGoal === g.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGoal(g.id)}
                >
                  <div className="ob-opt-info">
                    <h4>{g.title}</h4>
                    <p>{g.desc}</p>
                  </div>
                  {selectedGoal === g.id && <CheckCircle2 size={20} className="check-gold" />}
                </div>
              ))}
            </div>

            <div className="ob-footer">
              <button className="primary-btn full-btn" onClick={() => setStep(2)}>
                <span>Davom etish</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LEVEL */}
        {step === 2 && (
          <div className="ob-content-pane">
            <div className="ob-header">
              <Compass size={32} className="card-icon" style={{ color: '#06B6D4' }} />
              <h3>Hozirgi boshlang'ich darajangiz qanday?</h3>
              <p>Agar aniq bilmasangiz, taxminiy tanlang yoki keyinroq placement testdan o'tasiz.</p>
            </div>

            <div className="ob-options-list">
              {LEVELS.map(lvl => (
                <div 
                  key={lvl.code}
                  className={`ob-option-card ${selectedLevel === lvl.code ? 'selected' : ''}`}
                  onClick={() => setSelectedLevel(lvl.code)}
                >
                  <div className="ob-opt-info">
                    <h4>{lvl.title}</h4>
                    <p>{lvl.desc}</p>
                  </div>
                  {selectedLevel === lvl.code && <CheckCircle2 size={20} className="check-gold" />}
                </div>
              ))}
            </div>

            <div className="ob-footer space-between">
              <button className="outline-btn" onClick={() => setStep(1)}>Orqaga</button>
              <button className="primary-btn" onClick={() => setStep(3)}>
                <span>Davom etish</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DAILY TIME */}
        {step === 3 && (
          <div className="ob-content-pane">
            <div className="ob-header">
              <Clock size={32} className="card-icon" style={{ color: '#10B981' }} />
              <h3>Kuniga qancha vaqt ajrata olasiz?</h3>
              <p>Kichik, lekin muntazam 20 daqiqalik odat haftasiga bir marta 3 soat o'qishdan 5 barobar samaraliroq.</p>
            </div>

            <div className="ob-options-list">
              {TIMES.map(tm => (
                <div 
                  key={tm.min}
                  className={`ob-option-card ${selectedTime === tm.min ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(tm.min)}
                >
                  <div className="ob-opt-info">
                    <h4>{tm.label}</h4>
                    <p>{tm.desc}</p>
                  </div>
                  {selectedTime === tm.min && <CheckCircle2 size={20} className="check-gold" />}
                </div>
              ))}
            </div>

            <div className="ob-footer space-between">
              <button className="outline-btn" onClick={() => setStep(2)}>Orqaga</button>
              <button className="primary-btn" onClick={() => setStep(4)}>
                <span>Shaxsiy rejani tuzish</span>
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PERSONALIZED PLAN PREVIEW */}
        {step === 4 && (
          <div className="ob-content-pane">
            <div className="ob-header">
              <Sparkles size={36} className="gold" />
              <h3>🎉 Sizning Shaxsiy Ta'lim Rejangiz Tayyor!</h3>
              <p>AI Ustoz sizning maqsadlaringiz asosida adaptiv yo'l xaritasini shakllantirdi.</p>
            </div>

            <div className="ob-plan-summary-card">
              <div className="ob-plan-item">
                <span className="ob-pi-label">Bugun nimani o‘rganishim kerak?</span>
                <p className="ob-pi-val">📚 10 ta yangi so'z + 1 ta {selectedLevel} video darsi + 5 daqiqa Ustoz AI bilan suhbat.</p>
              </div>

              <div className="ob-plan-item">
                <span className="ob-pi-label">Keyingi nima qilishim kerak?</span>
                <p className="ob-pi-val">Har kuni tanlangan {selectedTime} daqiqalik odatni saqlab, 🔥 streak to'plash.</p>
              </div>

              <div className="ob-plan-item">
                <span className="ob-pi-label">Qayerda xato qildim & Qanday yaxshilanishim mumkin?</span>
                <p className="ob-pi-val">Barcha xatolaringiz "Xatolar Daftarchasi"ga tushadi va AI har darsda shu xatolarni qayta mashq qildiradi.</p>
              </div>
            </div>

            <div className="ob-footer">
              <button className="primary-btn full-btn" onClick={handleFinish}>
                <span>Platformaga Kirish (+50 XP)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
