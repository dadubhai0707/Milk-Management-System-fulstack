import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
const COLUMN_GAP = 12;
const SCREEN_PADDING = 20;
// Ek row mein 3 cards ke liye width calculation
const ACTION_CARD_WIDTH = (width - (SCREEN_PADDING * 2) - (COLUMN_GAP * 2)) / 3;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.topCard}>
          <Text style={styles.greeting}>Welcome Back,</Text>
          <Text style={styles.adminName}>Admin Panel 👋</Text>

          <View style={styles.statsOverview}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Purchased</Text>
              <Text style={styles.statValue}>₹12.2k</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Sales</Text>
              <Text style={styles.statValue}>₹18.5k</Text>
            </View>
          </View>
        </View>

        {/* Info Cards Row */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <InfoCard title="Sellers" value="12" sub="Active" />
            <InfoCard title="Customers" value="180" sub="Total" />
          </View>
          <View style={styles.infoRow}>
            <InfoCard title="Milk (L)" value="520" sub="Today" />
            <InfoCard title="Pending" value="₹6.3k" sub="Due" />
          </View>
        </View>

        {/* Quick Actions Grid (3 per row) */}
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

        <View style={styles.actionGrid}>
          <ActionCard label="Seller" icon="👤" />
          <ActionCard label="Customer" icon="👥" />
          <ActionCard label="Entry" icon="📝" />
          <ActionCard label="Payment" icon="💰" />
          <ActionCard label="Report" icon="📊" />
          <ActionCard label="Setup" icon="⚙️" />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-components
const InfoCard = ({ title, value, sub }: any) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoSub}>{sub}</Text>
  </View>
);

const ActionCard = ({ label, icon }: any) => (
  <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F1F5F9' },
  container: { flex: 1 },

  /* Header Section */
  topCard: {
    backgroundColor: '#1E293B', // Deep professional slate
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  greeting: { color: '#94A3B8', fontSize: 14, fontWeight: '500', letterSpacing: 1 },
  adminName: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginTop: 4 },

  statsOverview: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginTop: 25,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  statValue: { color: '#38BDF8', fontSize: 20, fontWeight: '800', marginTop: 4 },
  divider: { width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.1)' },

  /* Overlapping Info Cards */
  infoContainer: { marginTop: -40, paddingHorizontal: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: { color: '#64748B', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  infoValue: { color: '#0F172A', fontSize: 22, fontWeight: '800', marginVertical: 4 },
  infoSub: { color: '#94A3B8', fontSize: 10, fontWeight: '500' },

  /* Section Styles */
  sectionTitle: {
    paddingHorizontal: 25,
    marginTop: 30,
    marginBottom: 15,
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1.5,
  },

  /* 3-Column Square Grid */
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_PADDING,
    gap: COLUMN_GAP,
  },
  actionCard: {
    width: ACTION_CARD_WIDTH,
    aspectRatio: 1, // Makes it perfectly square
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconText: { fontSize: 20 },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
});