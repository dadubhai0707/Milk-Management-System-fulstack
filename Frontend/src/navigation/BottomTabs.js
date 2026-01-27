import AdminDashboard from "../screens/Store/AdminDashboard";
// import SellerDashboard from "../screens/seller/SellerDashboard";
// import CustomerDashboard from "../screens/customer/CustomerDashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ role }) {

  const getHomeScreen = () => {
    if (role === "owner") return AdminDashboard;
    // if (role === "seller") return SellerDashboard;
    // return CustomerDashboard;
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={getHomeScreen()} />
    </Tab.Navigator>
  );
}
