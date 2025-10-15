import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {

  return (
    <>
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
    </>
  );
}