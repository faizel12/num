

// import { useTranslation } from '@/hooks/useTranslation';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DrawerActions, useNavigation } from '@react-navigation/native';
// import { Tabs } from 'expo-router';
// import { TouchableOpacity } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../colors';

// const TAB_BAR_HEIGHT = 60;

// export default function TabLayout() {
//   const insets = useSafeAreaInsets();
//   const tabBarHeight = TAB_BAR_HEIGHT + (insets.bottom > 0 ? insets.bottom : 10);
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   const openDrawer = () => {
//     navigation.dispatch(DrawerActions.openDrawer());
//   };

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: Colors.background.primary,
//           paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
//           height: tabBarHeight,
//         },
//         tabBarActiveTintColor: Colors.primary[500],
//         tabBarInactiveTintColor: Colors.text.tertiary,
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: Colors.background.primary,
//         },
//         headerTintColor: Colors.text.primary,
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '600',
//         },
//         headerLeft: () => (
//           <TouchableOpacity 
//             onPress={openDrawer}
//             style={{ marginLeft: 15, padding: 8 }}
//           >
//             <FontAwesome name="bars" size={20} color={Colors.text.primary} />
//           </TouchableOpacity>
//         ),
//       }}>
      
//       {/* Your tab screens remain the same */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: t('allItems'),
//           tabBarIcon: ({ color }) => <FontAwesome size={24} name="list" color={color} />,
//         }}
//       />
      
//       <Tabs.Screen
//         name="addItem"
//         options={{
//           title: t('addItem'),
//           tabBarIcon: ({ color }) => <FontAwesome size={24} name="plus" color={color} />,
//         }}
//       />
      
//       <Tabs.Screen
//         name="todo"
//         options={{
//           title: t('todo'),
//           tabBarIcon: ({ color }) => <FontAwesome size={24} name="check-circle" color={color} />,
//         }}
//       />
// <Tabs.Screen
//   name="gallery"
//   options={{
//     title: t('gallery'),
//     tabBarIcon: ({ color }) => <FontAwesome size={24} name="photo" color={color} />,
//   }}
// />

//     </Tabs>
//   );
// }
import { useTranslation } from '@/hooks/useTranslation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../colors';

const TAB_BAR_HEIGHT = 65;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = TAB_BAR_HEIGHT + (insets.bottom > 0 ? insets.bottom : 10);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background.primary,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            height: tabBarHeight,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.1)',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: Colors.primary[500],
          tabBarInactiveTintColor: Colors.text.tertiary,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.background.primary,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: Colors.text.primary,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 2,
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={openDrawer}
              style={{ 
                marginLeft: 16,
                padding: 8,
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome name="bars" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          ),
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: t('allItems'),
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                width: 44,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                // backgroundColor: focused ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              }}>
                <FontAwesome 
                  size={22} 
                  name="list" 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        
        <Tabs.Screen
          name="addItem"
          options={{
            title: t('addItem'),
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                width: 44,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                // backgroundColor: focused ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              }}>
                <FontAwesome 
                  size={22} 
                  name="plus" 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        
        <Tabs.Screen
          name="todo"
          options={{
            title: t('todo'),
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                width: 44,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                // backgroundColor: focused ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              }}>
                <FontAwesome 
                  size={22} 
                  name="check-circle" 
                  color={color} 
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="gallery"
          options={{
            title: t('gallery'),
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                width: 44,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                // backgroundColor: focused ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              }}>
                <FontAwesome 
                  size={22} 
                  name="photo" 
                  color={color} 
                />
              </View>
            ),
          }}
        />

      </Tabs>
    </Animated.View>
  );
}