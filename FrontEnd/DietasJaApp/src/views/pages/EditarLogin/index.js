import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import styles from "./style";
import { useEditarLoginViewModel } from '../../../viewModels/EditarLoginViewModel';

export default function EditarLogin() {
    const {
        email, setEmail,
        senha, setSenha,
        novasenha, setNSenha,
        validarsenha, setValiSenha,
        handleSalvar,
        handleVoltar,
    } = useEditarLoginViewModel();

    return (
        <SafeAreaView style={styles.CaixaTotal}>
            <View style={styles.CaixaTitulo}>
                <Image source={require("../../../assets/outralogo.png")} style={styles.imagemEstilo} />
                <Text style={styles.textoTitulo}>DietasJá!</Text>
            </View>
            <Text style={styles.textoSub}>Editar Cadastro</Text>
            <ScrollView style={styles.CaixaForm}>

                <Text style={styles.estiloTexto}>Novo Email:</Text>
                <TextInput
                    style={styles.estiloinput}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.estiloTexto}>Senha Atual:</Text>
                <TextInput
                    style={styles.estiloinput}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry
                />

                <Text style={styles.estiloTexto}>Nova Senha:</Text>
                <TextInput
                    style={styles.estiloinput}
                    onChangeText={setNSenha}
                    value={novasenha}
                    secureTextEntry
                />

                <Text style={styles.estiloTexto}>Confirme a nova senha:</Text>
                <TextInput
                    style={styles.estiloinput}
                    onChangeText={setValiSenha}
                    value={validarsenha}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.estilobotaoSalvar}
                    onPress={handleSalvar}
                >
                    <Text style={styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.estilobotaoVoltar}
                    onPress={handleVoltar}
                >
                    <Text style={styles.textoBotaoVolta}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}