import axios from 'axios';

// Create axios instance with base configuration
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_TVARA_API_URL,
  timeout: 300000, // 300 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Chat endpoint
  chat: async (userQuery) => {
    try {
      const response = await httpClient.post('/chat', {
        user_query: userQuery
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate workflow');
    }
  },

  // Workflow visualization endpoint
  visualizeWorkflow: async () => {
    try {
      const response = await httpClient.get('/workflow/visualize');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch workflow visualization');
    }
  }
};

export default httpClient;
