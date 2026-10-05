import React, { useState, useEffect } from 'react';
import { Shield, Users, Video, BookOpen, Bot, Bell, Activity, RefreshCw } from 'lucide-react';

export default function AdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 1421,
    totalLessonsCompleted: 8740,
    activeStreaks: 935,
    ieltsSimulationsTaken: 2130,
    aiConversations: 15400,
    systemStatus: 'Healthy (PostgreSQL & AI Engine Online)'
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-view">
      <div className="admin-header">
        <div className="admin-title-row">
          <Shield size={28} className="gold" />
          <div>
            <h2>Boshqaruv Paneli (Admin Console)</h2>
            <p>Platforma foydalanuvchilari, o'quv kontenti, AI so'rovlari va SMS eslatmalari monitoringi.</p>
          </div>
        </div>
        <span className="admin-badge">Super Admin Access</span>
      </div>

      {/* Stats Cards */}
      <div className="admin-metrics-grid">
        <div className="admin-stat-card">
          <Users size={22} className="card-icon" style={{ color: '#4F46E5' }} />
          <div className="asc-content">
            <span className="asc-val">{stats.totalUsers.toLocaleString()}</span>
            <span className="asc-lbl">Jami O'quvchilar</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <Video size={22} className="card-icon" style={{ color: '#0EA5E9' }} />
          <div className="asc-content">
            <span className="asc-val">{stats.totalLessonsCompleted.toLocaleString()}</span>
            <span className="asc-lbl">Tugatilgan Video Darslar</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <Bot size={22} className="card-icon" style={{ color: '#10B981' }} />
          <div className="asc-content">
            <span className="asc-val">{stats.aiConversations.toLocaleString()}</span>
            <span className="asc-lbl">AI Ustoz Suhbatlari</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <Activity size={22} className="card-icon" style={{ color: '#F59E0B' }} />
          <div className="asc-content">
            <span className="asc-val">{stats.ieltsSimulationsTaken.toLocaleString()}</span>
            <span className="asc-lbl">IELTS Mock Testlar</span>
          </div>
        </div>
      </div>

      {/* Admin Table Preview */}
      <div className="admin-table-card">
        <div className="atc-header">
          <h3>So'nggi Ro'yxatdan O'tgan Foydalanuvchilar</h3>
          <span className="atc-sub">Real-vaqt sinxronizatsiyasi</span>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ism / Foydalanuvchi</th>
                <th>Telefon</th>
                <th>Hozirgi Daraja</th>
                <th>IELTS Maqsadi</th>
                <th>Streak</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ali Valiyev</strong><br /><small>ali@example.com</small></td>
                <td>+998 90 123 45 67</td>
                <td><span className="pill green">A1</span></td>
                <td>IELTS 9.0</td>
                <td>🔥 7 kun</td>
                <td><span className="status-online">Faol</span></td>
              </tr>
              <tr>
                <td><strong>Zilola Karimova</strong><br /><small>zilola@example.com</small></td>
                <td>+998 93 456 78 90</td>
                <td><span className="pill blue">B2</span></td>
                <td>IELTS 8.0</td>
                <td>🔥 14 kun</td>
                <td><span className="status-online">Faol</span></td>
              </tr>
              <tr>
                <td><strong>Jasur Bekmurodov</strong><br /><small>jasur@example.com</small></td>
                <td>+998 97 789 01 23</td>
                <td><span className="pill gray">0 / Beginner</span></td>
                <td>IELTS 7.0</td>
                <td>🔥 3 kun</td>
                <td><span className="status-online">Faol</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
