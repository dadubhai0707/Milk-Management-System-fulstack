import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../css/theme.js";
import { splashScreen } from "../../css/style.js"
export default function Splash({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {

        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={splashScreen.container}>
            <View style={splashScreen.logoCircle}>
                <Text style={splashScreen.logoText}>A</Text>
            </View>

            <Text style={splashScreen.appName}>Admin Panel</Text>
            <Text style={splashScreen.tagline}>Manage everything smartly</Text>
        </View>
    );
}
