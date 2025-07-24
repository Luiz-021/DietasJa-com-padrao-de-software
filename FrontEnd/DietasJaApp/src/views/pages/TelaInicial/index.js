import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
import { useTelaInicialViewModel } from '../../../viewModels/TelaInicialViewModel';

export default function TelaInicial() {
    const {
        nome,
        meta,
        consumo,
        carb,
        proteina,
        gordura,
        resto,
        isLoading,
    } = useTelaInicialViewModel();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.greetingText}>Olá, {nome}</Text>
            </View>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.rectangle}>
                <Text style={styles.infoTitle}>Meta de Calorias Diárias</Text>
                <View style={styles.separator} />
                <Text style={styles.infoValue}>{meta} Kcal</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInLeft" delay={600} style={styles.redrectangle}>
                <Text style={styles.infoTitle}>Calorias Consumidas</Text>
                <View style={styles.separator} />
                <Text style={styles.infoValue}>{consumo} Kcal</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInLeft" delay={700} style={styles.macronutrientsRectangle}>
                <View />
                <View style={styles.macronutrientContainer}>
                    <Text style={styles.macronutrientTitle}>Carboidratos</Text>
                    <Text style={styles.macronutrientValueCarb}>{carb}g</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.macronutrientContainer}>
                    <Text style={styles.macronutrientTitle}>Proteínas</Text>
                    <Text style={styles.macronutrientValue}>{proteina}g</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.macronutrientContainer}>
                    <Text style={styles.macronutrientTitle}>Gorduras </Text>
                    <Text style={styles.macronutrientValue}>{gordura}g</Text>
                </View>
            </Animatable.View>

            {resto > 0 && (
                <View style={styles.remainingCaloriesContainer}>
                    <Text style={styles.remainingCaloriesText}>
                        Faltam {resto} calorias para consumir hoje
                    </Text>
                </View>
            )}
        </View>
    );
}