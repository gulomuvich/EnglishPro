import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Mic, Send, Volume2, VolumeX, Globe, Trash2, 
  Sparkles, CheckCircle2, AlertCircle, RefreshCw, Play, Pause, RotateCcw 
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';

const SPEAKING_ROOMS = [
  { id: 'daily', label: '☕ Kundalik Suhbat (Daily Conversation)', prompt: "Let's talk about your typical day and morning habits." },
  { id: 'travel', label: '✈️ Sayohat (Travel English)', prompt: "Imagine you are checking in at an international airport. Tell me your destination." },
  { id: 'interview', label: '💼 Ish Suhbat (Job Interview)', prompt: "Welcome to the interview! Can you introduce yourself and describe your core strengths?" },
  { id: 'restaurant', label: '🍽 Restoran (Ordering Food)', prompt: "Good evening! Welcome to our restaurant. What would you like to order today?" },
  { id: 'shopping', label: '🛍 Xarid (Shopping & Bargaining)', prompt: "Hello! Looking for any specific clothing size or color today?" },
  { id: 'university', label: '🎓 Universitet & O\'qish', prompt: "What academic major are you most passionate about, and why?" },
  { id: 'ielts_speaking', label: '🇬🇧 IELTS Speaking Part 1 & 2', prompt: "Let's begin IELTS Speaking. Do you work or are you a student?" },
  { id: 'free', label: '💬 Erkin Muloqot (Free Chat)', prompt: "Tell me anything that is on your mind today in English!" }
];

const SPEEDS = [
  { val: 0.5, label: '0.5x (Sekin)' },
  { val: 0.75, label: '0.75x' },
  { val: 1.0, label: '1.0x (Normal)' },
  { val: 1.25, label: '1.25x (Tez)' }
];

