import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formStyles } from "../../css/index";
import { COLORS } from "../../css/theme"; // path adjust

const RegisterSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
        .required("Mobile number is required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
});

export default function Register() {
    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            password: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            console.log(values); // UI only
        },
    });

    return (
        <KeyboardAvoidingView
            style={formStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={formStyles.card}>
                <Text style={formStyles.title}>Create Account</Text>
                <Text style={formStyles.subtitle}>Register to continue</Text>

                {/* Name */}
                <View style={formStyles.inputGroup}>
                    <Text style={formStyles.label}>Name</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="Enter your name"
                        placeholderTextColor={COLORS.textMuted}
                        value={formik.values.name}
                        onChangeText={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <Text style={formStyles.error}>{formik.errors.name}</Text>
                    )}
                </View>

                {/* Mobile */}
                <View style={formStyles.inputGroup}>
                    <Text style={formStyles.label}>Mobile Number</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="Enter mobile number"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="number-pad"
                        maxLength={10}
                        value={formik.values.mobile}
                        onChangeText={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                        <Text style={formStyles.error}>{formik.errors.mobile}</Text>
                    )}
                </View>

                {/* Password */}
                <View style={formStyles.inputGroup}>
                    <Text style={formStyles.label}>Password</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="Enter password"
                        placeholderTextColor={COLORS.textMuted}
                        secureTextEntry
                        value={formik.values.password}
                        onChangeText={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={formStyles.error}>{formik.errors.password}</Text>
                    )}
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={formStyles.button}
                    onPress={formik.handleSubmit}
                >
                    <Text style={formStyles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={formStyles.footerText}>
                    Already have an account?{" "}
                    <Text style={formStyles.link}>Login</Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
