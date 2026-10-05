import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertCircle, Edit3, Send, Sparkles, RefreshCw } from 'lucide-react';
import { GRAMMAR_TOPICS } from '../data/grammarTopics';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';

export default function GrammarLessonsView() {
  const [selectedTopic, setSelectedTopic] = useState(GRAMMAR_TOPICS[0]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // AI Writing Checker State
  const [essayText, setEssayText] = useState('');
  const [isCheckingEssay, setIsCheckingEssay] = useState(false);
  const [essayResult, setEssayResult] = useState(null);

  const handleSelectQuiz = (idx) => {
    if (quizSubmitted) return;
    setQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === selectedTopic.quiz.correctIndex) {
      storageService.addXP(25);
    }
  };

  const handleCheckWriting = async () => {
    if (!essayText.trim()) return;
    setIsCheckingEssay(true);
    try {
      const result = await aiService.checkWriting(essayText, 'general');
      setEssayResult(result);
      storageService.addXP(35);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingEssay(false);
    }
  };

  return (
    <div className="grammar-view">
      <div className="grammar-header">
        <h2>📚 Grammatika & AI Writing Checker</h2>
        <p>Qoidalarni o'zbek tilida oson tushuning va insholaringizni AI orqali tekshirtiring.</p>
      </div>

      <div className="grammar-layout">
        {/* Sidebar Topics */}
        <aside className="grammar-sidebar">
          <h3>Mavzular To'plami</h3>
          <div className="grammar-topics-nav">
            {GRAMMAR_TOPICS.map(topic => (
              <button
                key={topic.id}
                className={`gt-nav-item ${selectedTopic.id === topic.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTopic(topic);
                  setQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
              >
                <span className="gt-title">{topic.title}</span>
                <span className="gt-level">{topic.level}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="grammar-main-content">
          {/* Active Topic Details */}
          <div className="grammar-topic-card">
            <div className="gt-card-top">
              <h2>{selectedTopic.title}</h2>
              <span className="gt-badge">{selectedTopic.level}</span>
            </div>

            <p className="gt-summary">{selectedTopic.summaryUz}</p>

            <div className="gt-formula-box">
              <span className="formula-lbl">Formulasi:</span>
              <code>{selectedTopic.formula}</code>
            </div>

            <div className="gt-examples-box">
              <h4>Mavzuga oid namunaviy gaplar:</h4>
              <div className="examples-list">
                {selectedTopic.examples.map((ex, i) => (
                  <div key={i} className="ex-item">
                    <span className="ex-en">"{ex.en}"</span>
                    <span className="ex-uz">— {ex.uz}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Pitfall */}
            <div className="gt-pitfall-box">
              <h4>⚠️ Ko'p qilinadigan xato va uning to'g'rilanishi:</h4>
              <div className="pitfall-row">
                <span className="pf-wrong">❌ {selectedTopic.commonMistake.incorrect}</span>
                <span className="pf-right">✅ {selectedTopic.commonMistake.correct}</span>
              </div>
              <p className="pf-reason">💡 {selectedTopic.commonMistake.reason}</p>
            </div>

            {/* Topic Quiz */}
            <div className="gt-quiz-box">
              <h4>🎯 Mavzuni mustahkamlash uchun mini-test:</h4>
              <p className="quiz-q">{selectedTopic.quiz.question}</p>
              <div className="quiz-options">
                {selectedTopic.quiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`quiz-opt-btn ${
                      quizSubmitted 
                        ? (idx === selectedTopic.quiz.correctIndex ? 'correct-opt' : (quizAnswer === idx ? 'wrong-opt' : ''))
                        : (quizAnswer === idx ? 'selected-opt' : '')
                    }`}
                    onClick={() => handleSelectQuiz(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {quizSubmitted && (
                <div className={`quiz-feedback-msg ${quizAnswer === selectedTopic.quiz.correctIndex ? 'success' : 'alert'}`}>
                  {quizAnswer === selectedTopic.quiz.correctIndex ? (
                    <p>🎉 Barakalla! To'g'ri javob (+25 XP).</p>
                  ) : (
                    <p>💡 To'g'ri variant: <strong>"{selectedTopic.quiz.options[selectedTopic.quiz.correctIndex]}"</strong></p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* AI Writing & Essay Checker Section */}
          <div className="ai-writing-card">
            <div className="awc-header">
              <div className="awc-title-row">
                <Edit3 size={20} className="gold" />
                <h3>✍️ AI Writing & Insho Tekshiruvchisi</h3>
              </div>
              <span className="awc-desc">Ixtiyoriy inglizcha gap yoki insho yozing, AI uni tahlil qiladi.</span>
            </div>

            <textarea
              className="writing-textarea"
              placeholder="Masalan: In modern society, education is very important because it helps people to get good job..."
              rows={4}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
            />

            <div className="writing-actions-bar">
              <span className="word-count">
                So'zlar soni: {essayText.trim().split(/\s+/).filter(Boolean).length}
              </span>
              <button 
                className="check-writing-btn" 
                onClick={handleCheckWriting}
                disabled={isCheckingEssay || !essayText.trim()}
              >
                {isCheckingEssay ? <RefreshCw size={16} className="spin-icon" /> : <Sparkles size={16} />}
                <span>AI Tekshirsin</span>
              </button>
            </div>

            {/* Results */}
            {essayResult && (
              <div className="writing-feedback-card">
                <div className="wfc-top-score">
                  <div className="band-box">
                    <span className="band-num">{essayResult.estimatedBand}</span>
                    <span className="band-lbl">Taxminiy Band</span>
                  </div>
                  <div className="wfc-breakdown">
                    <div className="bd-item">
                      <span>Task Response:</span>
                      <strong>{essayResult.breakdown.taskResponse}</strong>
                    </div>
                    <div className="bd-item">
                      <span>Coherence:</span>
                      <strong>{essayResult.breakdown.coherenceCohesion}</strong>
                    </div>
                    <div className="bd-item">
                      <span>Lexical:</span>
                      <strong>{essayResult.breakdown.lexicalResource}</strong>
                    </div>
                    <div className="bd-item">
                      <span>Grammar:</span>
                      <strong>{essayResult.breakdown.grammaticalRange}</strong>
                    </div>
                  </div>
                </div>

                <div className="wfc-lists">
                  <div className="wfc-list-box green-box">
                    <h5>✅ Kuchli jihatlar:</h5>
                    <ul>
                      {essayResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="wfc-list-box yellow-box">
                    <h5>💡 Yaxshilash bo'yicha maslahatlar:</h5>
                    <ul>
                      {essayResult.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
