

// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen name="details/[id]" options={{ title: 'Item Details' }} />
//     </Stack>
//   );
// }

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitle: 'Item Details', // Default title, will be overridden
          headerBackTitle: 'Back' // For iOS - back button text
        }}
      />
    </Stack>
  );
}