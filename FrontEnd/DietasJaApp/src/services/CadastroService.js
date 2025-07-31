import axios from 'axios';
import { API_BASE_URL } from '../config';

/**
 * Função responsável exclusivamente por fazer a chamada de API para o cadastro.
 * @param {string} username - O nome de utilizador a ser registado.
 * @param {string} password - A senha do utilizador.
 * @returns {Promise<{success: boolean, data?: any, error?: any}>}
 */
const cadastrar = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/sign-in/`, {
      username: username,
      password: password,
    });
    return { success: true, data: response.data, status: response.status };

  } catch (error) {
    return { success: false, error: error.response || error };
  }
};

export const CadastroService = {
  cadastrar,
};