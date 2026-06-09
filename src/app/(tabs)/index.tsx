import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const rules = [
  {
    title: "Trend Continuation",
    desc: "Trade with the higher timeframe trend and the POIs",
    image: require("../../../assets/images/entry.webp"),
  },
  {
    title: "Fundamental News",
    desc: "Trade also considering the high impact news",
    image: require("../../../assets/images/change.webp"),
  },
  {
    title: "POI Mitigation",
    desc: "Entry must occur after POI mitigation and trebd engulfing",
    image: require("../../../assets/images/chart.webp"),
  },
  {
    title: "Engulfing",
    desc: "Only execute during London or NY session.",
    image: require("../../../assets/images/change.webp"),
  },
];

export default function Home() {
  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../../../assets/images/profile.jpg")}
                style={styles.profile}
              />

              <View>
                <Text style={styles.greeting}>
                  Good Day! 👋
                </Text>

                <Text style={styles.username}>
                  Makhosi Ncube
                </Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.circle}>
                <Text style={styles.circleText}>🔍</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.circle}>
                <Text style={styles.circleText}>🔔</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* MY PLAN */}

          <LinearGradient
            colors={[
              "rgba(160,90,255,0.85)",
              "rgba(70,30,180,0.85)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.planGradient}
          >
            <BlurView
              intensity={60}
              tint="dark"
              style={styles.planBlur}
            >
              <View>
                <Text style={styles.planTitle}>
                  My Plan{"\n"}For Today
                </Text>

                <Text style={styles.planSubtitle}>
                  Discipline beats emotion.
                </Text>
              </View>

              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>
                  100%
                </Text>
              </View>
            </BlurView>
          </LinearGradient>

          {/* ENTRY RULES */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Core Entry Rules
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
            }}
          >
            {rules.map((item, index) => (
              <BlurView
                key={index}
                intensity={70}
                tint="dark"
                style={styles.ruleCard}
              >
                <Image
                  source={item.image}
                  style={styles.ruleImage}
                  resizeMode="cover"
                />

                <View style={styles.ruleContent}>
                  <Text style={styles.ruleTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.ruleDesc}>
                    {item.desc}
                  </Text>
                </View>
              </BlurView>
            ))}
          </ScrollView>

          {/* TODAY'S MISSION */}

          <Text style={styles.sectionTitle}>
            Today's Mission
          </Text>

          <BlurView
            intensity={80}
            tint="dark"
            style={styles.taskCard}
          >
            <Text style={styles.task}>
              ✅ Wait for A+ setup
            </Text>

            <Text style={styles.task}>
              ✅ Respect risk management
            </Text>

            <Text style={styles.task}>
              ✅ Protect capital
            </Text>

            <Text style={styles.task}>
              ✅ Journal every trade
            </Text>

            <Text style={styles.task}>
              ❌ No revenge trading
            </Text>
          </BlurView>

          {/* DAILY WAR CRY */}

          <Text style={styles.sectionTitle}>
            Daily War Cry
          </Text>

          <BlurView
            intensity={80}
            tint="dark"
            style={styles.quoteCard}
          >
            <Text style={styles.quote}>
              "Mom is getting older. Stay disciplined.
              Stay patient. Become impossible to stop."
            </Text>

            <Text style={styles.reference}>
              — REV vs MK
            </Text>
          </BlurView>

          {/* STATS */}

          <Text style={styles.sectionTitle}>
            Trading Progress
          </Text>

          <View style={styles.statsRow}>
            <BlurView
              intensity={70}
              tint="dark"
              style={styles.statCard}
            >
              <Text style={styles.statNumber}>
                124
              </Text>

              <Text style={styles.statLabel}>
                Trades
              </Text>
            </BlurView>

            <BlurView
              intensity={70}
              tint="dark"
              style={styles.statCard}
            >
              <Text style={styles.statNumber}>
                72%
              </Text>

              <Text style={styles.statLabel}>
                Win Rate
              </Text>
            </BlurView>
          </View>

          <View style={styles.statsRow}>
            <BlurView
              intensity={70}
              tint="dark"
              style={styles.statCard}
            >
              <Text style={styles.statNumber}>
                +$0
              </Text>

              <Text style={styles.statLabel}>
                Profit
              </Text>
            </BlurView>

            <BlurView
              intensity={70}
              tint="dark"
              style={styles.statCard}
            >
              <Text style={styles.statNumber}>
                0
              </Text>

              <Text style={styles.statLabel}>
                AI Reviews
              </Text>
            </BlurView>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(5,8,18,0.82)",
  },

  scrollContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
  },

  profile: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#8f5bff",
  },

  greeting: {
    color: "#d4d4d4",
    fontSize: 13,
  },

  username: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 2,
  },

  circle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  circleText: {
    fontSize: 18,
  },

  planGradient: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  planBlur: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },

  planTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  planSubtitle: {
    color: "#f5f5f5",
    marginTop: 8,
    fontSize: 14,
    opacity: 0.9,
  },

  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },

  progressText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  seeAll: {
    color: "#c5c5c5",
    fontSize: 14,
  },

  ruleCard: {
    width: 240,
    marginRight: 18,
    borderRadius: 24,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    backgroundColor: "rgba(255,255,255,0.05)",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  ruleImage: {
    width: "100%",
    height: 150,
  },

  ruleContent: {
    padding: 15,
  },

  ruleTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  ruleDesc: {
    color: "#d8d8d8",
    fontSize: 14,
    lineHeight: 22,
  },

  taskCard: {
    borderRadius: 24,
    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    padding: 20,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  task: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 14,
    lineHeight: 24,
  },

  quoteCard: {
    borderRadius: 24,
    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    padding: 20,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  quote: {
    color: "#f5f5f5",
    fontSize: 18,
    lineHeight: 30,
    fontStyle: "italic",
  },

  reference: {
    color: "#9b6cff",
    fontSize: 14,
    marginTop: 15,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  statCard: {
    width: "48%",
    borderRadius: 22,

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    paddingVertical: 28,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  statNumber: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  statLabel: {
    color: "#c7c7c7",
    marginTop: 8,
    fontSize: 15,
  },
});
