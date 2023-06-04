import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor za dodavanje Authentication tokena u zaglavlje
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('user'); // Pretpostavljeno ime za vaš token u local storage-u
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

createApp(App).use(router).mount('#app')