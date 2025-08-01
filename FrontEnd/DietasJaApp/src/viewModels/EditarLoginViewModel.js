import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  UsuarioRepository  from '../repositories/UsuarioRepository';

export const useEditarLoginViewModel = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const navigation = useNavigation();

    const handleSalvar = async () => {
        // Lógica de validação da tela
        if (novaSenha !== confirmarNovaSenha) {
            Alert.alert('Erro', 'As novas senhas não coincidem.');
            return;
        }

        try {
            const dadosAtualizacao = {
                email,
                senha_antiga: senha,
                senha_nova: novaSenha
            };

            const response = await UsuarioRepository.atualizarLogin(dadosAtualizacao);

            if (response.status === 200) {
                Alert.alert(
                    'Sucesso',
                    'Seus dados de login foram atualizados. Por favor, faça login novamente.',
                    [
                        { 
                            text: 'OK', 
                            onPress: async () => {
                                await UsuarioRepository.logout();
                                navigation.navigate('Login'); 
                            } 
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Erro ao atualizar login no ViewModel:', error.response?.data);
            if (error.response?.status === 401) {
                Alert.alert('Erro de Autenticação', 'A senha antiga está incorreta.');
            } else {
                Alert.alert('Erro', 'Não foi possível salvar as alterações.');
            }
        }
    };
    
    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        novaSenha,
        setNovaSenha,
        confirmarNovaSenha,
        setConfirmarNovaSenha,
        handleSalvar,
        handleVoltar
    };
};