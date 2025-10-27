import PulseLoading from '@/components/PulseLoading';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';


export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate app initialization (database, fonts, etc.)
    const initializeApp = async () => {
      try {
        // Add your initialization logic here:
        // - Database initialization
        // - Loading fonts
        // - Loading user preferences
        // - Any other setup
        
        // Simulate loading time (2-3 seconds)
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      } catch (error) {
        console.error('App initialization failed:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while initializing
  if (isLoading) {
    return <PulseLoading />;
  }

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