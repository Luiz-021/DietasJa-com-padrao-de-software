import { AuthService } from '../services/AuthService';
import { CadastroService } from '../services/CadastroService';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UsuarioRepository {
    static instance = null;

    constructor() {
        if (UsuarioRepository.instance) {
            return UsuarioRepository.instance;
        }
        UsuarioRepository.instance = this;
    }

    static getInstance() {
        if (!UsuarioRepository.instance) {
            UsuarioRepository.instance = new UsuarioRepository();
        }
        return UsuarioRepository.instance;
    }

    async login(username, password) {
        try {
            const result = await AuthService.login(username, password);
            if (result.success && result.token) {
                await AsyncStorage.setItem('jwt', `Bearer ${result.token}`);
            }
            return result;
        } catch (error) {
            console.error("Erro no UsuarioRepository.login:", error);
            return { success: false, error: 'Erro de conexão no repositório.' };
        }
    }

    async cadastrar(username, password) {
        try {
            const result = await CadastroService.cadastrar(username, password);
            if (result.success && result.data?.id) {
                await AsyncStorage.setItem('userId', `${result.data.id}`);
            }
            return result;
        } catch (error) {
            console.error("Erro no UsuarioRepository.cadastrar:", error);
            return { success: false, error: 'Erro de conexão no repositório.' };
        }
    }
    
    async logout() {
        try {
            await AsyncStorage.removeItem('jwt');
            await AsyncStorage.removeItem('userId');
        } catch (error) {
            console.error("Erro no UsuarioRepository.logout:", error);
            throw error;
        }
    }
}

export default UsuarioRepository.getInstance();