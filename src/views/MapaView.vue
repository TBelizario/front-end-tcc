<template>
    <div class="main-container">
      <h1 class="text-xl text-white decoration-solid font-bold mb-4">Mapa</h1>
      <MapaComponent></MapaComponent>
    </div>
  </template>
  
  <script>
  import MapaComponent from '../components/MapComponent.vue'
    export default {
      name: "MapaView",
      components: {
        MapaComponent
      }
    }
  </script>
  
  <style>
  </style>
  