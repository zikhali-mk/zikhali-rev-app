import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTrades = async () => {
  try {
    const res = await axios.get(
      "https://expo-nextjs-backend.vercel.app/api/trade"
    );

    setTrades(res.data.trades || []);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  const load = async () => {
    await fetchTrades();
    setLoading(false);
  };

  load();
}, []);
  const onRefresh = async () => {
  setRefreshing(true);

  await fetchTrades();

  setRefreshing(false);
};

  useEffect(() => {
    fetchTrades();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  // =========================
  // STATS CALCULATIONS
  // =========================
  const totalTrades = trades.length;
  const wins = trades.filter((t) => t.result === "WIN").length;
  const losses = trades.filter((t) => t.result === "LOSE").length;

  const winRate =
  totalTrades > 0
    ? (wins / totalTrades) * 100
    : 0;

const lossRate =
  totalTrades > 0
    ? (losses / totalTrades) * 100
    : 0;

  // =========================
  // SESSION ANALYSIS
  // =========================
  const sessions = ["LONDON", "NEW YORK", "ASIA"];

  const sessionData = sessions.map((s) => ({
    session: s,
    count: trades.filter((t) => t.session === s).length,
  }));

  const mostWinningSession = sessions
    .map((s) => ({
      session: s,
      wins: trades.filter(
        (t) => t.session === s && t.result === "WIN"
      ).length,
    }))
    .sort((a, b) => b.wins - a.wins)[0]?.session;

  // =========================
  // WEEKLY FILTER (Sunday-Saturday)
  // =========================
  const getWeekTrades = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday

    const sunday = new Date(now);
    sunday.setDate(now.getDate() - day);

    return trades.filter((t) => {
      const d = new Date(t.createdAt);
      return d >= sunday;
    });
  };

  const weeklyTrades = getWeekTrades();
  const weeklyWins = weeklyTrades.filter((t) => t.result === "WIN").length;

  // =========================
  // CHART DATA
  // =========================

  const lineData = {
  labels:
    weeklyTrades.length > 0
      ? weeklyTrades.map((_, i) => `${i + 1}`)
      : ["0"],

  datasets: [
    {
      data:
        weeklyTrades.length > 0
          ? weeklyTrades.map((t) =>
              t.result === "WIN" ? 10 : -5
            )
          : [0],
    },
  ],
};

  const barData = {
    labels: sessions,
    datasets: [
      {
        data: sessionData.map((s) => s.count),
      },
    ],
  };

  const pieData = [
    {
      name: "Wins",
      population: wins,
      color: "#22c55e",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Losses",
      population: losses,
      color: "#ef4444",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
  ];

  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      style={styles.background}
    >
      <LinearGradient
        colors={[
          "rgba(1, 3, 20, 0.64)",
          "rgba(18, 2, 31, 0.82)",
          "rgba(2, 1, 3, 0.94)",
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
          
          <Text style={styles.title}>📊 Dashboard</Text>
          <Text style={styles.subtitle}>
            Your trading performance intelligence system
          </Text>

          {/* ================= STATS ================= */}
          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>Overall Stats</Text>

            <Text style={styles.stat}>Total Trades: {totalTrades}</Text>
            <Text style={styles.stat}>Wins: {wins}</Text>
            <Text style={styles.stat}>Losses: {losses}</Text>
            <Text style={styles.stat}>
              Most Winning Session: {mostWinningSession}
            </Text>
          </BlurView>

          {/* ================= WIN RATE BAR ================= */}
          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>Win Rate</Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${winRate}%`, backgroundColor: "#22c55e" },
                ]}
              />
            </View>

            <Text style={styles.stat}>{winRate.toFixed(1)}%</Text>
          </BlurView>

          {/* ================= PIE CHART ================= */}
          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>Win vs Loss</Text>

            {wins + losses > 0 && (

                <PieChart
                  data={pieData}
                  width={screenWidth - 60}
                  height={180}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="10"
                  chartConfig={{
                    color: () => "#fff",
                  }}
                />
              )}

            {/* <PieChart
              data={pieData}
              width={screenWidth - 60}
              height={180}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              chartConfig={{
                color: () => "#fff",
              }}
            /> */}
          </BlurView>

          {/* ================= SESSION BAR CHART ================= */}
          {/* ================= SESSION PERFORMANCE ================= */}
<BlurView intensity={40} tint="dark" style={styles.card}>
  <Text style={styles.cardTitle}>Trading Sessions</Text>

  {sessionData.map((item) => {
    const percentage =
      totalTrades > 0
        ? (item.count / totalTrades) * 100
        : 0;

    return (
      <View
        key={item.session}
        style={{ marginBottom: 15 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            {item.session}
          </Text>

          <Text style={{ color: "#aaa" }}>
            {item.count} Trades
          </Text>
        </View>

        <View
          style={{
            height: 10,
            backgroundColor: "#2c2c2c",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${percentage}%`,
              height: "100%",
              backgroundColor: "#8b5cf6",
            }}
          />
        </View>
      </View>
    );
  })}

  <Text
    style={{
      color: "#22c55e",
      marginTop: 10,
      fontWeight: "700",
    }}
  >
    🏆 Best Session: {mostWinningSession || "N/A"}
  </Text>
