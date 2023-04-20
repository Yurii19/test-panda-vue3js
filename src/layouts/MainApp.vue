<template lang="html">
  <div class="main">
    <section class="controls"><AutocompletComponent @select-city="onCitySelect($event)" />
    <button>Add to favorite</button>
    </section>

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
    feels_like: "10.95",
    humidity: "50",
    pressure: "1023",
    temp: "12.35",
    temp_max: "13.43",
    temp_min: "10.95",
  },
];

function onCitySelect(event){
    console.log('onCitySelect > ',event)
  }
</script>

<style scoped>
.main {
  padding: 20px 20px 20px 20px;
  /* background-color: bisque; */
}
.controls {
  background-color: aquamarine;
  padding: 15px;
}
button{
    padding: 10px;
    font-size: 1.1em;
    border-radius: 5px ;
    cursor: pointer;
    border-style: none;
}
</style>
