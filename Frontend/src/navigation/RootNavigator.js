import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import UserNavigation from "./UserNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { isAuthenticated, user } = useSelector(state => state.auth);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                <Stack.Screen
                    name="User"
                    component={UserNavigation}
                    initialParams={{ role: user.role }}
                />
            )}
        </Stack.Navigator>
    );
}