</BlurView>

       {/* ================= WEEKLY PERFORMANCE ================= */}
{/* <BlurView intensity={40} tint="dark" style={styles.card}>
  <Text style={styles.cardTitle}>
    Weekly Performance
  </Text>

  <LineChart
    data={{
      labels:
        weeklyTrades.length > 0
          ? weeklyTrades.map((_, i) => `${i + 1}`)
          : ["0"],

      datasets: [
        {
          data:
            weeklyTrades.length > 0
              ? weeklyTrades.map((_, i) => i + 1)
              : [0],
        },
      ],
    }}
    width={screenWidth - 60}
    height={190}
    yAxisLabel=""
    yAxisSuffix=""
    bezier
    withInnerLines={false}
    withOuterLines={false}
    withShadow={false}
    chartConfig={{
      backgroundGradientFrom: "#18002e",
      backgroundGradientTo: "#18002e",
      decimalPlaces: 0,
      color: () => "#a855f7",
      labelColor: () => "#ffffff",
      propsForDots: {
        r: "4",
      },
    }}
    style={{
      borderRadius: 16,
    }}
  />

  <View
    style={{
      marginTop: 15,
    }}
  >
    <Text style={{ color: "#22c55e" }}>
      ✅ Weekly Wins : {weeklyWins}
    </Text>

    <Text style={{ color: "#ef4444" }}>
      ❌ Weekly Losses : {weeklyTrades.length - weeklyWins}
    </Text>

    <Text style={{ color: "#fff", marginTop: 5 }}>
      📈 Win Rate :
      {" "}
      {weeklyTrades.length > 0
        ? (
            (weeklyWins / weeklyTrades.length) *
            100
          ).toFixed(1)
        : 0}
      %
    </Text>
  </View>
</BlurView> */}

          {/* ================= WEEKLY REVIEW ================= */}
          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Review</Text>

            <Text style={styles.reviewText}>
              {weeklyWins >= weeklyTrades.length / 2
                ? "🔥 Strong disciplined week. Keep executing your edge."
                : "⚠️ Weak execution week. Review mistakes and reduce overtrading."}
            </Text>
          </BlurView>

        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },

  container: {
    padding: 18,
    paddingBottom: 100,
  },

  loading: {
    flex: 1,
    backgroundColor: "#0b0015",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    color: "#22c55e",
    fontWeight: "800",
  },

  subtitle: {
    color: "#bbb",
    marginBottom: 20,
  },

  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cardTitle: {
    color: "#22c55e",
    fontWeight: "700",
    marginBottom: 10,
  },

  stat: {
    color: "#ddd",
    marginTop: 4,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },

  progress: {
    height: "100%",
  },

  reviewText: {
    color: "#ccc",
    lineHeight: 20,
  },
});