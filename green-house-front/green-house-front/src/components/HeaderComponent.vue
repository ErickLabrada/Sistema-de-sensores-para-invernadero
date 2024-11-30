<template>
  <nav class="navbar">
    <router-link to="/inicio" class="logo">Sistema de Sensores</router-link>
    <div class="navbar-links">
      <button @click="openModal('sensor')">Agregar Sensor</button>
      <button @click="openModal('alarm')">Agregar Alarma</button>
      <router-link to="/reports">
        <button>Reportes</button>
      </router-link>
      <button @click="openModal('greenhouse')">Agregar Invernadero</button>
    </div>
  </nav>

  <!-- Modal -->
  <div v-if="modalType" class="modal">
    <div class="modal-content" :class="{ 'modal-animate': modalType }">
      <span class="close" @click="closeModal">&times;</span>
      <template v-if="modalType === 'alarm'">
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
      </template>
      <template v-else-if="modalType === 'sensor'">
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
      </template>
      <template v-else-if="modalType === 'greenhouse'">
        <h2>Agregar Invernadero</h2>
        <form @submit.prevent="submitGreenhouse">
          <label for="greenhouseName">Nombre del Invernadero:</label>
          <input type="text" id="greenhouseName" v-model="greenhouseForm.name" required />
          <button type="submit" class="btn">Agregar</button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalType: null,
      alarmForm: { name: "", greenhouse: "", sensor: "" },
      sensorForm: { section: "", name: "", greenhouse: "" },
      greenhouseForm: { name: "" },
      greenhouses: [], // Inicializar
      sensors: [],
    };
  },
  methods: {
    openModal(type) {
      this.modalType = type;
    },
    closeModal() {
      this.modalType = null;
    },
    submitAlarm() {
      console.log("Alarma agregada:", this.alarmForm);
      this.closeModal();
    },
    submitSensor() {
      console.log("Sensor agregado:", this.sensorForm);
      this.closeModal();
    },
    submitGreenhouse() {
      console.log("Invernadero agregado:", this.greenhouseForm.name);
      this.closeModal();
    },
  },
};
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4caf50;
  color: white;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.logo:hover {
  text-decoration: underline; 
}

.navbar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  flex-grow: 1;
}

.navbar-links button {
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navbar-links button:hover {
  background-color: #45a049;
  color: white;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-30%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  .navbar-links {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .navbar-links button {
    width: 100%;
    text-align: center;
  }
}
</style>
