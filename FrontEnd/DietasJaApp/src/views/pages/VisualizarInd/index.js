import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { useVisualizarIndViewModel } from '../../../viewModels/VisualizarIndViewModel';

const VisualizarInd = () => {
    const {
        isLoading,
        imc,
        tmb,
        imcInfo,
        tmbInfo,
    } = useVisualizarIndViewModel();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Visualizar Índices</Text>
            </View>
            <Text style={styles.messagemtitulo}>
                Monitore sua saúde com os índices de TMB e IMC.
            </Text>

            {/* Container do IMC */}
            <View style={[styles.infoContainer, { marginBottom: 22 }]}>
                <Text style={styles.messagemdesc}>Índice de Massa Corporal</Text>
                <View style={[styles.infoItem, imcInfo.style]}>
                    <Text style={styles.infoLabel}>IMC</Text>
                    <Text style={styles.infoValue}>{imc}</Text>
                </View>
                <Text style={styles.messagem}>
                    <AntDesign name={imcInfo.icon} size={24} /> {imcInfo.message}
                </Text>
            </View>

            {/* Container do TMB */}
            <View style={styles.infoContainer}>
                <Text style={styles.messagemdesc}>Taxa de Metabolismo Basal</Text>
                <View style={[styles.infoItem, tmbInfo.style]}>
                    <Text style={styles.infoLabel}>TMB</Text>
                    <Text style={styles.infoValue}>{tmb}</Text>
                </View>
                <Text style={styles.messagem}>
                    <AntDesign name={tmbInfo.icon} size={24} /> {tmbInfo.message}
                </Text>
            </View>

            <View style={styles.messagemcontainer}>
                <Text style={styles.messagembottom}>
                    <AntDesign name={"exclamationcircle"} size={21} /> Mantenha seus dados atualizados para obter resultados atuais!
                </Text>
            </View>
        </View>
    );
};

export default VisualizarInd;