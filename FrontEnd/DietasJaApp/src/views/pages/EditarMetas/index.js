import React from "react";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useEditarMetasViewModel } from "../../../viewModels/EditarMetasViewModel";

export default function EditarMetas() {
    const {
        meta,
        novaMeta,
        setNovaMeta,
        margem,
        isLoading,
        handleConcluir,
        handleVoltar,
    } = useEditarMetasViewModel();

    if (isLoading) {
        return (
            <View style={[styles.CaixaTotalmente, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.CaixaTotalmente}>
            <Text style={styles.textoSub}>Editar Meta</Text>
            <View style={styles.CaixaTotal}>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Meta Atual:   </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{meta} kcal</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Margem:       </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{margem} kcal</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Nova Meta:   </Text>
                    <TextInput
                        style={styles.CaixaInfoMenorInput}
                        value={novaMeta}
                        keyboardType="numeric"
                        onChangeText={setNovaMeta}
                        placeholder="kcal"
                        placeholderTextColor="#B0B0B0"
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.estilobotao} onPress={handleConcluir}>
                        <Text style={styles.textoBotao}>Concluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
                        <Text style={styles.textoBotaoVolta}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}