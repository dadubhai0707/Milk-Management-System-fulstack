import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboard from "../screens/Customer/CustomerDashboard";

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
            {/* <Stack.Screen name="CustomerProfile" component={CustomerProfile} /> */}
        </Stack.Navigator>
    );
}
