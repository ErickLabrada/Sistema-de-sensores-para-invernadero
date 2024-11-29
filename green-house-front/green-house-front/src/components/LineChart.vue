<template>
    <div>
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Line } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";
  
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);
  
  export default {
    name: "LineChart",
    extends: Line,
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.renderChart(this.data, {
        responsive: true,
        maintainAspectRatio: false,
      });
    },
  };
  </script>
  