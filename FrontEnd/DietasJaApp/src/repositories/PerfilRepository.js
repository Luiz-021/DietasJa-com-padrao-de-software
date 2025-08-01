import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimeiroAcessoService } from '../services/PrimeiroAcessoService';
import { EditarPerfilService } from '../services/EditarPerfilService';
import { PerfilService } from '../services/PerfilService';

class PerfilRepository {
    static instance = null;

    static getInstance() {
        if (!PerfilRepository.instance) {
            PerfilRepository.instance = new PerfilRepository();
        }
        return PerfilRepository.instance;
    }

    async getMetricas() {
        try {
            // Reutiliza o serviço que já busca os dados do usuário.
            const response = await PerfilService.getUserMetrics();
            return { success: true, data: response.data, status: response.status };
        } catch (error) {
            console.error("Erro no PerfilRepository.getMetricas:", error.response?.data);
            return { success: false, error: error.response || error };
        }
    }

    async cadastrarMetricas(dadosUsuario) {
        try {
            const response = await PrimeiroAcessoService.cadastrarMetricas(dadosUsuario);
            return { success: true, status: response.status };
        } catch (error) {
            console.error("Erro no PerfilRepository.cadastrarMetricas:", error.response?.data);
            return { success: false, error: error.response || error };
        }
    }

    async atualizarMetricas(dadosUsuario) {
        try {
            const response = await EditarPerfilService.updateUserMetrics(dadosUsuario);
            return { success: true, status: response.status };
        } catch (error) {
            console.error("Erro no PerfilRepository.atualizarMetricas:", error.response?.data);
            return { success: false, error: error.response || error };
        }
    }
}

export default PerfilRepository.getInstance();