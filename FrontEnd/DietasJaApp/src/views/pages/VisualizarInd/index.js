import React from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }
    
    const statusColorMap = {
        normal: styles.colorNormal,
        warning: styles.colorWarning,
        danger: styles.colorDanger,
    };

    const imcColor = statusColorMap[imcInfo.status];
    const tmbColor = statusColorMap[tmbInfo.status];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Seus Índices de Saúde</Text>
            <Text style={styles.subHeaderText}>
                Monitore sua saúde com os índices de TMB e IMC.
            </Text>

            {/* Card do IMC */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Índice de Massa Corporal (IMC)</Text>
                <View style={styles.indexRow}>
                    <View>
                        <Text style={[styles.indexValue, imcColor]}>{imc}</Text>
                        <Text style={styles.indexLabel}>kg/m²</Text>
                    </View>
                    <View style={styles.statusRow}>
                        <AntDesign name={imcInfo.icon} size={24} color={imcColor.color} />
                        <Text style={[styles.statusText, imcColor]}>{imcInfo.message}</Text>
                    </View>
                </View>
            </View>

            {/* Card do TMB */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Taxa de Metabolismo Basal (TMB)</Text>
                <View style={styles.indexRow}>
                    <View>
                        <Text style={[styles.indexValue, tmbColor]}>{tmb}</Text>
                        <Text style={styles.indexLabel}>calorias/dia</Text>
                    </View>
                    <View style={styles.statusRow}>
                        <AntDesign name={tmbInfo.icon} size={24} color={tmbColor.color} />
                        <Text style={[styles.statusText, tmbColor]}>{tmbInfo.message}</Text>
                    </View>
                </View>
            </View>
            
            {/* Box de Alerta */}
            <View style={styles.alertBox}>
                <AntDesign name="infocirlceo" size={24} color="#D94C3D" />
                <Text style={styles.alertText}>
                    Mantenha seus dados atualizados no perfil para obter resultados precisos!
                </Text>
            </View>

        </SafeAreaView>
    );
};

export default VisualizarInd;