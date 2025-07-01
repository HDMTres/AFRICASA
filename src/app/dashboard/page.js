"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUser, FaHome, FaCog, FaSignOutAlt, FaHeart, FaBuilding, 
  FaPlus, FaEye, FaChartLine, FaBell, FaCalendarAlt, FaClock,
  FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaComments, FaPhone,
  FaEnvelope, FaDownload, FaShare, FaFilter, FaSort, FaSearch,
  FaBookmark, FaHandshake, FaAward, FaTrendingUp, FaUserFriends,
  FaClipboardList, FaTools, FaLightbulb, FaGift, FaShieldAlt
} from 'react-icons/fa';

// Import des styles du dashboard
import './styles.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    properties: 0,
    favorites: 0,
    views: 0,
    messages: 0,
    revenue: 0,
    leads: 0,
    rating: 0,
    completionRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Charger les statistiques utilisateur
      loadUserStats(token);
      loadRecentActivity(token);
    } catch (error) {
      console.error('Erreur parsing user data:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const loadUserStats = async (token) => {
    try {
      // Simuler des statistiques pour le moment
      // TODO: Remplacer par de vraies API calls
      setTimeout(() => {
        setStats({
          properties: Math.floor(Math.random() * 10) + 1,
          favorites: Math.floor(Math.random() * 25) + 5,
          views: Math.floor(Math.random() * 500) + 100,
          messages: Math.floor(Math.random() * 15) + 2
        });
      }, 1000);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const loadRecentActivity = async (token) => {
    try {
      // Simuler une activité récente
      setTimeout(() => {
        setRecentActivity([
          {
            id: 1,
            type: 'property_viewed',
            title: 'Villa moderne à Douala',
            time: '2 heures',
            icon: FaEye
          },
          {
            id: 2,
            type: 'favorite_added',
            title: 'Appartement ajouté aux favoris',
            time: '5 heures',
            icon: FaHeart
          },
          {
            id: 3,
            type: 'message_received',
            title: 'Nouveau message reçu',
            time: '1 jour',
            icon: FaComments
          }
        ]);
      }, 1200);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'activité:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-container">
      {/* Header Dashboard */}
      <header className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <Link href="/" className="logo">
              <h2>AFRI<span style={{color: '#c48d17'}}>CASA</span></h2>
            </Link>
            <nav className="nav-menu">
              <Link href="/" className="nav-link">
                <FaHome /> Accueil
              </Link>
              <Link href="/profil" className="nav-link">
                <FaUser /> Mon Profil
              </Link>
              <Link href="/properties" className="nav-link">
                <FaBuilding /> Propriétés
              </Link>
              <Link href="/favorites" className="nav-link">
                <FaHeart /> Favoris
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Déconnexion
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="dashboard-main">
        <div className="container">
          {/* Section de bienvenue */}
          <div className="welcome-section">
            <div className="welcome-content">
              <h1>Bienvenue, {user?.firstName || user?.fullName || 'Utilisateur'} !</h1>
              <p>
                {user?.role === 'agent' 
                  ? 'Gérez vos propriétés et développez votre business immobilier' 
                  : 'Découvrez et gérez vos propriétés favorites'
                }
              </p>
              <div className="user-badge">
                <span className="role-badge">
                  {user?.role === 'agent' ? 'Agent Immobilier' : 'Particulier'}
                </span>
                <span className="join-date">
                  <FaCalendarAlt /> Membre depuis {new Date().getFullYear()}
                </span>
              </div>
            </div>
            <div className="welcome-actions">
              {user?.role === 'agent' && (
                <Link href="/add-property" className="primary-btn">
                  <FaPlus /> Ajouter une propriété
                </Link>
              )}
              <Link href="/properties" className="secondary-btn">
                <FaBuilding /> Parcourir les biens
              </Link>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon properties">
                <FaBuilding />
              </div>
              <div className="stat-content">
                <h3>{stats.properties}</h3>
                <p>{user?.role === 'agent' ? 'Propriétés publiées' : 'Propriétés vues'}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon favorites">
                <FaHeart />
              </div>
              <div className="stat-content">
                <h3>{stats.favorites}</h3>
                <p>Favoris</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon views">
                <FaEye />
              </div>
              <div className="stat-content">
                <h3>{stats.views}</h3>
                <p>{user?.role === 'agent' ? 'Vues totales' : 'Recherches'}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon messages">
                <FaComments />
              </div>
              <div className="stat-content">
                <h3>{stats.messages}</h3>
                <p>Messages</p>
              </div>
            </div>
          </div>

          {/* Section principale du dashboard */}
          <div className="dashboard-content">
            {/* Actions rapides */}
            <div className="dashboard-section">
              <h2>Actions rapides</h2>
              <div className="quick-actions">
                <div className="dashboard-card">
                  <div className="card-icon">
                    <FaUser />
                  </div>
                  <h3>Mon Profil</h3>
                  <p>Gérer vos informations personnelles</p>
                  <Link href="/profil" className="card-btn">
                    Voir le profil
                  </Link>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon">
                    <FaBuilding />
                  </div>
                  <h3>Propriétés</h3>
                  <p>{user?.role === 'agent' ? 'Gérer vos annonces' : 'Parcourir les biens'}</p>
                  <Link href="/properties" className="card-btn">
                    Voir propriétés
                  </Link>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon">
                    <FaHeart />
                  </div>
                  <h3>Mes Favoris</h3>
                  <p>Propriétés que vous avez aimées</p>
                  <Link href="/favorites" className="card-btn">
                    Voir favoris
                  </Link>
                </div>

                {user?.role === 'agent' && (
                  <div className="dashboard-card featured">
                    <div className="card-icon">
                      <FaPlus />
                    </div>
                    <h3>Nouvelle propriété</h3>
                    <p>Ajouter une nouvelle annonce</p>
                    <Link href="/add-property" className="card-btn primary">
                      Ajouter
                    </Link>
                  </div>
                )}

                <div className="dashboard-card">
                  <div className="card-icon">
                    <FaCog />
                  </div>
                  <h3>Paramètres</h3>
                  <p>Configurer votre compte</p>
                  <Link href="/settings" className="card-btn">
                    Paramètres
                  </Link>
                </div>
              </div>
            </div>

            {/* Activité récente */}
            <div className="dashboard-section">
              <h2>Activité récente</h2>
              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <activity.icon />
                      </div>
                      <div className="activity-content">
                        <p>{activity.title}</p>
                        <span className="activity-time">
                          <FaClock /> Il y a {activity.time}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-activity">
                    <p>Aucune activité récente</p>
                  </div>
                )}
              </div>
            </div>

            {/* Conseils et notifications */}
            <div className="dashboard-section">
              <h2>Conseils et notifications</h2>
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">
                    <FaBell />
                  </div>
                  <h4>Complétez votre profil</h4>
                  <p>Un profil complet augmente vos chances de réussite</p>
                  <Link href="/profil" className="tip-link">Compléter →</Link>
                </div>
                
                {user?.role === 'agent' && (
                  <div className="tip-card">
                    <div className="tip-icon">
                      <FaChartLine />
                    </div>
                    <h4>Optimisez vos annonces</h4>
                    <p>Ajoutez plus de photos et descriptions détaillées</p>
                    <Link href="/properties" className="tip-link">Voir →</Link>
                  </div>
                )}
                
                <div className="tip-card">
                  <div className="tip-icon">
                    <FaStar />
                  </div>
                  <h4>Explorez les nouveautés</h4>
                  <p>Découvrez les dernières propriétés ajoutées</p>
                  <Link href="/properties?sort=newest" className="tip-link">Explorer →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Assistant IA flottant */}
      <AIAssistantWidget />
    </div>
  );
}