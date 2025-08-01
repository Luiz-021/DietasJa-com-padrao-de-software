import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const getAuthToken = async () => {
    return await AsyncStorage.getItem("jwt");
};

const getMeta = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/meta/`, {
        headers: { Authorization: token },
    });
};

const getMetaSemana = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/meta-gamificada/semana`, {
        headers: { Authorization: token },
    });
};

export const HistoricoConsumoService = {
    getMeta,
    getMetaSemana,
};