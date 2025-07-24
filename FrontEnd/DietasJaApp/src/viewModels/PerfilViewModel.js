import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PerfilService } from '../services/PerfilService';

export const usePerfilViewModel = () => {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            try {
                const response = await PerfilService.getUserMetrics();
                if (response.status === 200) {
                    const { nome, genero, idade, altura, peso } = response.data;
                    setNome(nome);
                    setSexo(genero);
                    setIdade(idade);
                    setAltura(altura * 100);
                    setPeso(peso);
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    navigation.navigate('Login');
                }
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
        const unsubscribe = navigation.addListener('focus', () => fetchUserInfo());
        return unsubscribe;

    }, [navigation]);

    const handleAlterarInformacoes = () => {
        navigation.navigate("EditarPerfil");
    };

    const handleVoltar = () => {
        navigation.goBack();
    };

    // A função para 'EditarLogin' foi removida do seu código original,
    // mas se precisar, pode adicionar aqui:
    // const handleAlterarCadastro = () => {
    //     navigation.navigate('EditarLogin')
    // }

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