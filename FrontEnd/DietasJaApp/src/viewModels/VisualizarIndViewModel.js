import { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import PerfilRepository from '../repositories/PerfilRepository';

export const useVisualizarIndViewModel = () => {
    const navigation = useNavigation();
    const [imc, setImc] = useState(0);
    const [tmb, setTmb] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await PerfilRepository.getMetricas();
                if (response.success) {
                    const data = response.data;
                    setImc(parseFloat(data.imc || 0));
                    setTmb(parseFloat(data.tmb || 0));
                }
            } catch (error) {
                console.log('Erro ao buscar índices:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const imcInfo = useMemo(() => {
        const imcValue = parseFloat(imc);
        if (imcValue < 18.5) {
            return { status: 'danger', icon: "warning", message: "Abaixo do peso" };
        } else if (imcValue < 25) {
            return { status: 'normal', icon: "checkcircleo", message: "Peso normal" };
        } else if (imcValue < 30) {
            return { status: 'warning', icon: "exclamationcircleo", message: "Sobrepeso" };
        } else {
            return { status: 'danger', icon: "warning", message: "Obesidade" };
        }
    }, [imc]);

    const tmbInfo = useMemo(() => {
        const tmbValue = parseFloat(tmb);
        if (tmbValue < 1500) {
            return { status: 'warning', icon: "exclamationcircleo", message: "Metabolismo Lento" };
        } else if (tmbValue < 2500) {
            return { status: 'normal', icon: "checkcircleo", message: "Metabolismo Normal" };
        } else {
            return { status: 'warning', icon: "infocirlceo", message: "Metabolismo Acelerado" };
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