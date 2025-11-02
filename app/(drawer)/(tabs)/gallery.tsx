// app/(tabs)/gallery.tsx
import { useProductForm } from '@/hooks/useProductForm';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Colors from '../colors';

export default function GalleryScreen() {

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 10; // Load 10 items at a time


  const { savedItems, carType, partOptions } = useProductForm();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCarTypes, selectedParts, searchQuery]);

  // Filter items based on search and filters
  const totalFilteredItems = savedItems.filter(item => {
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(query);
      const descriptionMatch = item.description?.toLowerCase().includes(query);
      const partMatch = item.part?.toLowerCase().includes(query);
      if (!nameMatch && !descriptionMatch && !partMatch) return false;
    }
    
    // Car type filter
    if (selectedCarTypes.length > 0 && !selectedCarTypes.includes(item.size)) {
      return false;
    }
    
    // Part filter
    if (selectedParts.length > 0 && !selectedParts.includes(item.part)) {
      return false;
    }
    
    return true;
  });

  const startIndex = 0; // Always start from 0 since we're accumulating
const endIndex = currentPage * itemsPerPage;
const paginatedItems = totalFilteredItems.slice(0, endIndex);
const loadMoreItems = () => {
  if (!loadingMore && paginatedItems.length < totalFilteredItems.length) {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  }
};
  // Toggle filters
  const toggleCarType = (type: string) => {
    setSelectedCarTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const togglePart = (part: string) => {
    setSelectedParts(prev =>
      prev.includes(part)
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  const clearFilters = () => {
    setSelectedCarTypes([]);
    setSelectedParts([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCarTypes.length > 0 || selectedParts.length > 0 || searchQuery.length > 0;

  // Render each gallery item with overlay text
  const renderGalleryItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.galleryItem}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      {item.imageUris && item.imageUris.length > 0 ? (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUris[0] }} 
            style={styles.image}
          />
          {/* Overlay text */}
          <View style={styles.textOverlay}>
            <Text style={styles.overlayCarType} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.overlayPartName} numberOfLines={1}>
              {item.size}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image</Text>
          <Text style={styles.placeholderPart}>{item.part}</Text>
          <Text style={styles.placeholderCar}>{item.size}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Search and Filter */}
      <View style={styles.header}>
        <Text style={styles.title}>Parts Gallery ({totalFilteredItems.length})</Text>
        
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={16} color={Colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search parts..."
              placeholderTextColor={Colors.text.secondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <FontAwesome name="times-circle" size={16} color={Colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
            onPress={() => setFilterModalVisible(true)}
          >
            <FontAwesome name="filter" size={16} color={hasActiveFilters ? Colors.text.inverse : Colors.text.secondary} />
            {hasActiveFilters && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  {selectedCarTypes.length + selectedParts.length + (searchQuery ? 1 : 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <View style={styles.activeFiltersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.activeFiltersList}>
                {selectedCarTypes.map(type => (
                  <View key={type} style={styles.activeFilterTag}>
                    <Text style={styles.activeFilterText}>{type}</Text>
                    <TouchableOpacity onPress={() => toggleCarType(type)}>
                      <FontAwesome name="times" size={12} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  </View>
                ))}
                {selectedParts.map(part => (
                  <View key={part} style={styles.activeFilterTag}>
                    <Text style={styles.activeFilterText}>{part}</Text>
                    <TouchableOpacity onPress={() => togglePart(part)}>
                      <FontAwesome name="times" size={12} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  </View>
                ))}
                {searchQuery && (
                  <View style={styles.activeFilterTag}>
                    <Text style={styles.activeFilterText}>Search: {searchQuery}</Text>
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <FontAwesome name="times" size={12} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity onPress={clearFilters} style={styles.clearAllButton}>
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>

  

<FlatList
  key={`gallery-${currentPage}`} // Add this line

  data={paginatedItems}
  numColumns={3}
  keyExtractor={item => item.id}
  renderItem={renderGalleryItem}
  contentContainerStyle={styles.galleryContainer}
  onEndReached={loadMoreItems}
  onEndReachedThreshold={0.5} 
    maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={10}
  removeClippedSubviews={true}
  // Load more when 50% from the end
  ListFooterComponent={loadingMore ? (
    <View style={styles.loadingFooter}>
      <ActivityIndicator size="small" color={Colors.primary[500]} />
      <Text style={styles.loadingText}>Loading more parts...</Text>
    </View>
  ) : null}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <FontAwesome name="photo" size={64} color={Colors.text.tertiary} />
      <Text style={styles.emptyText}>
        {hasActiveFilters ? 'No parts match your filters' : 'No parts added yet'}
      </Text>
      {hasActiveFilters && (
        <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersButton}>
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </TouchableOpacity>
      )}

      
    </View>
  }
/>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Gallery</Text>
              <TouchableOpacity 
                onPress={() => setFilterModalVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesome name="times" size={20} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {/* Car Type Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Car Type</Text>
                <View style={styles.filterOptions}>
                  {carType.map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.filterOption,
                        selectedCarTypes.includes(type) && styles.filterOptionSelected
                      ]}
                      onPress={() => toggleCarType(type)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedCarTypes.includes(type) && styles.filterOptionTextSelected
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Part Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Part Category</Text>
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
            </ScrollView>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.clearButtonModal]} 
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.text.primary,
  },
  loadingFooter: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.text.secondary,
    marginTop: 8,
    fontSize: 14,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text.white,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.status.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: Colors.text.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeFiltersContainer: {
    backgroundColor: Colors.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeFiltersList: {
    flexDirection: 'row',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeFilterText: {
    fontSize: 12,
    color: Colors.primary[500],
    marginRight: 4,
  },
  clearAllButton: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  clearAllText: {
    fontSize: 12,
    color: Colors.status.error,
    fontWeight: '600',
  },
  galleryContainer: {
    padding: 8,
  },
  galleryItem: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.background.tertiary,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 4,
  },
  overlayCarType: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlayPartName: {
    color: Colors.text.primary,
    fontSize: 10,
  },
  placeholder: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  placeholderText: {
    color: Colors.text.tertiary,
    fontSize: 12,
  },
  placeholderPart: {
    color: Colors.text.secondary,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  placeholderCar: {
    color: Colors.text.secondary,
    fontSize: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: Colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearFiltersText: {
    color: Colors.text.inverse,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.text.primary,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  filterOptionText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  filterOptionTextSelected: {
    color: Colors.text.inverse,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    padding: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearButtonModal: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  applyButton: {
    backgroundColor: Colors.primary[500],
  },
  clearButtonText: {
    color: Colors.status.error,
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: Colors.text.inverse,
    fontWeight: 'bold',
  },
});