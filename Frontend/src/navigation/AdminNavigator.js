import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "../screens/Store/AdminDashboard";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}