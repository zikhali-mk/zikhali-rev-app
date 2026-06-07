import { Tabs } from "expo-router";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
  <ImageBackground
    source={require("../../../assets/icons/tab-bg.jpg")}
    style={{
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      overflow: "hidden",
    }}
    resizeMode="cover"
  />
),
  tabBarStyle: styles.tabBar,
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItem,
                focused && styles.activeTab,
              ]}
            >
              <Image
                source={require("../../../assets/icons/home.png")}
                style={[
                  styles.icon,
                  // {
                  //   tintColor: focused ? "#06b449" : "#8d8d8d",
                  // },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? "#06b449" : "#8d8d8d",
                  },
                ]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="trade"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItem,
                focused && styles.activeTab,
              ]}
            >
              <Image
                source={require("../../../assets/icons/trade.png")}
                style={[
                  styles.icon,
                  // {
                  //   tintColor: focused ? "#06b449" : "#8d8d8d",
                  // },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? "#06b449" : "#8d8d8d",
                  },
                ]}
              >
                Trade
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="trades"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItem,
                focused && styles.activeTab,
              ]}
            >
              <Image
                source={require("../../../assets/icons/journal.png")}
                style={[
                  styles.icon,
                  // {
                  //   tintColor: focused ? "#06b449" : "#8d8d8d",
                  // },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? "#06b449" : "#8d8d8d",
                  },
                ]}
              >
                Trades
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="review"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabItem,
                focused && styles.activeTab,
              ]}
            >
              <Image
                source={require("../../../assets/icons/ai.png")}
                style={[
                  styles.icon,
                  // {
                  //   tintColor: focused ? "#06b449" : "#8d8d8d",
                  // },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? "#06b449" : "#8d8d8d",
                  },
                ]}
              >
                AI Review
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
 tabBar: {
  height: 75,
  position: "absolute",
  borderTopWidth: 0,
  elevation: 15,
  backgroundColor: "transparent",
  overflow: "hidden",
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  paddingTop:16,
},

  tabItem: {
    width: 80,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  activeTab: {
    backgroundColor: "#94029969",
    borderWidth:2,
    borderColor:"#94029969"
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginBottom: 2,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  main:{
    backgroundColor:"yellow"
  }
});