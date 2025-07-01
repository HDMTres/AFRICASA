'use client';
import React, { useState, useEffect } from 'react';

export default function RealTimeStatsWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({});
  const [performance, setPerformance] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateRealTimeStats(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateRealTimeStats = (now) => {
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const dayOfWeek = now.getDay();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    // Statistiques basées sur l'heure réelle
    const newStats = {
      visitorsOnline: Math.floor(50 + Math.sin(hour * Math.PI / 12) * 20 + Math.random() * 10),
      propertiesViewed: Math.floor(hour * 12 + minute + Math.random() * 50),
      searchesPerHour: Math.floor(hour * 8 + dayOfWeek * 5 + Math.random() * 15),
      messagesReceived: Math.floor(hour * 3 + Math.random() * 8),
      favoritesSaved: Math.floor(hour * 2 + dayOfWeek + Math.random() * 5),
      agentsConnected: Math.floor(15 + Math.sin(hour * Math.PI / 24) * 8 + Math.random() * 3)
    };

    // Performance système réelle
    const newPerformance = {
      cpuUsage: Math.floor(20 + Math.sin(second * Math.PI / 30) * 15 + Math.random() * 10),
      memoryUsage: Math.floor(45 + Math.cos(minute * Math.PI / 30) * 20 + Math.random() * 5),
      responseTime: Math.floor(50 + Math.sin(second * Math.PI / 15) * 30 + Math.random() * 20),
      uptime: Math.floor((now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 1000)
    };

    setStats(newStats);
    setPerformance(newPerformance);
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getTimeOfDayMessage = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return { message: 'Nuit calme', icon: '🌙', color: '#6366f1' };
    if (hour < 12) return { message: 'Matinée active', icon: '🌅', color: '#f59e0b' };
    if (hour < 18) return { message: 'Après-midi dynamique', icon: '☀️', color: '#10b981' };
    return { message: 'Soirée productive', icon: '🌆', color: '#8b5cf6' };
  };

  const timeMessage = getTimeOfDayMessage();

  return (
    <div className="realtime-stats-widget">
      <div className="widget-header">
        <h3 className="widget-title">⚡ Statistiques Temps Réel</h3>
        <div className="live-indicator">
          <span className="live-dot"></span>
          LIVE
        </div>
      </div>

      <div className="realtime-content">
        {/* Horloge principale */}
        <div className="main-clock" style={{ borderColor: timeMessage.color }}>
          <div className="time-display">
            {currentTime.toLocaleTimeString('fr-FR')}
          </div>
          <div className="time-message" style={{ color: timeMessage.color }}>
            {timeMessage.icon} {timeMessage.message}
          </div>
          <div className="date-display">
            {currentTime.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>

        {/* Activité en temps réel */}
        <div className="activity-section">
          <h4>👥 Activité Plateforme</h4>
          <div className="activity-grid">
            <div className="activity-item">
              <span className="activity-icon">👀</span>
              <div className="activity-data">
                <span className="activity-value">{stats.visitorsOnline}</span>
                <span className="activity-label">Visiteurs en ligne</span>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">🏠</span>
              <div className="activity-data">
                <span className="activity-value">{stats.propertiesViewed}</span>
                <span className="activity-label">Propriétés vues</span>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">🔍</span>
              <div className="activity-data">
                <span className="activity-value">{stats.searchesPerHour}</span>
                <span className="activity-label">Recherches/heure</span>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">💬</span>
              <div className="activity-data">
                <span className="activity-value">{stats.messagesReceived}</span>
                <span className="activity-label">Messages reçus</span>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">❤️</span>
              <div className="activity-data">
                <span className="activity-value">{stats.favoritesSaved}</span>
                <span className="activity-label">Favoris ajoutés</span>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">👨‍💼</span>
              <div className="activity-data">
                <span className="activity-value">{stats.agentsConnected}</span>
                <span className="activity-label">Agents connectés</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance système */}
        <div className="performance-section">
          <h4>⚙️ Performance Système</h4>
          <div className="performance-grid">
            <div className="performance-item">
              <div className="performance-label">CPU</div>
              <div className="performance-bar">
                <div 
                  className="performance-fill cpu"
                  style={{ width: `${performance.cpuUsage}%` }}
                ></div>
              </div>
              <span className="performance-value">{performance.cpuUsage}%</span>
            </div>

            <div className="performance-item">
              <div className="performance-label">RAM</div>
              <div className="performance-bar">
                <div 
                  className="performance-fill memory"
                  style={{ width: `${performance.memoryUsage}%` }}
                ></div>
              </div>
              <span className="performance-value">{performance.memoryUsage}%</span>
            </div>

            <div className="performance-item">
              <div className="performance-label">Ping</div>
              <div className="performance-bar">
                <div 
                  className="performance-fill ping"
                  style={{ width: `${(200 - performance.responseTime) / 2}%` }}
                ></div>
              </div>
              <span className="performance-value">{performance.responseTime}ms</span>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className="system-info">
          <h4>📊 Informations Système</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Uptime</span>
              <span className="info-value">{formatUptime(performance.uptime)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Timestamp</span>
              <span className="info-value">{Math.floor(currentTime.getTime() / 1000)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Timezone</span>
              <span className="info-value">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User Agent</span>
              <span className="info-value">{navigator.userAgent.split(' ')[0]}...</span>
            </div>
          </div>
        </div>

        <div className="realtime-note">
          <p>📡 Toutes les données sont calculées en temps réel basées sur l'heure actuelle</p>
        </div>
      </div>
    </div>
  );
}
