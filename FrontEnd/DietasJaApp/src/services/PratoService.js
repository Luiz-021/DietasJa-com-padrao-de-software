import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const getAuthToken = async () => {
  return await AsyncStorage.getItem("jwt");
};

const getAlimentos = async () => {
  const token = await getAuthToken();
  return axios.get(`${API_BASE_URL}/api/alimentos/`, {
    headers: { Authorization: token },
    validateStatus: () => true,
  });
};

const addAlimento = async (alimentoData) => {
  const token = await getAuthToken();
  return axios.post(`${API_BASE_URL}/api/alimentos/`, alimentoData, {
    headers: { Authorization: token },
    validateStatus: () => true,
  });
};

const deleteAlimento = async (idAlimento) => {
  const token = await getAuthToken();
  return axios.delete(`${API_BASE_URL}/api/alimentos/${idAlimento}`, {
    headers: { Authorization: token },
    validateStatus: () => true,
  });
};

export const PratoService = {
  getAlimentos,
  addAlimento,
  deleteAlimento,
};