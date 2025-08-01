import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PerfilRepository from '../repositories/PerfilRepository';

export const usePerfilViewModel = () => {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            try {
                const response = await PerfilRepository.getMetricas();
                if (response.success) {
                    const { nome, genero, idade, altura, peso } = response.data;
                    setNome(nome);
                    setSexo(genero);
                    setIdade(idade);
                    setAltura(altura * 100);
                    setPeso(peso);
                } else if (response.error?.status === 401) {
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchUserInfo);
        fetchUserInfo();
        return unsubscribe;

    }, [navigation]);

    const handleAlterarInformacoes = () => {
        navigation.navigate("EditarPerfil");
    };

    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        nome,
        sexo,
        idade,
        altura,
        peso,
        isLoading,
        handleAlterarInformacoes,
        handleVoltar,
    };
};