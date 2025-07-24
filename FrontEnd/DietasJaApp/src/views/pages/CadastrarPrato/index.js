import React from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useCadastrarPratoViewModel } from "../../../viewModels/CadastrarPratoViewModel";

export default function CadastrarPrato() {
    const {
        nome, setNome,
        gorduras, setGorduras,
        proteinas, setProteinas,
        carboidratos, setCarboidratos,
        quantidade, setQuantidade,
        listaPratos,
        isLoading,
        caloriasCalculadas,
        adicionarPrato,
        handleDeleteItem,
        handleVoltar
    } = useCadastrarPratoViewModel();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#38acbe" />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.CaixaTotal}>
                    <Text style={styles.estiloTexto}>Nome do alimento: </Text>
                    <View style={styles.CaixaInfoMenorContainer}>
                        <TextInput style={styles.CaixaInfoMenorInput} value={nome} onChangeText={setNome} />
                    </View>

                    <View style={styles.CaixaInfoMenorContainer}>
                        <Text style={styles.estiloTexto}>Quantidade (g):</Text>
                        <TextInput style={styles.CaixaInfoMenorInput} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
                    </View>

                    <View style={styles.CaixaInfoMenorContainer}>
                        <Text style={styles.estiloTexto}>Carboidratos (g):</Text>
                        <TextInput style={styles.CaixaInfoMenorInput} value={carboidratos} onChangeText={setCarboidratos} keyboardType="numeric" />
                    </View>

                    <View style={styles.CaixaInfoMenorContainer}>
                        <Text style={styles.estiloTexto}>Proteínas (g):</Text>
                        <TextInput style={styles.CaixaInfoMenorInput} value={proteinas} onChangeText={setProteinas} keyboardType="numeric" />
                    </View>

                    <View style={styles.CaixaInfoMenorContainer}>
                        <Text style={styles.estiloTexto}>Gorduras (g):</Text>
                        <TextInput style={styles.CaixaInfoMenorInput} value={gorduras} onChangeText={setGorduras} keyboardType="numeric" />
                    </View>

                    <View style={styles.CaixaInfoMenorContainer}>
                        <Text style={styles.estiloTexto}>Kcalorias:</Text>
                        <TextInput style={styles.CaixaInfoMenorInput} editable={false} placeholder={caloriasCalculadas} placeholderTextColor={'#B0B0B0'} />
                    </View>

                    <View style={styles.listaContainer}>
                        <Text style={styles.tituloLista} marginTop={20}>Alimentos Cadastrados:</Text>
                        <ScrollView horizontal={true}>
                            <FlatList
                                nestedScrollEnabled
                                style={styles.listaContainer}
                                data={listaPratos}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.itemNome}>{item.nome}</Text>
                                        <Text style={styles.itemDescricao}>
                                            Qtd: {item.quantidade}g, Gor: {item.gorduras}g, Car: {item.carboidratos}g, Pro: {item.proteinas}g, Kcal: {item.kcal}
                                        </Text>
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                                            <Text style={styles.deleteButtonText}>Excluir</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={styles.estilobotao} onPress={adicionarPrato}>
                        <Text style={styles.textoBotao}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
                        <Text style={styles.textoBotaoVolta}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}