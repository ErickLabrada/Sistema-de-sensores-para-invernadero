<template>
    <div>
     
      <Navbar />
  
      <div class="filters">
        <h2>Filtrar Reportes</h2>
        <form @submit.prevent="fetchReportData">
          <div>
            <label for="startDate">Fecha Desde:</label>
            <input type="date" v-model="filters.startDate" required />
          </div>
  
          <div>
            <label for="endDate">Fecha Hasta:</label>
            <input type="date" v-model="filters.endDate" required />
          </div>
  
          <div>
            <label for="greenhouse">Invernadero:</label>
            <select v-model="filters.greenhouse" required>
              <option v-for="greenhouse in greenhouses" :key="greenhouse.id" :value="greenhouse.name">
                {{ greenhouse.name }}
              </option>
            </select>
          </div>
  
          <button type="submit">Mostrar Reporte</button>
        </form>
      </div>
  
      <!-- Sección de gráficos -->
      <div class="charts" v-if="reportData">
        <div class="chart-container">
          <h3>Gráfico de Humedad</h3>
          <LineChart :data="humidityData" />
        </div>
  
        <div class="chart-container">
          <h3>Gráfico de Temperatura</h3>
          <LineChart :data="temperatureData" />
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
        reportData: null, 
        humidityData: [], 
        temperatureData: [], 
      };
    },
    methods: {
      fetchReportData() {
       
        console.log("Obteniendo datos para:", this.filters);
  
       
        this.reportData = true; 
  
        
        this.humidityData = {
          labels: ["jhjh1", "B2", "C3"], 
          datasets: [
            {
              label: "Humedad",
              data: [30, 45, 40], 
              borderColor: "#00f", 
              fill: false,
            },
          ],
        };
  
        this.temperatureData = {
          labels: ["A1", "B2", "C3"], 
          datasets: [
            {
              label: "Temperatura",
              data: [22, 24, 21], 
              borderColor: "#f00", 
              fill: false,
            },
          ],
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .filters {
    text-align: center;
    margin-top: 2rem;
  }
  
  .filters form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .filters input,
  .filters select {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 5px;
  }
  
  .charts {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
  }
  
  .chart-container {
    width: 45%;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  