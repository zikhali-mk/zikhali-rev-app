import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function TradeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [trade, setTrade] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [result, setResult] = useState("");
  const [total, setTotal] = useState("");

  // ===========================
  // FETCH TRADE
  // ===========================

  const fetchTrade = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://expo-nextjs-backend.vercel.app/api/trade/${id}`
      );

      const tradeData = res.data.trade;

      setTrade(tradeData);

      setResult(tradeData.result || "");

      // Store only numeric value for editing
      setTotal(
        Math.abs(Number(tradeData.total || 0)).toString()
      );
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load trade.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrade();
    }
  }, [id]);

  // ===========================
  // PULL TO REFRESH
  // ===========================

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTrade();
    setRefreshing(false);
  };

  // ===========================
  // UPDATE TRADE
  // ===========================

  const updateTrade = async () => {
    try {
      const formattedTotal =
        result.toUpperCase() === "WIN"
          ? Math.abs(Number(total))
          : -Math.abs(Number(total));

      await axios.patch(
        `https://expo-nextjs-backend.vercel.app/api/trade/${id}`,
        {
          result,
          total: formattedTotal,
        }
      );

      Alert.alert(
        "Success",
        "Trade updated successfully."
      );

      fetchTrade();
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Error",
        "Failed to update trade."
      );
    }
  };

  // ===========================
  // DELETE TRADE
  // ===========================

  const deleteTrade = async () => {
    Alert.alert(
      "Delete Trade",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(
                `https://expo-nextjs-backend.vercel.app/api/trade/${id}`
              );

              Alert.alert(
                "Deleted",
                "Trade deleted successfully."
              );

              router.replace("/(tabs)/trades");
            } catch (err) {
              console.log(err);
              Alert.alert(
                "Error",
                "Failed to delete trade."
              );
            }
          },
        },
      ]
    );
  };

  // ===========================
  // LOADING
  // ===========================

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#8b5cf6"
        />
      </View>
    );
  }

  if (!trade) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: "#fff" }}>
          Trade not found
        </Text>
      </View>
    );
  }

  const displayTotal =
    trade.result?.toUpperCase() === "WIN"
      ? `+${Math.abs(Number(trade.total))}`
      : `-${Math.abs(Number(trade.total))}`;

  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      style={styles.background}
    >
      <LinearGradient
        colors={[
          "rgba(4,5,15,0.65)",
          "rgba(18,2,31,0.82)",
          "rgba(0,0,0,0.95)",
        ]}
        style={styles.overlay}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#8b5cf6"
            />
          }
        >
          {/* HEADER */}

          <Text style={styles.title}>
            {trade.symbol}
          </Text>

          <Text style={styles.subtitle}>
            Trade Details & Performance
          </Text>

          {/* ========================= */}

          {/* TRADE DETAILS */}

          {/* ========================= */}

          <BlurView
            intensity={35}
            tint="dark"
            style={styles.card}
          >
            <View style={styles.row}>
              <Text style={styles.label}>
                Direction
              </Text>

              <Text style={styles.value}>
                {trade.direction}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Entry
              </Text>

              <Text style={styles.value}>
                {trade.entry}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Stop Loss
              </Text>

              <Text style={styles.value}>
                {trade.sl}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Take Profit
              </Text>

              <Text style={styles.value}>
                {trade.tp}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                RR
              </Text>

              <Text style={styles.value}>
                {trade.rr}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Session
              </Text>

              <Text style={styles.value}>
                {trade.session}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Setup
              </Text>

              <Text style={styles.value}>
                {trade.setup}
              </Text>
            </View>
          </BlurView>

          {/* ========================= */}

          {/* PERFORMANCE */}

          {/* ========================= */}

          <BlurView
            intensity={35}
            tint="dark"
            style={styles.card}
          >
            <Text style={styles.sectionTitle}>
              Performance
            </Text>

            <Text style={styles.performanceLabel}>
              Result
            </Text>

            <Text
              style={[
                styles.performanceValue,
                trade.result?.toUpperCase() ===
                "WIN"
                  ? styles.win
                  : styles.loss,
              ]}
            >
              {trade.result}
            </Text>

            <Text style={styles.performanceLabel}>
              Total
            </Text>

            <Text
              style={[
                styles.performanceValue,
                trade.result?.toUpperCase() ===
                "WIN"
                  ? styles.win
                  : styles.loss,
              ]}
            >
              {displayTotal}
            </Text>
          </BlurView>

          {/* ========================= */}

          {/* EDIT FORM */}

          {/* ========================= */}

          <BlurView
            intensity={35}
            tint="dark"
            style={styles.card}
          >
            <Text style={styles.sectionTitle}>
              Edit Performance
            </Text>

            <Text style={styles.label}>
              Result
            </Text>

            <TextInput
              value={result}
              onChangeText={setResult}
              style={styles.input}
              placeholder="WIN or LOSS"
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>
              Total
            </Text>

            <TextInput
              value={total}
              onChangeText={setTotal}
              keyboardType="numeric"
              style={styles.input}
              placeholder="100"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.updateBtn}
              onPress={updateTrade}
            >
              <Text style={styles.btnText}>
                Update Trade
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={deleteTrade}
            >
              <Text style={styles.btnText}>
                Delete Trade
              </Text>
            </TouchableOpacity>
          </BlurView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 25,
    paddingBottom: 80,
  },

  loading: {
    flex: 1,
    backgroundColor: "#090011",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0fe769",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#b5b5b5",
    marginBottom: 22,
  },

  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  label: {
    fontSize: 14,
    color: "#9f9f9f",
    marginBottom: 8,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },

  performanceLabel: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
  },

  performanceValue: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 8,
  },

  win: {
    color: "#22c55e",
  },

  loss: {
    color: "#ef4444",
  },

  input: {
    height: 55,
    borderRadius: 16,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    fontSize: 15,
    marginBottom: 16,
  },

  updateBtn: {
    backgroundColor: "#7c3aed",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  deleteBtn: {
    backgroundColor: "#dc2626",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
