import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "../screens/Store/AdminDashboard";
import AdminBottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator >
      {/* Bottom Navigation */}
      <Stack.Screen
        name="AdminHome"
        component={AdminBottomTabs}
      />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}