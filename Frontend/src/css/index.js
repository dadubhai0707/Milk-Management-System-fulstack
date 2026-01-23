import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOW } from "./theme";

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
    justifyContent: "center",
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: SIZES.radius + 4,
    padding: 20,
    ...SHADOW.soft,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  inputGroup: {
    marginBottom: 14,
  },

  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: SIZES.radius,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bgSoft,
    color: COLORS.textPrimary,
    fontSize: 14,
  },

  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 4,
  },

  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    marginTop: 16,
    color: COLORS.textSecondary,
  },

  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

