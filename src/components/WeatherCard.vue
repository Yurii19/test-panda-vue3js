<template lang="html">
  <div class="card">
    <h3>City: {{ params.city_name }}</h3>
    <ul>
      <li>
        <span><b>Temperature:</b> </span
        ><span>{{ params.temp }}&nbsp;&#8451;</span>
      </li>
      <hr />
      <li>
        <span><b>Feels like:</b></span
        ><span> {{ params.feels_like }}&nbsp;&#8451;</span>
      </li>
      <hr />
      <li>
        <span><b>Humidity:</b></span
        ><span>{{ params.humidity }}&nbsp;&#8453;</span>
      </li>
      <hr />
      <li>
        <span><b>Pressure:</b></span
        ><span>{{ params.pressure }}&nbsp;&#13169;</span>
      </li>
      <hr />
      <li>
        <span><b>Temp max:</b></span
        ><span>{{ params.temp_max }}&nbsp;&#8451;</span>
      </li>
      <hr />
      <li>
        <span><b>Temp min:</b></span
        ><span>{{ params.temp_min }}&nbsp;&#8451;</span>
      </li>
    </ul>
    <div class="controls">
      <span class="icon-container" @click="addToFavorite(params.city_name)"
        ><FavoriteIcon
      /></span>
      <span class="icon-container" @click="removeCard()"> <DeleteIcon /></span>
      <span class="icon-container" @click="showChart()"><ChartIcon /></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import FavoriteIcon from "@/icons/FavoriteIcon.vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";
//import DeleteIcon from "@/icons/DeleteIcon.vue";
import ChartIcon from "@/icons/ChartIcon.vue";

// onMounted(() => {
//   console.log(props.params)
// });

const props = defineProps({
  params: {
    id: Number,
    city_name: String,
    feels_like: String,
    humidity: String,
    pressure: String,
    temp: String,
    temp_max: String,
    temp_min: String,
    lat: Number,
    lon: Number,
  },
});
const emit = defineEmits(["deleteCard", "addToFavorit", "showChart"]);

function addToFavorite() {
  emit("addToFavorit", props.params.city_name);
}
function removeCard() {
  emit("deleteCard", props.params.city_name);
}
function showChart() {
  emit("showChart", { lat: props.params.lat, lon: props.params.lon });
}
</script>

<style scoped>
.card {
  width: 300px;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 7px black;
  text-align: start;
}
.controls {
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
}
.icon-container {
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  margin: 5px 0 5px 0;
}
</style>
