
import { useTranslation } from '@/hooks/useTranslation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BACKGROUND_COLOR = '#0A1931';
const TAB_BAR_HEIGHT = 60;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  const tabBarHeight = TAB_BAR_HEIGHT + (insets.bottom > 0 ? insets.bottom : 10);
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          height: tabBarHeight,
          // Remove absolute positioning to prevent overlap
          // position: 'absolute',
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#A0A0A0',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
    
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: t('allItems'),
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="list" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="addItem"
        options={{
          title: t('addItem'),
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="plus" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="setting"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}