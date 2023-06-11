import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

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

const app = createApp(App);

app.component('l-map', LMap);
app.component('l-tile-layer', LTileLayer);
app.component('l-marker', LMarker);

app.use(router).mount('#app')

import "bootstrap/dist/js/bootstrap.js";