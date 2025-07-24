import { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VisualizarIndService } from '../services/VisualizarIndService';
import styles from '../views/pages/VisualizarInd/styles';

export const useVisualizarIndViewModel = () => {
    const navigation = useNavigation();
    const [imc, setImc] = useState(0);
    const [tmb, setTmb] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await VisualizarIndService.getIndices();
                const data = response.data;
                setImc(parseFloat(data.imc || 0));
                setTmb(parseFloat(data.tmb || 0));
            } catch (error) {
                console.log('Erro ao buscar índices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, [navigation]);

    // Lógica para derivar o estado da UI a partir dos dados (IMC)
    // useMemo otimiza o cálculo para que ele só rode quando o IMC mudar
    const imcInfo = useMemo(() => {
        const imcValue = parseFloat(imc);
        if (imcValue < 18.5) {
            return {
                style: styles.abaixopeso,
                icon: "warning",
                message: "Abaixo do peso"
            };
        } else if (imcValue < 25) {
            return {
                style: styles.normal,
                icon: "checkcircleo",
                message: "Peso normal"
            };
        } else if (imcValue < 30) {
            return {
                style: styles.acimapeso,
                icon: "exclamationcircleo",
                message: "Sobrepeso"
            };
        } else {
            return {
                style: styles.obesidade,
                icon: "warning",
                message: "Acima do peso"
            };
        }
    }, [imc]);

    const tmbInfo = useMemo(() => {
        const tmbValue = parseFloat(tmb);
        if (tmbValue < 1500) {
            return {
                style: styles.baixoTmb,
                icon: "exclamationcircleo",
                message: "Baixo nível de atividade"
            };
        } else if (tmbValue < 2000) {
            return {
                style: styles.normalTmb,
                icon: "checkcircleo",
                message: "Nível de atividade moderado"
            };
        } else {
            return {
                style: styles.altoTmb,
                icon: "warning",
                message: "Alto nível de atividade"
            };
        }
    }, [tmb]);

    return {
        isLoading,
        imc: imc.toFixed(2),
        tmb: tmb.toFixed(0),
        imcInfo,
        tmbInfo,
    };
};