<template>
    <div class="main-container">
      <h1 class="text-xl text-white decoration-solid font-bold mb-4">Historico diáro (cm)</h1>
      <HistoricoComponent></HistoricoComponent>
    </div>
  </template>
  
  <script>
  import HistoricoComponent from '../components/HistoricoComponent.vue'
    export default {
      name: "HistoricoView",
      components: {
        HistoricoComponent
      }
    }
  </script>
  
  <style>
  </style>
  