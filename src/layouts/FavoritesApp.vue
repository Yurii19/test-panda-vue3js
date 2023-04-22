<template lang="html">
  <div class="main">
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
import ChartComponent from "@/components/ChartComponent.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import { onMounted, ref } from "vue";
import { removeFromFavorites, getWeatherData } from "@/services/services";
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
  const favorits = JSON.parse(window.localStorage.getItem("favorits"));
  cards.value = favorits;
});

function onShowChart(params) {
  chartVisible.value = true;
  getWeatherData(params.lat, params.lon)
    .then((response) => response.json())
    .then((data) => {
      chartData.value = null;
      const src = data.hourly.slice(0,25);
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
      newData.labels = labels;
      newData.datasets[0].data = tempearature;
      newData.datasets[0].label = params.cityName;
      chartData.value = newData;
    });
}

function onToFavorite(cityId) {
  removeFromFavorites(cityId);
  const favorits = JSON.parse(window.localStorage.getItem("favorits"));
  cards.value = favorits;
}

function onDeleteCard(params) {
  removeFromFavorites(params.cityId);
  const favorits = JSON.parse(window.localStorage.getItem("favorits"));
  cards.value = favorits;
}
</script>

<style scoped>
.cards {
  display: inline-block;
}
.main {
  padding: 20px 20px 20px 20px;
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
