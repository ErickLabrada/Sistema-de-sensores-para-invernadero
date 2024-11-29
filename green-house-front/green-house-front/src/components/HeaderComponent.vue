<template>
  <nav class="navbar">
    <div class="logo">Sistema de Sensores</div>
    <div class="navbar-links">
      <button @click="openModal('sensor')">Agregar Sensor</button>
      <button @click="openModal('alarm')">Agregar Alarma</button>

      <!-- Cambio de Modal a Navegación con router-link -->
      <router-link to="/report">
        <button>Reportes</button>
      </router-link>

      <button @click="openModal('greenhouse')">Agregar Invernadero</button>
    </div>
  </nav>
  <!-- Modal para agregar Sensor -->
  <div v-if="modalType === 'sensor'" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Agregar Sensor</h2>
      <form @submit.prevent="submitSensor">
        <label for="section">Sección:</label>
        <input type="text" id="section" v-model="sensorForm.section" required />

        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="sensorForm.name" required />

        <label for="greenhouse">Invernadero:</label>
        <input type="text" id="greenhouse" v-model="sensorForm.greenhouse" required />

        <button type="submit" class="btn">Guardar</button>
      </form>
    </div>
  </div>

  <!-- Modal para agregar Alarma -->
  <div v-if="modalType === 'alarm'" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Agregar Alarma</h2>
      <form @submit.prevent="submitAlarm">
        <label for="name">Nombre de la Alarma:</label>
        <input type="text" id="name" v-model="alarmForm.name" required />

        <label for="greenhouse">Invernadero:</label>
        <select id="greenhouse" v-model="alarmForm.greenhouse" required>
          <option v-for="greenhouse in greenhouses" :key="greenhouse.id" :value="greenhouse.name">{{ greenhouse.name }}</option>
        </select>

        <label for="sensor">Seleccionar Sensor:</label>
        <select id="sensor" v-model="alarmForm.sensor" required>
          <option v-for="sensor in sensors" :key="sensor.id" :value="sensor">{{ sensor.name }}</option>
        </select>

        <button type="submit" class="btn">Guardar</button>
      </form>
    </div>
  </div>

  <!-- Modal para Reportes -->
  <div v-if="modalType === 'reports'" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Reportes</h2>
      <p>Formulario para visualizar reportes.</p>
    </div>
  </div>

  <!-- Modal para Agregar Invernadero -->
  <div v-if="modalType === 'greenhouse'" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Agregar Invernadero</h2>
      <form @submit.prevent="submitGreenhouse">
        <label for="greenhouseName">Nombre del Invernadero:</label>
        <input type="text" id="greenhouseName" v-model="greenhouseForm.name" required />
        
        <button type="submit" class="btn">Agregar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalType: null,
      sensorForm: {
        section: '',
        name: '',
        greenhouse: '',
      },
      alarmForm: {
        name: '',
        greenhouse: '',
        sensor: null,
      },
      greenhouseForm: {
        name: '', 
      },
      greenhouses: [
        { id: 1, name: 'Invernadero 1' },
        { id: 2, name: 'Invernadero 2' },
        { id: 3, name: 'Invernadero 3' },
      ],
      sensors: [
        { id: 1, name: 'Sensor 1' },
        { id: 2, name: 'Sensor 2' },
        { id: 3, name: 'Sensor 3' },
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
    submitSensor() {
      console.log('Datos del sensor:', this.sensorForm);
      this.closeModal();
    },
    submitAlarm() {
      console.log('Datos de la alarma:', this.alarmForm);
      this.closeModal();
    },
    submitGreenhouse() {
      console.log('Invernadero agregado:', this.greenhouseForm.name);
      this.closeModal();
    },
    resetForms() {
      this.sensorForm = {
        section: '',
        name: '',
        greenhouse: '',
      };
      this.alarmForm = {
        name: '',
        greenhouse: '',
        sensor: null,
      };
      this.greenhouseForm = {
        name: '',
      };
    },
  },
};
</script>

<style scoped>
@import '../assets/stylesHeader.css';
</style>
