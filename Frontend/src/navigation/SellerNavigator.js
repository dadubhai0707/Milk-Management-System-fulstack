import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellerDashboard from "../screens/Seller/SellerDashboard";

const Stack = createNativeStackNavigator();

export default function SellerStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
    </Stack.Navigator>
  );
}