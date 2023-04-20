<template lang="html">
  <div class="main">
    <section class="controls">
      <AutocompletComponent @select-city="onCitySelect($event)" />
      <button @click="addFavorite()">Add to favorite</button>
    </section>
    <div class="cards" v-for="card in cards" :key="card.city_name">
      <WeatherCard :params="card" @addToFavorit="onToFavorite()"/>
    </div>
    <!-- <WeatherCard :params="cards[0]" /> -->
  </div>
</template>

<script setup>
import AutocompletComponent from "@/components/AutocompletComponent.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import { getLocations } from "@/services/services";
import { ref } from "vue";
import { APP_ID, API_URL } from "@/variables";
import { getWeatherAtCity } from "@/services/services";
//const cities = ["Kyiv", "Warszaw", "Berlin", "Paris"];
const cards = ref([
  {
    city_name: "London",
    feels_like: "10.95",
    humidity: "50",
    pressure: "1023",
    temp: "12.35",
    temp_max: "13.43",
    temp_min: "10.95",
  },
]);

function addFavorite() {
  console.log("addFavorite");
  getLocations().then((r) => console.log("getLocations> ", r));
}

function onCitySelect(event) {
  console.log("onCitySelect > ", event);
  getWeather(event.cityName);
}

function getWeather(cityName) {
  //const cityName = "London";
  const url = `${API_URL}?q=${cityName}&appid=${APP_ID}&units=metric`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      cards.value = [...cards.value, createCard(data)];
      console.log(" ---> ", cards.value);
    });
}

function createCard(cityData) {
  return {
    city_name: cityData.name,
    feels_like: cityData.main.feels_like,
    humidity: cityData.main.humidity,
    pressure: cityData.main.pressure,
    temp: cityData.main.temp,
    temp_max: cityData.main.temp_max,
    temp_min: cityData.main.temp_min,
  };
}

function onToFavorite(data){
  console.log(data)
}
</script>

<style scoped>
.cards {
 display: inline-block;
}
.main {
  padding: 20px 20px 20px 20px;
  /* background-color: bisque; */
}
.controls {
  background-color: aquamarine;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
button {
  padding: 10px;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  border-style: none;
}
</style>
