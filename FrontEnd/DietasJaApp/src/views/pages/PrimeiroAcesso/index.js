import React from "react";
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { usePrimeiroAcessoViewModel } from '../../../viewModels/PrimeiroAcessoViewModel';

export default function PrimeiroAcesso() {
    const {
        nome, setNome,
        peso, setPeso,
        altura, setAltura,
        idade, setIdade,
        valoratual, setValorAtual,
        isOpen, setIsOpen,
        items,
        handleAvançar,
    } = usePrimeiroAcessoViewModel();

    return (
        <SafeAreaView style={styles.CaixaTotal}>
            <View style={styles.CaixaTitulo}>
                <Image source={require("../../../assets/outralogo.png")} style={styles.imagemEstilo} />
                <Text style={styles.textoTitulo}>DietasJá!</Text>
            </View>

            <Text style={styles.textoSub}>Primeiro Acesso</Text>

            <ScrollView style={styles.CaixaForm} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.estiloTexto}> Nome:</Text>
                <TextInput
                    style={styles.estiloinput}
                    value={nome}
                    onChangeText={setNome}
                />

                <View style={styles.sexoContainer}>
                    <Text style={styles.estiloTexto}>Sexo:   </Text>
                    <DropDownPicker
                        items={items}
                        open={isOpen}
                        setOpen={setIsOpen}
                        value={valoratual}
                        setValue={setValorAtual}
                        placeholder="Escolha seu Sexo"
                        listMode="SCROLLVIEW"
                        zIndex={3000}
                        zIndexInverse={1000}
                        style={styles.dropDownPicker}
                        containerStyle={styles.dropDownPickerContainer}
                        textStyle={styles.dropDownPickerText}
                    />
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Idade:  </Text>
                    <TextInput
                        style={styles.estiloInputaolado}
                        value={idade}
                        onChangeText={setIdade}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Altura(cm): </Text>
                    <TextInput
                        style={styles.estiloInputaolado}
                        value={altura}
                        onChangeText={setAltura}
                        keyboardType="numeric"
                        placeholder="Ex: 180"
                    />
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Peso(Kg):   </Text>
                    <TextInput
                        style={styles.estiloInputaolado}
                        value={peso}
                        onChangeText={setPeso}
                        keyboardType="numeric"
                        placeholder="Ex: 75.5"
                    />
                </View>

                <TouchableOpacity
                    style={styles.estilobotaoAvançar}
                    onPress={handleAvançar}
                >
                    <Text style={styles.textoBotao}>Avançar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}