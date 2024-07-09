<template>
    <div class="h-auto">
      <h1 class="text-xl text-white decoration-solid font-bold mb-4">Sensores</h1>
      <SensoresComponent></SensoresComponent>
    </div>
</template>
<script>
import SensoresComponent from '../components/SensoresComponent.vue'
    export default {
        name:"SensoresView",
        components: {
            SensoresComponent
        }
    }
</script>