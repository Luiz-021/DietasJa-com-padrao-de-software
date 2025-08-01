import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, Modal, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeeklyCountScreen() {

    const navigation = useNavigation();
    const [weeklyData, setWeeklyData] = useState([]);
    const [seqDias, setSeqDias] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonPosition] = useState(new Animated.Value(0));

    const tratarData = (dataString) => {
        if (!dataString || typeof dataString !== 'string' || !dataString.includes('-')) {
            return "Data Inválida";
        }
        const partes = dataString.split('-');
        if (partes.length !== 3) {
            return "Data Inválida";
        }
        const ano = partes[0];
        const mes = partes[1];
        const dia = partes[2];
        return `${dia}/${mes}/${ano}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem("jwt");
                if (!token) {
                    Alert.alert("Erro", "Você não está autenticado.");
                    setIsLoading(false);
                    return;
                }

                const metaResponse = await axios.get(`${API_BASE_URL}/api/meta/`, {
                    headers: { Authorization: token }
                });

                if (!metaResponse.data || metaResponse.data.length === 0) {
                    Alert.alert("Atenção", "Você não possui uma meta diária cadastrada.");
                    setWeeklyData([]);
                    setSeqDias(0);
                    setIsLoading(false);
                    return;
                }

                const metaDiariaKcal = metaResponse.data[0]['qtd_calorias'] / 1000;
                setSeqDias(metaResponse.data[0]['seq_dias_atual']);

                const semanaResponse = await axios.get(`${API_BASE_URL}/api/meta-gamificada/semana`, {
                    headers: { Authorization: token }
                });

                const historico = semanaResponse.data.map(item => ({
                    day: tratarData(item.data),
                    calories: item.calorias_consumidas / 1000,
                    goal: metaDiariaKcal
                }));
                setWeeklyData(historico);

            } catch (error) {
                console.error("Erro ao buscar dados da semana:", error);
                setWeeklyData([]);
                if (error.response?.status === 404) {
                    Alert.alert("Atenção", "Você ainda não possui um histórico de consumo.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchData);
        fetchData();
        return unsubscribe;

    }, [navigation]);


    useEffect(() => {
        if (seqDias > 0 && seqDias % 7 === 0) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(buttonPosition, { toValue: -5, duration: 600, useNativeDriver: true }),
                    Animated.timing(buttonPosition, { toValue: 0, duration: 600, useNativeDriver: true })
                ])
            ).start();
        }
    }, [seqDias]);


    const getCaloriesColor = (calories, goal) => {
        return calories <= goal ? '#01C099' : '#CB4D4E';
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Resumo Semanal</Text>
            </View>
            <View style={styles.mensagem}>
                <Text style={styles.mensagemText}>Você está cumprindo a meta há {seqDias} {seqDias === 1 ? "dia" : "dias"}!</Text>
            </View>

            {seqDias > 0 && seqDias % 7 === 0 && (
                <View>
                    <TouchableOpacity style={[styles.button, { transform: [{ translateY: buttonPosition }] }]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Uma mensagem para você!</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Animatable.Text
                                    animation="fadeIn"
                                    style={styles.message}
                                    duration={4000}
                                >
                                    Parabéns por mais uma semana de dedicação e progresso!
                                </Animatable.Text>
                                <Animatable.Text
                                    animation="fadeIn"
                                    style={styles.message3}
                                    duration={10000}
                                >
                                    Lembre-se: todo esforço merece uma recompensa. Que tal aquela sua comida favorita hoje?
                                </Animatable.Text>
                                <Button title="Fechar" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
            <View>
                {weeklyData.map((data, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dayContainer,
                            { backgroundColor: getCaloriesColor(data.calories, data.goal) }
                        ]}
                    >
                        <Text style={styles.dayText}>{data.day}</Text>
                        <Text style={styles.caloriesText}>{data.calories.toFixed(2)} kcal</Text>
                        <View style={styles.separator} />
                        <Text style={styles.goalText}>Meta: {data.goal.toFixed(2)} kcal</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}