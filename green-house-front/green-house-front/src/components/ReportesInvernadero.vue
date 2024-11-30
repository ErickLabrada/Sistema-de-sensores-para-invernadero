<template>
  <div>
    <Navbar />

    <!-- Contenedor principal -->
    <div class="main-container">
      <!-- Filtros -->
      <div class="filters">
        <div class="filter-group-row">
          <div class="filter-item">
            <label for="startDate">Fecha Desde:</label>
            <input type="date" v-model="filters.startDate" required />
          </div>

          <div class="filter-item">
            <label for="endDate">Fecha Hasta:</label>
            <input type="date" v-model="filters.endDate" required />
          </div>

          <div class="filter-item">
            <label for="greenhouse">Invernadero:</label>
            <select v-model="filters.greenhouse" required>
              <option v-for="greenhouse in greenhouses" :key="greenhouse.id" :value="greenhouse.name">
                {{ greenhouse.name }}
              </option>
            </select>
          </div>

          <button type="button" class="btn-submit" @click="fetchReportData">Mostrar</button>
        </div>
      </div>

      <!-- Filtros por tipo de gráfico -->
      <div class="chart-filters">
        <button @click="showHumidity" class="btn-chart">Humedad</button>
        <button @click="showTemperature" class="btn-chart">Temperatura</button>
      </div>

      <!-- Contenedor de gráficos -->
      <div class="chart-container">
        <h3>Reporte Gráfico</h3>
        <div v-if="currentChart === 'humidity' && humidityData.datasets.length > 0">
          <LineChart :data="humidityData" />
        </div>
        <div v-else-if="currentChart === 'humidity'">
          <p>No hay datos de humedad para mostrar.</p>
        </div>

        <div v-if="currentChart === 'temperature' && temperatureData.datasets.length > 0">
          <LineChart :data="temperatureData" />
        </div>
        <div v-else-if="currentChart === 'temperature'">
          <p>No hay datos de temperatura para mostrar.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/HeaderComponent.vue";
import LineChart from "@/components/LineChart.vue";

export default {
  components: {
    Navbar,
    LineChart,
  },
  data() {
    return {
      filters: {
        startDate: "",
        endDate: "",
        greenhouse: "",
      },
      greenhouses: [
        { id: 1, name: "Invernadero 1" },
        { id: 2, name: "Invernadero 2" },
        { id: 3, name: "Invernadero 3" },
      ],
      humidityData: { labels: [], datasets: [] },
      temperatureData: { labels: [], datasets: [] },
      currentChart: "humidity", // Control para alternar gráficos
    };
  },
  methods: {
    fetchReportData() {
      if (!this.filters.startDate || !this.filters.endDate || !this.filters.greenhouse) {
        alert("Por favor, complete todos los filtros.");
        return;
      }

      this.humidityData = {
        labels: ["01/11", "02/11", "03/11"],
        datasets: [
          {
            label: "Humedad",
            data: [60, 70, 80],
            borderColor: "#42A5F5",
            fill: false,
          },
        ],
      };

      this.temperatureData = {
        labels: ["01/11", "02/11", "03/11"],
        datasets: [
          {
            label: "Temperatura",
            data: [25, 26, 27],
            borderColor: "#FFA726",
            fill: false,
          },
        ],
      };
    },
    showHumidity() {
      this.currentChart = "humidity";
    },
    showTemperature() {
      this.currentChart = "temperature";
    },
  },
};
</script>

<style scoped>
/* Ajuste del espaciado global */
.main-container {
  margin: 4rem auto; /* Incremento del margen superior */
  padding: 10rem;
  max-width: 800px;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem; /* Más espacio debajo de los filtros */
}

.filter-group-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.btn-submit {
  padding: 0.5rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #45a049;
}

.btn-chart {
  padding: 0.5rem 1.5rem;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.5rem;
}

.btn-chart:hover {
  background-color: #1e88e5;
}

.chart-container {
  margin-top: 3rem; /* Más espacio encima de los gráficos */
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.chart-container h3 {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .filter-group-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
