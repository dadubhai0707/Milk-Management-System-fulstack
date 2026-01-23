import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboard from "../screens/customer/CustomerDashboard";
import CustomerProfile from "../screens/customer/CustomerProfile";

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
            <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
        </Stack.Navigator>
    );
}
