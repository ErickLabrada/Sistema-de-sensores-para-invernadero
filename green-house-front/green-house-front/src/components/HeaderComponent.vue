<template>
  <nav class="navbar">
    <!-- Envolvemos el logo con un router-link para redireccionar -->
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
      sensorForm: { section: "", name: "", greenhouse: "" },
      greenhouseForm: { name: "" },
    };
  },
  methods: {
    openModal(type) {
      this.modalType = type;
    },
    closeModal() {
      this.modalType = null;
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
/* Estilo principal de la barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4CAF50;
  color: white;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Ajuste de la barra de navegación */
.navbar-links {
  display: flex;
  flex-wrap: wrap; /* Permite que los botones se ajusten a la pantalla */
  gap: 1rem;
  justify-content: center; /* Centra los botones en la barra */
  flex-grow: 1;
}

.navbar-links button {
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navbar-links button:hover {
  background-color: #45a049;
  color: white;
}

/* Modal */
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
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Responsividad */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
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
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white; /* Color blanco del logo */
  text-decoration: none;
  cursor: pointer;
}

.logo:hover {
  text-decoration: underline; /* Subrayado al pasar el cursor */
}

/* Ajuste de los enlaces y botones */
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
  color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navbar-links button:hover {
  background-color: #45a049;
  color: white;
}
</style>
