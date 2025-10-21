
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useProductForm } from '../hooks/useProductForm';

import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

// Define the props type for the component
interface CarTypeScreenProps {
  carType: string;
}

export default function CarTypeScreen({ carType }: CarTypeScreenProps) {
  
  const { t } = useTranslation();

  const { isAmharic, toggleLanguage } = useLanguage();
  
  const router = useRouter();
  const { savedItems, deleteItem } = useProductForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const conditionOptions = ['new', 'dubai'];
  const partOptions = ['Motor', 'Leg', 'Body', 'sensors', 'Meri', 'Hose', 'Other'];

  // Filter items for the specific car type and apply search/filters
  const filteredItems = savedItems.filter(item => {
    if (item.size !== carType) return false;
    
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(query);
      const descriptionMatch = item.description?.toLowerCase().includes(query);
      if (!nameMatch && !descriptionMatch) return false;
    }
    
    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
      return false;
    }
    
    // Part filter
    if (selectedParts.length > 0 && !selectedParts.includes(item.part)) {
      return false;
    }
    
    return true;
  });

  // Toggle condition selection
  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  // Toggle part selection
  const togglePart = (part: string) => {
    setSelectedParts(prev =>
      prev.includes(part)
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedConditions([]);
    setSelectedParts([]);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedConditions.length > 0 || selectedParts.length > 0;

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

  const handleItemPress = (itemId: string) => {
    router.push(`/detail/${itemId}`);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.contentArea}
        onPress={() => handleItemPress(item.id)}
      >
        <View style={styles.card}>
          {/* Image with overlay badge */}
          <View style={styles.imageContainer}>
            {item.imageUris && (
              <Image source={{ uri: item.imageUris[0] }} style={styles.savedImage} />
            )}
            {/* Condition badge overlay */}
            {item.condition && (
              <View style={[
                styles.conditionBadge,
                item.condition === 'new' ? styles.newBadge : styles.dubaiBadge
              ]}>
                <Text style={styles.conditionBadgeText}>{item.condition}</Text>
              </View>
            )}
          </View>

          {/* Content */}
          <View style={styles.textContent}>
            {/* Product Name */}
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>

            {/* Description */}
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Part and Metadata Row */}
            <View style={styles.metaContainer}>
              <View style={styles.partTag}>
                <FontAwesome name="puzzle-piece" size={10} color="#FFD700" />
                <Text style={styles.partText}> {item.part}</Text>
              </View>
              
              {item.price && (
                <Text style={styles.priceText}>${item.price}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push(`/edit/${item.id}`)}
        >
          <FontAwesome name="edit" size={14} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={14} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carType} 
      
      {isAmharic ? ' እቃዎች' : ' Items'}

      
      
       ({filteredItems.length})</Text>
      
      {/* Search and Filter Bar */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#CCCCCC" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or description..."
            placeholderTextColor="#CCCCCC"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <FontAwesome name="times-circle" size={16} color="#CCCCCC" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
          onPress={() => setFilterModalVisible(true)}
        >
          <FontAwesome name="filter" size={16} color={hasActiveFilters ? "#0A1931" : "#CCCCCC"} />
          {hasActiveFilters && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedConditions.length + selectedParts.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersText}>Active filters:</Text>
          <View style={styles.activeFiltersList}>
            {selectedConditions.map(condition => (
              <View key={condition} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>Condition: {condition}</Text>
                <TouchableOpacity onPress={() => toggleCondition(condition)}>
                  <FontAwesome name="times" size={12} color="#CCCCCC" />
                </TouchableOpacity>
              </View>
            ))}
            {selectedParts.map(part => (
              <View key={part} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>{t('part')}: {part}</Text>
                <TouchableOpacity onPress={() => togglePart(part)}>
                  <FontAwesome name="times" size={12} color="#CCCCCC" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={clearFilters} style={styles.clearAllButton}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery || hasActiveFilters ? 'No items found for your search/filters' : `No items for ${carType} cars`}
          </Text>
        }
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
                <TouchableWithoutFeedback onPressOut={() => setFilterModalVisible(false)}>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Items</Text>

            {/* Condition Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>{t('condition')}</Text>
              <View style={styles.filterOptions}>
                {conditionOptions.map(condition => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.filterOption,
                      selectedConditions.includes(condition) && styles.filterOptionSelected
                    ]}
                    onPress={() => toggleCondition(condition)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedConditions.includes(condition) && styles.filterOptionTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Part Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>{t('part')}</Text>
              <View style={styles.filterOptions}>
                {partOptions.map(part => (
                  <TouchableOpacity
                    key={part}
                    style={[
                      styles.filterOption,
                      selectedParts.includes(part) && styles.filterOptionSelected
                    ]}
                    onPress={() => togglePart(part)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedParts.includes(part) && styles.filterOptionTextSelected
                    ]}>
                      {part}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.clearButtonModal]} 
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.applyButton]} 
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0A1931',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#FFD700',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2b4d',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2d3e5d',
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1a2b4d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3e5d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeFiltersContainer: {
    backgroundColor: '#1a2b4d',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  activeFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFD700',
  },
  activeFiltersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3e5d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  activeFilterText: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 4,
  },
  clearAllButton: {
    backgroundColor: '#2d3e5d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  clearAllText: {
    fontSize: 12,
    color: '#ff6b6b',
  },
  contentArea: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  savedImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#2d3e5d',
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  conditionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#1a2b4d',
  },
  newBadge: {
    backgroundColor: '#4CAF50',
  },
  dubaiBadge: {
    backgroundColor: '#FF9800',
  },
  conditionBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 16,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3e5d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  partText: {
    fontSize: 11,
    color: '#CCCCCC',
    fontWeight: '500',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2d3e5d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  emptyText: {
    textAlign: 'center',
    color: '#CCCCCC',
    fontStyle: 'italic',
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1a2b4d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFD700',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#FFD700',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2d3e5d',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  filterOptionSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterOptionText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  filterOptionTextSelected: {
    color: '#0A1931',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearButtonModal: {
    backgroundColor: '#2d3e5d',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  applyButton: {
    backgroundColor: '#FFD700',
  },
  clearButtonText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: '#0A1931',
    fontWeight: 'bold',
  },
});