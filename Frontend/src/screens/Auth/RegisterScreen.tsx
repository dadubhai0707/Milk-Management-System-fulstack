import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import Toast from 'react-native-toast-message';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./authCss.js"
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/thunk/auth/authThunk.js";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const dispatch = useDispatch<any>();
    const navigation = useNavigation();
    const RegisterForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            address: ""
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsloading(true);
                const res = await dispatch(registerUser(values)).unwrap();
                Toast.show({
                    type: 'success',
                    text1: 'Registered',
                    text2: res.message
                });
                await resetForm();
                await navigation.navigate('Login')
            } catch (err) {
                console.log(err)
                Toast.show({
                    type: 'error',
                    text1: 'Warn',
                    text2: err
                });
            } finally {
                setIsloading(false);
            }
        }
    })
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView keyboardShouldPersistTaps="handled">
                {/* Logo */}
                <View style={styles.logoBox}>
                    <Ionicons name="water" size={28} color="#14b8a6" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Create Account 👋</Text>
                <Text style={styles.subtitle}>
                    Register to manage your dairy
                </Text>

                {/* Name */}
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="Enter your name"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                        value={RegisterForm.values.name}
                        onChangeText={RegisterForm.handleChange("name")}
                        onBlur={RegisterForm.handleBlur("name")}
                    />
                </View>

                {/* Mobile */}
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.inputBoxRow}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                        placeholder="Enter 10 digit number"
                        placeholderTextColor="#9ca3af"
                        keyboardType="number-pad"
                        maxLength={10}
                        style={styles.inputFlex}
                        value={RegisterForm.values.mobile}
                        onChangeText={RegisterForm.handleChange("mobile")}
                        onBlur={RegisterForm.handleBlur("mobile")}
                    />
                </View>
                <Text style={styles.label}>Full Address</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="Enter your Address"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                        value={RegisterForm.values.address}
                        onChangeText={RegisterForm.handleChange("address")}
                        onBlur={RegisterForm.handleBlur("address")}
                    />
                </View>

                {/* Password */}
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputBoxRow}>
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry={!showPassword}
                        style={styles.inputFlex}
                        value={RegisterForm.values.password}
                        onChangeText={RegisterForm.handleChange("password")}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={RegisterForm.handleSubmit}
                >
                    <Text style={styles.loginText}>
                        {isLoading ? "Wait....." : "Register"}   <Ionicons name="arrow-forward" size={16} />
                    </Text>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={styles.footerText}>
                    Already have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={styles.link}>Login</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
