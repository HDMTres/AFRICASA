'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState({ name: 'Amadou Diallo' });
  const router = useRouter();

  // Données simulées pour les statistiques
  const stats = [
    {
      title: "Propriétés Actives",
      value: "24",
      change: "+12%",
      icon: "🏠",
      color: "primary",
      bgColor: "bg-primary"
    },
    {
      title: "Revenue Total",
      value: "125M FCFA",
      change: "+18%",
      icon: "💰",
      color: "success",
      bgColor: "bg-success"
    },
    {
      title: "Visites ce mois",
      value: "1,248",
      change: "+8%",
      icon: "👁️",
      color: "info",
      bgColor: "bg-info"
    },
    {
      title: "Clients Actifs",
      value: "89",
      change: "+24%",
      icon: "👥",
      color: "warning",
      bgColor: "bg-warning"
    }
  ];

  // Données simulées pour les propriétés
  const properties = [
    {
      id: 1,
      title: "Villa Moderne Cocody",
      location: "Abidjan, Côte d'Ivoire",
      price: "75M FCFA",
      type: "Vente",
      status: "Actif",
      views: 156,
      favorites: 23,
      date: "2024-06-15",
      statusColor: "success"
    },
    {
      id: 2,
      title: "Appartement Centre-ville",
      location: "Dakar, Sénégal",
      price: "800K FCFA/mois",
      type: "Location",
      status: "Loué",
      views: 89,
      favorites: 12,
      date: "2024-06-10",
      statusColor: "secondary"
    },
    {
      id: 3,
      title: "Bureau Commercial",
      location: "Lagos, Nigeria",
      price: "85M FCFA",
      type: "Vente",
      status: "En attente",
      views: 234,
      favorites: 45,
      date: "2024-06-08",
      statusColor: "warning"
    },
    {
      id: 4,
      title: "Studio Meublé",
      location: "Casablanca, Maroc",
      price: "450K FCFA/mois",
      type: "Location",
      status: "Actif",
      views: 67,
      favorites: 8,
      date: "2024-06-05",
      statusColor: "success"
    }
  ];

  const activities = [
    {
      id: 1,
      action: "Nouvelle propriété ajoutée",
      details: "Villa Moderne Cocody",
      time: "Il y a 2 heures",
      icon: "🏠",
      color: "primary"
    },
    {
      id: 2,
      action: "Demande de visite",
      details: "Appartement Centre-ville",
      time: "Il y a 4 heures",
      icon: "📅",
      color: "info"
    },
    {
      id: 3,
      action: "Propriété vendue",
      details: "Terrain Residential - 15M FCFA",
      time: "Hier",
      icon: "✅",
      color: "success"
    },
    {
      id: 4,
      action: "Nouveau client",
      details: "Fatima Traore - Bamako",
      time: "Il y a 2 jours",
      icon: "👤",
      color: "warning"
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm">
        <div className="container-fluid px-4 py-3">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                  style={{width: '48px', height: '48px'}}
                >
                  🏠
                </div>
                <div>
                  <h1 className="h3 mb-0 fw-bold text-dark">Dashboard AFRICASA</h1>
                  <p className="mb-0 text-muted">Gérez vos propriétés et suivez vos performances</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-primary btn-sm position-relative">
                  <i className="fas fa-bell me-1"></i>
                  Notifications
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
                <Link href="/profil" className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-user me-1"></i>
                  Profil
                </Link>
                <button className="btn btn-primary btn-sm">
                  <i className="fas fa-plus me-1"></i>
                  Ajouter Propriété
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container-fluid px-4 py-4">
        {/* Statistiques */}
        <div className="row mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">{stat.title}</h6>
                      <h3 className="card-title mb-0 fw-bold">{stat.value}</h3>
                    </div>
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center ${stat.bgColor} text-white`}
                      style={{width: '48px', height: '48px'}}
                    >
                      <span style={{fontSize: '20px'}}>{stat.icon}</span>
                    </div>
                  </div>
                  <small className="text-muted">
                    <span className="text-success fw-bold">{stat.change}</span> par rapport au mois dernier
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Graphique des ventes */}
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">
                  <i className="fas fa-chart-bar text-primary me-2"></i>
                  Évolution des Performances
                </h5>
              </div>
              <div className="card-body">
                <div className="row text-center mb-4">
                  <div className="col-md-4">
                    <div className="border-end">
                      <h4 className="text-primary fw-bold mb-1">30</h4>
                      <small className="text-muted">Ventes ce mois</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border-end">
                      <h4 className="text-success fw-bold mb-1">420</h4>
                      <small className="text-muted">Visites totales</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-warning fw-bold mb-1">7.2%</h4>
                    <small className="text-muted">Taux conversion</small>
                  </div>
                </div>
                
                {/* Graphique simplifié avec barres CSS */}
                <div className="row">
                  {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((month, i) => (
                    <div key={month} className="col-2 text-center">
                      <div className="d-flex flex-column align-items-center">
                        <div 
                          className="bg-primary rounded-top mb-2"
                          style={{
                            width: '20px',
                            height: `${40 + i * 15}px`,
                            transition: 'height 0.3s ease'
                          }}
                        ></div>
                        <small className="text-muted">{month}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activités récentes */}
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">
                  <i className="fas fa-clock text-info me-2"></i>
                  Activités Récentes
                </h5>
              </div>
              <div className="card-body">
                <div className="timeline">
                  {activities.map((activity) => (
                    <div key={activity.id} className="d-flex gap-3 mb-3">
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center bg-${activity.color} text-white flex-shrink-0`}
                        style={{width: '32px', height: '32px'}}
                      >
                        <span style={{fontSize: '14px'}}>{activity.icon}</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small fw-bold">{activity.action}</h6>
                        <p className="mb-1 small text-muted">{activity.details}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-outline-primary btn-sm">
                    Voir toutes les activités
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table des Propriétés */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="fas fa-home text-primary me-2"></i>
                Mes Propriétés
              </h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-filter me-1"></i>
                  Filtrer
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-search me-1"></i>
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 fw-bold">Propriété</th>
                    <th className="border-0 fw-bold">Type</th>
                    <th className="border-0 fw-bold">Prix</th>
                    <th className="border-0 fw-bold">Statut</th>
                    <th className="border-0 fw-bold">Vues</th>
                    <th className="border-0 fw-bold">Favoris</th>
                    <th className="border-0 fw-bold">Date</th>
                    <th className="border-0 fw-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div>
                          <div className="fw-bold">{property.title}</div>
                          <small className="text-muted d-flex align-items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {property.location}
                          </small>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {property.type}
                        </span>
                      </td>
                      <td className="fw-bold">{property.price}</td>
                      <td>
                        <span className={`badge bg-${property.statusColor}`}>
                          {property.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <i className="fas fa-eye text-muted"></i>
                          <span>{property.views}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <i className="fas fa-heart text-danger"></i>
                          <span>{property.favorites}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <i className="fas fa-calendar text-muted"></i>
                          <small>{new Date(property.date).toLocaleDateString('fr-FR')}</small>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button 
                            className="btn btn-link text-muted" 
                            data-bs-toggle="dropdown"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Modifier</a></li>
                            <li><a className="dropdown-item" href="#">Voir détails</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" href="#">Supprimer</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Affichage de {properties.length} propriétés sur {properties.length}
              </small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <span className="page-link">Précédent</span>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">Suivant</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">
                  <i className="fas fa-chart-line text-success me-2"></i>
                  Analytics & Performance
                </h5>
              </div>
              <div className="card-body">
                <ul className="nav nav-tabs" id="analyticsTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button 
                      className="nav-link active" 
                      id="vues-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#vues"
                    >
                      Vues
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className="nav-link" 
                      id="conversions-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#conversions"
                    >
                      Conversions
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className="nav-link" 
                      id="revenue-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#revenue"
                    >
                      Revenue
                    </button>
                  </li>
                </ul>
                
                <div className="tab-content mt-4" id="analyticsTabContent">
                  <div className="tab-pane fade show active" id="vues">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="bg-light rounded p-4 text-center">
                          <i className="fas fa-chart-area fa-3x text-primary mb-3"></i>
                          <h6>Graphique des vues en temps réel</h6>
                          <p className="text-muted mb-0">Données en cours de chargement...</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="h-100 d-flex flex-column justify-content-center">
                          <div className="border-bottom pb-3 mb-3">
                            <h4 className="text-primary fw-bold mb-1">1,248</h4>
                            <small className="text-muted">Vues ce mois</small>
                          </div>
                          <div className="border-bottom pb-3 mb-3">
                            <h4 className="text-success fw-bold mb-1">+23%</h4>
                            <small className="text-muted">Croissance</small>
                          </div>
                          <div>
                            <h4 className="text-warning fw-bold mb-1">89</h4>
                            <small className="text-muted">Vues/jour moyenne</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tab-pane fade" id="conversions">
                    <div className="text-center py-5">
                      <i className="fas fa-chart-pie fa-3x text-success mb-3"></i>
                      <h6>Analyse des conversions</h6>
                      <p className="text-muted">Données de conversion en cours de chargement...</p>
                    </div>
                  </div>
                  
                  <div className="tab-pane fade" id="revenue">
                    <div className="text-center py-5">
                      <i className="fas fa-money-bill-wave fa-3x text-info mb-3"></i>
                      <h6>Analyse du revenue</h6>
                      <p className="text-muted">Données financières en cours de chargement...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS personnalisé */}
      <style jsx>{`
        .timeline {
          max-height: 400px;
          overflow-y: auto;
        }
        .table tbody tr:hover {
          background-color: rgba(0,0,0,0.02);
        }
        .nav-tabs .nav-link {
          color: #6c757d;
          border: none;
          border-bottom: 2px solid transparent;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          border-bottom-color: #0d6efd;
          background: none;
        }
        .nav-tabs .nav-link:hover {
          border-bottom-color: #0d6efd;
          background: none;
        }
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}
