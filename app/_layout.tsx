import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../contexts/LanguageContext';


export default function RootLayout() {

  return (
    <LanguageProvider>
      <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0A1931', // Your dark blue
              },
              headerTintColor: '#FFD700', // Your gold color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
      >
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </LanguageProvider>
  );
}