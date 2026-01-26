import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import UserNavigation from "./UserNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { isLoggedIn, role } = useSelector(state => state.auth);

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
