
// import { useTranslation } from "@/hooks/useTranslation";
// import { Drawer } from "expo-router/drawer";
// import CustomDrawerContent from './custom-drawer';

// export default function Layout() {

//   const { t } = useTranslation();

//   return (
//     <Drawer
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#0A1931",
//         },
//         headerTintColor: "#FFD700",
//         drawerStyle: {
//           width: 300,
//         },
//         swipeEnabled: true,
//       }}
//     >
//       {/* Define all your screens */}
//       <Drawer.Screen name="(tabs)"
      
//       // options={{ title: "Home" }} 
//       options={{
//         drawerLabel: t('home'),
//         title: t('home'),
//         headerShown: false, // Hide drawer header for tabs

//       }}
//       />
//       <Drawer.Screen name="5l" options={{ title: `5L ${t('cars')}` }} />
//       <Drawer.Screen name="3l" options={{ title: `3L ${t('cars')}` }} />
//       <Drawer.Screen name="2l" options={{ title: `2L ${t('cars')}` }} />
//       <Drawer.Screen name="2lt" options={{ title: `2LT ${t('cars')}` }} />
//       <Drawer.Screen name="aynamaw" options={{ title: `Aynamaw ${t('cars')}` }} />
//       <Drawer.Screen name="highRoof" options={{ title: `highroof ${t('cars')}` }} />
//       <Drawer.Screen name="dolphin" options={{ title: `${t('dolphin')} ${t('cars')}` }} />
//       <Drawer.Screen name="abadula" options={{ title: `${t('abadula')} ${t('cars')}` }} />
//       <Drawer.Screen name="other" options={{ title: `${t('other')} ${t('cars')}` }} />
//       <Drawer.Screen name="backUp" options={{ title: "BackUp & Restore" }} />
//     </Drawer>
//   );
// }

import { useTranslation } from "@/hooks/useTranslation";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity, View } from 'react-native';
import Colors from './colors';
import CustomDrawerContent from './custom-drawer';

export default function Layout() {
  const { t } = useTranslation();
  const router = useRouter();

  // Header right component with home and add icons
  const HeaderRight = () => (
    <View style={{ flexDirection: 'row', marginRight: 15 }}>
      <TouchableOpacity 
        onPress={() => router.push('/(tabs)' as any)}
        style={{ marginRight: 20, padding: 4 }}
      >
        <FontAwesome name="home" size={20} color={Colors.text.primary} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => router.push('/(tabs)/addItem' as any)}
        style={{ padding: 4 }}
      >
        <FontAwesome name="plus" size={20} color={Colors.text.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background.primary,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          width: 300,
        },
        swipeEnabled: true,
        // Add header right to all screens
        headerRight: () => <HeaderRight />,
      }}
    >
      {/* Define all your screens */}
      <Drawer.Screen 
        name="(tabs)"
        options={{
          drawerLabel: t('home'),
          headerShown: false, // Hide header for tabs since they have their own
        }}
      />
      
      {/* All other drawer screens will show the header with icons */}
      <Drawer.Screen name="5l" options={{ title: `5L` }} />
      <Drawer.Screen name="3l" options={{ title: `3L` }} />
      <Drawer.Screen name="2l" options={{ title: `2L` }} />
      <Drawer.Screen name="2lt" options={{ title: `2LT` }} />
      <Drawer.Screen name="aynamaw" options={{ title: `Aynamaw` }} />
      <Drawer.Screen name="highRoof" options={{ title: `highroof` }} />
      <Drawer.Screen name="dolphin" options={{ title: `${t('dolphin')}` }} />
      <Drawer.Screen name="abadula" options={{ title: `${t('abadula')}` }} />
      <Drawer.Screen name="other" options={{ title: `${t('other')}` }} />
      <Drawer.Screen name="backUp" options={{ title: "BackUp & Restore" }} />
    </Drawer>
  );
}