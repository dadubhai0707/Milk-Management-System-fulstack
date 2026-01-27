import BottomTabs from "./BottomTabs";
export default function UserNavigation({ route }) {
    const { role } = route.params;

    return <BottomTabs role={role} />;
}
