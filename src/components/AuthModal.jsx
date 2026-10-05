import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError("Email va parolni kiriting!");
      return;
    }

    if (isRegister && !name) {
      setError("Ismingizni kiriting!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user = {
        id: 'usr_' + Date.now(),
        name: isRegister ? name : (email.split('@')[0] || 'O\'quvchi'),
        email,
        phone: isRegister ? phone : '+998 90 123 45 67',
        level: 'Beginner (0)',
        targetLevel: 'IELTS 9.0',
        avatar: '👨‍🎓',
        joinDate: new Date().toISOString().split('T')[0]
      };

      storageService.saveUser(user);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box auth-modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isRegister ? "Ro'yxatdan O'tish" : "Tizimga Kirish"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="auth-tab-switch">
          <button 
            className={`tab-switch-btn ${!isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(false); setError(''); }}
          >
            Kirish
          </button>
          <button 
            className={`tab-switch-btn ${isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(true); setError(''); }}
          >
            Yangi Hisob Ochish
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error-box">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {isRegister && (
            <div className="form-group">
              <label>To'liq Ismingiz:</label>
              <div className="input-with-icon">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="Masalan: Ali Valiyev" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Manzilingiz:</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="ali@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Parol:</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Telefon raqam (SMS eslatmalar uchun):</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input 
                  type="text" 
                  placeholder="+998 90 123 45 67" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          <button className="primary-btn auth-submit-btn" type="submit" disabled={loading}>
            <span>{loading ? "Tekshirilmoqda..." : (isRegister ? "Hisob Ochish" : "Tizimga Kirish")}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
