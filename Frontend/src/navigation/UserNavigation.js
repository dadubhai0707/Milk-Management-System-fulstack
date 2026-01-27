import AdminStack from "./AdminNavigator";
import SellerStack from "./SellerNavigator";
import CustomerStack from "./CustomerNavigator";
export default function UserNavigation({ route }) {
    const { role } = route.params;
    if (role === "owner") {
        return <AdminStack />;
    }
    if (role === "seller") {
        return <SellerStack />;
    }
    return <CustomerStack />;
}
