import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function Trade() {
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState("");
  const [entry, setEntry] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [rr, setRR] = useState("");
  const [session, setSession] = useState("");
  const [result, setResult] = useState("");
  const [setup, setSetup] = useState("");
  const [notes, setNotes] = useState("");
  const [psychology, setPsychology] = useState("");

  const handleSaveTrade = async () => {
  try {
    const tradeData = {
      symbol,
      direction,
      entry: Number(entry),
      sl: Number(sl),
      tp: Number(tp),
      rr: Number(rr),
      session,
      result,
      setup,
      notes,
      psychology,
    };

    // Basic validation
    if (
      !symbol ||
      !direction ||
      !entry ||
      !sl ||
      !tp ||
      !rr ||
      !session ||
      !setup
    ) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    const response = await axios.post(
      "https://expo-nextjs-backend.vercel.app/api/trade",
      tradeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      Alert.alert("Success", "Trade saved successfully 🟢");

      // clear form
      setSymbol("");
      setDirection("");
      setEntry("");
      setSl("");
      setTp("");
      setRR("");
      setSession("");
      setResult("");
      setSetup("");
      setNotes("");
      setPsychology("");
    }
  } catch (error: any) {
    console.log("*****************************************\n");
    
    console.log(error?.response?.data || error.message);

    console.log("*****************************************");


    Alert.alert("Error", "Failed to save trade ❌");
  }
};

  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[
          "rgba(1, 3, 20, 0.64)",
          "rgba(18, 2, 31, 0.82)",
          "rgba(2, 1, 3, 0.94)",
        ]}
        style={styles.overlay}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <BlurView intensity={35} tint="dark" style={styles.glassCard}>
              <Text style={styles.title}>📈 New Trade</Text>

              <Text style={styles.subtitle}>
                Every trade you journal becomes data for improvement.
              </Text>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Symbol</Text>

                  <TextInput
                    value={symbol}
                    onChangeText={setSymbol}
                    placeholder="XAUUSD"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Direction</Text>

                  <TextInput
                    value={direction}
                    onChangeText={setDirection}
                    placeholder="BUY"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Entry</Text>

                  <TextInput
                    value={entry}
                    onChangeText={setEntry}
                    keyboardType="numeric"
                    placeholder="3350.25"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Session</Text>

                  <TextInput
                    value={session}
                    onChangeText={setSession}
                    placeholder="London"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Stop Loss</Text>

                  <TextInput
                    value={sl}
                    onChangeText={setSl}
                    keyboardType="numeric"
                    placeholder="3345"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Take Profit</Text>

                  <TextInput
                    value={tp}
                    onChangeText={setTp}
                    keyboardType="numeric"
                    placeholder="3365"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Risk Reward</Text>

                  <TextInput
                    value={rr}
                    onChangeText={setRR}
                    keyboardType="numeric"
                    placeholder="3"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Result</Text>

                  <TextInput
                    value={result}
                    onChangeText={setResult}
                    placeholder="WIN"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                  />
                </View>
              </View>

              {/* ---------- PART 2 CONTINUES FROM HERE ---------- */}

                            <View style={styles.inputContainerFull}>
                <Text style={styles.label}>Setup</Text>

                <TextInput
                  value={setup}
                  onChangeText={setSetup}
                  placeholder="Liquidity Sweep"
                  placeholderTextColor="#bbb"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainerFull}>
                <Text style={styles.label}>Psychology</Text>

                <TextInput
                  value={psychology}
                  onChangeText={setPsychology}
                  placeholder="Calm and disciplined"
                  placeholderTextColor="#bbb"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainerFull}>
                <Text style={styles.label}>Trade Notes</Text>

                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Describe why you entered the trade..."
                  placeholderTextColor="#bbb"
                  multiline
                  style={styles.noteInput}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSaveTrade}
              >
                <LinearGradient
                  colors={["#8b5cf6", "#6d28d9"]}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    Save Trade
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>

            {/* ------------------------------
                TRADE CARDS WILL GO HERE
            ------------------------------ */}

            <BlurView
              intensity={25}
              tint="dark"
              style={styles.placeholderCard}
            >
              <Text style={styles.placeholderTitle}>
                Recent Trades
              </Text>

              <Text style={styles.placeholderText}>
                Your trade cards will appear here...
              </Text>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingTop: 70,
    paddingBottom: 120,
  },

  glassCard: {
    borderRadius: 28,
    padding: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  title: {
    fontSize: 28,
    color: "#f3ef0b",
    fontWeight: "700",
  },

  subtitle: {
    color: "#cfcfcf",
    marginTop: 6,
    marginBottom: 22,
    lineHeight: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  inputContainer: {
    width: "48%",
  },

  inputContainerFull: {
    marginBottom: 12,
  },

  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  noteInput: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 12,
    minHeight: 110,
    color: "#fff",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  button: {
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  placeholderCard: {
    marginTop: 25,
    padding: 18,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  placeholderTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  placeholderText: {
    color: "#bfbfbf",
    marginTop: 10,
  },
});