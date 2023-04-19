<template lang="html">
  <div class="main">
    <AutocompletComponent />
    <WeatherCard :params="cards[0]" />
  </div>
</template>

<script setup>
import AutocompletComponent from "@/components/AutocompletComponent.vue";
import WeatherCard from "@/components/WeatherCard.vue";
//const cities = ["Kyiv", "Warszaw", "Berlin", "Paris"];
const cards = [
  {
    city_name: "London",
    feels_like: '10.95',
    humidity: '50',
    pressure: '1023',
    temp:' 12.35',
    temp_max: '13.43',
    temp_min: '10.95',
  },
];
</script>

<style scoped>
.main {
  padding: 20px 0 20px 0;
  background-color: bisque;
}
</style>
