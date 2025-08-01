import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const getAuthToken = async () => {
  return await AsyncStorage.getItem("jwt");
};

const getUserMetrics = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/user-metrics/`, {
        headers: { Authorization: token },
    });
};

const getMeta = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/meta/`, {
        headers: { Authorization: token },
    });
};

const getConsumoDia = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/meta-gamificada/dia`, {
        headers: { Authorization: token },
    });
};

export const TelaInicialService = {
    getUserMetrics,
    getMeta,
    getConsumoDia,
};