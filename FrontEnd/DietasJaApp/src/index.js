import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Title from './components/Title/'
import Login from "./views/pages/Login"
import EditarLogin from "./views/pages/EditarLogin"
import EditarPerfil from "./views/pages/EditarPerfil"
import Routes from "./navigation"
import PrimeiroAcesso from "./views/pages/PrimeiroAcesso";
import 'react-native-gesture-handler';
import TelaInicial from "./views/pages/TelaInicial";
import Cadastro from "./views/pages/Cadastro";
import { NavigationContainer } from "@react-navigation/native";
import CadastrarPrato from "./views/pages/CadastrarPrato";

export default function App() {
    return(
        <View style={styles.container}>
             <Routes></Routes>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop: 0,
    },
  });
  