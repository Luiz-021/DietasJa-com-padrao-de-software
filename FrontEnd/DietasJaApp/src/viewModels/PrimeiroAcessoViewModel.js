import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimeiroAcessoService } from '../services/PrimeiroAcessoService';

export const usePrimeiroAcessoViewModel = () => {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [valoratual, setValorAtual] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
    ];

    const handleAvançar = async () => {
        if (nome.trim() === "") {
            Alert.alert("Erro", "Por favor, informe o nome.");
            return;
        }
        if (valoratual === null) {
            Alert.alert("Erro", "Por favor, escolha o sexo.");
            return;
        }
        if (idade.trim() === "") {
            Alert.alert("Erro", "Por favor, informe a idade.");
            return;
        }
        if (altura.trim() === "") {
            Alert.alert("Erro", "Por favor, informe a altura.");
            return;
        }
        if (peso.trim() === "") {
            Alert.alert("Erro", "Por favor, informe o peso.");
            return;
        }

        try {
            const userData = { nome, valoratual, idade, altura, peso };
            const response = await PrimeiroAcessoService.cadastrarMetricas(userData);

            if (response.status === 201) {
                Alert.alert("Bem-vindo", "Usuário criado com sucesso");
                navigation.navigate('Login');
            } else {
                console.log(response.data);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar o usuário, tente novamente mais tarde");
            console.log(error.response?.data || error.message);
        }
    };

    return {
        nome, setNome,
        peso, setPeso,
        altura, setAltura,
        idade, setIdade,
        valoratual, setValorAtual,
        isOpen, setIsOpen,
        items,
        handleAvançar,
    };
};