import { createRouter, createWebHistory } from 'vue-router';
import MapaView from '../views/MapaView.vue';
import SensoresView from "../views/SensoresView.vue";
import HistoricoView from "../views/HistoricoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/sensores',
      name: 'sensores',
      component: SensoresView
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: MapaView
    },
    {
      path: '/historico/:id',
      name: 'Historico',
      component: HistoricoView
    }
  ]
})

export default router
