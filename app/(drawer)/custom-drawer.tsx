// import { useTranslation } from "@/hooks/useTranslation";
// import {
//   Feather,
//   FontAwesome5,
//   Ionicons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import {
//   DrawerContentComponentProps,
//   DrawerContentScrollView,
// } from '@react-navigation/drawer';
// import { usePathname, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Colors from "./colors";

// export default function CustomDrawerContent(props: DrawerContentComponentProps) {
//   const { t } = useTranslation();

//   const router = useRouter();
//   const pathname = usePathname();
//   const [expandedSections, setExpandedSections] = useState({
//     engineTypes: false,
//     twoKD: true,
//   });

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const isActive = (route: string) => {
//     return pathname === route || pathname.startsWith(route);
//   };

//   const NavigationItem = ({ 
//     route, 
//     label, 
//     icon, 
//     isNested = false 
//   }: { 
//     route: string;
//     label: string;
//     icon: React.ReactNode;
//     isNested?: boolean;
//   }) => {
//     const active = isActive(route);
    
//     return (
//       <TouchableOpacity
//         style={[
//           styles.menuItem,
//           isNested && styles.nestedMenuItem,
//           active && styles.activeMenuItem,
//         ]}
//         onPress={() => router.push(route as never)}
//       >
//         <View style={styles.menuItemContent}>
//           <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
//             {icon}
//           </View>
//           <Text style={[
//             styles.menuItemText,
//             active && styles.activeMenuItemText
//           ]}>
//             {label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <DrawerContentScrollView 
//         {...props}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Home */}
//         <NavigationItem
//           route="/(tabs)"
//           label={t('home')}
//           icon={
//             <Ionicons 
//               name="home" 
//               size={22} 
//               color={isActive('/(tabs)') ? "#1a1a1a" : "#FFFFFF"} 
//             />
//           }
//         />

//         {/* Engine Types Section */}
//         <View style={styles.section}>
//           <TouchableOpacity
//             style={styles.sectionHeader}
//             onPress={() => toggleSection('engineTypes')}
//           >
//             <Text style={styles.sectionHeaderText}>{t('engineTypes')}</Text>
//             <Ionicons
//               name={expandedSections.engineTypes ? "chevron-down" : "chevron-forward"}
//               size={20}
//               color="#FFD700"
//             />
//           </TouchableOpacity>

//           {expandedSections.engineTypes && (
//             <View style={styles.sectionContent}>
//               <NavigationItem
//                 route="/5l"
//                 label= { "5L "}
              
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="car" 
//                     size={18} 
//                     color={isActive('/5l') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />

//               <NavigationItem
//                 route="/3l"
//                 label= { "3L "}
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="car" 
//                     size={18} 
//                     color={isActive('/3l') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />

//               <NavigationItem
//                 route="/2l"
//                 label= { "2L "}
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="car-alt" 
//                     size={18} 
//                     color={isActive('/2l') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />

// <NavigationItem
//                 route="/2lt"
//                 label= { "2LT "}
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="car-alt" 
//                     size={18} 
//                     color={isActive('/2lt') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />

//               <NavigationItem
//                 route="/other"
//                 label= { t('other')}

//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="car" 
//                     size={18} 
//                     color={isActive('/other') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />
//             </View>
//           )}
//         </View>

//         {/* 2KD Section */}
//         <View style={styles.section}>
//           <TouchableOpacity
//             style={styles.sectionHeader}
//             onPress={() => toggleSection('twoKD')}
//           >
//             <Text style={styles.sectionHeaderText}>{t('twoKd')}</Text>
//             <Ionicons
//               name={expandedSections.twoKD ? "chevron-down" : "chevron-forward"}
//               size={20}
//               color="#FFD700"
//             />
//           </TouchableOpacity>

//           {expandedSections.twoKD && (
//             <View style={styles.sectionContent}>
//               <NavigationItem
//                 route="/dolphin"
//                 label= { t('dolphin')}
//                 isNested
//                 icon={
//                   <MaterialIcons 
//                     name="directions-car" 
//                     size={20} 
//                     color={isActive('/dolphin') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />
//                     <NavigationItem
//                 route="/aynamaw"
//                 label= { t('aynamaw')}
//                 isNested
//                 icon={
//                   <MaterialIcons 
//                     name="directions-car" 
//                     size={20} 
//                     color={isActive('/aynamaw') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />

//               <NavigationItem
//                 route="/abadula"
//                 label= { t('abadula')}
//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="car-sport" 
//                     size={20} 
//                     color={isActive('/abadula') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />
//                      <NavigationItem
//                 route="/highRoof"
//                 label= { t('highRoof')}
//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="car-sport" 
//                     size={20} 
//                     color={isActive('/highRoof') ? "#1a1a1a" : "#FFFFFF"} 
//                   />
//                 }
//               />
//             </View>
//           )}
//         </View>
        
//         <View style={{height:2,marginVertical:10, width:"100%", backgroundColor:Colors.border.dark}} />

//         {/* Todo List */}
//         <NavigationItem
//           route="/backUp"
//           label={t('backupRestore')}
//           icon={
//             <Feather 
//               name="refresh-ccw" 
//               size={20} 
//               color={isActive('/backUp') ? "#1a1a1a" : "#FFFFFF"} 
//             />
//           }
//         />

// <NavigationItem
//           route="/setting"
//           label={t('settings')}
          
//           icon={
//             <Feather 
//               name="settings" 
//               size={20} 
//               color={isActive('/settings') ? "#1a1a1a" : "#FFFFFF"} 
//             />
//           }
//         />
//       </DrawerContentScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A1931',
//   },
//   scrollContent: {
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   section: {
//     marginVertical: 8,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     marginHorizontal: 8,
//     borderRadius: 8,
//     backgroundColor: 'rgba(255, 215, 0, 0.1)',
//     borderLeftWidth: 4,
//     borderLeftColor: '#FFD700',
//   },
//   sectionHeaderText: {
//     color: '#FFD700',
//     fontWeight: 'bold',
//     fontSize: 14,
//     letterSpacing: 1,
//   },
//   sectionContent: {
//     marginTop: 4,
//     marginHorizontal: 12,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   menuItem: {
//     marginHorizontal: 8,
//     marginVertical: 2,
//     borderRadius: 8,
//     backgroundColor: 'transparent',
//   },
//   nestedMenuItem: {
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   activeMenuItem: {
//     backgroundColor: '#FFD700',
//     marginHorizontal: 8,
//   },
//   menuItemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   iconContainer: {
//     width: 24,
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   activeIconContainer: {
//     // Additional styles for active icon container if needed
//   },
//   menuItemText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//     flex: 1,
//   },
//   activeMenuItemText: {
//     color: '#1a1a1a',
//     fontWeight: '600',
//   },
// });



// import { useTranslation } from "@/hooks/useTranslation";
// import {
//   Feather,
//   FontAwesome5,
//   Ionicons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import {
//   DrawerContentComponentProps,
//   DrawerContentScrollView,
// } from '@react-navigation/drawer';
// import { usePathname, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Platform,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from "./colors";

// export default function CustomDrawerContent(props: DrawerContentComponentProps) {
//   const { t } = useTranslation();
//   const insets = useSafeAreaInsets();
//   const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

//   const router = useRouter();
//   const pathname = usePathname();
//   const [expandedSections, setExpandedSections] = useState({
//     engineTypes: false,
//     twoKD: true,
//   });

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const isActive = (route: string) => {
//     return pathname === route || pathname.startsWith(route);
//   };

//   const NavigationItem = ({ 
//     route, 
//     label, 
//     icon, 
//     isNested = false,
//     badge,
//   }: { 
//     route: string;
//     label: string;
//     icon: React.ReactNode;
//     isNested?: boolean;
//     badge?: string;
//   }) => {
//     const active = isActive(route);
    
//     return (
//       <TouchableOpacity
//         style={[
//           styles.menuItem,
//           isNested && styles.nestedMenuItem,
//           active && styles.activeMenuItem,
//         ]}
//         onPress={() => router.push(route as never)}
//       >
//         <View style={styles.menuItemContent}>
//           <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
//             {icon}
//           </View>
//           <Text style={[
//             styles.menuItemText,
//             active && styles.activeMenuItemText
//           ]}>
//             {label}
//           </Text>
          
//           {badge && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{badge}</Text>
//             </View>
//           )}
//         </View>
        
//         {!isNested && (
//           <Ionicons 
//             name="chevron-forward" 
//             size={16} 
//             color={active ? Colors.navy[900] : Colors.text.tertiary} 
//             style={styles.chevron}
//           />
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[
//       styles.container,
//       { paddingTop: statusBarHeight }
//     ]}>
//       {/* App Header */}
//       <View style={styles.header}>
//         <View style={styles.appInfo}>
//           <View style={styles.appIcon}>
//             <FontAwesome5 name="car" size={24} color={Colors.primary[500]} />
//           </View>
//           <View>
//             <Text style={styles.appName}>Auto Parts</Text>
//             <Text style={styles.appSubtitle}>Management System</Text>
//           </View>
//         </View>
//       </View>

//       <DrawerContentScrollView 
//         {...props}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + 80 }
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Dashboard */}
//         <NavigationItem
//           route="/(tabs)"
//           label={t('home')}
//           icon={
//             <Ionicons 
//               name="home-outline" 
//               size={22} 
//               color={isActive('/(tabs)') ? Colors.navy[900] : Colors.text.secondary} 
//             />
//           }
//         />

//         {/* Engine Types Section */}
//         <View style={styles.section}>
//           <TouchableOpacity
//             style={styles.sectionHeader}
//             onPress={() => toggleSection('engineTypes')}
//           >
//             <View style={styles.sectionTitle}>
//               <MaterialIcons name="engineering" size={20} color={Colors.primary[500]} />
//               <Text style={styles.sectionHeaderText}>{t('engineTypes')}</Text>
//             </View>
//             <Ionicons
//               name={expandedSections.engineTypes ? "chevron-up" : "chevron-down"}
//               size={18}
//               color={Colors.text.secondary}
//             />
//           </TouchableOpacity>

//           {expandedSections.engineTypes && (
//             <View style={styles.sectionContent}>
//               <NavigationItem
//                 route="/5l"
//                 label="5L Engine"
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="cog" 
//                     size={16} 
//                     color={isActive('/5l') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//                 badge="12"
//               />

//               <NavigationItem
//                 route="/3l"
//                 label="3L Engine"
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="cog" 
//                     size={16} 
//                     color={isActive('/3l') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//                 badge="8"
//               />

//               <NavigationItem
//                 route="/2l"
//                 label="2L Engine"
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="cog" 
//                     size={16} 
//                     color={isActive('/2l') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//                 badge="15"
//               />

//               <NavigationItem
//                 route="/2lt"
//                 label="2LT Engine"
//                 isNested
//                 icon={
//                   <FontAwesome5 
//                     name="cog" 
//                     size={16} 
//                     color={isActive('/2lt') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//                 badge="6"
//               />

//               <NavigationItem
//                 route="/other"
//                 label={t('other')}
//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="ellipsis-horizontal" 
//                     size={16} 
//                     color={isActive('/other') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//               />
//             </View>
//           )}
//         </View>

//         {/* 2KD Section */}
//         <View style={styles.section}>
//           <TouchableOpacity
//             style={styles.sectionHeader}
//             onPress={() => toggleSection('twoKD')}
//           >
//             <View style={styles.sectionTitle}>
//               <FontAwesome5 name="truck" size={18} color={Colors.primary[500]} />
//               <Text style={styles.sectionHeaderText}>{t('twoKd')}</Text>
//             </View>
//             <Ionicons
//               name={expandedSections.twoKD ? "chevron-up" : "chevron-down"}
//               size={18}
//               color={Colors.text.secondary}
//             />
//           </TouchableOpacity>

//           {expandedSections.twoKD && (
//             <View style={styles.sectionContent}>
//               <NavigationItem
//                 route="/dolphin"
//                 label={t('dolphin')}
//                 isNested
//                 icon={
//                   <MaterialIcons 
//                     name="directions-car" 
//                     size={18} 
//                     color={isActive('/dolphin') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//               />
//               <NavigationItem
//                 route="/aynamaw"
//                 label={t('aynamaw')}
//                 isNested
//                 icon={
//                   <MaterialIcons 
//                     name="directions-car" 
//                     size={18} 
//                     color={isActive('/aynamaw') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//               />

//               <NavigationItem
//                 route="/abadula"
//                 label={t('abadula')}
//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="car-sport" 
//                     size={18} 
//                     color={isActive('/abadula') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//               />
//               <NavigationItem
//                 route="/highRoof"
//                 label={t('highRoof')}
//                 isNested
//                 icon={
//                   <Ionicons 
//                     name="car-sport" 
//                     size={18} 
//                     color={isActive('/highRoof') ? Colors.navy[900] : Colors.text.secondary} 
//                   />
//                 }
//               />
//             </View>
//           )}
//         </View>
        
//         <View style={styles.divider} />

//         {/* System Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionLabel}>SYSTEM</Text>
//           <NavigationItem
//             route="/backUp"
//             label={t('backupRestore')}
//             icon={
//               <Feather 
//                 name="refresh-cw" 
//                 size={18} 
//                 color={isActive('/backUp') ? Colors.navy[900] : Colors.text.secondary} 
//               />
//             }
//           />

//           <NavigationItem
//             route="/setting"
//             label={t('settings')}
//             icon={
//               <Feather 
//                 name="settings" 
//                 size={18} 
//                 color={isActive('/settings') ? Colors.navy[900] : Colors.text.secondary} 
//               />
//             }
//           />
//         </View>
//       </DrawerContentScrollView>

//       {/* Footer */}
//       <View style={[
//         styles.footer,
//         { paddingBottom: insets.bottom + 16 }
//       ]}>
//         <View style={styles.userInfo}>
//           <View style={styles.userAvatar}>
//             <Text style={styles.userInitials}>FE</Text>
//           </View>
//           <View style={styles.userDetails}>
//             <Text style={styles.userName}>Feysel</Text>
//             <Text style={styles.userRole}>Developer</Text>
//           </View>
//         </View>
        
//         <View style={styles.versionContainer}>
//           <Text style={styles.versionText}>v1.0.0</Text>
//           <View style={styles.statusDot} />
//           <Text style={styles.statusText}>Online</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background.primary,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border.dark,
//   },
//   appInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   appIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     backgroundColor: 'rgba(255, 215, 0, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 215, 0, 0.3)',
//   },
//   appName: {
//     color: Colors.text.primary,
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   appSubtitle: {
//     color: Colors.text.tertiary,
//     fontSize: 12,
//     fontWeight: '500',
//     marginTop: 2,
//   },
//   scrollContent: {
//     paddingTop: 8,
//     paddingBottom: 20,
//   },
//   section: {
//     marginVertical: 4,
//   },
//   sectionLabel: {
//     color: Colors.text.tertiary,
//     fontSize: 12,
//     fontWeight: '600',
//     letterSpacing: 1,
//     marginHorizontal: 20,
//     marginVertical: 12,
//     textTransform: 'uppercase',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     marginHorizontal: 8,
//   },
//   sectionTitle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   sectionHeaderText: {
//     color: Colors.text.primary,
//     fontWeight: '600',
//     fontSize: 15,
//     marginLeft: 12,
//   },
//   sectionContent: {
//     marginTop: 2,
//     marginHorizontal: 12,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255, 255, 255, 0.02)',
//   },
//   menuItem: {
//     marginHorizontal: 8,
//     marginVertical: 2,
//     borderRadius: 12,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   nestedMenuItem: {
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   activeMenuItem: {
//     backgroundColor: Colors.primary[500],
//     marginHorizontal: 8,
//   },
//   menuItemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     flex: 1,
//   },
//   iconContainer: {
//     width: 24,
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   activeIconContainer: {},
//   menuItemText: {
//     color: Colors.text.primary,
//     fontSize: 15,
//     fontWeight: '500',
//     flex: 1,
//   },
//   activeMenuItemText: {
//     color: Colors.navy[900],
//     fontWeight: '600',
//   },
//   chevron: {
//     marginRight: 16,
//   },
//   badge: {
//     backgroundColor: Colors.primary[500],
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     minWidth: 20,
//   },
//   badgeText: {
//     color: Colors.navy[900],
//     fontSize: 10,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: Colors.border.dark,
//     marginVertical: 16,
//     marginHorizontal: 20,
//   },
//   footer: {
//     padding: 20,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: Colors.border.dark,
//     backgroundColor: 'rgba(10, 25, 49, 0.95)',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   userAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.primary[500],
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   userInitials: {
//     color: Colors.navy[900],
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   userDetails: {
//     flex: 1,
//   },
//   userName: {
//     color: Colors.text.primary,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   userRole: {
//     color: Colors.text.tertiary,
//     fontSize: 12,
//     marginTop: 2,
//   },
//   versionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   versionText: {
//     color: Colors.text.tertiary,
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   statusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: Colors.status.success,
//     marginHorizontal: 8,
//   },
//   statusText: {
//     color: Colors.text.tertiary,
//     fontSize: 12,
//     fontWeight: '500',
//     flex: 1,
//   },
// });

import { useProductForm } from "@/hooks/useProductForm";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from "./colors";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const router = useRouter();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({
    engineFamilies: true,
    twoKDFamily: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (route: string) => {
    return pathname === route ;
  };

  const NavigationItem = ({ 
    route, 
    label, 
    icon, 
    isNested = false,
    description,
  }: { 
    route: string;
    label: string;
    icon: React.ReactNode;
    isNested?: boolean;
    description?: string;
  }) => {
    const active = isActive(route);
    
    return (
      <TouchableOpacity
        style={[
          styles.menuItem,
          isNested && styles.nestedMenuItem,
          active && styles.activeMenuItem,
        ]}
        onPress={() => router.push(route as never)}
      >
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
            {icon}
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[
              styles.menuItemText,
              active && styles.activeMenuItemText
            ]}>
              {label}
            </Text>
            {description && (
              <Text style={[
                styles.menuItemDescription,
                active && styles.activeMenuItemDescription
              ]}>
                {description}
              </Text>
            )}
          </View>
        </View>
        
        {!isNested && (
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={active ? Colors.navy[900] : Colors.text.tertiary} 
            style={styles.chevron}
          />
        )}
      </TouchableOpacity>
    );
  };

  const {getCountsByEngineType}=useProductForm();

const counts=getCountsByEngineType()
  return (
    <View style={[
      styles.container,
      { paddingTop: statusBarHeight }
    ]}>

       <View style={styles.header}>
         <View style={styles.appInfo}>
           <View style={styles.appIcon}>
             <FontAwesome5 name="car" size={24} color={Colors.primary[500]} />
           </View>
           <View>
             <Text style={styles.appName}>Auto Parts</Text>
             <Text style={styles.appSubtitle}>Management System</Text>
           </View>
         </View>
       </View>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Dashboard */}
        <NavigationItem
          route="/(tabs)"
          label="Dashboard"
          description="Overview and quick access"
          icon={
            <Ionicons 
              name="speedometer-outline" 
              size={22} 
              color={isActive('/(tabs)') ? Colors.navy[900] : Colors.text.secondary} 
            />
          }
        />

        {/* Engine Families Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('engineFamilies')}
          >
            <View style={styles.sectionTitle}>
              <MaterialIcons name="precision-manufacturing" size={20} color={Colors.primary[500]} />
              <Text style={styles.sectionHeaderText}>Engine Families</Text>
            </View>
            <Ionicons
              name={expandedSections.engineFamilies ? "chevron-up" : "chevron-down"}
              size={18}
              color={Colors.text.secondary}
            />
          </TouchableOpacity>

          {expandedSections.engineFamilies && (
            <View style={styles.sectionContent}>
              <NavigationItem
                route="/5l"
                label={`5L  (${counts['5L'] || 0})`}
                // description="All 5L  variants"
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={16} 
                    color={isActive('/5l') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />

              <NavigationItem
                route="/3l"
                // label="3L  Family"
                label={`3L  (${counts['3L'] || 0})`}

                // description="All 3L  variants"
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={16} 
                    color={isActive('/3l') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />

              <NavigationItem
                route="/2l"
                // label="2L  Family"
                label={`2L  (${counts['2L'] || 0})`}

                // description="All 2L  variants"
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={16} 
                    color={isActive('/2l') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />

              <NavigationItem
                route="/2lt"
                // label="2LT  Family"
                label={`2LT  (${counts['2LT'] || 0})`}

                // description="All 2LT  variants"
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={16} 
                    color={isActive('/2lt') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />

              <NavigationItem
                route="/other"
                // label="Other  Types"
                label={`Other Engine (${counts['Other'] || 0})`}

                description="Other classifications"
                isNested
                icon={
                  <Ionicons 
                    name="car" 
                    size={16} 
                    color={isActive('/other') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />
            </View>
          )}
        </View>

        {/* 2KD  Family Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('twoKDFamily')}
          >
            <View style={styles.sectionTitle}>
              <FontAwesome5 name="tachometer-alt" size={18} color={Colors.primary[500]} />
              <Text style={styles.sectionHeaderText}>2KD Engine Family</Text>
            </View>
            <Ionicons
              name={expandedSections.twoKDFamily ? "chevron-up" : "chevron-down"}
              size={18}
              color={Colors.text.secondary}
            />
          </TouchableOpacity>

          {expandedSections.twoKDFamily && (
            <View style={styles.sectionContent}>
              <Text style={styles.familyDescription}>
                Vehicles equipped with 2KD engine platform
              </Text>
              
              <NavigationItem
                route="/dolphin"
                // label="Dolphin Model"
                label={`Dolphin  (${counts['Dolphin'] || 0})`}

                // description="2KD engine variant"
                isNested
                icon={
                  <MaterialIcons 
                    name="directions-car" 
                    size={18} 
                    color={isActive('/dolphin') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />
              <NavigationItem
                route="/aynamaw"
                // label="Aynamaw "
                label={`Aynamaw  (${counts['Aynamaw'] || 0})`}

                // description="2KD engine variant"
                isNested
                icon={
                  <MaterialIcons 
                    name="directions-car" 
                    size={18} 
                    color={isActive('/aynamaw') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />

              <NavigationItem
                route="/abadula"
                // label="Abadula "
                label={`Abadula  (${counts['Abadula'] || 0})`}

                // description="2KD engine variant"
                isNested
                icon={
                  <Ionicons 
                    name="car-sport" 
                    size={18} 
                    color={isActive('/abadula') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />
              <NavigationItem
                route="/highRoof"
                // label="High Roof "
                label={`High Roof  (${counts['High Roof'] || 0})`}

                // description="2KD engine variant"
                isNested
                icon={
                  <Ionicons 
                    name="car-sport" 
                    size={18} 
                    color={isActive('/highRoof') ? Colors.navy[900] : Colors.text.secondary} 
                  />
                }
              />
            </View>
          )}
        </View>
        
        <View style={styles.divider} />

        {/* Tools & Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TOOLS & SETTINGS</Text>
          
          
          <NavigationItem
            route="/todo"
            label="TODO"
            description="App configuration"
            icon={
              <FontAwesome
                name="sticky-note" 
                size={18} 
                color={isActive('/settings') ? Colors.navy[900] : Colors.text.secondary} 
              />
            }
          />

          <NavigationItem
            route="/backUp"
            label="Backup & Restore"
            description="Manage your data"
            icon={
              <Feather 
                name="database" 
                size={18} 
                color={isActive('/backUp') ? Colors.navy[900] : Colors.text.secondary} 
              />
            }
          />

          <NavigationItem
            route="/setting"
            label="Settings"
            description="App configuration"
            icon={
              <Feather 
                name="settings" 
                size={18} 
                color={isActive('/settings') ? Colors.navy[900] : Colors.text.secondary} 
              />
            }
          />


        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={[
        styles.footer,
        { paddingBottom: insets.bottom + 16 }
      ]}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>FE</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Feysel</Text>
            <Text style={styles.userRole}>Automotive Engineer</Text>
          </View>
        </View>
        
        <View style={{}}>
          <Text style={styles.versionText}>v1.0.0</Text>
          {/* <View style={styles.statusDot} /> */}
          {/* <Text style={styles.statusText}>Professional Edition</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.dark,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  appName: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    color: Colors.text.tertiary,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  section: {
    marginVertical: 4,
  },
  sectionLabel: {
    color: Colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    textTransform: 'uppercase',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderText: {
    color: Colors.text.primary,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 12,
  },
  sectionContent: {
    marginTop: 2,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  familyDescription: {
    color: Colors.text.tertiary,
    fontSize: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontStyle: 'italic',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.dark,
  },
  menuItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nestedMenuItem: {
    marginLeft: 8,
    marginRight: 8,
  },
  activeMenuItem: {
    backgroundColor: Colors.primary[500],
    marginHorizontal: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  menuTextContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  activeIconContainer: {},
  menuItemText: {
    color: Colors.text.white,
    fontSize: 15,
    fontWeight: '500',
  },
  activeMenuItemText: {
    color: Colors.navy[900],
    fontWeight: '600',
  },
  menuItemDescription: {
    color: Colors.text.tertiary,
    fontSize: 12,
    marginTop: 2,
  },
  activeMenuItemDescription: {
    color: Colors.navy[700],
  },
  chevron: {
    marginRight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.dark,
    marginVertical: 16,
    marginHorizontal: 20,
  },
  footer: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.dark,
    backgroundColor: 'rgba(10, 25, 49, 0.95)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitials: {
    color: Colors.navy[900],
    fontSize: 14,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  userRole: {
    color: Colors.text.tertiary,
    fontSize: 12,
    marginTop: 2,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionText: {
    color: Colors.text.tertiary,
    fontSize: 12,
    fontWeight: '500',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.status.success,
    marginHorizontal: 8,
  },
  statusText: {
    color: Colors.text.tertiary,
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
});