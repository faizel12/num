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

export default function ListScreen() {
  const router = useRouter();
  const { savedItems, loadSavedItems, deleteItem } = useProductForm();

  const [refreshing, setRefreshing] = useState(false);

  // Inside your ListScreen component
  const [selectedCarFilter, setSelectedCarFilter] = useState<string | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");

  // // Filter the items based on selected car
  // const filteredItems = selectedCarFilter
  //     ? savedItems.filter(item => item.size === selectedCarFilter)
  //     : savedItems;

  // // Get unique car names for the filter
  // const availableCars = [...new Set(savedItems.map(item => item.size))].filter(Boolean);

  const filteredByCar = selectedCarFilter
    ? savedItems.filter((item) => item.size === selectedCarFilter)
    : savedItems;

  // Second: Apply search filter on top of car filter
  const finalItems = filteredByCar.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.size?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.part?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique car names for the filter (from ALL items, not filtered ones)
  const availableCars = [
    ...new Set(savedItems.map((item) => item.size)),
  ].filter(Boolean);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedItems(); // This should now work
    setRefreshing(false);
  };

  const handleItemPress = (itemId: string) => {
    // Navigate to the detail screen with the item ID
    router.push(`/detail/${itemId}`);
  };

  // In your list screen, update the navigation to include title

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      {/* Content area that's clickable for navigation */}
      <TouchableOpacity
        style={styles.contentArea}
        onPress={() => handleItemPress(item.id)}
      >
        <View key={item.id} style={styles.savedItem}>
          {item.imageUri && (
            <Image source={{ uri: item.imageUri }} style={styles.savedImage} />
          )}
          <View>
            <Text style={styles.itemName}> {item.name}</Text>

            <View style={{ marginTop:3,flexDirection: "row", alignItems: "center" }}>
              <Text>Car Type </Text>
              <Text style={styles.itemName}>{item.size}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Icons that are separate from the content */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push(`/edit/${item.id}`)}
        >
          <FontAwesome name="pencil" size={16} color="#666" />
        </TouchableOpacity>

        {/* Delete icon */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={16} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
  // Add delete handler function
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

  return (
    <View style={styles.container}>
      {/* Car Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => setSearchQuery("")}
          >
            <FontAwesome name="times" size={16} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Car:</Text>
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
              All Cars
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
                {car}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>Saved Items ({savedItems.length})</Text>

      <FlatList
        data={finalItems} // Use the final filtered list
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  clearSearch: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: "row", // Add this
    justifyContent: "space-between", // Add this
    alignItems: "flex-start", // Add this
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
  savedImage: { width: 60, height: 60, borderRadius: 4, marginRight: 10 },
  savedItem: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    flexDirection: "row",
  },

  contentArea: {
    flex: 1, // Takes most of the space
  },
  itemName: { fontSize: 16, fontWeight: "bold", maxWidth: 200 },
  itemDetails: { fontSize: 14, color: "#666", marginTop: 4 },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedFilter: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterText: {
    color: "#666",
    fontSize: 14,
  },
  selectedFilterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
