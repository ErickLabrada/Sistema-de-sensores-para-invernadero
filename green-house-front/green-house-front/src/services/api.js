import axios from 'axios';

export default {
  data() {
    return {
      sensors: [],
      alarms: [],
    };
  },
  mounted() {
    this.loadSensors();
    this.loadAlarms();
  },
  methods: {
    async loadSensors() {
      try {
        const response = await axios.get('http://tu-backend-api/sensors');
        this.sensors = response.data;
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    },
    async loadAlarms() {
      try {
        const response = await axios.get('http://tu-backend-api/alarms');
        this.alarms = response.data;
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
    },
  },
};
