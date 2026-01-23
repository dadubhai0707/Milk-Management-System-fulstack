import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "../screens/admin/AdminDashboard";
import AdminProfile from "../screens/admin/AdminProfile";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
    </Stack.Navigator>
  );
}