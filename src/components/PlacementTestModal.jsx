import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, Award, Compass, RefreshCw } from 'lucide-react';
import { PLACEMENT_QUESTIONS } from '../data/placementQuestions';
import { storageService } from '../services/storageService';

export default function PlacementTestModal({ isOpen, onClose, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState(null);

  if (!isOpen) return null;

  const currentQ = PLACEMENT_QUESTIONS[currentIndex];

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === currentQ.correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setAnswers([...answers, { questionId: currentQ.id, selected: selectedOption, isCorrect }]);
    setSelectedOption(null);

    if (currentIndex + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate level
      let level = "Beginner (0 / A1)";
      if (newScore >= 9) level = "Advanced (C1 / IELTS 7.5+)";
      else if (newScore >= 7) level = "Upper-Intermediate (B2 / IELTS 6.5)";
      else if (newScore >= 5) level = "Intermediate (B1)";
      else if (newScore >= 3) level = "Pre-Intermediate (A2)";
      else level = "Elementary (0 / A1)";

      setCalculatedLevel(level);
      setTestCompleted(true);
      storageService.addXP(50);
      
      const user = storageService.getUser();
      user.level = level;
      storageService.saveUser(user);
    }
  };

  const handleCompleteAndClose = () => {
    if (onFinish) onFinish(calculatedLevel);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box placement-modal" onClick={e => e.stopPropagation()}>
        {!testCompleted ? (
          <>
            {/* Header */}
            <div className="modal-header">
              <div className="placement-header-info">
                <Compass size={22} className="gold" />
                <div>
                  <h3>Darajangizni Aniqlash Testi (Placement Test)</h3>
                  <p className="modal-sub">Savol {currentIndex + 1} / {PLACEMENT_QUESTIONS.length}</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            {/* Progress Bar */}
            <div className="placement-progress-track">
              <div 
                className="placement-progress-fill" 
                style={{ width: `${((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Body */}
            <div className="modal-body placement-body">
              <div className="question-meta-row">
                <span className="skill-pill">{currentQ.skill}</span>
                <span className="weight-pill">{currentQ.levelWeight}</span>
              </div>

              <h4 className="q-instruction">{currentQ.questionUz}</h4>
              <div className="q-sentence-box">
                <p className="q-sentence-text">{currentQ.sentence}</p>
              </div>

              <div className="q-options-list">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`q-option-btn ${selectedOption === i ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(i)}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="opt-text">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <span className="footer-tip">Eng to'g'ri javobni tanlang va davom eting</span>
              <button 
                className="primary-btn" 
                disabled={selectedOption === null}
                onClick={handleNext}
              >
                <span>{currentIndex + 1 === PLACEMENT_QUESTIONS.length ? 'Natijani ko\'rish' : 'Keyingisi'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          /* Result & Learning Plan Screen */
          <div className="placement-result-container">
            <div className="result-badge-circle">
              <Award size={48} className="gold-icon" />
            </div>

            <h2>Test Yakunlandi!</h2>
            <p className="score-summary">
              Siz {PLACEMENT_QUESTIONS.length} ta savoldan <strong>{score}</strong> tasiga to'g'ri javob berdingiz.
            </p>

            <div className="level-result-banner">
              <span className="lrb-label">Sizning Taxminiy Darajangiz:</span>
              <h1 className="lrb-title">{calculatedLevel}</h1>
              <span className="lrb-badge">+50 XP taqdim etildi! 🏆</span>
            </div>

            {/* Personal Learning Plan */}
            <div className="learning-plan-box">
              <h4>📋 Siz uchun Tuzilgan 90 Kunlik Ta'lim Rejasi:</h4>
              <div className="plan-timeline">
                <div className="plan-step">
                  <div className="step-dot">1</div>
                  <div className="step-info">
                    <h5>1–30 kun: Asoslarni Mustahkamlash & Lug'at</h5>
                    <p>Kunlik 15 daqiqa video darslar va 200 ta eng faol akademik so'zlar.</p>
                  </div>
                </div>

                <div className="plan-step">
                  <div className="step-dot">2</div>
                  <div className="step-info">
                    <h5>31–60 kun: AI Ustoz bilan Speaking & Grammatika</h5>
                    <p>Erkak AI ovozli suhbat orqali talaffuzni to'g'rilash va murakkab gaplar tuzish.</p>
                  </div>
                </div>

                <div className="plan-step">
                  <div className="step-dot">3</div>
                  <div className="step-info">
                    <h5>61–90 kun: IELTS 9.0 Simulyatsiyasi</h5>
                    <p>Reading strategiyalari, Listening audio testlar va AI insho tahlillari.</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="primary-btn full-btn" onClick={handleCompleteAndClose}>
              Shaxsiy Darslarni Boshlash
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
