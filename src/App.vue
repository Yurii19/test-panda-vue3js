<template>
  <img
    alt="Panda logo"
    width="150"
    src="https://s.dou.ua/CACHE/images/img/static/companies/panda_logo/bfe851809828be6e25ca3574a2517c54.png"
  />
  <HeaderApp />
  <router-view></router-view>
  
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";

export default {
  name: "App",
  components: {
    HeaderApp
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
