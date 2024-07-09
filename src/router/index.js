import { createRouter, createWebHistory } from 'vue-router';
import MapaView from '../views/MapaView.vue';
import SensoresView from "../views/SensoresView.vue";
import HistoricoView from "../views/HistoricoView.vue";

const routerBase = import.meta.env.PROD ? import.meta.env.BASE_URL : '/'; 

const router = createRouter({
  history: createWebHistory(routerBase),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapaView
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
