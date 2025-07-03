// Configuration API pour gérer les différents environnements
const getApiBaseUrl = () => {
  // En développement local
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000/api';
  }
  
  // En production ou dans Docker
  // Vérifier si on est côté serveur ou côté client
  if (typeof window === 'undefined') {
    // Côté serveur (SSR) - utiliser le nom du service Docker
    return process.env.NEXT_PUBLIC_API_URL || 'http://backend:5000/api';
  } else {
    // Côté client (navigateur) - utiliser localhost
    return process.env.NEXT_PUBLIC_API_URL_BROWSER || 'http://localhost:5000/api';
  }
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/users/register`,
  LOGIN: `${API_BASE_URL}/users/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/users/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/users/reset-password`,
  CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/users/verify-email`,
  VERIFY_2FA: `${API_BASE_URL}/users/verify-2fa`,
  
  // User endpoints
  PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  DELETE_PROFILE: `${API_BASE_URL}/users/profile`,
  
  // Properties endpoints
  PROPERTIES: `${API_BASE_URL}/properties`,
  
  // Agents endpoints
  AGENTS: `${API_BASE_URL}/agents`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

// Fonction utilitaire pour les requêtes avec gestion d'erreur
export const apiRequest = async (url, options = {}) => {
  try {
    console.log(`🚀 API Request: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    console.log(`📊 API Response: ${response.status} - ${url}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erreur réseau' }));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`❌ API Error: ${url}`, error);
    throw error;
  }
};

export default API_ENDPOINTS;
