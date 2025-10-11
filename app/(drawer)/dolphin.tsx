import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProductForm } from '../../hooks/useProductForm';

export default function DolphineScreen() {
  const router = useRouter();
  const { savedItems, deleteItem } = useProductForm();

  // Filter items for 5l cars
  const filteredItems = savedItems.filter(item => item.size === 'Dolphin');

  const handleDelete = async (itemId: string) => {
    // Your existing delete logic
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.contentArea}
        onPress={() => router.push(`/detail/${item.id}`)}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          Condition: {item.condition} | Part: {item.part} | Price: {item.price}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.iconRow}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push(`/edit/${item.id}`)}
        >
          <FontAwesome name="pencil" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={16} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dolphine Items ({filteredItems.length})</Text>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items for 5l cars</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  contentArea: {
    flex: 1,
  },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 10,
  },
  iconButton: {
    padding: 4,
  },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});