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

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
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

                {/* Register Button */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>
                        Register <Ionicons name="arrow-forward" size={16} />
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
