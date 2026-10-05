import React, { useState } from 'react';
import { ArrowLeftRight, Volume2, Sparkles, Copy, Check } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function SmartTranslator() {
  const [sourceText, setSourceText] = useState('');
  const [direction, setDirection] = useState('uz_en'); // 'uz_en' or 'en_uz'
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) return;

    const lower = sourceText.toLowerCase().trim();
    let translated = "";
    let ipa = "/- /";
    let exampleEn = "";
    let grammarNote = "";

    if (direction === 'uz_en') {
      if (lower.includes("salom")) {
        translated = "Hello / Greetings";
        ipa = "/həˈləʊ/";
        exampleEn = "Hello, it is wonderful to meet you.";
        grammarNote = "Formal va informal kontekstda birdek qo'llaniladi.";
      } else if (lower.includes("kitob")) {
        translated = "Book";
        ipa = "/bʊk/";
        exampleEn = "I am currently reading an insightful book.";
        grammarNote = "Ot so'z turkumi, ko'pligi 'books'.";
      } else if (lower.includes("muhim")) {
        translated = "Crucial / Essential";
        ipa = "/ˈkruː.ʃəl/";
        exampleEn = "Patience is a crucial factor in achieving fluency.";
        grammarNote = "Sifat darajasida 'more crucial', 'most crucial'.";
      } else {
        translated = `Translated: "${sourceText}"`;
        ipa = "/trænzˈleɪtɪd/";
        exampleEn = `"${sourceText}" can be integrated into academic writing.`;
        grammarNote = "So'z birikmalari kontekstga qarab o'zgarishi mumkin.";
      }
    } else {
      if (lower.includes("resilient")) {
        translated = "Matonatli, chidamli";
        ipa = "/rɪˈzɪl.jənt/";
        exampleEn = "Resilient people overcome adversity.";
        grammarNote = "Sifat: qiyinchiliklarga bardosh bera oladigan shaxsga nisbatan qo'llaniladi.";
      } else {
        translated = `O'zbekcha ma'nosi: "${sourceText}"`;
        ipa = "/- /";
        exampleEn = `Inglizcha matn: "${sourceText}"`;
        grammarNote = "Kontekstual tarjima.";
      }
    }

    setResult({
      translated,
      ipa,
      exampleEn,
      grammarNote
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.translated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="translator-view">
      <div className="translator-header">
        <h2>🌐 Aqlli Kontekstual Tarjimon (AI Smart Translator)</h2>
        <p>Oddiy tarjimondan farqli ravishda, bu yerda so'zning IPA transkripsiyasi, misol va grammatik izohlari ham beriladi.</p>
      </div>

      <div className="translator-card">
        {/* Direction Switcher */}
        <div className="trans-direction-bar">
          <span className="lang-label">{direction === 'uz_en' ? "O'zbekcha" : "Inglizcha"}</span>
          <button 
            className="trans-switch-btn"
            onClick={() => {
              setDirection(direction === 'uz_en' ? 'en_uz' : 'uz_en');
              setResult(null);
            }}
          >
            <ArrowLeftRight size={18} />
          </button>
          <span className="lang-label">{direction === 'uz_en' ? "Inglizcha" : "O'zbekcha"}</span>
        </div>

        <div className="trans-input-row">
          <textarea
            className="trans-textarea"
            placeholder={direction === 'uz_en' ? "O'zbekcha so'z yoki gap yozing..." : "Type English text here..."}
            rows={4}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </div>

        <div className="trans-actions">
          <button className="primary-btn" onClick={handleTranslate}>
            <Sparkles size={16} />
            <span>Tarjima Qilish</span>
          </button>
        </div>

        {/* Translation Output */}
        {result && (
          <div className="trans-result-pane">
            <div className="trp-header">
              <span className="trp-title">Natija:</span>
              <div className="trp-actions">
                <button 
                  className="icon-action-btn"
                  onClick={() => speechService.speak(result.translated)}
                  title="Erkak AI ovozida eshitish"
                >
                  <Volume2 size={18} />
                </button>
                <button className="icon-action-btn" onClick={handleCopy} title="Nusxa olish">
                  {copied ? <Check size={18} className="green" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <h3 className="trp-main-text">{result.translated}</h3>
            <span className="trp-ipa">{result.ipa}</span>

            <div className="trp-extra-box">
              <div className="trp-ex">
                <strong>Namunaviy gap:</strong>
                <p>"{result.exampleEn}"</p>
              </div>
              <div className="trp-gn">
                <strong>Grammatik qoida:</strong>
                <p>💡 {result.grammarNote}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
