import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const getAuthToken = async () => {
    return await AsyncStorage.getItem('jwt');
};

const getUserMetrics = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/user-metrics/`, {
        headers: { Authorization: token },
    });
};

const updateUserMetrics = async (userData) => {
    const token = await getAuthToken();
    return axios.patch(`${API_BASE_URL}/api/user-metrics/`, userData, {
        headers: { Authorization: token },
    });
};

export const EditarPerfilService = {
    getUserMetrics,
    updateUserMetrics,
};