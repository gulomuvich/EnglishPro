import React, { useState } from 'react';
import { Play, CheckCircle, Award, BookOpen, FileText, ChevronRight, HelpCircle } from 'lucide-react';
import { VIDEO_LESSONS } from '../data/videoLessonsData';
import { storageService } from '../services/storageService';

export default function VideoLessonsView() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_LESSONS[0]);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'quiz', 'transcript'
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuiz = (idx) => {
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === selectedVideo.quizCorrect) {
      storageService.addXP(30);
      storageService.markLessonComplete(selectedVideo.id);
    }
  };

  return (
    <div className="video-lessons-view">
      <div className="vlv-header">
        <h2>🎬 Video Darsliklar & Amaliyot</h2>
        <p>0 dan IELTS 9.0 gacha professional video darslar, konspektlar va darsdan keyingi testlar.</p>
      </div>

      <div className="vlv-grid-layout">
        {/* Main Video Player & Tabs */}
        <div className="vlv-player-column">
          <div className="video-embed-container">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="vlv-video-title-row">
            <div>
              <h3>{selectedVideo.title}</h3>
              <p className="vlv-instructor">Ustoz / Manba: {selectedVideo.instructor}</p>
            </div>
            <span className="vlv-level-badge">{selectedVideo.level}</span>
          </div>

          {/* Under-video Navigation Tabs */}
          <div className="vlv-tab-headers">
            <button 
              className={`vlv-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <BookOpen size={16} />
              <span>Dars Konspekti & Lug'at</span>
            </button>
            <button 
              className={`vlv-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <HelpCircle size={16} />
              <span>Dars Yuzasidan Test</span>
            </button>
            <button 
              className={`vlv-tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
              onClick={() => setActiveTab('transcript')}
            >
              <FileText size={16} />
              <span>Transkript</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="vlv-tab-body">
            {activeTab === 'notes' && (
              <div className="notes-pane">
                <p className="vlv-desc-uz">{selectedVideo.descriptionUz}</p>
                <div className="key-vocab-box">
                  <h4>📌 Darsda ishlatilgan asosiy so'zlar:</h4>
                  <div className="vocab-chips-list">
                    {selectedVideo.keyVocabulary.map((kv, i) => (
                      <div key={i} className="kv-chip">
                        <strong>{kv.word}</strong>
                        <span>— {kv.uz}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-pane">
                <h4>🎯 Test: Videodarsni qanchalik tushundingiz?</h4>
                <p className="quiz-prompt">{selectedVideo.quizQuestion}</p>
                <div className="quiz-answers-list">
                  {selectedVideo.quizOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`quiz-answer-btn ${
                        quizSubmitted 
                          ? (idx === selectedVideo.quizCorrect ? 'correct' : (selectedQuizAnswer === idx ? 'wrong' : ''))
                          : (selectedQuizAnswer === idx ? 'chosen' : '')
                      }`}
                      onClick={() => handleSelectQuiz(idx)}
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <div className={`quiz-feedback-box ${selectedQuizAnswer === selectedVideo.quizCorrect ? 'success' : 'alert'}`}>
                    {selectedQuizAnswer === selectedVideo.quizCorrect ? (
                      <p>🎉 <strong>Barakalla!</strong> Dars to'liq o'zlashtirildi (+30 XP).</p>
                    ) : (
                      <p>💡 To'g'ri javob: <strong>"{selectedVideo.quizOptions[selectedVideo.quizCorrect]}"</strong></p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="transcript-pane">
                <h4>📝 Subtitr va Transkript:</h4>
                <p className="transcript-text">{selectedVideo.transcriptPreview}</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <aside className="vlv-playlist-column">
          <div className="playlist-card">
            <div className="playlist-header">
              <h4>Barcha Darslar Ro'yxati</h4>
              <span className="playlist-count">{VIDEO_LESSONS.length} ta dars</span>
            </div>

            <div className="playlist-items-list">
              {VIDEO_LESSONS.map((vid, idx) => (
                <div 
                  key={vid.id} 
                  className={`playlist-item ${selectedVideo.id === vid.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedVideo(vid);
                    setSelectedQuizAnswer(null);
                    setQuizSubmitted(false);
                  }}
                >
                  <div className="pi-number">{idx + 1}</div>
                  <div className="pi-info">
                    <span className="pi-title">{vid.title}</span>
                    <span className="pi-duration">⏱️ {vid.duration} • {vid.level}</span>
                  </div>
                  <Play size={16} className="pi-play-icon" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
