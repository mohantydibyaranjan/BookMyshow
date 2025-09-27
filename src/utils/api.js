import axios from 'axios';

// The base URL for the backend API. This should be stored in an environment variable.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios request interceptor.
 * This function runs before each request is sent. It's used here to attach the
 * authentication token (e.g., a JWT) to the request headers if it exists.
 */
api.interceptors.request.use(
  (config) => {
    // In a real app, you would get the token from localStorage or a secure cookie.
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios response interceptor.
 * This function runs after a response is received. It can be used to handle
 * global errors, such as 401 Unauthorized (e.g., to trigger a logout) or
 * network errors.
 */
api.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it.
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access. For example, redirect to login.
      // This is where you might call the logout function from your AuthContext.
      console.error('Unauthorized access - redirecting to login.');
      // window.location.href = '/login';
    }
    // Return the error to be handled by the component that made the call.
    return Promise.reject(error);
  }
);

export default api;