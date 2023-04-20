<template lang="html">
  <div class="box">
    <label for="city">Start typing to find city</label>
    <input
      id="city"
      type="text"
      v-model="cityModel"
      @input="inputHandle()"
      ref="searchCity"
    />
    <!-- <button @click="getWeather()">add city</button> -->

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
import { ref, watch, defineEmits } from "vue";
import { getWeatherAtCity } from "../services/services";
import { APP_ID, API_URL } from "../variables";
// import { json } from "body-parser";

let cityModel = ref("");
const cities = ref(["Kyiv", "Warszaw", "Berlin", "Paris"]);
const matchedCities = ref([]);

const emit = defineEmits(["selectCity"]);

// function onSelectCity(params) {
//     emit('eventA')
//     emit('eventB', params)
// }

function selectCity(event) {
  const theCity = event.target.getAttribute("data-value");
  cityModel.value = theCity;
  matchedCities.value = [];
  emit("selectCity", { cityName: cityModel.value });
}


function inputHandle() {
  if (cityModel.value === "") {
    matchedCities.value = [];
    return;
  }
  matchedCities.value = cities.value.filter((el) =>
    el.toLocaleLowerCase().match(cityModel.value.toLowerCase())
  );
}

// function getWeather() {
//   const cityName = "London";
//   const url = `${API_URL}?q=${cityName}&appid=${APP_ID}&units=metric`;
//   getWeatherAtCity(url)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));
// }
</script>

<style scoped>
.box {
  padding: 10px 0 0 0;
  border: 1px dotted red;
  width: 300px;
  position: relative;
  /* margin-bottom: 10px; */
  background-color: #dcdde1;
}
.list-item:hover {
  cursor: pointer;
  background-color: #82ccdd;
}

.select {
  background-color: #dcdde1;
}
.select > ul {
  /* border: 1px solid blue; */
  text-align: start;
  position: absolute;
  width: 300px;
  background-color: #dcdde1;
  margin: 0;
  padding: 10px 0 0 0;
  /* top: 0;
  right: 0; */
  /* background-color: greenyellow; */
}
.select > ul > li {
  list-style-type: none;
  /* background-color: aquamarine; */
  margin: 0;
  /* padding: 0 0 0 10px; */
  padding: 10px 10px 10px 15px;
}
input {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid black;
  font-size: 1em;
  width: 90%;
}
</style>
