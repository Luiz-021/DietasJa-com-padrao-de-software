import { useState } from 'react';
import { Alert } from 'react-native';
import UsuarioRepository from '../repositories/UsuarioRepository';

export const useLoginViewModel = (handleLogin) => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validationEntrar = async () => {
    if (username.trim() === '' || senha.trim() === '') {
      setErroLogin('Usuário e/ou senha não podem estar vazios.');
      return;
    }

    setIsLoading(true);
    setErroLogin('');

    const result = await UsuarioRepository.login(username, senha);

    setIsLoading(false);

    if (result.success) {
      handleLogin();
    } else {
      if (result.status === 401) {
          Alert.alert("Erro", "Usuário e/ou senha incorretos.");
      } else if (result.status === 403) {
          setErroLogin(result.data.detail || "Ocorreu um erro de permissão.");
      } else {
          setErroLogin(result.error || 'Ocorreu um problema ao tentar fazer login.');
      }
    }
  };

  return {
    username,
    setUsername,
    senha,
    setSenha,
    erroLogin,
    isLoading,
    validationEntrar,
  };
};