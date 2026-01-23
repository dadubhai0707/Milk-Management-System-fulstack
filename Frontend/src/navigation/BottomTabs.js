import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminStack from "./AdminStack";
import SellerStack from "./SellerStack";
import CustomerStack from "./CustomerStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ route }) {
  const { role } = route.params;

  const getDashboard = () => {
    if (role === "admin") return AdminStack;
    if (role === "seller") return SellerStack;
    return CustomerStack;
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={getDashboard()}
      />
    </Tab.Navigator>
  );
}
