const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: `${API_BASE_URL}/api/users/register`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  LOGOUT: `${API_BASE_URL}/api/users/logout`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/users/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/users/reset-password`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/health`
};

export default API_BASE_URL;