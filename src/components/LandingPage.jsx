import React, { useState } from 'react';
import { 
  Sparkles, Bot, Mic, Video, CheckCircle, ArrowRight, Star, 
  HelpCircle, ChevronDown, ChevronUp, Zap, Shield, Globe, Award 
} from 'lucide-react';
import { ROADMAP_LEVELS } from '../data/curriculumData';
import { translate } from '../services/i18n';

export default function LandingPage({ onStart, onOpenAITutor, onStartPlacement, lang }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "EnglishPro UZ haqiqatan ham 0 dan o'rgatadimi?",
      a: "Ha! Platformamiz ingliz alifbosi, 44 ta fonetik tovush va to'g'ri o'qish qoidalaridan (Phonics) boshlanadi. Hech qanday boshlang'ich bilim talab etilmaydi."
    },
    {
      q: "Ustoz AI xatolarni qanday to'g'rilaydi?",
      a: "Siz matn yozganingizda yoki mikrofonga gapirganingizda, Ustoz AI xatolarni samimiy va muloyim tarzda ko'rsatadi, sababini o'zbek tilida tushuntiradi va barcha xatolarni qayta takrorlash uchun Xatolar Daftarchasiga saqlaydi."
    },
    {
      q: "IELTS 9.0 olishga qancha vaqt ketadi?",
      a: "IELTS 9.0 yuqori akademik daraja bo'lib, o'quvchining har kungi odati va dastlabki darajasiga bog'liq. Biz kafolat bermaymiz, balki IELTS 9.0 darajasiga tayyorgarlik ko'rish uchun eng mukammal simulyator va shaxsiy reja taqdim etamiz."
    },
    {
      q: "SMS eslatmalar qanday ishlaydi?",
      a: "Profil sozlamalarida telefon raqamingizni (+998) va qulay dars vaqtini kiritasiz. Har kuni belgilangan vaqtda darsni eslatuvchi xabar yuboriladi."
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>EnglishPro UZ — 0 dan IELTS 9.0 gacha Ta'lim Tizimi</span>
          </div>

          <h1 className="hero-title">
            0 dan IELTS 9.0 gacha <br />
            <span className="gradient-text">ingliz tilini o‘rganing</span>
          </h1>

          <p className="hero-subtitle">
            AI ustoz, video darslar, interaktiv mashqlar va real suhbatlar orqali ingliz tilini oson o‘rganing.
          </p>

          <div className="hero-cta-group">
            <button className="cta-btn primary-cta" onClick={onStart}>
              <span>Boshlash</span>
              <ArrowRight size={18} />
            </button>
            <button className="cta-btn secondary-cta" onClick={onOpenAITutor}>
              <Bot size={18} />
              <span>AI Ustoz bilan gaplashish</span>
            </button>
            <button className="cta-btn outline-cta" onClick={onStartPlacement}>
              <span>🎯 Darajamni aniqlash</span>
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="hero-stats-row">
            <div className="stat-card">
              <span className="stat-num">50,000+</span>
              <span className="stat-lbl">Faol o'quvchilar</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">70+</span>
              <span className="stat-lbl">Tizimli video darslar</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">100%</span>
              <span className="stat-lbl">O'zbek tilida tushuntirish</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive AI Teacher Visual */}
        <div className="hero-visual-card">
          <div className="ai-visual-inner">
            <div className="ai-avatar-circle">
              <div className="ai-pulse-ring"></div>
              <div className="ai-pulse-ring delay"></div>
              <Bot size={54} className="hero-bot-icon" />
            </div>

            <div className="ai-speech-bubble user-bubble">
              <p>"I am go to school yesterday."</p>
            </div>

            <div className="ai-speech-bubble tutor-bubble">
              <div className="bubble-header">
                <span className="bubble-name">Ustoz AI (Mr. John) 🔊</span>
                <span className="bubble-badge">Real-time Feedback</span>
              </div>
              <p className="bubble-correction">
                ✅ <strong>To‘g‘ri variant:</strong> "I went to school yesterday."
              </p>
              <p className="bubble-explanation">
                💡 <strong>Sababi:</strong> "Yesterday" o'tgan vaqtni bildiradi, shuning uchun Past Simple ishlatiladi.
              </p>
            </div>

            <div className="ai-status-indicator">
              <span className="recording-wave"></span>
              <span className="recording-wave"></span>
              <span className="recording-wave"></span>
              <span>Erkak AI ovozli suhbat xonasi faol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="roadmap-section">
        <div className="section-header-center">
          <span className="section-tag">0 dan IELTS 9.0 gacha</span>
          <h2 className="section-heading">Bosqichma-Bosqich 70 ta Mukammal Dars</h2>
          <p className="section-desc">Har bir bosqich 10 ta professional dars, video tushuntirishlar va AI ustoz mashqlari bilan boyitilgan.</p>
        </div>

        <div className="roadmap-grid">
          {ROADMAP_LEVELS.map((lvl) => (
            <div key={lvl.id} className="roadmap-card" style={{ borderColor: `${lvl.color}40` }}>
              <div className="card-top-tag" style={{ background: lvl.color }}>
                {lvl.code}
              </div>
              <h3 className="card-level-title">{lvl.titleUz}</h3>
              <p className="card-level-desc">{lvl.descriptionUz}</p>
              <div className="card-modules-list">
                {lvl.modules.slice(0, 4).map(mod => (
                  <div key={mod.id} className="module-item">
                    <CheckCircle size={15} className="mod-check" />
                    <span>{mod.title}</span>
                  </div>
                ))}
                <span className="more-mods-link">+ yana {lvl.modules.length - 4} ta dars</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / Access Plans */}
      <section className="pricing-section">
        <div className="section-header-center">
          <span className="section-tag">Tariflar</span>
          <h2 className="section-heading">O'zingizga Mos Ta'lim Rejasini Tanlang</h2>
          <p className="section-desc">Barcha asosiy darslar va Ustoz AI funksiyalari hozirda bepul ochiq!</p>
        </div>

        <div className="pricing-cards-wrapper">
          <div className="pricing-card free-tier">
            <h3>Boshlang'ich (Free)</h3>
            <div className="price-tag">0 so'm <span>/ umrbod</span></div>
            <p className="tier-desc">Ingliz tilini noldan mustaqil boshlovchilar uchun.</p>
            <ul className="tier-features">
              <li><CheckCircle size={16} /> A0 va A1 darajadagi barcha video darslar</li>
              <li><CheckCircle size={16} /> Spaced repetition lug'at kartochkalari</li>
              <li><CheckCircle size={16} /> Ustoz AI bilan kundalik suhbat</li>
              <li><CheckCircle size={16} /> O'zbekcha grammatika qoidalari</li>
            </ul>
            <button className="tier-btn outline-btn" onClick={onStart}>Bugun boshlang</button>
          </div>

          <div className="pricing-card pro-tier featured-tier">
            <div className="popular-badge">Eng Ommabop</div>
            <h3>EnglishPro IELTS PRO</h3>
            <div className="price-tag">99,000 so'm <span>/ oy</span></div>
            <p className="tier-desc">IELTS 7.5 - 9.0 maqsad qilgan va tez natija istaganlar uchun.</p>
            <ul className="tier-features">
              <li><CheckCircle size={16} /> 0 dan IELTS 9.0 gacha 70 ta to'liq dars</li>
              <li><CheckCircle size={16} /> Cheksiz Ovozli Ustoz AI (Erkak ovozli)</li>
              <li><CheckCircle size={16} /> IELTS Mock Testlar va AI Essay Tekshiruvi</li>
              <li><CheckCircle size={16} /> Talaffuz tekshiruvchisi va Fonetika</li>
              <li><CheckCircle size={16} /> Har kuni SMS eslatmalar (+998)</li>
            </ul>
            <button className="tier-btn primary-btn" onClick={onStart}>PRO ni Tanlash</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-header-center">
          <span className="section-tag">Savol-Javoblar</span>
          <h2 className="section-heading">Ko'p Beriladigan Savollar</h2>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{f.q}</span>
                {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {activeFaq === i && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={20} />
              <span>EnglishPro UZ</span>
            </div>
            <p>O'zbek tilidagi eng mukammal va do'stona ingliz tili hamda IELTS ta'lim platformasi.</p>
          </div>
          <div className="footer-links-col">
            <h4>Bo'limlar</h4>
            <span onClick={onStart}>Dashboard</span>
            <span onClick={onOpenAITutor}>Ustoz AI</span>
            <span onClick={onStartPlacement}>Daraja Testi</span>
          </div>
          <div className="footer-links-col">
            <h4>Ijtimoiy Tarmoqlar</h4>
            <span>Telegram: @englishpro_uz</span>
            <span>Instagram: @englishpro.uz</span>
            <span>YouTube: EnglishPro UZ</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 EnglishPro UZ. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
