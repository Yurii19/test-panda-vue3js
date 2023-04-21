<template lang="html">
  <div class="main">
    <section class="controls">
      <AutocompletComponent @select-city="onCitySelect($event)" />
      <button @click="addFavorite()">Add to favorite</button>
    </section>
    <div class="cards" v-for="card in cards" :key="card.city_name">
      <WeatherCard
        :params="card"
        @addToFavorit="onToFavorite($event)"
        @deleteCard="onDeleteCard($event)"
        @showChart="onShowChart($event)"
      />
    </div>
    <div class="chart" v-if="chartVisible">
      <ChartComponent :labels="chartLabels" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import AutocompletComponent from "@/components/AutocompletComponent.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import WeatherCard from "@/components/WeatherCard.vue";
// import { getLocations } from "@/services/services";
import { onMounted, ref } from "vue";
import { APP_ID, API_URL, initialCard } from "@/variables";
import {
  getWeatherAtCity,
  // getHourlyWeather,
  // getStatistic,
  // getHistory,
  getWeatherData,
} from "@/services/services";
//import e from "express";
//const cities = ["Kyiv", "Warszaw", "Berlin", "Paris"];
const cards = ref([]);
const chartVisible = ref(false);
let chartLabels = ref(["ababa", "galamaga"]);
let chartData = ref([10, 15]);

onMounted(() => {
  const url = `${API_URL}?q=Kyiv&appid=${APP_ID}&units=metric`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => {
      cards.value = [createCard(data)];
    })
    .catch(() => (cards.value = [initialCard]));
});

//#########################################//
function onShowChart(cords) {
  console.log(cords);
  chartVisible.value = !chartVisible.value;
  // const today = new Date();
  // const now = today.getTime();
  // today.setHours(0, 0, 0, 0);
  // const start = today.getTime();
  // getHourlyWeather('Kyiv', start, now).then(d =>d.json()).then(r => console.log(r))
  getWeatherData(cords.lat, cords.lon)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const src = data.hourly;
      console.log(src);
      const date = new Date();
      const labels = src.map((el) => new Date(el.dt * 1000).getHours());
      const tempearature = src.map((el) => el.temp);
      chartLabels = labels;
      chartData.value = tempearature;
      console.log(labels);
    });
}

function addFavorite() {
  // console.log("addFavorite");
  // getLocations().then((r) => console.log("getLocations> ", r));
}

function onCitySelect(event) {
  // console.log("onCitySelect > ", event);
  getWeather(event.cityName);
}

function getWeather(cityName) {
  //const cityName = "London";
  if (cards.value.length === 5) {
    alert(
      "To add a new city, remove one, the maximum allowed number of selected cities is 5."
    );
    return;
  }
  //console.log('number of cards',cards.value.length)
  const url = `${API_URL}?q=${cityName}&appid=${APP_ID}&units=metric`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      cards.value = [...cards.value, createCard(data)];
      // console.log(" ---> ", cards.value);
    });
}

function createCard(cityData) {
  return {
    id: cityData.id,
    city_name: cityData.name,
    feels_like: cityData.main.feels_like,
    humidity: cityData.main.humidity,
    pressure: cityData.main.pressure,
    temp: cityData.main.temp,
    temp_max: cityData.main.temp_max,
    temp_min: cityData.main.temp_min,
    lat: cityData.coord.lat,
    lon: cityData.coord.lon,
  };
}

function onToFavorite(data) {
  console.log("onToFavorite-> ", data);
}

function onDeleteCard(data) {
  //console.log("onDeleteCard-> ", data);
  const confirmDelete = window.confirm("Really wanna delete " + data);
  if (!confirmDelete) {
    return;
  }
  cards.value = cards.value.filter((el) => el.city_name !== data);
}
// function onShowChart(data) {
//   console.log("onShowChart-> ", data);
// }
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
