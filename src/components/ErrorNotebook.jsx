import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Trash2, RefreshCw, BookOpen } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function ErrorNotebook() {
  const [mistakes, setMistakes] = useState(storageService.getMistakes());

  const handleClear = () => {
    localStorage.removeItem('ema_error_notebook');
    setMistakes([]);
  };

  return (
    <div className="error-notebook-view">
      <div className="en-header">
        <div>
          <h2>📓 Xatolar Daftarchasi (Error Notebook)</h2>
          <p>
            AI Ustoz bilan suhbatda va testlarda yo'l qo'ygan xatolaringiz avtomatik saqlanadi. Shu orqali kamchiliklaringizni tezda bartaraf etasiz.
          </p>
        </div>
        {mistakes.length > 0 && (
          <button className="outline-btn danger-hover" onClick={handleClear}>
            <Trash2 size={16} />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {mistakes.length === 0 ? (
        <div className="empty-state-card">
          <CheckCircle size={48} className="green" />
          <h3>Hozircha xatolar yo'q!</h3>
          <p>Darslarni va AI bilan suhbatni davom ettiring, agar xatolik yuz bersa, bu yerda saqlanadi.</p>
        </div>
      ) : (
        <div className="mistakes-grid">
          {mistakes.map((m) => (
            <div key={m.id} className="mistake-card">
              <div className="mc-top">
                <span className="mc-topic">{m.topic || 'Grammatika'}</span>
                <span className="mc-date">{m.date || 'Bugun'}</span>
              </div>

              <div className="mc-comparison">
                <div className="mc-wrong-box">
                  <span className="mc-lbl wrong">❌ Siz yozgan noto'g'ri variant:</span>
                  <p className="mc-text">{m.incorrect}</p>
                </div>

                <div className="mc-correct-box">
                  <span className="mc-lbl right">✅ To'g'ri variant:</span>
                  <p className="mc-text">{m.correct}</p>
                </div>
              </div>

              <div className="mc-rule-box">
                💡 <strong>Sababi & Qoida:</strong> {m.ruleUz}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
