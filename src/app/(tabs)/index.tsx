
import { BlurView } from "expo-blur";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <BlurView intensity={40} tint="dark" style={styles.overlay}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile */}

          <View style={styles.profile}>
            <Image
              source={require("../../../assets/images/profile.jpg")}
              style={styles.profileImage}
            />

            <View>
              <Text style={styles.welcome}>Daily Life🕹️</Text>

              <Text style={styles.name}>redhackevolutions</Text>
            </View>
          </View>

          {/* WHY */}

          <BlurView intensity={35} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>🎯 MY WINE</Text>

            <Text style={styles.cardText}>
              I trade because one day my mother should never go back the streets. I will  give her the life she deserves.
            </Text>
          </BlurView>

          {/* Motivation */}

          <BlurView intensity={35} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>⚔ DAILY WAR CRY</Text>

            <Text style={styles.quote}>
              "Mom is getting older.She's all alone. Stay disciplined,
              stay brutally focused, and become impossible to stop."
            </Text>
          </BlurView>

          {/* Progress */}

          <Text style={styles.section}>Progress</Text>

          <View style={styles.row}>
            <BlurView intensity={35} tint="dark" style={styles.smallCard}>
              <Image
                source={require("../../../assets/icons/trade.png")}
                style={styles.icon}
              />

              <Text style={styles.number}>124</Text>

              <Text style={styles.smallText}>Trades</Text>
            </BlurView>

            <BlurView intensity={35} tint="dark" style={styles.smallCard}>
              <Image
                source={require("../../../assets/icons/journal.png")}
                style={styles.icon}
              />

              <Text style={styles.number}>72%</Text>

              <Text style={styles.smallText}>Win Rate</Text>
            </BlurView>
          </View>

          <View style={styles.row}>
            <BlurView intensity={35} tint="dark" style={styles.smallCard}>
              <Image
                source={require("../../../assets/icons/home.png")}
                style={styles.icon}
              />

              <Text style={styles.number}>+$0.00</Text>

              <Text style={styles.smallText}>Profit</Text>
            </BlurView>

            <BlurView intensity={35} tint="dark" style={styles.smallCard}>
              <Image
                source={require("../../../assets/icons/ai.png")}
                style={styles.icon}
              />

              <Text style={styles.number}>0</Text>

              <Text style={styles.smallText}>Reviews</Text>
            </BlurView>
          </View>

          {/* Recommended Section */}

          <BlurView intensity={35} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>🔥 TODAY'S MISSION</Text>

            <Text style={styles.cardText}>
              Follow your plan.
              {"\n"}
              Protect your capital.
              {"\n"}
              Journal every trade.
              {"\n"}
              No revenge trading.
            </Text>
          </BlurView>

          {/* Scripture */}

          <BlurView intensity={35} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>📖 Edge Builder</Text>

            <Text style={styles.quote}>
              I shall remember now its a war between me and me!
            </Text>

            <Text style={styles.reference}>REV vs MK</Text>
          </BlurView>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(19, 1, 29, 0.88)",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "rgb(28, 240, 9)",
    marginRight: 15,
  },

  welcome: {
    color: "#ecf00b",
    fontSize: 12,
    letterSpacing: 1,
    fontWeight:"900"
  },

  name: {
    color: "rgb(0, 184, 240)",
    fontSize: 26,
    fontWeight: "700",
  },

  card: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    backgroundColor: "rgba(120,0,150,0.18)",
    borderWidth:5,
    borderColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },

  cardTitle: {
    color: "#53f308",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },

  cardText: {
    color: "#f1da0a",
    fontSize: 15,
    lineHeight: 24,
    fontWeight:"500"
  },

  quote: {
    color: "yellow",
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "600",
    fontStyle: "italic",
  },

  reference: {
    color: "#d47cff",
    marginTop: 15,
    fontWeight: "600",
  },

  section: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  smallCard: {
    width: "48%",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(120,0,150,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },

  icon: {
    width: 35,
    height: 35,
    // tintColor: "#d47cff",
    marginBottom: 10,
  },

  number: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  smallText: {
    color: "#bdbdbd",
    marginTop: 5,
  },
});

