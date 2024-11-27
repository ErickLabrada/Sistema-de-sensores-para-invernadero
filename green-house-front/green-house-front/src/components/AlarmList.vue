<template>
    <div class="alarm-list">
      <h3>Próximas Alarmas</h3>
      <ul>
        <li v-for="alarm in alarms" :key="alarm.time">{{ alarm.time }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        alarms: [
          { time: '8:45 am' },
          { time: '10:00 am' },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .alarm-list {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .alarm-list h3 {
    margin-bottom: 1rem;
  }
  
  .alarm-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .alarm-list li {
    padding: 0.5rem;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }
  </style>
  