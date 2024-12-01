import api from './api';

export const fetchSensors = async () => {
  try {
    const response = await api.get('/sensors');
    return response.data;
  } catch (error) {
    console.error('Error fetching sensors:', error);
    throw error;
  }
};

export const addSensor = async (sensorData) => {
  try {
    const response = await api.post('/sensors', sensorData);
    return response.data;
  } catch (error) {
    console.error('Error adding sensor:', error);
    throw error;
  }
};
