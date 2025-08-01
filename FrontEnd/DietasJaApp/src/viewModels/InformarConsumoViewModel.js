import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InformarConsumoService } from '../services/InformarConsumoService';

export const useInformarConsumoViewModel = () => {
    const navigation = useNavigation();
    
    const [alimentos, setAlimentos] = useState([]);
    const [filtroAlimentos, setFiltroAlimentos] = useState('');
    const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
    const [quantidadeAlimento, setQuantidadeAlimento] = useState('');
    const [nomeRefeicao, setNomeRefeicao] = useState('');
    const [mostrarCampoRefeicao, setMostrarCampoRefeicao] = useState(true);

    const [totalCarboidratos, setTotalCarboidratos] = useState(0);
    const [totalProteinas, setTotalProteinas] = useState(0);
    const [totalGorduras, setTotalGorduras] = useState(0);
    const [totalQuantidade, setTotalQuantidade] = useState(0);
    const [totalCalorias, setTotalCalorias] = useState(0);

    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const resposta = await InformarConsumoService.getAlimentos();
                const data = resposta.data;
                setAlimentos(Array.isArray(data) ? data : (data && Array.isArray(data.results) ? data.results : []));
            } catch (error) {
                console.log('Erro ao buscar alimentos:', error);
                setAlimentos([]);
            }
        };

        fetchAlimentos();
        const unsubscribe = navigation.addListener('focus', fetchAlimentos);
        return unsubscribe;
    }, [navigation]);

    const removerAcentos = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const alimentosFiltrados = () => {
        if (filtroAlimentos === "") return [];
        const filtroSemAcentos = removerAcentos(filtroAlimentos.toLowerCase());
        return alimentos.filter((alimento) =>
            removerAcentos(alimento.nome.toLowerCase()).includes(filtroSemAcentos)
        );
    };
    
    const selecionarAlimentoDaLista = (item) => {
        setAlimentoSelecionado(item);
        setFiltroAlimentos(item.nome);
        if (mostrarCampoRefeicao) {
            setMostrarCampoRefeicao(false);
        }
    };

    const adicionarAlimentoNaRefeicao = () => {
        if (alimentoSelecionado && quantidadeAlimento > 0) {
            const quantidade = parseInt(quantidadeAlimento, 10);

            for (let i = 0; i < quantidade; i++) {
                const alimentoParaAdicionar = { ...alimentoSelecionado, key: `${alimentoSelecionado.id}-${Date.now()}-${i}` };
                setAlimentosSelecionados(prev => [...prev, alimentoParaAdicionar]);

                setTotalQuantidade(prev => prev + alimentoSelecionado.porcao);
                setTotalCalorias(prev => prev + alimentoSelecionado.qtd_calorias);
                setTotalCarboidratos(prev => prev + alimentoSelecionado.qtd_carboidratos);
                setTotalProteinas(prev => prev + alimentoSelecionado.qtd_proteinas);
                setTotalGorduras(prev => prev + alimentoSelecionado.qtd_gorduras);
            }

            setAlimentoSelecionado(null);
            setFiltroAlimentos('');
            setQuantidadeAlimento('');
        }
    };
    
    const limparTudo = () => {
        setAlimentosSelecionados([]);
        setAlimentoSelecionado(null);
        setQuantidadeAlimento('');
        setFiltroAlimentos('');
        setNomeRefeicao('');
        setMostrarCampoRefeicao(true);
        setTotalCarboidratos(0);
        setTotalProteinas(0);
        setTotalGorduras(0);
        setTotalQuantidade(0);
        setTotalCalorias(0);
    };

    const concluirRefeicao = async () => {
        if (alimentosSelecionados.length === 0) {
            Alert.alert('Erro', 'Nenhum alimento foi selecionado.');
            return;
        }

        const refeicaoData = {
            nome: nomeRefeicao,
            porcao: totalQuantidade,
            calorias_total: totalCalorias,
            carboidratos_total: totalCarboidratos,
            proteinas_total: totalProteinas,
            gorduras_total: totalGorduras,
            alimentos_list: alimentosSelecionados.map(a => a.id),
            e_padrao: false,
        };

        const consumoData = {
            qtd_carboidratos: totalCarboidratos,
            qtd_proteinas: totalProteinas,
            qtd_gorduras: totalGorduras,
        };

        try {
            await InformarConsumoService.enviarRefeicao(refeicaoData);
            await InformarConsumoService.atualizarMetaGamificada(consumoData);
            
            Alert.alert('Sucesso', 'Refeição enviada com sucesso!');
            limparTudo();

        } catch (error) {
            console.log('Erro ao enviar refeição:', error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível enviar a refeição. Verifique se possui uma meta diária cadastrada e tente novamente.");
            limparTudo();
        }
    };

    return {
        filtroAlimentos, setFiltroAlimentos,
        alimentosFiltrados,
        alimentosSelecionados,
        alimentoSelecionado,
        quantidadeAlimento, setQuantidadeAlimento,
        nomeRefeicao, setNomeRefeicao,
        mostrarCampoRefeicao,
        selecionarAlimentoDaLista,
        adicionarAlimentoNaRefeicao,
        limparTudo,
        concluirRefeicao,
    };
};