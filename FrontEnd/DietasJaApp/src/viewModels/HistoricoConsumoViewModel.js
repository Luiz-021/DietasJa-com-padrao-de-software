import { useState, useEffect } from 'react';
import { Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HistoricoConsumoService } from '../services/HistoricoConsumoService';

export const useHistoricoConsumoViewModel = () => {
    const navigation = useNavigation();
    const [load, setLoad] = useState(true);
    const [weeklyData, setWeeklyData] = useState([]);
    const [seqDias, setSeqDias] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonPosition] = useState(new Animated.Value(0));

    const message = 'Parabéns por mais uma semana de dedicação e progresso!';
    const message3 = 'Mas que tal recompensar todo o seu esforço com aquela comida que você tanto gosta hoje?';
    
    const tratarData = (dataStr) => {
        const diasSemana = {0: "domingo", 1: "segunda-feira", 2: "terça-feira", 3: "quarta-feira", 4: "quinta-feira", 5: "sexta-feira", 6: "sábado"};
        const [year, month, day] = dataStr.split("-");
        const dataFormatada = `${day}/${month}/${year}`;
        const dataObj = new Date(year, month - 1, day);
        const diaSemana = diasSemana[dataObj.getDay()];
        return `${dataFormatada} (${diaSemana})`;
    };
    
    useEffect(() => {
        const moveUpAnimation = Animated.timing(buttonPosition, {
            toValue: -5,
            duration: 600,
            useNativeDriver: true,
        });
        const animationLoop = Animated.loop(Animated.sequence([moveUpAnimation]));
        animationLoop.start();

        return () => animationLoop.stop();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const metaResponse = await HistoricoConsumoService.getMeta();
                const metaData = metaResponse.data[0];
                const diasDentroMeta = metaData['seq_dias_atual'];
                const metaDiaria = metaData['qtd_calorias'] / 1000;
                setSeqDias(diasDentroMeta);
                
                const semanaResponse = await HistoricoConsumoService.getMetaSemana();
                const historico = semanaResponse.data.map(item => ({
                    day: tratarData(item.data),
                    calories: item.calorias_consumidas / 1000,
                    goal: metaDiaria,
                }));
                setWeeklyData(historico);

            } catch (error) {
                setSeqDias(0);
                setWeeklyData([]);
                if (error.response?.status === 404 || error.response?.status === 204) {
                    Alert.alert("Atenção", "Você não possui uma meta diária cadastrada. Cadastre-a para ver seu histórico.");
                } else {
                    console.error("Erro ao buscar histórico de consumo: ", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        const unsubscribe = navigation.addListener('focus', () => fetchData());
        return unsubscribe;
    }, [navigation]);

    const getCaloriesColor = (calories, goal) => {
        return calories <= goal ? '#01C099' : '#CB4D4E';
    };

    const handleButtonPress = () => {
        setModalVisible(true);
    };

    return {
        isLoading,
        weeklyData,
        seqDias,
        modalVisible,
        setModalVisible,
        buttonPosition,
        message,
        message3,
        getCaloriesColor,
        handleButtonPress,
    };
};