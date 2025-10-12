
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import the hook

// Define your background color as a constant for consistency
const BACKGROUND_COLOR = '#0A1931'; // A dark color example

export default function TabLayout() {
  // Get safe area insets
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        // Unified background colors
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR, // Match tab bar to drawer
          position: 'absolute', // Can help with layering
          // Add padding at the bottom to account for the navigation bar
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10, // Fallback for devices without insets
          height: 60 + (insets.bottom > 0 ? insets.bottom : 10), // Adjust total height
        },
        // sceneContainerStyle: {
        //   backgroundColor: BACKGROUND_COLOR, // Match screen content background
        // },
        // Color for icons and text
        tabBarActiveTintColor: '#FFD700', // Your yellow color for active tab
        tabBarInactiveTintColor: '#A0A0A0', // A grey for inactive tabs
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      {/* Your Screen options remain the same */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'All Items',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addItem"
        options={{
          title: 'Add Item',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}