// screenOptions={{
//   // Yellow & Black Color Scheme
//   drawerActiveTintColor: '#000000', // Black text for active
//   drawerInactiveTintColor: '#666666', // Dark gray for inactive
//   drawerActiveBackgroundColor: '#FFD700', // Bright yellow background for active
//   drawerInactiveBackgroundColor: '#1a1a1a', // Dark background for inactive
//   drawerStyle: {
//     backgroundColor: '#000000', // Black drawer background
//     width: 280,
//   },
//   drawerLabelStyle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: -16,
//   },
//   headerStyle: {
//     backgroundColor: '#000000', // Black header
//   },
//   headerTintColor: '#FFD700', // Yellow header text
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   // sceneContainerStyle: {
//   //   backgroundColor: '#f8f9fa', // Light background for content
//   // },
//   drawerContentContainerStyle: {
//     paddingTop: 20,
//   },
// }}
// screenOptions={{
//   drawerActiveTintColor: '#FFFFFF',
//   drawerInactiveTintColor: '#BBBBBB',
//   drawerActiveBackgroundColor: '#4CAF50', // Green accent
//   drawerInactiveBackgroundColor: 'transparent',
//   drawerStyle: {
//     backgroundColor: '#1a1a1a', // Dark background
//     width: 280,
//   },
//   headerStyle: {
//     backgroundColor: '#1a1a1a',
//   },
//   headerTintColor: '#4CAF50',
// }}

import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#1a1a1a",
        drawerInactiveTintColor: "#FFFFFF",
        drawerActiveBackgroundColor: "#FFD700", // Gold
        drawerInactiveBackgroundColor: "transparent",
        drawerStyle: {
          backgroundColor: "#0A1931", // Navy blue
          width: 280,
        },
        headerStyle: {
          backgroundColor: "#0A1931",
        },
        headerTintColor: "#FFD700",
      }}
    >
      {/* Home */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* 5L */}
      <Drawer.Screen
        name="5l"
        options={{
          drawerLabel: "5L Cars",
          title: "5L Cars",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="car" size={size} color={color} />
          ),
        }}
      />

      {/* 3L */}
      <Drawer.Screen
        name="3l"
        options={{
          drawerLabel: "3L Cars",
          title: "3L Cars",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="car" size={size} color={color} />
          ),
        }}
      />

      {/* 2L */}
      <Drawer.Screen
        name="2l"
        options={{
          drawerLabel: "2L Cars",
          title: "2L Cars",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="car-alt" size={size} color={color} />
          ),
        }}
      />

      {/* Dolphin */}
      <Drawer.Screen
        name="dolphin"
        options={{
          drawerLabel: "Dolphin",
          title: "Dolphin Cars",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="directions-car" size={size} color={color} />
          ),
        }}
      />

      {/* Abadula */}
      <Drawer.Screen
        name="abadula"
        options={{
          drawerLabel: "Abadula",
          title: "Abadula Cars",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="car-sport" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="other"
        options={{
          drawerLabel: "Other Cars",
          title: "Other Cars",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="todo"
        options={{
          drawerLabel: "Todo List",
          title: "Todo List",
          drawerIcon: ({ color, size }) => (
            <Feather name="check-square" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
