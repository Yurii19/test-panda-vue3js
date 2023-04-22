<template lang="html">
  <div class="chart">
    <h3>
      {{ chartTitle }}
    </h3>
    <Line id="my-chart-id" :options="chartOptions" :data="data" />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
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
});

const chartTitle = computed(() => {
  const now = new Date() + "";
  const data = now.slice(4, 21);
  return `Hourly weather forecast for ${props.data.datasets[0].label} (${data}) for the next 24  hours`;
});

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
