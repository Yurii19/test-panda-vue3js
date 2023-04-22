<template lang="html">
  <div class="main">
    <section class="controls">
      <AutocompletComponent @select-city="onCitySelect($event)" />
    </section>
    <div class="cards-container">
      <div class="cards" v-for="card in cards" :key="card.city_name">
        <WeatherCard
          :params="card"
          @addToFavorit="onToFavorite($event)"
          @deleteCard="onDeleteCard($event)"
          @showChart="onShowChart($event)"
        />
      </div>
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
import { onMounted, ref } from "vue";
import { APP_ID, API_URL, initialCard } from "@/variables";
import {
  getWeatherAtCity,
  addToFavorits,
  getWeatherData,
  checkIfFavorite,
  createCard,
} from "@/services/services";

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
      const src = data.hourly.slice(0,25);
      const labels = src.map((el) => new Date(el.dt * 1000).getHours() + "h");
      const tempearatures = src.map((el) => Math.round(el.temp));
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
      newData.labels = labels;
      newData.datasets[0].data = tempearatures;
      newData.datasets[0].label = params.cityName;
      chartData.value = newData;
    });
}
function onToFavorite(cityId) {
  const target = cards.value.find((el) => el.id === cityId);
  target.isFavorite = true;
  const newFavorit = { ...target };
  const alreadyFavorite = checkIfFavorite(cityId);
  if (alreadyFavorite) {
    alert(`The city ${newFavorit.city_name} is already favorite`);
    return;
  }
  addToFavorits(newFavorit);
}

function onCitySelect(event) {
  getWeather(event.cityName);
}

function getWeather(cityName) {
  if (cards.value.length === 5) {
    alert(
      "To add a new city, remove one, the maximum allowed number of selected cities is 5."
    );
    return;
  }
  const url = `${API_URL}?q=${cityName}&appid=${APP_ID}&units=metric`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => {
      cards.value = [...cards.value, createCard(data)];
    });
}

function onDeleteCard(params) {
  chartVisible.value = false;
  const confirmDelete = window.confirm(
    "Really wanna delete " + params.cityName
  );
  if (!confirmDelete) {
    return;
  }
  cards.value = cards.value.filter((el) => el.id !== params.cityId);
}
</script>

<style scoped>
.cards-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cards {
  display: inline-block;
}
.main {
  padding: 20px 20px 20px 20px;
}
.controls {
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
