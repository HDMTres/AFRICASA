'use client';
import React, { useState, useEffect } from 'react';

export default function MarketTrendsWidget() {
  const [selectedRegion, setSelectedRegion] = useState('douala');
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [trends, setTrends] = useState(null);

  // Données de tendances du marché (simulées)
  const marketData = {
    douala: {
      name: 'Douala',
      currentPrice: 850000,
      change: '+5.2%',
      changeValue: 42000,
      trend: 'up',
      properties: 1250,
      avgDays: 45,
      demand: 'high',
      forecast: '+3.8%',
      neighborhoods: [
        { name: 'Bonapriso', price: 1200000, change: '+6.1%' },
        { name: 'Akwa', price: 950000, change: '+4.8%' },
        { name: 'Deido', price: 700000, change: '+5.9%' },
        { name: 'New Bell', price: 650000, change: '+3.2%' }
      ]
    },
    yaounde: {
      name: 'Yaoundé',
      currentPrice: 780000,
      change: '+3.8%',
      changeValue: 28500,
      trend: 'up',
      properties: 980,
      avgDays: 52,
      demand: 'medium',
      forecast: '+2.5%',
      neighborhoods: [
        { name: 'Bastos', price: 1100000, change: '+4.2%' },
        { name: 'Nlongkak', price: 850000, change: '+3.1%' },
        { name: 'Essos', price: 650000, change: '+4.5%' },
        { name: 'Mvan', price: 580000, change: '+2.8%' }
      ]
    },
    bafoussam: {
      name: 'Bafoussam',
      currentPrice: 420000,
      change: '+2.1%',
      changeValue: 8500,
      trend: 'stable',
      properties: 350,
      avgDays: 68,
      demand: 'low',
      forecast: '+1.8%',
      neighborhoods: [
        { name: 'Centre-ville', price: 480000, change: '+2.5%' },
        { name: 'Tamdja', price: 380000, change: '+1.8%' },
        { name: 'Famla', price: 350000, change: '+2.2%' },
        { name: 'Djeleng', price: 320000, change: '+1.5%' }
      ]
    }
  };

  useEffect(() => {
    setTrends(marketData[selectedRegion]);
  }, [selectedRegion]);

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'high': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'low': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDemandText = (demand) => {
    switch (demand) {
      case 'high': return 'Forte';
      case 'medium': return 'Modérée';
      case 'low': return 'Faible';
      default: return 'Inconnue';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '📊';
      default: return '📊';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!trends) {
    return (
      <div className="market-trends-widget loading">
        <h3 className="widget-title">📊 Tendances du Marché</h3>
        <div className="loading-content">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="market-trends-widget">
      <div className="trends-header">
        <h3 className="widget-title">📊 Tendances du Marché</h3>
        <div className="trends-controls">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="region-select"
          >
            <option value="douala">Douala</option>
            <option value="yaounde">Yaoundé</option>
            <option value="bafoussam">Bafoussam</option>
          </select>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="1m">1 mois</option>
            <option value="3m">3 mois</option>
            <option value="6m">6 mois</option>
            <option value="1y">1 an</option>
          </select>
        </div>
      </div>

      <div className="trends-content">
        <div className="main-stats">
          <div className="price-stat">
            <h4>Prix moyen</h4>
            <div className="price-value">
              <span className="current-price">{formatPrice(trends.currentPrice)}</span>
              <span className={`price-change ${trends.trend}`}>
                {getTrendIcon(trends.trend)} {trends.change}
              </span>
            </div>
            <small>+{formatPrice(trends.changeValue)} ce mois</small>
          </div>

          <div className="market-stats">
            <div className="stat-item">
              <span className="stat-icon">🏠</span>
              <div className="stat-info">
                <strong>{trends.properties}</strong>
                <small>Propriétés actives</small>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <div className="stat-info">
                <strong>{trends.avgDays} jours</strong>
                <small>Temps de vente moyen</small>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <div className="stat-info">
                <strong 
                  style={{ color: getDemandColor(trends.demand) }}
                >
                  {getDemandText(trends.demand)}
                </strong>
                <small>Demande</small>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">🔮</span>
              <div className="stat-info">
                <strong>{trends.forecast}</strong>
                <small>Prévision 3 mois</small>
              </div>
            </div>
          </div>
        </div>

        <div className="neighborhoods-section">
          <h4>🏘️ Par Quartier</h4>
          <div className="neighborhoods-list">
            {trends.neighborhoods.map((neighborhood, index) => (
              <div key={index} className="neighborhood-item">
                <div className="neighborhood-info">
                  <h5>{neighborhood.name}</h5>
                  <span className="neighborhood-price">
                    {formatPrice(neighborhood.price)}
                  </span>
                </div>
                <span className={`neighborhood-change ${neighborhood.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {neighborhood.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="market-insights">
          <h4>💡 Insights</h4>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-icon">🔥</span>
              <p>Les quartiers centraux montrent une forte croissance</p>
            </div>
            <div className="insight-item">
              <span className="insight-icon">📈</span>
              <p>Augmentation de 15% des visites ce mois</p>
            </div>
            <div className="insight-item">
              <span className="insight-icon">⚡</span>
              <p>Meilleur moment pour vendre dans cette région</p>
            </div>
          </div>
        </div>

        <div className="market-actions">
          <button className="action-btn primary">
            📊 Rapport détaillé
          </button>
          <button className="action-btn secondary">
            🎯 Analyser ma propriété
          </button>
        </div>
      </div>
    </div>
  );
}
