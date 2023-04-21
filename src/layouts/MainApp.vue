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
      <ChartComponent :data="chartData" />
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
  addToFavorits,
  getWeatherData,
  checkIfFavorite,
  createCard,
} from "@/services/services";
//import e from "express";
//const cities = ["Kyiv", "Warszaw", "Berlin", "Paris"];
const cards = ref([]);
const chartVisible = ref(false);

let chartData = ref({
  labels: ["January", "February", "March", "January", "February", "March"],
  datasets: [
    {
      label: "Temperature",
      backgroundColor: "#fbc531",
      borderColor: "#273c75",
      data: [40, 20, 12, 40, 20, 12],
    },
  ],
});

onMounted(() => {
  const url = `${API_URL}?q=Kyiv&appid=${APP_ID}&units=metric`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => {
      cards.value = [createCard(data)];
    })
    .catch(() => (cards.value = [initialCard]));
});

function onShowChart(params) {
  chartVisible.value = true;
  getWeatherData(params.lat, params.lon)
    .then((response) => response.json())
    .then((data) => {
      chartData.value = null;
      const src = data.hourly;
      // const date = new Date();
      const labels = src.map((el) => new Date(el.dt * 1000).getHours() + "h");
      const tempearature = src.map((el) => Math.round(el.temp));
      const newData = {
        labels: [],
        datasets: [
          {
            label: "City name ",
            backgroundColor: "#32ff7e",
            borderColor: "blue",
            data: [],
          },
        ],
      };
      // chartData.value.labels = labels;
      // chartData.value.datasets.data = tempearature;
      newData.labels = labels;
      newData.datasets[0].data = tempearature;
      newData.datasets[0].label = params.cityName;
      chartData.value = newData;
      // console.log(chartData.value);
    });
}
//#########################################//
function onToFavorite(cityId) {
  //console.log("onToFavorite- ", cityId);
  const target = cards.value.find((el) => el.id === cityId);
  target.isFavorite = true;
  console.log('target : ', target)
  const newFavorit = { ...target };
  // console.log("TARGET ", target);
  const alreadyFavorite = checkIfFavorite(cityId);
  // console.log("alreadyFavorite ", alreadyFavorite);
  if (alreadyFavorite) {
    alert(`The city ${newFavorit.city_name} is already favorite`);
    return;
  }
  addToFavorits(newFavorit);

  //console.log(target);
}

// function addFavorite(event) {
//   console.log(event)
//  //addToFavorits(card)
// }

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
      // console.log(" -- ", cards.value);
    });
}

function onDeleteCard(params) {
  chartVisible.value = false;
  const confirmDelete = window.confirm("Really wanna delete " + params.cityName);
  if (!confirmDelete) {
    return;
  }
  cards.value = cards.value.filter((el) => el.id !== params.cityId);
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
