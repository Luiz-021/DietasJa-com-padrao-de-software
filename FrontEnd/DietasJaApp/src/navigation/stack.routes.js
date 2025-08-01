import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabRoutes from "./tab.routes";
import InformConsumo from "../views/pages/InformConsumo";
import Login from "../views/pages/Login";
import Welcome from "../views/pages/Welcome";
import Perfil from "../views/pages/Perfil";
import EditarMetas from "../views/pages/EditarMetas";
import TelaInicial from "../views/pages/TelaInicial";
import EditarPerfil from "../views/pages/EditarPerfil";
import EditarLogin from "../views/pages/EditarLogin";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen
            name = "home"
            component = {TelaInicial}>
            </Stack.Screen>

            <Stack.Screen
             name="Login" 
             component={Login} />

            <Stack.Screen
             name="Welcome" 
             component={Welcome} />

            <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
            ></Stack.Screen>

            <Stack.Screen 
            name="EditarLogin" 
            component={EditarLogin} />   

        </Stack.Navigator>
    )
}