// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Tabs } from 'expo-router';

// export default function TabLayout() {
//   return (
//       <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//             tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
//         }}
//           />
//           <Tabs.Screen
//               name="list"
//               options={{
//                   title: 'list',
//                   tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
//         }}
//       />

//           <Tabs.Screen
//               name="details"
//               options={{
//                   title: 'details',
//                   tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
//               }}
//           />

//     </Tabs>
//   );
// }
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Add Item',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'All Items',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
      {/* <Tabs.Screen
              name="details"
              options={{
                  title: 'Item Details',
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="info" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}