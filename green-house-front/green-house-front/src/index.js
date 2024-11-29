import { createRouter, createWebHistory } from 'vue-router';
import Report from './components/ReportesInvernadero.vue'; 
import inicio from './App.vue';
const routes = [
  
  {
    path: '/report',
    name: 'report',
    component: Report, 
  },
  {
    path: '/app',
    name: 'app',
    component: inicio, 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
