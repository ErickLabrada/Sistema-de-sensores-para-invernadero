<template>
  <nav class="navbar">
    <div class="logo">Sistema de Sensores</div>
    <div class="navbar-links">
      <button @click="openModal('sensor')">Agregar Sensor</button>
      <button @click="openModal('alarm')">Agregar Alarma</button>
      <button @click="openModal('reports')">Reportes</button>
    </div>
    
    <!-- Modal para agregar Sensor -->
    <div v-if="modalType === 'sensor'" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Agregar Sensor</h2>
        <form @submit.prevent="submitSensor">
          <label for="id">ID:</label>
          <input type="text" id="id" v-model="sensorForm.id" required />
          
          <label for="section">Sección:</label>
          <input type="text" id="section" v-model="sensorForm.section" required />
          
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="sensorForm.name" required />
          
          <label for="temperature">Temperatura:</label>
          <input type="text" id="temperature" v-model="sensorForm.temperature" required />
          
          <label for="humidity">Humedad:</label>
          <input type="text" id="humidity" v-model="sensorForm.humidity" required />
          
          <label for="temperatureF">Temperatura en F:</label>
          <input type="text" id="temperatureF" v-model="sensorForm.temperatureF" required />

          <button type="submit" class="btn">Guardar</button>
        </form>
      </div>
    </div>

    <!-- Modal para agregar Alarma -->
    <div v-if="modalType === 'alarm'" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Agregar Alarma</h2>
        <p>Formulario para agregar una alarma.</p>
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
  </nav>
</template>

<script>
export default {
  data() {
    return {
      modalType: null, // Controla el tipo de modal visible
      sensorForm: {
        id: '',
        section: '',
        name: '',
        temperature: '',
        humidity: '',
        temperatureF: '',
      }
    };
  },
  methods: {
    openModal(type) {
      this.modalType = type; // Abre el modal según el tipo
    },
    closeModal() {
      this.modalType = null; // Cierra el modal
      this.resetForm(); // Resetear el formulario cuando se cierra el modal
    },
    submitSensor() {
      console.log("Datos del sensor:", this.sensorForm);
      // Aquí puedes agregar la lógica para guardar los datos del sensor
      this.closeModal(); // Cerrar el modal después de guardar los datos
    },
    resetForm() {
      this.sensorForm = {
        id: '',
        section: '',
        name: '',
        temperature: '',
        humidity: '',
        temperatureF: '',
      };
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #4CAF50;
  padding: 1rem;
  color: white;
}

.navbar-links button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: black; /* Texto negro en los botones de la navbar */
}

.navbar-links button:hover {
  background-color: #ddd;
}

.logo {
  font-size: 1.5rem;
}

/* Estilos para el modal */
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
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
}

h2 {
  margin-bottom: 1rem;
  color: black; /* Títulos en negro dentro del modal */
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  text-align: left;
  margin-bottom: 0.5rem;
  color: black; /* Texto de las etiquetas en negro */
}

input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: black; /* Texto de los campos de entrada en negro */
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  border: none;
  color: black; /* Botón con texto negro */
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}
</style>
