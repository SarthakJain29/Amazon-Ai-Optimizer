import axios from 'axios';

//creating axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 30000,
});

//fetching product details using Asin, then sending to AI for opimizing
export const fetchAndOptimize = async (asin) => {
  const productResponse = await api.get(`/api/product/${asin}`);
  const productData = productResponse.data;

  const optimizeResponse = await api.post('/api/optimize', {
    title: productData.title,
    bullets: productData.bullets,
    description: productData.description,
    asin: asin
  });


  return {
    original: productData,
    optimized: optimizeResponse.data
  };
};

//fetch all past optimization history
export const fetchHistory = async () => {
  const response = await api.get('/api/history');
  return response.data;
};

export default api;
