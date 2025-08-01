import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import  PratoRepository  from '../repositories/PratoRepository';

export const useCadastrarPratoViewModel = () => {
    const [nome, setNome] = useState("");
    const [gorduras, setGorduras] = useState("");
    const [proteinas, setProteinas] = useState("");
    const [carboidratos, setCarboidratos] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [listaPratos, setListaPratos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [load, setLoad] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchAlimentos();
        const unsubscribe = navigation.addListener('focus', () => setLoad(!load));
        return unsubscribe;
    }, [load, navigation]);

    const caloriasCalculadas = (4 * (parseFloat(proteinas.replace(',', '.')) || 0) + 4 * (parseFloat(carboidratos.replace(',', '.')) || 0) + 9 * (parseFloat(gorduras.replace(',', '.')) || 0)).toFixed(2);

    const fetchAlimentos = async () => {
        setIsLoading(true);
        try {
            const pratos = await PratoRepository.getAlimentos();
            setListaPratos(pratos);
        } catch (error) {
            console.log('Erro ao buscar alimentos: ', error);
            setListaPratos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const adicionarPrato = async () => {
        if (!validarCampos()) return;
        const pCarboidratos = parseFloat(carboidratos.replace(',', '.'));
        const pProteinas = parseFloat(proteinas.replace(',', '.'));
        const pGorduras = parseFloat(gorduras.replace(',', '.'));
        const pQuantidade = parseInt(quantidade, 10);
        const calorias = 4000 * (pProteinas + pCarboidratos) + 9000 * pGorduras;
        const novoPratoData = {
            nome: nome,
            porcao: pQuantidade,
            qtd_calorias: calorias,
            qtd_carboidratos: pCarboidratos,
            qtd_proteinas: pProteinas,
            qtd_gorduras: pGorduras,
            e_padrao: false
        };

        try {
            // A chamada agora é para o repositório
            const response = await PratoRepository.addAlimento(novoPratoData);
            if (response.status === 200 || response.status === 201) {
                fetchAlimentos();
                limparCampos();
                Alert.alert("Sucesso", "Alimento cadastrado com sucesso!");
            } else {
                 Alert.alert("Erro de Validação", "Verifique os dados informados. É possível que já exista um alimento com este nome ou os valores são inválidos.");
            }
        } catch (error) {
            console.log('Erro ao adicionar prato: ', error);
            Alert.alert("Erro", "Não foi possível cadastrar o alimento.");
        }
    };

    const deletePrato = async (idAlimento) => {
        try {
            // A chamada agora é para o repositório
            const response = await PratoRepository.deleteAlimento(idAlimento);
            if (response.status === 204 || response.status === 200) {
                setListaPratos(prev => prev.filter(prato => prato.id !== idAlimento));
                Alert.alert("Sucesso", "Alimento excluído com sucesso!");
            } else if (response.status === 401) {
                Alert.alert("Erro", "Você não possui permissão para excluir um alimento padrão.");
            } else {
                 throw new Error('Erro desconhecido ao deletar');
            }
        } catch (error) {
            console.log('Erro ao deletar prato: ', error);
            Alert.alert("Erro", "Não foi possível excluir o alimento.");
        }
    };
    
    const handleVoltar = () => {
        navigation.goBack();
    };

    const validarCampos = () => {
        if (nome.trim() === "") { Alert.alert("Erro", "O nome do alimento é obrigatório."); return false; }
        if (!/^\d+$/.test(quantidade) || parseInt(quantidade, 10) <= 0) { Alert.alert("Erro", "Quantidade deve ser um número inteiro positivo."); return false; }
        if (!/^\d*([.,]\d+)?$/.test(carboidratos) || parseFloat(carboidratos.replace(',', '.')) < 0) { Alert.alert("Erro", "Carboidratos devem ser um número positivo."); return false; }
        if (!/^\d*([.,]\d+)?$/.test(proteinas) || parseFloat(proteinas.replace(',', '.')) < 0) { Alert.alert("Erro", "Proteínas devem ser um número positivo."); return false; }
        if (!/^\d*([.,]\d+)?$/.test(gorduras) || parseFloat(gorduras.replace(',', '.')) < 0) { Alert.alert("Erro", "Gorduras devem ser um número positivo."); return false; }
        return true;
    };
    
    const limparCampos = () => {
        setNome("");
        setGorduras("");
        setProteinas("");
        setCarboidratos("");
        setQuantidade("");
    };

    return {
        nome, setNome,
        gorduras, setGorduras,
        proteinas, setProteinas,
        carboidratos, setCarboidratos,
        quantidade, setQuantidade,
        listaPratos,
        isLoading,
        caloriasCalculadas,
        adicionarPrato,
        deletePrato,
        handleVoltar
    };
};