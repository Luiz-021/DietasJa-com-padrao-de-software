import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./style"
import * as Animatable from 'react-native-animatable';
import { useCadastroViewModel } from '../../../viewModels/CadastroViewModel';

export default function TelaCadastro() {
  
  const {
    username,
    setUsername,
    senha,
    setSenha,
    handleCadastro,
    handleVoltar
  } = useCadastroViewModel();

  return (
    <View style={styles.CaixaTotalmente}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerheader}>
        <Text style={styles.TextoInicial}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.CaixaCadastro}>

        <Text style={styles.Title}>Nome de Usuário</Text>
        <TextInput 
          style={styles.Input}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor={'#999'}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.Title}>Senha</Text>
        <TextInput 
          style={styles.Input}
          placeholder="Digite sua senha"
          placeholderTextColor={'#999'}
          value={senha}
          keyboardType="numeric"
          onChangeText={setSenha}
          secureTextEntry
        />
        
        {/* O botão de avançar agora chama diretamente a função do ViewModel */}
        <TouchableOpacity 
            style={styles.botao}
            onPress={handleCadastro}
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