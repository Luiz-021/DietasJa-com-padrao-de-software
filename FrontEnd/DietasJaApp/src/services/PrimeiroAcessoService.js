import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const cadastrarMetricas = async (userData) => {
    const userId = await AsyncStorage.getItem('userId');

    const genero = userData.valoratual === 'masculino' ? 'M' : 'F';

    // Monta o payload para a requisição
    const dataToSend = {
        nome: userData.nome,
        genero: genero,
        altura: parseFloat(userData.altura) / 100,
        peso: parseFloat(userData.peso),
        idade: parseInt(userData.idade, 10),
        usuario: userId,
    };

    return axios.post(`${API_BASE_URL}/api/new-user-metrics/`, dataToSend);
};

export const PrimeiroAcessoService = {
    cadastrarMetricas,
};