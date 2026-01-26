import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import UserNavigation from "./UserNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = false;      // later Redux
    const role = "admin";        // admin | seller | customer

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                <Stack.Screen
                    name="User"
                    component={UserNavigation}
                    initialParams={{ role }}
                />
            )}
        </Stack.Navigator>
    );
}
