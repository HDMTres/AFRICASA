'use client';
import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
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
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Propriétés Actives</h6>
                    <h3 className="card-title mb-0 fw-bold">24</h3>
                  </div>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                    style={{width: '48px', height: '48px'}}
                  >
                    <span style={{fontSize: '20px'}}>🏠</span>
                  </div>
                </div>
                <small className="text-muted">
                  <span className="text-success fw-bold">+12%</span> par rapport au mois dernier
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Revenue Total</h6>
                    <h3 className="card-title mb-0 fw-bold">125M FCFA</h3>
                  </div>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white"
                    style={{width: '48px', height: '48px'}}
                  >
                    <span style={{fontSize: '20px'}}>💰</span>
                  </div>
                </div>
                <small className="text-muted">
                  <span className="text-success fw-bold">+18%</span> par rapport au mois dernier
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Visites ce mois</h6>
                    <h3 className="card-title mb-0 fw-bold">1,248</h3>
                  </div>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-info text-white"
                    style={{width: '48px', height: '48px'}}
                  >
                    <span style={{fontSize: '20px'}}>👁️</span>
                  </div>
                </div>
                <small className="text-muted">
                  <span className="text-success fw-bold">+8%</span> par rapport au mois dernier
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">Clients Actifs</h6>
                    <h3 className="card-title mb-0 fw-bold">89</h3>
                  </div>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-warning text-white"
                    style={{width: '48px', height: '48px'}}
                  >
                    <span style={{fontSize: '20px'}}>👥</span>
                  </div>
                </div>
                <small className="text-muted">
                  <span className="text-success fw-bold">+24%</span> par rapport au mois dernier
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques et table simplifiés */}
        <div className="row">
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
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">
                  <i className="fas fa-clock text-info me-2"></i>
                  Activités Récentes
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex gap-3 mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white flex-shrink-0"
                    style={{width: '32px', height: '32px'}}
                  >
                    <span style={{fontSize: '14px'}}>🏠</span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small fw-bold">Nouvelle propriété ajoutée</h6>
                    <p className="mb-1 small text-muted">Villa Moderne Cocody</p>
                    <small className="text-muted">Il y a 2 heures</small>
                  </div>
                </div>
                
                <div className="d-flex gap-3 mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center bg-info text-white flex-shrink-0"
                    style={{width: '32px', height: '32px'}}
                  >
                    <span style={{fontSize: '14px'}}>📅</span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small fw-bold">Demande de visite</h6>
                    <p className="mb-1 small text-muted">Appartement Centre-ville</p>
                    <small className="text-muted">Il y a 4 heures</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
