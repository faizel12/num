
import { useTranslation } from "@/hooks/useTranslation";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from './custom-drawer';

export default function Layout() {

  const { t } = useTranslation();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0A1931",
        },
        headerTintColor: "#FFD700",
        drawerStyle: {
          width: 300,
        },
        swipeEnabled: true,
      }}
    >
      {/* Define all your screens */}
      <Drawer.Screen name="(tabs)"
      
      // options={{ title: "Home" }} 
      options={{
        drawerLabel: t('home'),
        title: t('home'),
      }}
      />
      <Drawer.Screen name="5l" options={{ title: `5L ${t('cars')}` }} />
      <Drawer.Screen name="3l" options={{ title: `3L ${t('cars')}` }} />
      <Drawer.Screen name="2l" options={{ title: `2L ${t('cars')}` }} />
      <Drawer.Screen name="2lt" options={{ title: `2LT ${t('cars')}` }} />
      <Drawer.Screen name="aynamaw" options={{ title: `Aynamaw ${t('cars')}` }} />
      <Drawer.Screen name="highRoof" options={{ title: `highroof ${t('cars')}` }} />
      <Drawer.Screen name="dolphin" options={{ title: `${t('dolphin')} ${t('cars')}` }} />
      <Drawer.Screen name="abadula" options={{ title: `${t('abadula')} ${t('cars')}` }} />
      <Drawer.Screen name="other" options={{ title: `${t('other')} ${t('cars')}` }} />
      <Drawer.Screen name="backUp" options={{ title: "BackUp & Restore" }} />
    </Drawer>
  );
}