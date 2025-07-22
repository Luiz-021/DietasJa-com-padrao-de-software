import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./drawer.routes";
import Login from "../views/pages/Login";
import Welcome from "../views/pages/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrimeiroAcesso from "../views/pages/PrimeiroAcesso";
import EditarLogin from "../views/pages/EditarLogin"
import EditarPerfil from "../views/pages/EditarPerfil"
import StackRoutes from "./stack.routes";
import Cadastro from "../views/pages/Cadastro";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Função para alterar o estado de login do usuário
  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogOut = () => {
    setUserLoggedIn(false);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {userLoggedIn ? (
          <>
            <Stack.Screen name="Main">
              {() => <DrawerRoutes handleLogOut={handleLogOut} />}
            </Stack.Screen>
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
            <Stack.Screen name="EditarLogin" component={EditarLogin} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login">
              {(props) => <Login {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="PrimeiroAcesso">
            {() => (
            <PrimeiroAcesso
            handleLogin={() => {
            handleLogin();
            }}
            />
            )}
           </Stack.Screen>

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
