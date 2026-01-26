import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Auth/RegisterScreen";
import Login from "../screens/Auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}
