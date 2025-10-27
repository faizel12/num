
import { useLanguage } from "@/contexts/LanguageContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductForm } from "../../../hooks/useProductForm";
import { useTranslation } from '../../../hooks/useTranslation';

export default function ListScreen() {
  const { t } = useTranslation();
  const { isAmharic } = useLanguage();

  const router = useRouter();
  const { savedItems, loadSavedItems, deleteItem } = useProductForm();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedCarFilter, setSelectedCarFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredByCar = selectedCarFilter
    ? savedItems.filter((item) => item.size === selectedCarFilter)
    : savedItems;

  const finalItems = filteredByCar.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.size?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.part?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableCars = [
    ...new Set(savedItems.map((item) => item.size)),
  ].filter(Boolean);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedItems();
    setRefreshing(false);
  };

  const handleItemPress = (itemId: string) => {
    router.push(`/detail/${itemId}`);
  };

  const handleDelete = async (itemId: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteItem(itemId);
          if (success) {
            // Item will be automatically removed from the list
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.contentArea}
        onPress={() => handleItemPress(item.id)}
      >
        <View key={item.id} style={styles.savedItem}>
          {item.imageUris && (
            <Image source={{ uri: item.imageUris[0] }} style={styles.savedImage} />
          )}
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.carLabel}>{t('carType')+" "}: </Text>
              <Text style={styles.carValue}>{t(item.size)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push(`/edit/${item.id}`)}
        >
          <FontAwesome name="pencil" size={16} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={16} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("searchItems")+"..."}
          placeholderTextColor="#CCCCCC"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => setSearchQuery("")}
          >
            <FontAwesome name="times" size={16} color="#CCCCCC" />
          </TouchableOpacity>
        )}
      </View>

      {/* Car Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>{t('filterByCar')}:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCarFilter === null && styles.selectedFilter,
            ]}
            onPress={() => setSelectedCarFilter(null)}
          >
            <Text
              style={
                selectedCarFilter === null
                  ? styles.selectedFilterText
                  : styles.filterText
              }
            >
              {t('allCars')}
            </Text>
          </TouchableOpacity>
          {availableCars.map((car) => (
            <TouchableOpacity
              key={car}
              style={[
                styles.filterButton,
                selectedCarFilter === car && styles.selectedFilter,
              ]}
              onPress={() => setSelectedCarFilter(car)}
            >
              <Text
                style={
                  selectedCarFilter === car
                    ? styles.selectedFilterText
                    : styles.filterText
                }
              >
   {isAmharic 
        ? car === 'Dolphin' ? 'ዶልፊን' 
          : car === 'Abadula' ? 'አባዱላ'
          : car === 'Other' ? 'ሌላ'
          : car
        : car
      }              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Title */}
      <Text style={styles.title}>{t('savedItems')} ({savedItems.length})</Text>

      <FlatList
        data={finalItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={["#FFD700"]}
            tintColor="#FFD700"
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {selectedCarFilter
              ? `No items for ${selectedCarFilter}`
              : "No items saved yet"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A1931',
    padding: 16, 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16,
    color: '#FFD700',
  },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#1a2b4d",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2d3e5d",
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearSearch: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  itemContainer: {
    backgroundColor: "#1a2b4d",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "column",
    gap: 15,
    padding: 10,
    marginLeft: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  iconButton: {
    padding: 0,
  },
  savedImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 4, 
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2d3e5d',
  },
  savedItem: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 8,
    flexDirection: "row",
  },
  contentArea: {
    flex: 1,
  },
  itemName: { 
    fontSize: 16, 
    fontWeight: "bold", 
    maxWidth: 200,
    color: '#FFD700',
  },
  carLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  carValue: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  itemDetails: { 
    fontSize: 14, 
    color: "#CCCCCC", 
    marginTop: 4 
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#CCCCCC",
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFD700",
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#1a2b4d",
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#2d3e5d",
  },
  selectedFilter: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  filterText: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  selectedFilterText: {
    color: "#0A1931",
    fontSize: 14,
    fontWeight: "bold",
  },
});


// eas build -p android --profile preview

