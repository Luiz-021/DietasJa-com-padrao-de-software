import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UsuarioRepository from '../repositories/UsuarioRepository';

export const useCadastroViewModel = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        if (!username.trim() || !senha.trim()) {
            Alert.alert("Erro", "Preencha o nome de usuário e a senha.");
            return;
        }

        try {
            const resultado = await UsuarioRepository.cadastrar(username, senha);

            if (resultado.success) {
                Alert.alert("Sucesso", "Cadastro realizado! Agora informe seus dados.");
                navigation.navigate('PrimeiroAcesso');
            } else {
                if (resultado.error?.status === 400) {
                    Alert.alert("Erro de Cadastro", "Este nome de usuário já está em uso.");
                } else {
                    Alert.alert("Erro", "Não foi possível realizar o cadastro. Tente novamente.");
                }
            }
        } catch (error) {
            console.error("Erro inesperado no ViewModel de cadastro:", error);
            Alert.alert("Erro", "Ocorreu um erro inesperado.");
        }
    };
    
    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        username,
        setUsername,
        senha,
        setSenha,
        handleCadastro,
        handleVoltar,
    };
};