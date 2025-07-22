// src/services/AuthService.js (Versão Corrigida)
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login/`, {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data.access;
      await AsyncStorage.setItem('jwt', `Bearer ${token}`);
      // Retorna sucesso
      return { success: true };
    }
    // Caso de erro inesperado sem exceção
    return { success: false, error: 'Erro desconhecido' };

  } catch (error) {
    if (error.response) {
      // Retorna o erro detalhado da API para o ViewModel tratar
      return {
        success: false,
        status: error.response.status, // Ex: 401 ou 403
        data: error.response.data      // Ex: { detail: "Email não verificado" }
      };
    }
    // Erro de rede ou outro erro genérico
    return { success: false, error: 'Não foi possível conectar ao servidor.' };
  }
};

export const AuthService = {
  login,
};