import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./authCss.js"
import { useNavigation } from "@react-navigation/native";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

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
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Login to manage your dairy</Text>

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
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#6b7280"
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputBoxRow}>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry={!showConfirmPassword}
                        style={styles.inputFlex}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#6b7280"
                        />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>
                        Login <Ionicons name="arrow-forward" size={16} />
                    </Text>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={styles.footerText}>
                    Don’t have an account? <Text
                        onPress={() => navigation.navigate('Register')} style={styles.link}>Sign Up</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
