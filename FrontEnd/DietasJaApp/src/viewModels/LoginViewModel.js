// src/viewModels/LoginViewModel.js (Versão Corrigida)
import { useState } from 'react';
import { Alert } from 'react-native';
import { AuthService } from '../services/AuthService';

export const useLoginViewModel = (handleLogin) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState(''); // Estado para erro na tela
  const [isLoading, setIsLoading] = useState(false);

  const validationEntrar = async () => {
    // 1. Validação de campos vazios (como no código original)
    if (email.trim() === '' || senha.trim() === '') {
      setErroLogin('Email e/ou senha não podem estar vazios.');
      return;
    }

    setIsLoading(true);
    setErroLogin(''); // Limpa erros antigos

    const result = await AuthService.login(email, senha);

    setIsLoading(false);

    if (result.success) {
      // 2. Sucesso no login (como no código original)
      handleLogin();
    } else {
      // 3. Tratamento de erros (exatamente como no código original)
      if (result.status === 401) {
        Alert.alert("Erro", "Usuário e/ou senha incorretos.");
      } else if (result.status === 403) {
        // Exibe a mensagem de "detalhe" vinda da API
        setErroLogin(result.data.detail);
      } else {
        // Erro genérico
        setErroLogin(result.error || 'Ocorreu um erro ao tentar fazer login.');
      }
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    erroLogin,
    isLoading,
    validationEntrar,
  };
};