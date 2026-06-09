import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Trades() {
  const router = useRouter();

  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [resultFilter, setResultFilter] = useState("ALL");
  const [sessionFilter, setSessionFilter] = useState("ALL");

const fetchTrades = async () => {
  try {
    const res = await axios.get(
      "https://expo-nextjs-backend.vercel.app/api/trade"
    );

    setTrades(res.data.trades || []);
  } catch (error) {
    console.log(error);
  }
};
  const onRefresh = async () => {
  setRefreshing(true);

  await fetchTrades();

  setRefreshing(false);
};

  useEffect(() => {
  const load = async () => {
    await fetchTrades();
    setLoading(false);
  };

  load();
}, []);

  const filteredTrades = trades.filter((t) => {
    const matchResult =
      resultFilter === "ALL" || t.result === resultFilter;

    const matchSession =
      sessionFilter === "ALL" || t.session === sessionFilter;

    return matchResult && matchSession;
  });

  const getResultColor = (result: string) => {
    switch (result) {
      case "WIN":
        return "#22c55e";
      case "LOSE":
        return "#ef4444";
      default:
        return "#facc15";
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[
          "rgba(20,0,40,0.95)",
          "rgba(50,0,80,0.85)",
          "rgba(10,0,25,0.95)",
        ]}
        style={styles.overlay}
      >
        <ScrollView
  contentContainerStyle={styles.container}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#a855f7"]}      // Android
      tintColor="#a855f7"       // iOS
    />
  }
>
          
          {/* HEADER */}
          <Text style={styles.title}>📊 Trades</Text>
          <Text style={styles.subtitle}>
            Track, analyze and improve your trading performance
          </Text>

          {/* FILTER SECTION */}
          <BlurView intensity={40} tint="dark" style={styles.filterBox}>
            <Text style={styles.filterTitle}>Filters</Text>

            <View style={styles.filterRow}>
              {["ALL", "WIN", "LOSE"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setResultFilter(item)}
                  style={[
                    styles.filterBtn,
                    resultFilter === item && styles.activeFilter,
                  ]}
                >
                  <Text style={styles.filterText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterRow}>
              {["ALL", "LONDON", "NEW YORK", "ASIA"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSessionFilter(item)}
                  style={[
                    styles.filterBtn,
                    sessionFilter === item && styles.activeFilter,
                  ]}
                >
                  <Text style={styles.filterText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </BlurView>

          {/* TRADE LIST */}
          {loading ? (
            <ActivityIndicator color="#a855f7" size="large" />
          ) : (
            filteredTrades.map((trade) => (
              <TouchableOpacity
                key={trade._id}
                onPress={() =>
                  router.push(`../trade/${trade._id}`)
                }
              >
                <BlurView
                  intensity={30}
                  tint="dark"
                  style={styles.card}
                >
                  <View style={styles.cardRow}>
                    <Text style={styles.symbol}>
                      {trade.symbol}
                    </Text>

                    <Text style={styles.date}>
                      {new Date(trade.createdAt).toDateString()}
                    </Text>
                  </View>

                    <View style={styles.cardRow}>
                        <Text
                      style={[
                        styles.result,
                        { color: getResultColor(trade.result) },
                      ]}
                    >
                      {trade.result}
                      
                    </Text>
                    <Text
                    style={trade.direction =="BUY"?styles.directionb:styles.directions}
                    >
                      {trade.direction}
                      
                    </Text>
                    </View>
                  
                </BlurView>
              </TouchableOpacity>
            ))
          )}
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
    paddingBottom: 100,
  },

  title: {
    fontSize: 30,
    color: "#eeff00",
    fontWeight: "800",
  },

  subtitle: {
    color: "#c4c4c4",
    marginTop: 6,
    marginBottom: 20,
  },

  filterBox: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  filterTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginRight: 8,
    marginBottom: 8,
  },

  activeFilter: {
    backgroundColor: "#7c3aed",
  },

  filterText: {
    color: "#fff",
    fontSize: 12,
  },

  card: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  symbol: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  date: {
    color: "#aaa",
    fontSize: 12,
  },

  result: {
    marginTop: 8,
    fontWeight: "700",
    fontSize: 13,
  },
  directions:{
    color:"rgb(249, 253, 0)",
    fontWeight:700,
    fontSize:17
  },
  directionb:{
    color:"rgb(101, 253, 0)",
    fontWeight:700,
    fontSize:17
  },

});