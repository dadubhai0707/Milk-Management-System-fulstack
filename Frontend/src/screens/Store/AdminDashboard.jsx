import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function AdminDashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good Morning 👋</Text>
      <Text style={styles.name}>Alex Rivera</Text>

      <View style={styles.row}>
        <StatCard title="Total Milk" value="1200 L" icon="flash" />
        <StatCard title="Today Buy" value="450 L" icon="cart" />
      </View>

      <View style={styles.row}>
        <StatCard title="Sold Milk" value="800 L" icon="car" />
        <StatCard title="Remaining" value="400 L" icon="hourglass" highlight />
      </View>

      <Text style={styles.section}>Manage Business</Text>

      <View style={styles.grid}>
        {[
          "Purchase", "Milk", "Assign", "Seller",
          "Customer", "Address", "Payment", "Reports", "Settings"
        ].map(item => (
          <View key={item} style={styles.gridItem}>
            <Ionicons name="apps" size={24} color="#14b8a6" />
            <Text>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.bigButton}>
        <Ionicons name="flash-outline" size={20} color="#14b8a6" />
        <Text style={styles.bigText}> Add / Assign Milk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const StatCard = ({ title, value, icon, highlight }) => (
  <View style={[styles.card, highlight && styles.highlight]}>
    <Ionicons name={icon} size={20} color="#14b8a6" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9fafb" },
  greeting: { fontSize: 16, color: "#6b7280" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  card: { width: "48%", backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 12 },
  highlight: { backgroundColor: "#fff7ed" },
  cardTitle: { color: "#6b7280", marginTop: 8 },
  cardValue: { fontSize: 20, fontWeight: "bold" },
  section: { fontSize: 18, fontWeight: "bold", marginVertical: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "30%", backgroundColor: "#fff", padding: 16, borderRadius: 16, alignItems: "center", marginBottom: 12 },
  bigButton: { flexDirection: "row", backgroundColor: "#14b8a6", padding: 16, borderRadius: 30, justifyContent: "center", marginVertical: 20 },
  bigText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
