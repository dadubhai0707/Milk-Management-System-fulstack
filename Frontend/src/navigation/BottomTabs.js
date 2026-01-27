import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminDashboard from "../screens/Store/AdminDashboard";
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
    </Tab.Navigator>
  );
}
