import React from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useLoginViewModel } from '../../../viewModels/LoginViewModel';

export default function Login({ handleLogin }) {
  const navigation = useNavigation();
  const {
    username,
    setUsername,
    senha,
    setSenha,
    erroLogin,
    isLoading,
    validationEntrar,
  } = useLoginViewModel(handleLogin);

  return (
    <View style={styles.CaixaTotalmente}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerheader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.CaixaTotal}>
        <Text style={styles.title}>Nome de Usuário</Text>
        <TextInput
          style={styles.estiloinput}
          onChangeText={setUsername}
          value={username}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor={'#999'}
          keyboardType="ascii-capable"
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.estiloinput}
          onChangeText={setSenha}
          value={senha}
          placeholder="Digite sua senha"
          placeholderTextColor={'#999'}
          keyboardType="numeric"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.estilobotaoLogin}
          onPress={validationEntrar}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Login</Text>
          )}
        </TouchableOpacity>

        {erroLogin !== '' && <Text style={styles.mensagemErro}>{erroLogin}</Text>}

        <TouchableOpacity
          style={styles.estilobotaoCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoBotaoCadastro}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}