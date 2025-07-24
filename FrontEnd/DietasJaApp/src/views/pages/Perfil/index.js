import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import styles from "./styles";
import { usePerfilViewModel } from '../../../viewModels/PerfilViewModel';

export default function Perfil() {
    const {
        nome,
        sexo,
        idade,
        altura,
        peso,
        isLoading,
        handleAlterarInformacoes,
        handleVoltar,
    } = usePerfilViewModel();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.CaixaTotalmente}>
            <Text style={styles.textoSub}>Minha Conta</Text>
            <ScrollView style={styles.CaixaTotal}>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Nome:    </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{nome}</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Sexo:      </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{sexo}</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Idade:     </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{idade}</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Altura:    </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{altura} cm</Text>
                    </View>
                </View>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Peso:      </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{peso} Kg</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.estilobotao} onPress={handleAlterarInformacoes}>
                    <Text style={styles.textoBotao}>Alterar Informações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
                    <Text style={styles.textoBotaoVolta}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}