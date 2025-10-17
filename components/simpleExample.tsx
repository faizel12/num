// app/components/SimpleExample.tsx
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    addItem,
    deleteAllItems,
    deleteItem,
    getAllItems,
    initDatabase,
    updateItem,
} from '../app/utils/simpleDatabase';

interface Item {
  id: number;
  name: string;
}

const SimpleExample: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Initialize database and load items when component mounts
  useEffect(() => {
    initDatabase();
    loadItems();
  }, []);

  // Load all items from database
  const loadItems = () => {
    try {
      const allItems = getAllItems();
      setItems(allItems);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  // Add new item
  const handleAddItem = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      await addItem(name.trim());
      setName('');
      loadItems(); // Reload the list
      console.log('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  // Update item
  const handleUpdateItem = async (id: number) => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      updateItem(id, name.trim());
      setName('');
      setEditingId(null);
      loadItems();
      console.log('Item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'Failed to update item');
    }
  };

  // Delete item
  const handleDeleteItem = (id: number) => {
    try {
      deleteItem(id);
      loadItems();
      console.log('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  // Start editing an item
  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setName(item.name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setName('');
  };

  // Clear all items
  const handleClearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to delete all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              deleteAllItems();
              loadItems();
              console.log('All items deleted!');
            } catch (error) {
              console.error('Error deleting all items:', error);
            }
          },
        },
      ]
    );
  };

  // Render each item in the list
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.id}. {item.name}
      </Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => startEditing(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteItem(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple SQLite Example</Text>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          placeholderTextColor="#999"
        />

        {editingId ? (
          <View style={styles.editButtons}>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={() => handleUpdateItem(editingId)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancelEditing}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddItem}
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items yet. Add some above!</Text>
        }
      />

      {/* Clear All Button */}
      {items.length > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearAll}
        >
          <Text style={styles.buttonText}>Clear All Items</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputSection: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  updateButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#2196F3',
    flex: 1,
  },
  clearButton: {
    backgroundColor: '#ff4444',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flex: 1,
    backgroundColor:'gray'
  },
  itemContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 26,
    flex: 1,
    marginRight: 10,
    backgroundColor:"green"
    
  },
  itemButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default SimpleExample;