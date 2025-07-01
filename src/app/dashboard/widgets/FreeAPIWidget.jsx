'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FreeAPIWidget() {
  const [ipInfo, setIpInfo] = useState(null);
  const [facts, setFacts] = useState([]);
  const [catFact, setCatFact] = useState('');
  const [quote, setQuote] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFreeAPIs();
  }, []);

  const loadFreeAPIs = async () => {
    try {
      // 1. Informations IP de l'utilisateur (gratuit)
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;
      
      // Informations géographiques de l'IP
      const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
      setIpInfo(geoResponse.data);

      // 2. Citation du jour (gratuit)
      const quoteResponse = await axios.get('https://api.quotable.io/random');
      setQuote(quoteResponse.data);

      // 3. Fait amusant sur les chats (gratuit)
      const catResponse = await axios.get('https://catfact.ninja/fact');
      setCatFact(catResponse.data.fact);

      // 4. Utilisateurs test (JSONPlaceholder - gratuit)
      const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=3');
      setUsers(usersResponse.data);

      // 5. Faits intéressants (NumbersAPI - gratuit)
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      const factResponse = await axios.get(`http://numbersapi.com/${dayOfYear}/date`);
      setFacts([factResponse.data]);

    } catch (error) {
      console.error('Erreur API gratuite:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = () => {
    return new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="free-api-widget">
        <div className="widget-header">
          <h3 className="widget-title">🌐 APIs Gratuites en Temps Réel</h3>
        </div>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Chargement depuis les APIs gratuites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="free-api-widget">
      <div className="widget-header">
        <h3 className="widget-title">🌐 Données Réelles & Gratuites</h3>
        <button onClick={loadFreeAPIs} className="refresh-btn">
          🔄
        </button>
      </div>

      <div className="free-api-content">
        {/* Horloge temps réel */}
        <div className="real-time-clock">
          <h4>🕐 Maintenant</h4>
          <div className="clock-display">
            {formatDateTime()}
          </div>
        </div>

        {/* Informations de localisation */}
        {ipInfo && (
          <div className="location-info">
            <h4>📍 Votre Localisation</h4>
            <div className="location-details">
              <p><strong>Ville:</strong> {ipInfo.city}</p>
              <p><strong>Région:</strong> {ipInfo.regionName}</p>
              <p><strong>Pays:</strong> {ipInfo.country}</p>
              <p><strong>Fuseau:</strong> {ipInfo.timezone}</p>
              <p><strong>FAI:</strong> {ipInfo.isp}</p>
              <p><strong>IP:</strong> {ipInfo.query}</p>
            </div>
          </div>
        )}

        {/* Citation du jour */}
        {quote && (
          <div className="daily-quote">
            <h4>💭 Citation du Jour</h4>
            <blockquote>
              "{quote.content}"
              <footer>— {quote.author}</footer>
            </blockquote>
          </div>
        )}

        {/* Fait amusant */}
        {catFact && (
          <div className="fun-fact">
            <h4>🐱 Le Saviez-vous ?</h4>
            <p>{catFact}</p>
          </div>
        )}

        {/* Faits historiques */}
        {facts.length > 0 && (
          <div className="historical-facts">
            <h4>📚 Fait Historique</h4>
            {facts.map((fact, index) => (
              <p key={index}>{fact}</p>
            ))}
          </div>
        )}

        {/* Utilisateurs simulés */}
        <div className="demo-users">
          <h4>👥 Utilisateurs Actifs (Demo)</h4>
          <div className="users-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-avatar">
                  {user.name.charAt(0)}
                </div>
                <div className="user-info">
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                  <small>{user.company.name}</small>
                </div>
                <div className="user-status online"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques temps réel */}
        <div className="real-stats">
          <h4>📊 Stats Temps Réel</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{Math.floor(Date.now() / 1000)}</span>
              <span className="stat-label">Timestamp Unix</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{new Date().getDay()}</span>
              <span className="stat-label">Jour de la semaine</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{new Date().getDate()}</span>
              <span className="stat-label">Jour du mois</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{Math.floor((Date.now() % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))}</span>
              <span className="stat-label">Heure UTC</span>
            </div>
          </div>
        </div>

        {/* APIs utilisées */}
        <div className="api-sources">
          <h4>🔗 APIs Gratuites Utilisées</h4>
          <ul className="api-list">
            <li>🌍 <strong>IP-API:</strong> Géolocalisation par IP</li>
            <li>💬 <strong>Quotable:</strong> Citations inspirantes</li>
            <li>🐱 <strong>Cat Facts:</strong> Faits amusants</li>
            <li>👤 <strong>JSONPlaceholder:</strong> Données test</li>
            <li>📊 <strong>Numbers API:</strong> Faits historiques</li>
            <li>⏰ <strong>JavaScript Date:</strong> Horloge temps réel</li>
          </ul>
          <p className="api-note">
            ✅ Toutes ces APIs sont <strong>100% gratuites</strong> et ne nécessitent aucune clé !
          </p>
        </div>
      </div>
    </div>
  );
}
