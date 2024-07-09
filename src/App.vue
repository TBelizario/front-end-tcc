<script>
import SideBar  from "./components/SideBarComponents.vue";
import FooterComp from "./components/FooterComponents.vue";
  export default {
    components: {
      SideBar,
      FooterComp
    }
  }
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="flex flex-1">
      <SideBar></SideBar>
      <main class="flex-1 p-2">
        <RouterView/>
      </main>
    </div>
    <FooterComp></FooterComp>
  </div>  
</template>

<style scoped>

</style>
