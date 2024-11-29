<template>
    <div class="sensor-card">
      <div class="sensor-info">
        <p>{{ sensor.humidity }} / {{ sensor.temperature }} C</p>
        <p>{{ sensor.type }} / {{ sensor.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sensor: Object,
    }
  }
  </script>
  
  <style scoped>
  .sensor-card {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #4CAF50;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .sensor-info p {
    margin: 0;
    font-size: 0.9rem;
  }
  </style>
  
  