import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOW } from "./theme";
export const splashScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgApp,
        justifyContent: "center",
        alignItems: "center",
    },

    logoCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    logoText: {
        fontSize: 36,
        fontWeight: "800",
        color: "#FFFFFF",
    },

    appName: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },

    tagline: {
        marginTop: 6,
        fontSize: 13,
        color: COLORS.textMuted,
    },
});
