<template lang="html">
  <div class="chart">
    <Line id="my-chart-id" :options="chartOptions" :data="data" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
// import * as chartConfig from "./chartConfig.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "#fbc531",
          borderColor: "#273c75",
          data: [40, 20, 12],
        },
      ],
    }),
  },
  //   labels: {
  //     type: Array,
  //     default: () => [
  //       "January",
  //       "February",
  //       "March",
  //       "April",
  //       "May",
  //       "June",
  //       "July",
  //     ],
  //   },
  //   data: { type: Array, default: () =>  [40, 39, 10, 40, 39, 80, 40] },
});

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: "Temperature",
      backgroundColor: "#fbc531",
      borderColor: "#273c75",
      data: props.data,
    },
  ],
};
const chartOptions = {
  responsive: true,
};
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
</style>
