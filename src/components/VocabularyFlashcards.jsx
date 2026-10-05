import React, { useState } from 'react';
import { Volume2, Sparkles, Plus, Check, RefreshCw, BookOpen, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { VOCABULARY_LIST, SMART_SYNONYM_RECOMMENDATIONS } from '../data/vocabularyData';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';

const STAGES = [
  { id: 0, label: "Barchasi" },
  { id: 1, label: "Bugun (Today)" },
  { id: 2, label: "3 kunlik (3 days)" },
  { id: 3, label: "7 kunlik (7 days)" },
  { id: 4, label: "14 kunlik (14 days)" },
  { id: 5, label: "30 kunlik (30 days)" }
];

export default function VocabularyFlashcards() {
  const [viewMode, setViewMode] = useState('flashcards'); // 'flashcards' or 'quiz'
  const [selectedStage, setSelectedStage] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [words, setWords] = useState(VOCABULARY_LIST);
  const [customWord, setCustomWord] = useState('');
  const [customTranslation, setCustomTranslation] = useState('');

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredWords = selectedStage === 0 
    ? words 
    : words.filter(w => w.stage === selectedStage);

  const currentQuizWord = words[quizIndex % words.length];

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const playAudio = (word, e) => {
    if (e) e.stopPropagation();
    speechService.speak(word);
  };

  const handleQuizAnswer = (idx) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
    setQuizSubmitted(true);
    const isCorrect = idx === currentQuizWord.correctOptionIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      storageService.addXP(20);
    } else {
      // Store to mistakes notebook for spaced repeat
      storageService.addMistake({
        incorrect: `Lug'at xatosi: "${currentQuizWord.word}" so'ziga noto'g'ri variant tanlandi`,
        correct: `To'g'ri tarjima: ${currentQuizWord.translationUz}`,
        ruleUz: `"${currentQuizWord.word}" so'zi "${currentQuizWord.translationUz}" ma'nosini bildiradi. Namunaviy gap: ${currentQuizWord.exampleEn}`,
        topic: 'Vocabulary'
      });
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizIndex(prev => prev + 1);
  };

  const handleAddCustomWord = () => {
    if (!customWord.trim() || !customTranslation.trim()) return;
    const newEntry = {
      id: 'custom_' + Date.now(),
      word: customWord.trim().toLowerCase(),
      ipa: '/custom/',
      partOfSpeech: 'word',
      translationUz: customTranslation.trim(),
      category: 'My Vocab',
      exampleEn: `I am actively learning "${customWord}".`,
      exampleUz: `Men "${customTranslation}" so'zini o'rganmoqdaman.`,
      stage: 1,
      level: 'Custom',
      quizOptions: [customTranslation.trim(), "noto'g'ri variant", "boshqa so'z", "sinonim emas"],
      correctOptionIndex: 0
    };
    setWords([newEntry, ...words]);
    setCustomWord('');
    setCustomTranslation('');
    storageService.addXP(25);
  };

  return (
    <div className="vocabulary-view">
      <div className="vocab-header">
        <div>
          <h2>📖 Lug'at & Spaced Repetition (Intervalli Takrorlash)</h2>
          <p>
            So'zlarni xotirada uzoq saqlash uchun 1, 3, 7, 14 va 30 kunlik bosqichlarda takrorlang.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="vocab-mode-switcher">
          <button 
            className={`vms-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
            onClick={() => setViewMode('flashcards')}
          >
            🃏 Flashcardlar
          </button>
          <button 
            className={`vms-btn ${viewMode === 'quiz' ? 'active' : ''}`}
            onClick={() => setViewMode('quiz')}
          >
            🎯 4-Variantli Test (Quiz)
          </button>
        </div>
      </div>

      {viewMode === 'flashcards' ? (
        <>
          {/* Stage Filter Tabs */}
          <div className="stages-filter-bar">
            {STAGES.map(st => (
              <button
                key={st.id}
                className={`stage-pill-btn ${selectedStage === st.id ? 'active' : ''}`}
                onClick={() => setSelectedStage(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Flashcards Grid */}
          <div className="flashcards-grid">
            {filteredWords.map((item) => {
              const isFlipped = !!flippedCards[item.id];
              return (
                <div 
                  key={item.id} 
                  className={`flashcard-wrapper ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(item.id)}
                >
                  <div className="flashcard-inner">
                    {/* Front */}
                    <div className="flashcard-face flashcard-front">
                      <div className="fc-top">
                        <span className="fc-stage">Stage {item.stage} • {item.category}</span>
                        <button 
                          className="fc-audio-btn" 
                          onClick={(e) => playAudio(item.word, e)}
                          title="Talaffuzni eshitish"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>

                      <div className="fc-center">
                        <h2 className="fc-word">{item.word}</h2>
                        <span className="fc-ipa">{item.ipa}</span>
                        <span className="fc-pos">{item.partOfSpeech}</span>
                      </div>

                      <div className="fc-bottom">
                        <span className="fc-flip-hint">Tarjimani ko'rish uchun bosing 🔄</span>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flashcard-face flashcard-back">
                      <div className="fc-top">
                        <span className="fc-uz-tag">O'zbekcha Tarjima</span>
                      </div>

                      <div className="fc-center">
                        <h3 className="fc-translation">{item.translationUz}</h3>
                        <div className="fc-example-box">
                          <p className="fc-ex-en">"{item.exampleEn}"</p>
                          <p className="fc-ex-uz">{item.exampleUz}</p>
                        </div>
                      </div>

                      <div className="fc-bottom">
                        <span className="fc-flip-hint">Inglizchasiga qaytish 🔄</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* QUIZ MODE */
        <div className="vocab-quiz-container">
          <div className="vq-card">
            <div className="vq-header">
              <span className="vq-num">Savol #{quizIndex + 1}</span>
              <span className="vq-score">Ball: 🏆 {quizScore}</span>
            </div>

            <div className="vq-word-target">
              <span className="vq-sub">Quyidagi so'zning o'zbekcha ma'nosi nima?</span>
              <h1 className="vq-title">"{currentQuizWord.word}"</h1>
              <button className="vq-listen-btn" onClick={() => speechService.speak(currentQuizWord.word)}>
                <Volume2 size={18} />
                <span>Eshitish</span>
              </button>
            </div>

            <div className="vq-options-grid">
              {currentQuizWord.quizOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`vq-opt-btn ${
                    quizSubmitted
                      ? (idx === currentQuizWord.correctOptionIndex ? 'correct' : (selectedAnswer === idx ? 'wrong' : ''))
                      : (selectedAnswer === idx ? 'selected' : '')
                  }`}
                  onClick={() => handleQuizAnswer(idx)}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-text">{opt}</span>
                </button>
              ))}
            </div>

            {quizSubmitted && (
              <div className="vq-feedback-footer">
                <div className={`vq-msg ${selectedAnswer === currentQuizWord.correctOptionIndex ? 'success' : 'alert'}`}>
                  {selectedAnswer === currentQuizWord.correctOptionIndex ? (
                    <p>🎉 <strong>To'g'ri!</strong> (+20 XP) Misol: <em>"{currentQuizWord.exampleEn}"</em></p>
                  ) : (
                    <p>💡 <strong>Noto'g'ri.</strong> To'g'ri javob: <strong>{currentQuizWord.translationUz}</strong>. Xato daftarchangizga saqlandi!</p>
                  )}
                </div>
                <button className="primary-btn" onClick={handleNextQuiz}>
                  Keyingi So'z →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Smart Synonyms Section */}
      <div className="smart-synonyms-section">
        <div className="sss-header">
          <Sparkles size={20} className="gold" />
          <h3>🤖 Smart Vocabulary (AI Tavsiya Qiladigan Sinonimlar)</h3>
        </div>
        <p className="sss-desc">
          IELTS va akademik nutqda yuqori ball olib keluvchi so'zlar zaxirasi:
        </p>

        <div className="synonyms-cards-row">
          {SMART_SYNONYM_RECOMMENDATIONS.map((rec, i) => (
            <div key={i} className="syn-rec-card">
              <div className="src-top">
                <span className="src-base-word">"{rec.frequentlyUsed}"</span>
                <span className="src-uz">({rec.uzMeaning})</span>
              </div>
              <div className="src-alternatives-list">
                {rec.betterAlternatives.map((alt, j) => (
                  <div key={j} className="src-alt-item">
                    <strong className="alt-word">{alt.word}</strong>
                    <span className="alt-ctx">— {alt.context}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Word Section */}
      <div className="add-custom-vocab-card">
        <h4>➕ Lug'atimga yangi so'z qo'shish</h4>
        <div className="add-vocab-inputs">
          <input 
            type="text" 
            placeholder="Inglizcha so'z (masalan: persevere)" 
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="O'zbekcha tarjimasi (masalan: qat'iyat bilan davom etmoq)" 
            value={customTranslation}
            onChange={(e) => setCustomTranslation(e.target.value)}
          />
          <button className="primary-btn" onClick={handleAddCustomWord}>
            <Plus size={16} />
            <span>Qo'shish (+25 XP)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
