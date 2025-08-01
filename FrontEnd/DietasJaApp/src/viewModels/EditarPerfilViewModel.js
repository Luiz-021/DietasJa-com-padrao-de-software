import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import PerfilRepository from '../repositories/PerfilRepository';

export const useEditarPerfilViewModel = () => {
    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const navigation = useNavigation();
    const items = [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
    ];

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const response = await PerfilRepository.getMetricas();
            if (response.success) {
                const { nome, peso, altura, idade, genero } = response.data;
                setNome(nome || '');
                setPeso(peso?.toString() || '');
                setAltura((altura * 100)?.toString() || '');
                setIdade(idade?.toString() || '');
                setSexo(genero || null);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
        } finally {
            setIsLoading(false);
        }
    };

    const salvarAlteracoes = async () => {
        if (!validarCampos()) return;

        const userData = {
            nome,
            genero: sexo,
            altura: parseFloat(altura) / 100,
            peso: parseFloat(peso),
            idade: parseInt(idade, 10),
        };

        try {
            const response = await PerfilRepository.atualizarMetricas(userData);
            if (response.success) {
                Alert.alert("Sucesso", "Suas alterações foram salvas com sucesso.");
                navigation.goBack();
            } else {
                 Alert.alert("Erro", "Não foi possível salvar as alterações.");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações.");
        }
    };

    const validarCampos = () => {
        if (nome.trim() === "") { Alert.alert("Erro", "Por favor, informe o nome."); return false; }
        if (sexo === null) { Alert.alert("Erro", "Por favor, escolha o sexo."); return false; }
        if (idade.trim() === "" || isNaN(idade)) { Alert.alert("Erro", "Por favor, informe uma idade válida."); return false; }
        if (altura.trim() === "" || isNaN(altura)) { Alert.alert("Erro", "Por favor, informe uma altura válida."); return false; }
        if (peso.trim() === "" || isNaN(peso)) { Alert.alert("Erro", "Por favor, informe um peso válido."); return false; }
        return true;
    };

    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        nome, setNome, peso, setPeso, altura, setAltura, idade, setIdade, sexo, setSexo, isOpen, setIsOpen, items, isLoading, salvarAlteracoes, handleVoltar,
    };
};