import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    dotContainer: {
        flexDirection: "row",
        gap: 6,
    },

    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#14b8a6",
    },

    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#d1d5db",
    },

    logoBox: {
        marginTop: 40,
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: "#ecfeff",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginTop: 24,
        color: "#111827",
    },

    subtitle: {
        fontSize: 15,
        color: "#6b7280",
        marginTop: 6,
        marginBottom: 30,
    },

    label: {
        fontSize: 14,
        color: "#111827",
        marginBottom: 8,
    },

    inputBox: {
        height: 54,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        justifyContent: "center",
        paddingHorizontal: 16,
        marginBottom: 20,
    },

    inputBoxRow: {
        flexDirection: "row",
        alignItems: "center",
        height: 54,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
    },

    input: {
        fontSize: 15,
        color: "#111827",
    },

    inputFlex: {
        flex: 1,
        fontSize: 15,
        color: "#111827",
    },

    countryCode: {
        marginRight: 10,
        fontSize: 15,
        color: "#111827",
    },

    loginButton: {
        height: 56,
        backgroundColor: "#14b8a6",
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    loginText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },

    footerText: {
        textAlign: "center",
        marginTop: 24,
        fontSize: 14,
        color: "#6b7280",
    },

    link: {
        color: "#14b8a6",
        fontWeight: "600",
    },
});

export default styles