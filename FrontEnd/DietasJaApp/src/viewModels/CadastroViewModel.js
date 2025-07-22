import { useState } from 'react';
import { CadastroService } from '../services/CadastroService';

export const CadastroViewModel = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [textButton] = useState("Avançar");

  const executarCadastro = async () => {
    const resultado = await CadastroService.cadastrar(email, senha);
    return resultado;
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    textButton,
    executarCadastro,
  };
};