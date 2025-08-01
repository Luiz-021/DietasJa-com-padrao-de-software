import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TelaInicialService } from '../services/TelaInicialService';

export const useTelaInicialViewModel = () => {
    const [nome, setNome] = useState('');
    const [meta, setMeta] = useState(0);
    const [consumo, setConsumo] = useState(0);
    const [carb, setCarb] = useState(0);
    const [proteina, setProteina] = useState(0);
    const [gordura, setGordura] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const [metaCarb, setMetaCarb] = useState(0);
    const [metaProteina, setMetaProteina] = useState(0);
    const [metaGordura, setMetaGordura] = useState(0);

    const resto = meta > consumo ? meta - consumo : 0;
    const progresso = meta > 0 ? consumo / meta : 0;

    useEffect(() => {
        const enviarSolicitacaoGET = async () => {
            setIsLoading(true);
            try {
                const respostanome = await TelaInicialService.getUserMetrics();
                setNome(respostanome.data.nome);

                const respostameta = await TelaInicialService.getMeta();
                if (respostameta.data && respostameta.data.length > 0) {
                    const metaKcal = respostameta.data[0]['qtd_calorias'] / 1000;
                    setMeta(metaKcal);

                    // Lógica para calcular metas de macros (ex: 40% C, 30% P, 30% G)
                    setMetaCarb((metaKcal * 0.40) / 4);
                    setMetaProteina((metaKcal * 0.30) / 4);
                    setMetaGordura((metaKcal * 0.30) / 9);
                } else {
                    setMeta(0);
                    Alert.alert("Bem vindo(a)!", "Você ainda não possui uma meta. Cadastre-a em Editar Meta.");
                }

                const respostaconsumo = await TelaInicialService.getConsumoDia();
                setConsumo((respostaconsumo.data.calorias_consumidas || 0) / 1000);
                setCarb(parseFloat(respostaconsumo.data.qtd_carboidratos || 0));
                setProteina(parseFloat(respostaconsumo.data.qtd_proteinas || 0));
                setGordura(parseFloat(respostaconsumo.data.qtd_gorduras || 0));

            } catch (error) {
                console.log('Erro ao carregar dados da tela inicial:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', enviarSolicitacaoGET);
        enviarSolicitacaoGET();
        return unsubscribe;
    }, [navigation]);

    return {
        nome,
        meta,
        consumo,
        carb,
        proteina,
        gordura,
        resto,
        progresso,
        metaCarb,
        metaProteina,
        metaGordura,
        isLoading,
    };
};