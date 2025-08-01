import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const getAuthToken = async () => {
    return await AsyncStorage.getItem('jwt');
};

const getMeta = async () => {
    const token = await getAuthToken();
    return axios.get(`${API_BASE_URL}/api/meta/`, {
        headers: { Authorization: token },
        validateStatus: () => true,
    });
};

const createMeta = async (metaData) => {
    const token = await getAuthToken();
    return axios.post(`${API_BASE_URL}/api/meta/`, metaData, {
        headers: { Authorization: token },
        validateStatus: () => true,
    });
};

const updateMeta = async (metaData) => {
    const token = await getAuthToken();
    return axios.patch(`${API_BASE_URL}/api/meta/`, metaData, {
        headers: { Authorization: token },
        validateStatus: () => true,
    });
};

export const MetaService = {
    getMeta,
    createMeta,
    updateMeta,
};