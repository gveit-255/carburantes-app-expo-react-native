import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        tabBarActiveTintColor: "#0066cc",

        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Estaciones",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="car-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="maritimos"
        options={{
          title: "Marítimos",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="boat-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="precios"
        options={{
          title: "Precios",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cash-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}