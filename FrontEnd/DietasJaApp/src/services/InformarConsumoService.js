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
    });
};

const enviarRefeicao = async (refeicaoData) => {
    const token = await getAuthToken();
    return axios.post(`${API_BASE_URL}/api/refeicoes/`, refeicaoData, {
        headers: { Authorization: token },
    });
};

const atualizarMetaGamificada = async (consumoData) => {
    const token = await getAuthToken();
    return axios.patch(`${API_BASE_URL}/api/meta-gamificada/`, consumoData, {
        headers: { Authorization: token },
    });
};

export const InformarConsumoService = {
    getAlimentos,
    enviarRefeicao,
    atualizarMetaGamificada,
};