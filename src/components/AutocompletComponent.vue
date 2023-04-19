<template lang="html">
  <div class="box">
    <input type="text" v-model="cityModel" @input="inputHandle()"  ref="searchCity"/>
    <button @click="addCity()">add city</button>

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

    <!-- <select name="cars" id="cars">
      <input type="text" />
      <option v-for="city in cities" :value="city" :key="city">
        {{ city }}
      </option>
    </select> -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

 let cityModel = ref( "");
const cities = ref(["Kyiv", "Warszaw", "Berlin", "Paris"]);
const matchedCities = ref([]);

function selectCity(event){
    //  cityModel = ''
    const theCity = event.target.getAttribute('data-value')
     cityModel.value = theCity;
//  city.value = theCity
     console.log(cityModel)
}

watch('cityModel',(nv)=>{
    console.log(nv)
})
function inputHandle() {
  if (cityModel.value === "") {
    matchedCities.value = [];
    return
  }
  matchedCities.value = cities.value.filter((el) => el.match(cityModel.value));
  console.log(cityModel);
}

function addCity() {
//   cities.value = [...cities.value, cityModel];
//   cityModel = "";
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
