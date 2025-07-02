'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showPhone: false,
    showEmail: false
  });

  // Fonctions utilitaires
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler la sauvegarde
    alert('Informations mises à jour avec succès !');
  };

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
      router.push('/login');
    }
  };

  const activities = [
    {
      id: '1',
      type: 'property_view',
      title: 'Villa moderne visitée',
      description: 'Plateau, Abidjan - 45M FCFA',
      timestamp: 'Il y a 2 heures',
      icon: '🏠',
      color: 'primary'
    },
    {
      id: '2',
      type: 'favorite',
      title: 'Propriété ajoutée aux favoris',
      description: 'Appartement Almadies, Dakar',
      timestamp: 'Hier',
      icon: '❤️',
      color: 'danger'
    },
    {
      id: '3',
      type: 'contact',
      title: 'Contact agent immobilier',
      description: 'Fatima Kone - Bamako Properties',
      timestamp: 'Il y a 3 jours',
      icon: '📞',
      color: 'success'
    },
    {
      id: '4',
      type: 'profile_update',
      title: 'Profil mis à jour',
      description: 'Photo et informations personnelles',
      timestamp: 'Il y a 1 semaine',
      icon: '👤',
      color: 'info'
    }
  ];

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          console.log('Données utilisateur complètes:', parsedUser); // Debug
          
          setUser({
            // Utiliser fullName du backend ou construire à partir de firstName/lastName
            nom: parsedUser.lastName || parsedUser.fullName?.split(' ')[1] || 'Nom',
            prenom: parsedUser.firstName || parsedUser.fullName?.split(' ')[0] || 'Prénom',
            email: parsedUser.email || 'email@africasa.com',
            telephone: parsedUser.phoneNumber || 'Non renseigné',
            adresse: parsedUser.address?.city ? 
              `${parsedUser.address.city}${parsedUser.address.country ? ', ' + parsedUser.address.country : ''}` : 
              'Adresse non renseignée',
            bio: parsedUser.agentProfile?.bio || 'Aucune biographie renseignée',
            createdAt: new Date(parsedUser.createdAt).getFullYear() || '2024',
            properties: parsedUser.agentProfile?.reviewCount || 0,
            favorites: 0, // À implémenter avec les favoris réels
            views: 0, // À implémenter avec les vues réelles
            avatar: parsedUser.profilePicture || '',
            role: parsedUser.role || 'user',
            fullName: parsedUser.fullName || `${parsedUser.firstName || 'Prénom'} ${parsedUser.lastName || 'Nom'}`
          });
          setIsAuthenticated(true);
        } else {
          // Rediriger vers la page de connexion si non connecté
          router.push('/login');
          return;
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Affichage de chargement pendant la vérification
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, ne rien afficher (la redirection se fera)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profil-page min-vh-100 bg-light py-4" style={{paddingTop: '70px'}}>
      <div className="container">
        {/* Header avec statistiques */}
        <div className="card mb-4 border-0 shadow-lg profile-header" style={{
          background: 'linear-gradient(135deg, #d46211 0%, #e6734d 50%, #d98e26 100%)',
          borderRadius: '15px'
        }}>
          <div className="card-body p-4 text-white position-relative overflow-hidden">
            {/* Effet de fond décoratif */}
            <div className="position-absolute" style={{
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              opacity: 0.3
            }}></div>
            <div className="position-absolute" style={{
              bottom: '-30px',
              left: '-30px',
              width: '150px',
              height: '150px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%'
            }}></div>
            
            <div className="row align-items-center position-relative">
              {/* Avatar et info principale */}
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-4">
                  <div className="position-relative">
                    <div 
                      className="profile-avatar rounded-circle d-flex align-items-center justify-content-center fs-1 fw-bold shadow-lg"
                      style={{
                        width: '96px',
                        height: '96px',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        border: '4px solid rgba(255,255,255,0.3)',
                        color: '#d46211',
                        textShadow: 'none',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {getInitials(user.fullName || `${user.prenom} ${user.nom}`)}
                    </div>
                    <button 
                      className="btn btn-light btn-sm position-absolute rounded-circle p-2 shadow-sm"
                      style={{bottom: '-8px', right: '-8px', width: '32px', height: '32px'}}
                    >
                      <i className="fas fa-camera" style={{fontSize: '12px', color: '#d46211'}}></i>
                    </button>
                  </div>
                  <div>
                    <h1 className="h2 fw-bold mb-1 text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.3)'}}>
                      {user.prenom} {user.nom}
                    </h1>
                    <p className="mb-1 d-flex align-items-center gap-1 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
                      <i className="fas fa-map-marker-alt"></i>
                      {user.adresse}
                    </p>
                    <p className="mb-0 small" style={{color: 'rgba(255,255,255,0.8)'}}>
                      Membre depuis {user.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="col-md-4">
                <div className="profile-stats row text-center">
                  <div className="col-4">
                    <div className="p-3 rounded-lg" style={{backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}>
                      <div className="h3 fw-bold mb-0 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                        {user.properties}
                      </div>
                      <div className="small" style={{color: 'rgba(255,255,255,0.9)'}}>Propriétés</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-lg" style={{backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}>
                      <div className="h3 fw-bold mb-0 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                        {user.favorites}
                      </div>
                      <div className="small" style={{color: 'rgba(255,255,255,0.9)'}}>Favoris</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-lg" style={{backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}>
                      <div className="h3 fw-bold mb-0 text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                        {user.views}
                      </div>
                      <div className="small" style={{color: 'rgba(255,255,255,0.9)'}}>Vues profil</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets principaux */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  <i className="fas fa-user me-2"></i>Informations
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <i className="fas fa-shield-alt me-2"></i>Sécurité
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'preferences' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preferences')}
                >
                  <i className="fas fa-cog me-2"></i>Préférences
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                  onClick={() => setActiveTab('activity')}
                >
                  <i className="fas fa-chart-line me-2"></i>Activité
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body">
            {/* Onglet Informations */}
            {activeTab === 'info' && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-user text-primary me-2"></i>
                        Informations personnelles
                      </h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input
                              type="text"
                              className="form-control"
                              id="prenom"
                              name="prenom"
                              value={user.prenom}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              name="nom"
                              value={user.nom}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="telephone" className="form-label">Téléphone</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="telephone"
                            name="telephone"
                            value={user.telephone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="adresse" className="form-label">Localisation</label>
                          <input
                            type="text"
                            className="form-control"
                            id="adresse"
                            name="adresse"
                            value={user.adresse}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bio" className="form-label">Bio</label>
                          <textarea
                            className="form-control"
                            id="bio"
                            name="bio"
                            rows="3"
                            value={user.bio}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Sauvegarder les modifications
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-eye text-primary me-2"></i>
                        Aperçu du profil
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="p-4 border rounded bg-light">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: '48px',
                              height: '48px',
                              backgroundColor: '#e9ecef',
                              color: '#6c757d'
                            }}
                          >
                            {getInitials(user.fullName || `${user.prenom} ${user.nom}`)}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{user.fullName || `${user.prenom} ${user.nom}`}</h6>
                            <small className="text-muted">{user.adresse}</small>
                          </div>
                        </div>
                        <p className="small text-muted mb-3">{user.bio}</p>
                        <div className="d-flex gap-2">
                          <span className="badge bg-secondary">{user.properties} propriétés</span>
                          <span className="badge bg-secondary">Membre {user.createdAt}</span>
                        </div>
                      </div>
                      <p className="small text-muted mt-3">
                        Prévisualisation de votre profil public tel qu'il apparaît aux autres utilisateurs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-lock text-primary me-2"></i>
                        Mot de passe
                      </h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="current-password" className="form-label">Mot de passe actuel</label>
                          <input type="password" className="form-control" id="current-password" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="new-password" className="form-label">Nouveau mot de passe</label>
                          <input type="password" className="form-control" id="new-password" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe</label>
                          <input type="password" className="form-control" id="confirm-password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Modifier le mot de passe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-shield-alt text-primary me-2"></i>
                        Authentification à deux facteurs
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                        <div>
                          <h6 className="mb-1">2FA par SMS</h6>
                          <small className="text-muted">Recevez un code par SMS</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="sms2fa" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                        <div>
                          <h6 className="mb-1">Application d'authentification</h6>
                          <small className="text-muted">Utilisez Google Authenticator</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="app2fa" />
                        </div>
                      </div>
                      <button className="btn btn-outline-primary w-100">
                        Configurer l'authentification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Préférences */}
            {activeTab === 'preferences' && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-bell text-primary me-2"></i>
                        Notifications
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Notifications email</h6>
                          <small className="text-muted">Recevez des emails pour les mises à jour importantes</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="emailNotif"
                            checked={notifications.email}
                            onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Notifications SMS</h6>
                          <small className="text-muted">Recevez des SMS pour les alertes urgentes</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="smsNotif"
                            checked={notifications.sms}
                            onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Notifications push</h6>
                          <small className="text-muted">Recevez des notifications dans votre navigateur</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="pushNotif"
                            checked={notifications.push}
                            onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Marketing</h6>
                          <small className="text-muted">Recevez des offres et promotions</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="marketingNotif"
                            checked={notifications.marketing}
                            onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="fas fa-eye text-primary me-2"></i>
                        Confidentialité
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Profil public</h6>
                          <small className="text-muted">Votre profil est visible par les autres utilisateurs</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="publicProfile"
                            checked={privacy.profilePublic}
                            onChange={(e) => setPrivacy({...privacy, profilePublic: e.target.checked})}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">Afficher le téléphone</h6>
                          <small className="text-muted">Les agents peuvent voir votre numéro</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="showPhone"
                            checked={privacy.showPhone}
                            onChange={(e) => setPrivacy({...privacy, showPhone: e.target.checked})}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Afficher l'email</h6>
                          <small className="text-muted">Les agents peuvent voir votre email</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="showEmail"
                            checked={privacy.showEmail}
                            onChange={(e) => setPrivacy({...privacy, showEmail: e.target.checked})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Activité */}
            {activeTab === 'activity' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-chart-line text-primary me-2"></i>
                    Historique des activités
                  </h5>
                </div>
                <div className="card-body">
                  <div className="timeline">
                    {activities.map((activity) => (
                      <div key={activity.id} className="d-flex align-items-start gap-3 p-3 border rounded mb-3 hover-shadow">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center bg-${activity.color} text-white`} style={{width: '40px', height: '40px', minWidth: '40px'}}>
                          <span style={{fontSize: '18px'}}>{activity.icon}</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{activity.title}</h6>
                          <p className="text-muted mb-1 small">{activity.description}</p>
                          <small className="text-muted">{activity.timestamp}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-outline-primary w-100 mt-3">
                    Voir plus d'activités
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer avec actions */}
          <div className="card-footer bg-light">
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Déconnexion
              </button>
              <div className="text-muted small">
                Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS personnalisé */}
      <style jsx>{`
        .hover-shadow {
          transition: box-shadow 0.2s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
        }
        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          transition: all 0.2s ease;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          border-bottom: 2px solid #0d6efd;
          background: none;
        }
        .nav-tabs .nav-link:hover {
          color: #0d6efd;
          border-color: transparent;
        }
      `}</style>
    </div>
  );

}