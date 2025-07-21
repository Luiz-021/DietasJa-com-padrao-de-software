import { useState } from 'react';
import { AuthService } from '../services/AuthService';

export const useLoginViewModel = (handleLogin) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('Informe Email e Senha!');
  const [erroLogin, setErroLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validationEntrar = async () => {
    if (email.trim() === '' || senha.trim() === '') {
      setErroLogin('Email e/ou senha não podem estar vazios.');
      return;
    }

    setIsLoading(true);
    const result = await AuthService.login(email, senha);
    setIsLoading(false);

    if (result.success) {
      setMensagem('Login Válido!');
      setSenha('');
      setEmail('');
      setErroLogin('');
      handleLogin();
    } else {
      setErroLogin(result.error);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    mensagem,
    erroLogin,
    isLoading,
    validationEntrar,
  };
};