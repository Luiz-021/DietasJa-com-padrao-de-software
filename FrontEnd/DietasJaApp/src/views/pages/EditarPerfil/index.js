import React from "react";
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { useEditarPerfilViewModel } from "../../../viewModels/EditarPerfilViewModel";

export default function EditarPerfil() {
    const {
        nome, setNome,
        peso, setPeso,
        altura, setAltura,
        idade, setIdade,
        sexo, setSexo,
        isOpen, setIsOpen,
        items,
        isLoading,
        salvarAlteracoes,
        handleVoltar
    } = useEditarPerfilViewModel();

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.CaixaTotal, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.CaixaTotal}>
            <View style={styles.CaixaTitulo}>
                <Image source={require("../../../assets/outralogo.png")} style={styles.imagemEstilo}></Image>
                <Text style={styles.textoTitulo}>DietasJá! </Text>
            </View>
            <Text style={styles.textoSub}>Editar Perfil</Text>
            <ScrollView style={styles.CaixaForm}>
                <Text style={styles.estiloTexto}> Nome:</Text>
                <TextInput style={styles.estiloinput} value={nome} onChangeText={setNome}></TextInput>

                <View style={styles.sexoContainer}>
                    <Text style={styles.estiloTexto}>Sexo:  </Text>
                    <DropDownPicker
                        items={items}
                        open={isOpen}
                        setOpen={setIsOpen}
                        value={sexo}
                        setValue={setSexo}
                        placeholder="Escolha seu Sexo"
                        style={styles.dropDownPicker}
                        containerStyle={styles.dropDownPickerContainer}
                        textStyle={styles.dropDownPickerText}
                        listMode="SCROLLVIEW"
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Idade:  </Text>
                    <TextInput style={styles.estiloInputaolado} value={idade} onChangeText={setIdade} keyboardType="numeric"></TextInput>
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Altura(cm): </Text>
                    <TextInput style={styles.estiloInputaolado} value={altura} onChangeText={setAltura} keyboardType="numeric"></TextInput>
                </View>

                <View style={styles.ContainerInputaolado}>
                    <Text style={styles.estiloTexto}>Peso(Kg):   </Text>
                    <TextInput style={styles.estiloInputaolado} value={peso} onChangeText={setPeso} keyboardType="numeric"></TextInput>
                </View>

                <TouchableOpacity style={styles.estilobotaoSalvar} onPress={salvarAlteracoes}>
                    <Text style={styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
                    <Text style={styles.textoBotaoVolta}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}