import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import BottomTabs from "./BottomTabs";
const Stack = createNativeStackNavigator();
export default function RootNavigator() {
    const isLoggedIn = false;        // Redux / Context se ayega
    const role = "admin";          // admin | seller | customer

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                <Stack.Screen
                    name="MainTabs"
                    component={BottomTabs}
                    initialParams={{ role }}
                />
            )}
        </Stack.Navigator>
    );
}
