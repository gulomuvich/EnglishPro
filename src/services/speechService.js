// Speech Service: Text-to-Speech (Male Voice, Speeds) and Speech-to-Text (Microphone)

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.selectedVoice = null;
    this.isListening = false;
    this.currentRate = 0.95; // Default normal
    this.lastSpokenText = '';
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;

    const findMaleVoice = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      // English male voice preference
      const maleVoice = voices.find(v => 
        (v.lang.startsWith('en-') || v.lang === 'en') &&
        (v.name.toLowerCase().includes('david') ||
         v.name.toLowerCase().includes('george') ||
         v.name.toLowerCase().includes('daniel') ||
         v.name.toLowerCase().includes('male') ||
         v.name.toLowerCase().includes('guy') ||
         v.name.toLowerCase().includes('james'))
      ) || voices.find(v => v.lang.startsWith('en-US')) || voices[0];

      this.selectedVoice = maleVoice;
    };

    findMaleVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findMaleVoice;
    }
  }

  setRate(rate) {
    this.currentRate = rate;
  }

  speak(text, onEndCallback, customRate = null) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any active utterance

    this.lastSpokenText = text;
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    
    // Male tutor tuning: deep pitch
    utterance.pitch = 0.88; 
    utterance.rate = customRate || this.currentRate;
    utterance.lang = 'en-US';

    if (onEndCallback) {
      utterance.onend = onEndCallback;
      utterance.onerror = onEndCallback;
    }

    this.synth.speak(utterance);
  }

  repeatLast() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  startListening(onResultCallback, onErrorCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onErrorCallback) onErrorCallback("Brauzeringiz ovozli tanib olishni qo'llab-quvvatlamaydi (Google Chrome yoki Edge tavsiya etiladi).");
      return null;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResultCallback) onResultCallback(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (onErrorCallback) onErrorCallback(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
      this.isListening = true;
      return this.recognition;
    } catch (e) {
      if (onErrorCallback) onErrorCallback(e.message);
      return null;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
