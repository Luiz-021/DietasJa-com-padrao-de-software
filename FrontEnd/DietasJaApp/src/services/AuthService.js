import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data.access;
      await AsyncStorage.setItem('jwt', `Bearer ${token}`);
      return { success: true };
    }
    return { success: false, error: 'Erro de login desconhecido' };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return { success: false, error: 'Usuário e/ou senha incorretos.' };
      }
      if (error.response.status === 403) {
        return { success: false, error: error.response.data.detail };
      }
    }
    return { success: false, error: 'Erro ao tentar fazer login.' };
  }
};

export const AuthService = {
  login,
};