// app/(tabs)/index.tsx (Dashboard)
import { useProductForm } from '@/hooks/useProductForm';
import { useTodo } from '@/hooks/useTodo'; // Adjust path as needed
import { useTranslation } from '@/hooks/useTranslation';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../colors';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {

  const { getTodoStatistics } = useTodo();
  const todoStats = getTodoStatistics();

  const { t } = useTranslation();

  const router = useRouter();
  const { 
    getDashboardSummary, 
    getEngineTypeStatistics, 
    getProductsByEngineType,
    loadSavedItems 
  } = useProductForm();
  
  const [summary, setSummary] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const loadData = async () => {
    const dashboardSummary = getDashboardSummary();
    const engineStats = getEngineTypeStatistics();
    setSummary(dashboardSummary);
    setStats(engineStats);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedItems();
    loadData();
    setRefreshing(false);
  };

  const navigateToEngineType = (engineType: string) => {

    console.log("first", engineType.toLocaleLowerCase());
    router.push(`/${engineType.toLocaleLowerCase()}` as never);
  };

  const navigateToAddItem = () => {
    router.push('/addItem');
  };

  if (!summary) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>{t('enginePartsCatalog')}</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={navigateToAddItem}
          >
            <Ionicons name="add" size={24} color={Colors.navy[900]} />
          </TouchableOpacity>
        </View>


        {/* Top Engine Types */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('topEngineTypes')}</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)' as never)}>
              <Text style={styles.seeAllText}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {summary.topEngineTypes.map((engine: any, index: number) => (
              <TouchableOpacity 
                key={engine.name}
                style={[
                  styles.engineCard,
                  styles.horizontalCard,
                  index === 0 && styles.firstCard
                ]}
                onPress={() => navigateToEngineType(engine.name)}
              >
                <View style={styles.engineIcon}>
                  <FontAwesome5 
                    name={engine.name.includes('2KD') ? 'tachometer-alt' : 'cogs'} 
                    size={24} 
                    color={Colors.primary[500]} 
                  />
                </View>
                <Text style={styles.engineName}>{t(engine.name)}</Text>
                <Text style={styles.engineCount}>{engine.count} {t('part')}</Text>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Parts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('mostCommonParts')}</Text>
          </View>
          
          <View style={styles.partsGrid}>
            {summary.topParts.map((part: any, index: number) => (
              <View key={part.part} style={styles.partItem}>
                <View style={styles.partInfo}>
                  <Text style={styles.partName}>{part.part}</Text>
                  <Text style={styles.partCount}>{part.count} {t('items')}</Text>
                </View>
                <View style={[
                  styles.partBar,
                  { width: `${(part.count / Math.max(...summary.topParts.map((p: any) => p.count))) * 80}%` }
                ]} />
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={{marginBottom:12}}/>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={navigateToAddItem}
            >
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 215, 0, 0.1)' }]}>
                <Ionicons name="add-circle" size={32} color={Colors.primary[500]} />
              </View>
              <Text style={styles.actionText}>{t('addNewPart')} </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/allItems' as never)}
            >
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(52, 199, 89, 0.1)' }]}>
                <Ionicons name="checkmark-done" size={32} color={Colors.status.success} />
              </View>
              <Text style={styles.actionText}>{t('inventoryCheck')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/backUp')}
            >
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                <Ionicons name="cloud-upload" size={32} color={Colors.status.info} />
              </View>
              <Text style={styles.actionText}>{t('backupData')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/setting')}
            >
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(142, 142, 147, 0.1)' }]}>
                <Ionicons name="settings" size={32} color={Colors.text.tertiary} />
              </View>
              <Text style={styles.actionText}>{t('settings')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('recentAdditions')}</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/allItems' as never) }>
              <Text style={styles.seeAllText}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          
          {stats.engineTypes
            .filter((engine: any) => engine.count > 0)
            .slice(0, 3)
            .map((engine: any) => (
              <TouchableOpacity 
                key={engine.name}
                style={styles.recentItem}
                onPress={() => navigateToEngineType(engine.name)}
              >
                <View style={styles.recentIcon}>
                  <FontAwesome5 
                    name="box" 
                    size={16} 
                    color={Colors.primary[500]} 
                  />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName}>{t(engine.name)}</Text>
                  <Text style={styles.recentDetails}>
                    {engine.count} {t('part')} • {Object.values(engine.partBreakdown).filter((count: any) => count > 0).length} {t('categories')}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
              </TouchableOpacity>
            ))}
        </View>

        {/* Empty State */}
        {summary.totalProducts === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <FontAwesome5 name="boxes" size={48} color={Colors.text.tertiary} />
            </View>
            <Text style={styles.emptyTitle}>No Parts Added Yet</Text>
            <Text style={styles.emptyText}>
              Start building your engine parts catalog by adding your first item.
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={navigateToAddItem}
            >
              <Text style={styles.emptyButtonText}>Add First Part</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Todo Statistics Section */}
<View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{t('taskOverview')}</Text>
    <TouchableOpacity onPress={() => router.push('/(drawer)/todo')}>
      <Text style={styles.seeAllText}>{t('viewTasks')}</Text>
    </TouchableOpacity>
  </View>
  
  <View style={styles.todoStatsContainer}>
    <View style={styles.todoStatCard}>
      <Text style={styles.todoStatNumber}>{todoStats.total}</Text>
      <Text style={styles.todoStatLabel}>{t('totalTasks')}</Text>
    </View>
    
    <View style={styles.todoStatCard}>
      <Text style={[styles.todoStatNumber, { color: Colors.status.success }]}>
        {todoStats.completed}
      </Text>
      <Text style={styles.todoStatLabel}>{t('completed')}</Text>
    </View>
    
    <View style={styles.todoStatCard}>
      <Text style={[styles.todoStatNumber, { color: Colors.status.warning }]}>
        {todoStats.pending}
      </Text>
      <Text style={styles.todoStatLabel}>{t('pending')}</Text>
    </View>
    
    <View style={styles.todoStatCard}>
      <Text style={[styles.todoStatNumber, { color: Colors.status.error }]}>
        {todoStats.overdue}
      </Text>
      <Text style={styles.todoStatLabel}>{t('overdue')}</Text>
    </View>
  </View>

</View>

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  loadingText: {
    color: Colors.text.secondary,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    color: Colors.text.secondary,
    fontSize: 16,
    marginBottom: 4,
  },
  appTitle: {
    color: Colors.text.primary,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  overviewSection: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },

  partCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.status.success,
  },
  coverageCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.status.warning,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewNumber: {
    color: Colors.text.primary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  overviewLabel: {
    color: Colors.text.tertiary,
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.text.secondary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBlock:2
  },
  seeAllText: {
    color: Colors.primary[500],
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  horizontalCard: {
    width: width * 0.6,
    marginRight: 12,
  },
  firstCard: {
    marginLeft: 0,
  },
  engineCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  engineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  engineName: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  engineCount: {
    color: Colors.text.tertiary,
    fontSize: 14,
  },
  rankBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary[500],
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rankText: {
    color: Colors.navy[900],
    fontSize: 12,
    fontWeight: '700',
  },
  partsGrid: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
  },
  partItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  partInfo: {
    flex: 1,
  },
  partName: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  partCount: {
    color: Colors.text.tertiary,
    fontSize: 12,
  },
  partBar: {
    height: 4,
    backgroundColor: Colors.primary[500],
    borderRadius: 2,
    marginLeft: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  recentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  recentDetails: {
    color: Colors.text.tertiary,
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.text.tertiary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: Colors.navy[900],
    fontSize: 16,
    fontWeight: '600',
  },
  // Add these styles to your dashboard stylesheet
todoStatsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: Colors.background.secondary,
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
},
todoStatCard: {
  alignItems: 'center',
  flex: 1,
},
todoStatNumber: {
  color: Colors.text.primary,
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 4,
},
todoStatLabel: {
  color: Colors.text.tertiary,
  fontSize: 11,
  fontWeight: '500',
  textAlign: 'center',
},
completionContainer: {
  backgroundColor: Colors.background.secondary,
  borderRadius: 16,
  padding: 16,
},
completionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
completionText: {
  color: Colors.text.primary,
  fontSize: 14,
  fontWeight: '600',
},
completionPercent: {
  color: Colors.primary[500],
  fontSize: 16,
  fontWeight: '700',
},
progressBar: {
  height: 6,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 3,
  overflow: 'hidden',
},
progressFill: {
  height: '100%',
  backgroundColor: Colors.primary[500],
  borderRadius: 3,
},
});