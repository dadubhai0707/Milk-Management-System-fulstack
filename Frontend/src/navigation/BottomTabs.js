import AdminStack from "./AdminNavigator";
import SellerStack from "./SellerNavigator";
import CustomerStack from "./CustomerNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ role }) {

  const getHomeScreen = () => {
    if (role === "owner") return AdminStack;
    if (role === "seller") return SellerStack;
    return CustomerStack;
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={getHomeScreen()} />
    </Tab.Navigator>
  );
}
