<template lang="html">
  <div class="box">
    <div class="controls">
      <label for="city">Start typing to find city</label><span @click="clearInput()">&#10006;</span>
    </div>

    <input
      id="city"
      type="text"
      v-model="cityModel"
      @input="inputHandle()"
      ref="searchCity"
    />

    <div class="select">
      <ul>
        <li
          class="list-item"
          v-for="city in matchedCities"
          :data-value="city.name"
          :key="city.id"
          @click="selectCity($event)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import cityData from "../assets/city.list.json";

let cityModel = ref("");
const cities = ref([{ name: "Kyiv", id: 0 }]);
const matchedCities = ref([]);

const emit = defineEmits(["selectCity"]);

onMounted(() => {
  cities.value = cityData;
});

function selectCity(event) {
  const theCity = event.target.getAttribute("data-value");
  cityModel.value = theCity;
  matchedCities.value = [];
  emit("selectCity", { cityName: cityModel.value });
}

function inputHandle() {
  console.log(cityModel.value);
  if (cityModel.value === "") {
    matchedCities.value = [];
    return;
  }
  matchedCities.value = cities.value.filter((el) => {
    const patern = new RegExp("^" + cityModel.value.toLowerCase());
    return el.name.toLocaleLowerCase().match(patern);
  });
}

function clearInput(){
  cityModel.value = ''
  matchedCities.value = ''
}
</script>

<style scoped>
/* bg-color: #f5f6fa */
.box {
  padding: 10px 0 0 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 300px;
  position: relative;
  background-color: #dfe6e9;
}
.list-item:hover {
  cursor: pointer;
  background-color: #82ccdd;
}

.controls {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 0 15px;
}
.controls > span {
  cursor: pointer;
}
.select > ul {
  text-align: start;
  position: absolute;
  width: 300px;
  background-color: #dfe6e9;
  margin: 0;
  padding: 10px 0 0 0;
  max-height: 50vh;
  overflow-y: auto;
}
.select > ul > li {
  list-style-type: none;
  margin: 0;
  padding: 10px 10px 10px 15px;
}
input {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  font-size: 1em;
  width: 90%;
  border-style: none;
}
</style>
