import React, {useState} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import styles from "./style"
import * as Animatable from 'react-native-animatable';
import {} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { API_BASE_URL } from "../../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastro(){
    const [textButton, setTextButton] = useState("Avançar");

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();


    function ValidationCadastro(){
        if (ValidationInformacao(email,senha)){
            cadastro(email, senha)
            //handleVoltar();
            return;
        }
        else{
            Alert.alert("Erro", "Preencha todas as informações!")
        }
    }
    const handleVoltar = () => {
        navigation.goBack();
    };
    
    function ValidationInformacao(email,senha){
        if (email.length === 0 || senha.length === 0) {
           return false;
        }
        return true;
        
    }

    // Substitua a sua função 'cadastro' por esta versão mais simples e direta
async function cadastro(email, senha) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/sign-in/`, {
            username: email,
            password: senha
        });

        if (response.status == 201) {
            let userId = response.data.id;
            await AsyncStorage.setItem('userId', `${userId}`);
            navigation.navigate('PrimeiroAcesso');
        }

    } catch (error) {
        if (error.response && error.response.data) {
            // Converte a resposta de erro (seja qual for o formato) em uma string legível
            const errorMessage = JSON.stringify(error.response.data, null, 2);
            
            // Mostra o alerta com a resposta de erro "crua" do backend
            Alert.alert("Erro Recebido do Servidor", errorMessage);

        } else {
            // Caso seja um erro de rede ou outro problema sem resposta da API
            console.log(error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    }
}

    return <>
    <View style = {styles.CaixaTotalmente}>
        <Animatable.View animation="fadeInLeft" delay={500} style = {styles.containerheader}>
            <Text style={styles.TextoInicial}>Cadastro</Text>
        </Animatable.View> 

        <Animatable.View animation="fadeInUp" style={styles.CaixaCadastro}>

            <Text style = {styles.Title}>Nome de Usuário </Text>
            <TextInput style={styles.Input}
             placeholder="Digite seu nome de usuário"
             placeholderTextColor={'#B0B0B0'}
             keyboardType = "ascii-capable"
             value = {email}
             onChangeText={setEmail}>
            </TextInput>

            <Text style = {styles.Title}>Senha </Text>
            <TextInput style={styles.Input}
             placeholder="Digite sua senha"
             placeholderTextColor={'#B0B0B0'}
             keyboardType = "numeric"
             value = {senha}
             onChangeText={setSenha}
             secureTextEntry>
            </TextInput>

            <TouchableOpacity style = {styles.botao}
            onPress={ValidationCadastro}
            ><Text style = {styles.textoBotao}>{textButton}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.botaoVoltar}
            onPress={() => navigation.navigate('Login')}
            ><Text style = {styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
        </>
    
}