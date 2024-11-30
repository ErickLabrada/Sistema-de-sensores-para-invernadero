//Este es para el dashboard la informacion del listado de sensores
//y la lista de alarmas
<template>
    <div class="content">
      <div class="sensor-table-container">
        <div class="sensor-table-section">
          <h2>Listado de Sensores</h2>
          <table class="sensor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sección</th>
                <th>Nombre</th>
                <th>Invernadero</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sensor in sensors" :key="sensor.id">
                <td data-label="ID">{{ sensor.id }}</td>
                <td data-label="Sección">{{ sensor.section }}</td>
                <td data-label="Nombre">{{ sensor.name }}</td>
                <td data-label="Invernadero">{{ sensor.greenhouse }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="alarm-table-container">
        <div class="alarm-table-section">
          <h2>Listado de Alarmas</h2>
          <table class="alarm-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Invernadero</th>
                <th>Sensor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alarm in alarms" :key="alarm.name">
                <td data-label="Nombre">{{ alarm.name }}</td>
                <td data-label="Invernadero">{{ alarm.greenhouse }}</td>
                <td data-label="Sensor">{{ alarm.sensor.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sensors: [
          { id: 1, section: 'A1', name: 'Sensor 1', greenhouse: 'Invernadero 1' },
          { id: 2, section: 'B2', name: 'Sensor 2', greenhouse: 'Invernadero 2' },
          { id: 3, section: 'C3', name: 'Sensor 3', greenhouse: 'Invernadero 3' },
        ],
        alarms: [],
        alarmForm: {
          name: '',
          greenhouse: '',
          sensor: null,
        },
        greenhouses: [
          { id: 1, name: 'Invernadero 1' },
          { id: 2, name: 'Invernadero 2' },
          { id: 3, name: 'Invernadero 3' },
        ],
      };
    },
    methods: {
      openModal(type) {
        this.modalType = type;
      },
      closeModal() {
        this.modalType = null;
        this.resetForms();
      },
      submitAlarm() {
        if (this.alarmForm.sensor) {
          this.alarms.push({
            name: this.alarmForm.name,
            greenhouse: this.alarmForm.greenhouse,
            sensor: this.alarmForm.sensor,
          });
          console.log('Datos de la alarma:', this.alarmForm);
          this.closeModal();
        } else {
          alert('Por favor, seleccione un sensor.');
        }
      },
      resetForms() {
        this.alarmForm = {
          name: '',
          greenhouse: '',
          sensor: null,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  @import '../assets/stylesApp.css';
  </style>
  