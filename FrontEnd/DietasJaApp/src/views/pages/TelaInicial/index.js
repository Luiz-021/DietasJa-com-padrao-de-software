import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
import { useTelaInicialViewModel } from '../../../viewModels/TelaInicialViewModel';
import * as Progress from 'react-native-progress';

// Componente para a Barra de Progresso de Macros
const MacroProgressBar = ({ label, consumido, meta, color }) => {
    const progresso = meta > 0 ? consumido / meta : 0;
    return (
        <View style={styles.macroRow}>
            <View style={styles.macroInfo}>
                <Text style={styles.macroLabel}>{label}</Text>
                <Text style={styles.macroValues}>{consumido.toFixed(1)}g / {meta.toFixed(1)}g</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progresso * 100}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
};

export default function TelaInicial() {
    const {
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
    } = useTelaInicialViewModel();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Olá, {nome}</Text>
            </View>

            <Animatable.View animation="fadeInUp" delay={200} style={styles.caloriesCard}>
                <View style={styles.progressCircleContainer}>
                    <Progress.Circle
                        size={180}
                        progress={progresso}
                        thickness={15}
                        color={'#38a69d'}
                        unfilledColor={'#e9ecef'}
                        borderWidth={0}
                        showsText={false}
                    />
                    <View style={styles.caloriesRemainingContainer}>
                        <Text style={styles.caloriesRemainingValue}>{resto.toFixed(0)}</Text>
                        <Text style={styles.caloriesRemainingLabel}>Kcal Restantes</Text>
                    </View>
                </View>
                <View style={styles.calorieInfoRow}>
                    <View style={styles.calorieInfoBox}>
                        <Text style={styles.calorieInfoLabel}>Meta</Text>
                        <Text style={styles.calorieInfoValue}>{meta.toFixed(0)}</Text>
                    </View>
                    <View style={styles.calorieInfoBox}>
                        <Text style={styles.calorieInfoLabel}>Consumo</Text>
                        <Text style={styles.calorieInfoValue}>{consumo.toFixed(0)}</Text>
                    </View>
                </View>
            </Animatable.View>
            
            <Animatable.View animation="fadeInUp" delay={400} style={styles.macrosCard}>
                <Text style={styles.cardTitle}>Macronutrientes</Text>
                <MacroProgressBar label="Carboidratos" consumido={carb} meta={metaCarb} color="#3498db" />
                <MacroProgressBar label="Proteínas" consumido={proteina} meta={metaProteina} color="#f1c40f" />
                <MacroProgressBar label="Gorduras" consumido={gordura} meta={metaGordura} color="#e74c3c" />
            </Animatable.View>
        </ScrollView>
    );
}