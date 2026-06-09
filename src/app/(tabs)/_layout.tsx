import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TabIcon({
  name,
  label,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={focused?styles.tabItemf : styles.tabItem}>
      {/* ICON */}
      <Ionicons
        name={name}
        size={22}
        color={focused ? "#ffd104" : "#9CA3AF"}
      />

      {/* LABEL ONLY WHEN FOCUSED */}
      {focused && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        // Main tab bar container
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 0,
          height: 72,
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "transparent",
          overflow: "hidden",
          paddingTop:15
        },

        // Blur background with slight dark overlay feel
        tabBarBackground: () => (
          <BlurView
            intensity={70}
            tint="dark"
            style={[
              StyleSheet.absoluteFill,
              styles.blurOverlay,
            ]}
          />
        ),

        // Center icons properly
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" label="Home" focused={focused} />
          ),
        }}
      />

      {/* JOURNAL */}
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="book" label="Journal" focused={focused} />
          ),
        }}
      />

      {/* TRADES */}
      <Tabs.Screen
        name="trades"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="trending-up" label="Trades" focused={focused} />
          ),
        }}
      />

      {/* DASHBOARD */}
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="grid" label="Dashboard" focused={focused} />
          ),
        }}
      />

      {/* AI */}
      <Tabs.Screen
        name="ai"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="sparkles" label="AI" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: 70,
    
  },
  tabItemf: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: 70,
    height:70,
    backgroundColor:"rgb(104, 2, 151)",
    borderRadius:100,
    
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffd104",
    marginTop: 2,
  },

  blurOverlay: {
    backgroundColor: "rgba(9, 6, 10, 0.95)", // 👈 key fix: prevents UI clash
  },
});