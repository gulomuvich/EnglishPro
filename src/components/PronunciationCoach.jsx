import React, { useState } from 'react';
import { Mic, Volume2, Award, CheckCircle, AlertCircle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';

const PRACTICE_WORDS = [
  {
    word: "THOUGHT",
    ipa: "/θɔːt/",
    meaningUz: "fikr, o'yladi",
    difficultSound: "TH (/θ/) va uzun /ɔː/",
    tipUz: "TH tovushini chiqarish uchun til uchini yuqori va pastki tishlar orasiga yengil qo'yib, havo chiqaring. So'ngra tomoqdan chuqur 'O' tovushini cho'zing.",
    level: "Beginner"
  },
  {
    word: "COMFORTABLE",
    ipa: "/ˈkʌm.fər.tə.bəl/",
    meaningUz: "qulay, shinam",
    difficultSound: "Ortiqcha bo'g'insiz talaffuz",
    tipUz: "Ko'pchilik 'kom-for-teybl' deb xato aytadi. To'g'risi 3 bo'g'inda: 'kamf-tə-bəl'.",
    level: "Intermediate"
  },
  {
    word: "SCHEDULE",
    ipa: "/ˈʃedʒ.uːl/ yoki /ˈskedʒ.uːl/",
    meaningUz: "jadval, reja",
    difficultSound: "SH vs SKH birikmasi",
    tipUz: "Britaniya inglizchasida 'shed-yul', Amerika inglizchasida esa 'sked-yul' deb talaffuz qilinadi.",
    level: "Intermediate"
  },
  {
    word: "ENTREPRENEUR",
    ipa: "/ˌɒn.trə.prəˈnɜːr/",
    meaningUz: "tadbirkor",
    difficultSound: "Urg'u oxirgi bo'g'inda (/nɜːr/)",
    tipUz: "Fransuzcha ildizga ega. 'On-trə-prə-nyur' deb aytiladi va oxirgi tovush cho'ziladi.",
    level: "Advanced"
  },
  {
    word: "VULNERABLE",
    ipa: "/ˈvʌl.nər.ə.bəl/",
    meaningUz: "zaif, himoyasiz",
    difficultSound: "V va L tovushlari ketma-ketligi",
    tipUz: "V tovushida yuqori tishlar pastki labga tegadi, 'val-nə-rə-bəl'.",
    level: "Advanced"
  }
];

export default function PronunciationCoach() {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const current = PRACTICE_WORDS[selectedWordIndex];

  const handleListenExample = () => {
    speechService.speak(current.word);
  };

  const handleStartRecording = () => {
    setRecognizedText('');
    setAnalysisResult(null);
    setIsRecording(true);

    speechService.startListening(
      async (transcript) => {
        setIsRecording(false);
        setRecognizedText(transcript);
        setIsAnalyzing(true);

        const feedback = await aiService.checkPronunciation(current.word, transcript);
        setAnalysisResult(feedback);
        setIsAnalyzing(false);

        if (feedback.accuracyPercent >= 70) {
          storageService.addXP(30);
        }
      },
      (err) => {
        setIsRecording(false);
        console.warn("Recognition error:", err);
      }
    );
  };

  return (
    <div className="pronunciation-view">
      <div className="pronounce-header-card">
        <div className="phc-left">
          <h2>🎙️ Talaffuz Mashqlari (AI Pronunciation Trainer)</h2>
          <p>
            So'zlarni mikrofonga ayting va fonetik talaffuz aniqligingizni o'lchang.
          </p>
          <div className="approximate-disclaimer">
            <HelpCircle size={15} />
            <span>
              Muhim eslatma: Ushbu tahlil brauzer nutq algoritmi yordamida berilgan taxminiy fonetik baholash (approximate pronunciation assessment) hisoblanadi.
            </span>
          </div>
        </div>
      </div>

      {/* Word Selector Chips */}
      <div className="words-selector-bar">
        {PRACTICE_WORDS.map((item, idx) => (
          <button
            key={item.word}
            className={`word-select-chip ${selectedWordIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setSelectedWordIndex(idx);
              setRecognizedText('');
              setAnalysisResult(null);
            }}
          >
            <span>{item.word}</span>
            <span className="wsc-level">{item.level}</span>
          </button>
        ))}
      </div>

      {/* Main Pronunciation Card */}
      <div className="pronounce-active-card">
        <div className="pac-target-box">
          <span className="pac-lbl">Mashq Qilinayotgan So'z:</span>
          <h1 className="pac-word-title">{current.word}</h1>
          <div className="pac-ipa-row">
            <span className="pac-ipa-badge">{current.ipa}</span>
            <span className="pac-uz-trans">({current.meaningUz})</span>
            <button className="pac-listen-btn" onClick={handleListenExample} title="Namuna talaffuz">
              <Volume2 size={18} />
              <span>Namuna</span>
            </button>
          </div>
        </div>

        {/* Difficult sound tag */}
        <div className="diff-sound-tag">
          <strong>Qiyin tovush:</strong> {current.difficultSound}
        </div>

        {/* Uzbek Articulation Tip */}
        <div className="pac-tip-box">
          <span className="tip-title">💡 O'zbekcha Artikulyatsiya Qoidasi:</span>
          <p className="tip-body">{current.tipUz}</p>
        </div>

        {/* Big Record Button */}
        <div className="pac-record-container">
          <button 
            className={`big-mic-circle ${isRecording ? 'pulse-recording' : ''}`}
            onClick={isRecording ? () => speechService.stopListening() : handleStartRecording}
            disabled={isAnalyzing}
          >
            <Mic size={42} />
          </button>
          <span className="mic-status-label">
            {isRecording ? "Sizni tinglamoqdaman, talaffuz qiling..." : "Mikrofonni bosing va so'zni ayting"}
          </span>
        </div>

        {/* Feedback Display */}
        {isAnalyzing && (
          <div className="analyzing-spinner">
            <RefreshCw size={24} className="spin-icon" />
            <span>AI talaffuzingizni tahlil qilmoqda...</span>
          </div>
        )}

        {analysisResult && (
          <div className={`pronounce-result-card ${analysisResult.accuracyPercent >= 70 ? 'high-score' : 'low-score'}`}>
            <div className="prc-score-row">
              <div className="score-circle">
                <span className="score-val">{analysisResult.accuracyPercent}%</span>
                <span className="score-lbl">Aniqlik</span>
              </div>
              <div className="score-details">
                <h4>{analysisResult.accuracyPercent >= 80 ? "🎉 Ajoyib Natija!" : "💡 Yaxshi Urinish!"}</h4>
                <p>Eshitilgan so'z: <strong>"{analysisResult.recognized}"</strong></p>
                <p className="feedback-text">{analysisResult.feedbackUz}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
