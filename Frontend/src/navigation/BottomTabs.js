import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AdminDashboard from "../screens/Store/AdminDashboard";

// import AdminDashboard from "../screens/admin/AdminDashboard";
// import SellerDashboard from "../screens/seller/SellerDashboard";
// import CustomerDashboard from "../screens/customer/CustomerDashboard";

// import Analytics from "../screens/common/Analytics";
// import Stock from "../screens/common/Stock";
// import Profile from "../screens/common/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ role }) {
  // const getHomeScreen = () => {
  //   if (role === "admin") return AdminDashboard;
  //   if (role === "seller") return SellerDashboard;
  //   return CustomerDashboard;
  // };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#14b8a6",
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home";
          if (route.name === "Analytics") icon = "bar-chart";
          if (route.name === "Stock") icon = "cube";
          if (route.name === "Profile") icon = "person";
          return <Ionicons name={icon} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={AdminDashboard} />
      {/* <Tab.Screen name="Analytics" component={<></>} /> */}
      {/* <Tab.Screen name="Stock" component={<></>} /> */}
      {/* <Tab.Screen name="Profile" component={<></>} /> */}
    </Tab.Navigator>
  );
}
