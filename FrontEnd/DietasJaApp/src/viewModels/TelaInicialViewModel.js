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
    const [resto, setResto] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        enviarSolicitacaoGET();
        const unsubscribe = navigation.addListener('focus', () => {
            enviarSolicitacaoGET();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const novoResto = meta - consumo;
        setResto(novoResto.toFixed(2)); // Arredondando para evitar muitas casas decimais
    }, [meta, consumo]);

    async function enviarSolicitacaoGET() {
        setIsLoading(true);
        try {
            // As chamadas foram mantidas separadas para preservar a lógica de erro original
            try {
                const respostanome = await TelaInicialService.getUserMetrics();
                setNome(respostanome.data.nome);
            } catch (error) {
                console.log('Erro na solicitação de nome:', error);
            }

            try {
                const respostameta = await TelaInicialService.getMeta();
                if (respostameta.data && respostameta.data.length > 0) {
                    const qtdCalorias = (respostameta.data[0]['qtd_calorias']) / 1000;
                    setMeta(qtdCalorias);
                } else {
                     // Se a API retorna 200 com array vazio, trata como se não tivesse meta
                    throw new Error("Meta não encontrada");
                }
            } catch (error) {
                setMeta(0); // Garante que a meta seja 0 se não for encontrada
                console.log('Erro na solicitação de meta:', error);
                Alert.alert("Bem vindo(a)!", "Você ainda não possui uma meta cadastrada!\nCadastre-a em Editar Meta no menu lateral.");
            }

            try {
                const respostaconsumo = await TelaInicialService.getConsumoDia();
                setConsumo((respostaconsumo.data.calorias_consumidas) / 1000);
                setCarb(parseFloat(respostaconsumo.data.qtd_carboidratos).toFixed(2));
                setProteina(parseFloat(respostaconsumo.data.qtd_proteinas).toFixed(2));
                setGordura(parseFloat(respostaconsumo.data.qtd_gorduras).toFixed(2));
            } catch (error) {
                console.log('Erro na solicitação de consumo:', error);
            }

        } catch (error) {
            console.log('Erro geral ao executar GET:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        nome,
        meta,
        consumo,
        carb,
        proteina,
        gordura,
        resto,
        isLoading,
    };
};