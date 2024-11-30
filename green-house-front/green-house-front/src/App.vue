<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/HeaderComponent.vue';


export default {
  components: {
    Navbar
   
  },
};
</script>

<style scoped>
@import './assets/stylesApp.css';
</style>