export default function AITutorChat({ lang }) {
  const [messages, setMessages] = useState([
    {
      id: 'init_1',
      sender: 'ai',
      text: "Salom! Men Ustoz AI — sizning shaxsiy ingliz tili o'qituvchingizman. Siz bilan noldan boshlab to IELTS 9.0 gacha erkin so'zlashuv mashqlarini o'tkazamiz. Istalgan mavzuni tanlang va mikrofon orqali bevosita gapiring!",
      translation: "Hello! I am Ustoz AI — your personal English tutor. We will practice speaking freely from zero up to IELTS 9.0. Choose any topic and speak through the microphone!",
      showTranslation: false
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(SPEAKING_ROOMS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoVoiceEnabled, setAutoVoiceEnabled] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend = input) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.chat(text, selectedRoom.id);
      
      const aiMsg = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: response.reply,
        translation: response.translation,
        correction: response.correction,
        showTranslation: false
      };

      setMessages(prev => [...prev, aiMsg]);

      if (response.correction) {
        storageService.addMistake({
          incorrect: response.correction.incorrect,
          correct: response.correction.correct,
          ruleUz: response.correction.ruleUz,
          topic: selectedRoom.label
        });
      }

      storageService.addXP(30);

      if (autoVoiceEnabled) {
        setIsPlayingAudio(true);
        speechService.speak(response.reply, () => setIsPlayingAudio(false), voiceSpeed);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomChange = (room) => {
    setSelectedRoom(room);
    speechService.stopSpeaking();
    setMessages(prev => [
      ...prev,
      {
        id: 'room_notice_' + Date.now(),
        sender: 'ai',
        text: room.prompt,
        translation: "Yangi suhbat xonasi boshlandi. Savolga javob berib, muloqotni boshlang!",
        showTranslation: false
      }
    ]);
    if (autoVoiceEnabled) {
      speechService.speak(room.prompt, null, voiceSpeed);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      speechService.startListening(
        (recognized) => {
          setIsRecording(false);
          if (recognized) {
            handleSend(recognized);
          }
        },
        (error) => {
          setIsRecording(false);
          console.warn(error);
        }
      );
    }
  };

  const toggleTranslation = (msgId) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, showTranslation: !m.showTranslation } : m));
  };

  const clearChat = () => {
    speechService.stopSpeaking();
    setMessages([
      {
        id: 'init_reset',
        sender: 'ai',
        text: "Suhbat tozalandi. Qaysi mavzuda gaplashamiz?",
        translation: "Chat cleared. What topic shall we explore now?",
        showTranslation: false
      }
    ]);
  };

  return (
    <div className="ai-chat-view">
      {/* Top Header & Voice Controls Bar */}
      <div className="chat-top-bar">
        <div className="tutor-profile-info">
          <div className="tutor-avatar-ring">
            <Bot size={24} className="tutor-bot-icon" />
            <span className="online-indicator"></span>
          </div>
          <div>
            <div className="tutor-title-row">
              <h3>Ustoz AI (Mr. John)</h3>
              <span className="voice-tag">🔊 Erkak AI Ovozi</span>
            </div>
            <p className="tutor-sub">Do'stona va sabrli • Xatolarni o'zbekcha tushuntiradi</p>
          </div>
        </div>

        {/* Audio Rate & Action Controls */}
        <div className="chat-actions-group">
          <div className="voice-speed-selector">
            {SPEEDS.map(s => (
              <button 
                key={s.val}
                className={`speed-pill ${voiceSpeed === s.val ? 'active' : ''}`}
                onClick={() => {
                  setVoiceSpeed(s.val);
                  speechService.setRate(s.val);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button 
            className="action-pill-btn" 
            onClick={() => speechService.repeatLast()}
            title="Oxirgi gapni qayta eshitish"
          >
            <RotateCcw size={15} />
            <span>Qaytarish</span>
          </button>

          <button 
            className={`action-pill-btn ${autoVoiceEnabled ? 'active' : ''}`}
            onClick={() => {
              setAutoVoiceEnabled(!autoVoiceEnabled);
              if (autoVoiceEnabled) speechService.stopSpeaking();
            }}
          >
            {autoVoiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{autoVoiceEnabled ? 'Ovoz: ON' : 'Ovoz: OFF'}</span>
          </button>

          <button className="action-pill-btn" onClick={clearChat} title="Suhbatni tozalash">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Dedicated Speaking Rooms Navigation */}
      <div className="chat-modes-row">
        {SPEAKING_ROOMS.map(room => (
          <button 
            key={room.id}
            className={`mode-chip ${selectedRoom.id === room.id ? 'active' : ''}`}
            onClick={() => handleRoomChange(room)}
          >
            <span>{room.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="chat-messages-scroll">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-align' : 'ai-align'}`}>
            {msg.sender === 'ai' && (
              <div className="message-sender-avatar">
                <Bot size={18} />
              </div>
            )}

            <div className="message-card">
              <div className="message-content-text">
                {msg.showTranslation && msg.translation ? msg.translation : msg.text}
              </div>

              {/* Grammar Analysis Banner */}
              {msg.correction && (
                <div className="chat-correction-card">
                  <div className="corr-header">
                    <AlertCircle size={16} className="corr-icon" />
                    <span>💡 Ustoz AI Grammatika Tahlili:</span>
                  </div>
                  <div className="corr-comparison">
                    <span className="corr-wrong">❌ {msg.correction.incorrect}</span>
                    <span className="corr-right">✅ {msg.correction.correct}</span>
                  </div>
                  <p className="corr-rule">Sababi: {msg.correction.ruleUz}</p>
                </div>
              )}

              {/* Card Footer / Buttons */}
              {msg.sender === 'ai' && (
                <div className="message-card-footer">
                  {msg.translation && (
                    <button 
                      className="chat-toggle-trans-btn"
                      onClick={() => toggleTranslation(msg.id)}
                    >
                      <Globe size={13} />
                      <span>{msg.showTranslation ? "Inglizcha" : "Tarjima (UZ)"}</span>
                    </button>
                  )}
                  <button 
                    className="chat-read-audio-btn" 
                    onClick={() => speechService.speak(msg.text, null, voiceSpeed)}
                    title="Ovozda eshitish"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message-row ai-align">
            <div className="message-sender-avatar">
              <Bot size={18} />
            </div>
            <div className="message-card ai-typing-box">
              <span className="dot-flashing"></span>
              <span className="dot-flashing delay1"></span>
              <span className="dot-flashing delay2"></span>
              <span className="typing-text">Ustoz AI javob bermoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <button 
          className={`mic-record-btn ${isRecording ? 'recording-active' : ''}`}
          onClick={toggleVoiceRecording}
          title={isRecording ? "Gapirishni to'xtatish" : "Mikrofon orqali gapirish"}
        >
          <Mic size={20} />
          {isRecording && <span className="mic-ripple"></span>}
        </button>

        <input 
          type="text" 
          className="chat-text-field"
          placeholder={isRecording ? "Sizni tinglamoqdaman, bemalol gapiring..." : "Inglizcha xabaringizni yozing yoki mikrofondan foydalaning..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          disabled={isLoading}
        />

        <button 
          className="send-msg-btn"
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          title="Yuborish"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
