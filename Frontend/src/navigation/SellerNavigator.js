import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellerDashboard from "../screens/seller/SellerDashboard";
import SellerProfile from "../screens/seller/SellerProfile";

const Stack = createNativeStackNavigator();

export default function SellerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
      <Stack.Screen name="SellerProfile" component={SellerProfile} />
    </Stack.Navigator>
  );
}
