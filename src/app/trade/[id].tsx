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
  const [result, setResult] = useState("");

  const fetchTrade = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://expo-nextjs-backend.vercel.app/api/trade/${id}`
      );

      setTrade(res.data.trade);
      setResult(res.data.trade.result);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load trade");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTrade();
  }, [id]);

  // =========================
  // UPDATE RESULT ONLY
  // =========================
  const updateTrade = async () => {
    try {
      const res = await axios.patch(
        `https://expo-nextjs-backend.vercel.app/api/trade/${id}`,
        { result }
      );

      setTrade(res.data.trade);

      Alert.alert("Success", "Trade updated successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update trade");
    }
  };

  // =========================
  // DELETE TRADE
  // =========================
  const deleteTrade = async () => {
    try {
      await axios.delete(
        `https://expo-nextjs-backend.vercel.app/api/trade/${id}`
      );

      Alert.alert("Deleted", "Trade removed successfully");

      router.push("/(tabs)/trades");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete trade");
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  if (!trade) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: "#fff" }}>Trade not found</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={styles.background}
    >
      <LinearGradient
        colors={[
          "rgba(20,0,40,0.95)",
          "rgba(50,0,80,0.85)",
          "rgba(10,0,25,0.95)",
        ]}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* HEADER */}
          <Text style={styles.title}>{trade.symbol}</Text>
          <Text style={styles.subtitle}>
            Trade Details & Performance
          </Text>

          {/* MAIN CARD */}
          <BlurView intensity={35} tint="dark" style={styles.card}>
            
            <View style={styles.row}>
              <Text style={styles.label}>Direction</Text>
              <Text style={styles.value}>{trade.direction}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Entry</Text>
              <Text style={styles.value}>{trade.entry}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Stop Loss</Text>
              <Text style={styles.value}>{trade.sl}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Take Profit</Text>
              <Text style={styles.value}>{trade.tp}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>RR</Text>
              <Text style={styles.value}>{trade.rr}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Session</Text>
              <Text style={styles.value}>{trade.session}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Setup</Text>
              <Text style={styles.value}>{trade.setup}</Text>
            </View>

            {/* RESULT (EDITABLE) */}
            <Text style={styles.label}>Result (Editable)</Text>
            <TextInput
              value={result}
              onChangeText={setResult}
              style={styles.input}
              placeholder="WIN / LOSS"
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity
              onPress={updateTrade}
              style={styles.updateBtn}
            >
              <Text style={styles.btnText}>Update Trade</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteTrade}
              style={styles.deleteBtn}
            >
              <Text style={styles.btnText}>Delete Trade</Text>
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
    padding: 18,
    paddingBottom: 80,
  },

  loading: {
    flex: 1,
    backgroundColor: "#0b0015",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
  },

  subtitle: {
    color: "#bbb",
    marginBottom: 20,
  },

  card: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#aaa",
    fontSize: 13,
  },

  value: {
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 12,
    color: "#fff",
    marginTop: 8,
    marginBottom: 12,
  },

  updateBtn: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});