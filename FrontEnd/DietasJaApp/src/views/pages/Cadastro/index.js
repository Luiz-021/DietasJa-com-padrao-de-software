// src/pages/Cadastro/index.js (ou o caminho correto)
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style"
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importamos o nosso ViewModel
import { CadastroViewModel } from '../../../viewModels/CadastroViewModel';

export default function TelaCadastro() {
  const navigation = useNavigation();

  const {
    email,
    setEmail,
    senha,
    setSenha,
    textButton,
    executarCadastro,
  } = CadastroViewModel();

  // As suas funções de validação, navegação e o handleVoltar permanecem aqui.
  function ValidationCadastro() {
    if (ValidationInformacao(email, senha)) {
      cadastro();
    } else {
      Alert.alert("Erro", "Preencha todas as informações!")
    }
  }
  
  // FUNÇÃO DO BOTÃO DE VOLTAR RESTAURADA
  const handleVoltar = () => {
      navigation.goBack();
  };

  function ValidationInformacao(email, senha) {
    if (email.length === 0 || senha.length === 0) {
      return false;
    }
    return true;
  }

  async function cadastro() {
    const resultado = await executarCadastro();

    if (resultado.success && resultado.status === 201) {
      let userId = resultado.data.id;
      await AsyncStorage.setItem('userId', `${userId}`);
      navigation.navigate('PrimeiroAcesso');
    } else {
      if (resultado.error?.status === 400) {
        Alert.alert("Erro", "Nome de usuário já cadastrado.");
      } else {
        console.log(resultado.error);
        Alert.alert("Erro", "Ocorreu um problema ao tentar cadastrar.");
      }
    }
  }

  // O JSX foi ajustado para incluir o seu botão de voltar.
  return (
    <View style={styles.CaixaTotalmente}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerheader}>
        <Text style={styles.TextoInicial}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.CaixaCadastro}>

        <Text style={styles.Title}>Nome de Usuário </Text>
        <TextInput style={styles.Input}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor={'#999'}
          keyboardType="ascii-capable"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.Title}>Senha </Text>
        <TextInput style={styles.Input}
          placeholder="Digite sua senha"
          placeholderTextColor={'#999'}
          keyboardType="numeric"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.botao}
          onPress={ValidationCadastro}
        >
          <Text style={styles.textoBotao}>Avançar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}