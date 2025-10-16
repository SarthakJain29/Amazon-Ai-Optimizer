import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 30000,
});

export const fetchAndOptimize = async (asin) => {
  const productResponse = await api.get(`/api/product/${asin}`);
  const productData = productResponse.data;

  const optimizeResponse = await api.post('/api/optimize', {
    title: productData.title,
    bullets: productData.bullets,
    description: productData.description,
    asin: asin
  });

  //const optimizedRaw = optimizeResponse.data || {};

  return {
    original: productData,
    optimized: optimizeResponse.data
  };
};

export const fetchHistory = async () => {
  const response = await api.get('/api/history');
  return response.data;
};

export default api;
