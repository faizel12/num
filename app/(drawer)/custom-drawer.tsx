import { useTranslation } from "@/hooks/useTranslation";
import {
  Feather,
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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({
    engineTypes: false,
    twoKD: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(route);
  };

  const NavigationItem = ({ 
    route, 
    label, 
    icon, 
    isNested = false 
  }: { 
    route: string;
    label: string;
    icon: React.ReactNode;
    isNested?: boolean;
  }) => {
    const active = isActive(route);
    
    return (
      <TouchableOpacity
        style={[
          styles.menuItem,
          isNested && styles.nestedMenuItem,
          active && styles.activeMenuItem,
        ]}
        onPress={() => router.push(route)}
      >
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
            {icon}
          </View>
          <Text style={[
            styles.menuItemText,
            active && styles.activeMenuItemText
          ]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Home */}
        <NavigationItem
          route="/(tabs)"
          label={t('home')}
          icon={
            <Ionicons 
              name="home" 
              size={22} 
              color={isActive('/(tabs)') ? "#1a1a1a" : "#FFFFFF"} 
            />
          }
        />

        {/* Engine Types Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('engineTypes')}
          >
            <Text style={styles.sectionHeaderText}>{t('engineTypes')}</Text>
            <Ionicons
              name={expandedSections.engineTypes ? "chevron-down" : "chevron-forward"}
              size={20}
              color="#FFD700"
            />
          </TouchableOpacity>

          {expandedSections.engineTypes && (
            <View style={styles.sectionContent}>
              <NavigationItem
                route="/5l"
                label= { "5L " + t('cars')}
              
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={18} 
                    color={isActive('/5l') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />

              <NavigationItem
                route="/3l"
                label= { "3L " + t('cars')}
                isNested
                icon={
                  <FontAwesome5 
                    name="car" 
                    size={18} 
                    color={isActive('/3l') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />

              <NavigationItem
                route="/2l"
                label= { "2L " + t('cars')}
                isNested
                icon={
                  <FontAwesome5 
                    name="car-alt" 
                    size={18} 
                    color={isActive('/2l') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />

              <NavigationItem
                route="/other"
                label= { t('other')+" " + t('cars')}

                isNested
                icon={
                  <Ionicons 
                    name="car" 
                    size={18} 
                    color={isActive('/other') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />
            </View>
          )}
        </View>

        {/* 2KD Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('twoKD')}
          >
            <Text style={styles.sectionHeaderText}>{t('twoKd')}</Text>
            <Ionicons
              name={expandedSections.twoKD ? "chevron-down" : "chevron-forward"}
              size={20}
              color="#FFD700"
            />
          </TouchableOpacity>

          {expandedSections.twoKD && (
            <View style={styles.sectionContent}>
              <NavigationItem
                route="/dolphin"
                label= { t('dolphin') + " "+ t('cars')}
                isNested
                icon={
                  <MaterialIcons 
                    name="directions-car" 
                    size={20} 
                    color={isActive('/dolphin') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />

              <NavigationItem
                route="/abadula"
                label= { t('abadula') + " "+ t('cars')}
                isNested
                icon={
                  <Ionicons 
                    name="car-sport" 
                    size={20} 
                    color={isActive('/abadula') ? "#1a1a1a" : "#FFFFFF"} 
                  />
                }
              />
            </View>
          )}
        </View>

        {/* Todo List */}
        <NavigationItem
          route="/todo"
          label={t('toDoList')}
          icon={
            <Feather 
              name="check-square" 
              size={20} 
              color={isActive('/todo') ? "#1a1a1a" : "#FFFFFF"} 
            />
          }
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1931',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  sectionHeaderText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  sectionContent: {
    marginTop: 4,
    marginHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  nestedMenuItem: {
    marginLeft: 8,
    marginRight: 8,
  },
  activeMenuItem: {
    backgroundColor: '#FFD700',
    marginHorizontal: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  activeIconContainer: {
    // Additional styles for active icon container if needed
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  activeMenuItemText: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
});