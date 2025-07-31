import axios from 'axios';
import { API_BASE_URL } from '../config';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login/`, {
      username,
      password,
    });

    if (response.status === 200 && response.data.access) {
      return { success: true, token: response.data.access };
    }
    
    return { success: false, error: 'Token não encontrado na resposta da API' };

  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: error.response.data
      };
    }
    return { success: false, error: 'Não foi possível conectar ao servidor.' };
  }
};

export const AuthService = {
  login,
};