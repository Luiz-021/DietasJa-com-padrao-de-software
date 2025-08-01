import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const updateUser = async (loginData) => {
    const token = await AsyncStorage.getItem('jwt');
    const dataToSend = {
        username: loginData.email,
        password: loginData.senha,
    };
    return axios.patch(`${API_BASE_URL}/api/update-user/`, dataToSend, {
        headers: { Authorization: token },
    });
};

export const EditarLoginService = {
    updateUser,
};