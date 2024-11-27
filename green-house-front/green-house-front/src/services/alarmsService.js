import api from './api';

export const fetchAlarms = async () => {
  try {
    const response = await api.get('/alarms');
    return response.data;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};

export const addAlarm = async (alarmData) => {
  try {
    const response = await api.post('/alarms', alarmData);
    return response.data;
  } catch (error) {
    console.error('Error adding alarm:', error);
    throw error;
  }
};
