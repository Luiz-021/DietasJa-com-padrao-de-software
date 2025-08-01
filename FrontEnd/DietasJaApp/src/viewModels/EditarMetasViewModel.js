import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MetaService } from '../services/MetaService';

export const useEditarMetasViewModel = () => {
    const [meta, setMeta] = useState(0);
    const [novaMeta, setNovaMeta] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [existeMeta, setExisteMeta] = useState(false);
    const navigation = useNavigation();

    const margem = Math.ceil(0.02 * meta);

    useEffect(() => {
        fetchMeta();
    }, []);

    const fetchMeta = async () => {
        setIsLoading(true);
        try {
            const response = await MetaService.getMeta();
            if (response.status === 200 && response.data.length > 0) {
                setMeta(parseFloat(response.data[0]['qtd_calorias']) / 1000);
                setExisteMeta(true);
            } else {
                setMeta(0);
                setExisteMeta(false);
                Alert.alert("Atenção", "Você não possui uma meta diária cadastrada. Informe uma e conclua para cadastrar.");
            }
        } catch (error) {
            console.error('Erro ao buscar meta:', error);
            setMeta(0);
            setExisteMeta(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleConcluir = async () => {
        const novaMetaInt = parseInt(novaMeta, 10);
        if (isNaN(novaMetaInt) || novaMetaInt <= 0) {
            Alert.alert("Erro", "O campo nova meta deve ser um número positivo.");
            return;
        }
        
        const metaEmCalorias = novaMetaInt * 1000;
        
        try {
            let response;
            if (existeMeta) {
                response = await MetaService.updateMeta({ qtd_calorias: metaEmCalorias });
            } else {
                response = await MetaService.createMeta({ qtd_calorias: metaEmCalorias });
            }

            if (response.status === 200 || response.status === 201) {
                setMeta(novaMetaInt);
                setNovaMeta("");
                setExisteMeta(true);
                Alert.alert("Sucesso", `Sua meta foi ${existeMeta ? 'atualizada' : 'cadastrada'} com sucesso!`);
            } else {
                throw new Error('Falha ao salvar a meta');
            }
        } catch (error) {
            console.error('Erro ao salvar meta:', error);
            Alert.alert("Erro", "Não foi possível salvar a nova meta.");
        }
    };

    const handleVoltar = () => {
        navigation.goBack();
    };

    return {
        meta,
        novaMeta,
        setNovaMeta,
        margem,
        isLoading,
        handleConcluir,
        handleVoltar,
    };
};