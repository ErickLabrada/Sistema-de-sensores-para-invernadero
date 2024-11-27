<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <div class="sensor-section">
        <SensorCard v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
      </div>
      <AlarmList /> 
      <div class="right-section">
       
        <div class="user-profile-section">
          <UserProfile />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/HeaderComponent.vue';
import SensorCard from './components/SensorCard.vue';
import AlarmList from './components/AlarmList.vue';


export default {
  components: {
    Navbar,
    SensorCard,
    AlarmList,
     
  },
  data() {
    return {
      sensors: [
        { id: 1, humidity: '85%', temperature: '25C', type: 'Hum/temp', name: 'Sensor 1' },
        { id: 2, humidity: '80%', temperature: '22C', type: 'Hum/temp', name: 'Sensor 2' },
        { id: 3, humidity: '75%', temperature: '28C', type: 'Hum/temp', name: 'Sensor 3' },
      ]
    };
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 1rem;
}

.content {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap; 
}

.sensor-section {
  display: flex;
  gap: 2rem;
  justify-content: center; 
  flex: 2;
  margin-top: 50px; 
}

.sensor-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4CAF50; 
  border-radius: 50%; 
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


.right-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
  justify-content: flex-start;
  flex: 1;
}

.report-section {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.report-section span {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.report-section button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


@media (max-width: 768px) {
  .content {
    flex-direction: column; 
    align-items: center; 
  }

  .sensor-section {
    margin-top: 20px; 
    gap: 2rem; 
  }

  .sensor-card {
    width: 150px;
    height: 150px;
  }

  .right-section {
    width: 100%;
    align-items: center; 
  }
}
</style>
