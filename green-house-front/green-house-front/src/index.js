import { createRouter, createWebHistory } from 'vue-router';
import PaginaInicial from './components/PaginaInicial.vue';
import ReportesInvernadero from './components/ReportesInvernadero.vue';



const routes = [
  {
    path: '/reports', // Ruta para el reporte
    name: 'reports',
    component: ReportesInvernadero,
  },
 
  {
    path: '/inicio', // Ruta principal que carga SensoresAlarma
    name: 'inicio',
    component: PaginaInicial,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
