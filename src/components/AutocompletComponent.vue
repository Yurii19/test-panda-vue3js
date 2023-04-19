<template lang="html">
  <div class="box">
    <input
      type="text"
      v-model="cityModel"
      @input="inputHandle()"
      ref="searchCity"
    />
    <button @click="getWeather()">add city</button>

    <div class="select">
      <ul>
        <li
          class="list-item"
          v-for="city in matchedCities"
          :data-value="city"
          :key="city"
          @click="selectCity($event)"
        >
          {{ city }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getWeatherAtCity } from "../services/services";
import { APP_ID, API_URL } from "../variables";
// import { json } from "body-parser";

let cityModel = ref("");
const cities = ref(["Kyiv", "Warszaw", "Berlin", "Paris"]);
const matchedCities = ref([]);

function selectCity(event) {
  const theCity = event.target.getAttribute("data-value");
  cityModel.value = theCity;
  console.log(cityModel);
}

watch("cityModel", (nv) => {
  console.log(nv);
});
function inputHandle() {
  if (cityModel.value === "") {
    matchedCities.value = [];
    return;
  }
  matchedCities.value = cities.value.filter((el) => el.match(cityModel.value));
  console.log(cityModel);
}

function getWeather() {
  const cityName = "London";
  const url = `${API_URL}?q=${cityName}&appid=${APP_ID}`;
  getWeatherAtCity(url)
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}
</script>

<style scoped>
.box {
  padding: 0;
  border: 1px dotted red;
  width: 200px;
}
.list-item:hover {
  cursor: pointer;
  background-color: bisque;
}

.select {
  background-color: aquamarine;
}
.select > ul {
  border: 1px solid blue;
  text-align: start;
  padding: 0;
}
.select > ul > li {
  list-style-type: none;
  /* background-color: aquamarine; */
  margin: 0;
  padding: 0 0 0 10px;
}
</style>
