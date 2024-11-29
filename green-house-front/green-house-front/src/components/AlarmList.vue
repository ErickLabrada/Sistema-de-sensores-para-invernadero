<template>
    <div class="alarm-list">
      <h3></h3>
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
          
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  