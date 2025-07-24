import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EditarLoginService } from '../services/EditarLoginService';

export const useEditarLoginViewModel = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [novasenha, setNSenha] = useState('');
    const [validarsenha, setValiSenha] = useState('');

    const handleSalvar = async () => {
        if (email.trim() === '' || senha.trim() === '' || novasenha.trim() !== validarsenha.trim()) {
            Alert.alert("Erro", "Informações Inválidas. Verifique se todos os campos estão preenchidos e se as novas senhas coincidem.");
            return;
        }

        try {
            const loginData = { email, senha: novasenha }; 
            const response = await EditarLoginService.updateUser(loginData);

            if (response.status === 200) {
                Alert.alert("Sucesso", "Informações alteradas com sucesso!");
                navigation.goBack();
            } else {
                console.log(response.data);
                Alert.alert("Erro", "Não foi possível alterar as informações.");
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            Alert.alert("Erro", "Ocorreu um problema ao salvar as alterações. Tente novamente.");
        }
    };

    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        email, setEmail,
        senha, setSenha,
        novasenha, setNSenha,
        validarsenha, setValiSenha,
        handleSalvar,
        handleVoltar,
    };
};