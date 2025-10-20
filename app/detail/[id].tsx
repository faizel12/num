
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useProductForm } from '../../hooks/useProductForm';
import { useTranslation } from '../../hooks/useTranslation';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function DetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
 

  // Find the item by ID
  // const item = savedItems.find(savedItem => savedItem.id === id);
  const { id } = useLocalSearchParams();
  const { savedItems, deleteItem, loadSavedItems } = useProductForm(); // Added loadSavedItems
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [item, setItem] = useState<any>(null); // Added state for item
  const [loading, setLoading] = useState(true); // Added loading state

  console.log("Detail Screen - ID:", id, "Type:", typeof id);
  console.log("Saved Items Count:", savedItems.length);

  // Load items and find the specific item
  useEffect(() => {
    const findItem = async () => {
      setLoading(true);
      
      // Ensure we have fresh data
      await loadSavedItems();
      
      // Convert id to number for SQLite comparison
      const itemId = parseInt(id as string, 10);
      console.log("Looking for item with ID:", itemId);
      
      // Find the item - SQLite uses numeric IDs
      const foundItem = savedItems.find(savedItem => savedItem.id === itemId);
      console.log("Found item:", foundItem);
      
      setItem(foundItem);
      setLoading(false);
    };
    if (id) {
      findItem();
    }
  }, [id, savedItems.length]); 


  // if (!item) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.errorText}>Item not found</Text>
  //     </View>
  //   );
  // }
  if (loading) {
    return (
      <View style={styles.container}>
        <Text >Loading...</Text>
      </View>
    );
  }
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
        <Text >ID: {id}</Text>
        <Text >Total items: {savedItems.length}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text >Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // const handleDelete = async () => {
  //   Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
  //     { text: "Cancel", style: "cancel" },
  //     {
  //       text: "Delete",
  //       style: "destructive",
  //       onPress: async () => {
  //         const success = await deleteItem(item.id);
  //         if (success) {
  //           router.back();
  //         }
  //       },
  //     },
  //   ]);
  // };

  const handleDelete = async () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteItem(item.id);
          if (success) {
            router.back();
          }
        },
      },
    ]);
  };
  const handleImagePress = (imageUri: string, index: number) => {
    setFullScreenImage(imageUri);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!item.imageUris) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % item.imageUris.length;
    } else {
      newIndex = (currentImageIndex - 1 + item.imageUris.length) % item.imageUris.length;
    }
    
    setCurrentImageIndex(newIndex);
    setFullScreenImage(item.imageUris[newIndex]);
  };



  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button and Actions */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={20} color="#FFD700" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{t('details')}</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push(`/edit/${item.id}`)}
          >
            <FontAwesome name="edit" size={18} color="#FFD700" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleDelete}
          >
            <FontAwesome name="trash" size={18} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Images Gallery */}
      {item.imageUris && item.imageUris.length > 0 && (
        <View style={styles.imagesSection}>
          <Text style={styles.sectionTitle}>{t('images')} ({item.imageUris.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
            {item.imageUris.map((imageUri: string, index: number) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handleImagePress(imageUri, index)}
                style={styles.imageThumbnailContainer}
              >
                <Image source={{ uri: imageUri }} style={styles.imageThumbnail} />
                {item.imageUris && item.imageUris.length > 1 && (
                  <View style={styles.imageNumberBadge}>
                    <Text style={styles.imageNumberText}>{index + 1}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        {/* Name and Condition */}
        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.condition && (
            <View style={[
              styles.conditionBadge,
              item.condition === 'new' ? styles.newBadge : styles.dubaiBadge
            ]}>
              <Text style={styles.conditionBadgeText}>{item.condition}</Text>
            </View>
          )}
        </View>

        {/* Basic Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <FontAwesome name="car" size={16} color="#FFD700" />
            <Text style={styles.infoLabel}>{t('carType')}:</Text>
            <Text style={styles.infoValue}>{item.size || 'Not specified'}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <FontAwesome name="puzzle-piece" size={16} color="#FFD700" />
            <Text style={styles.infoLabel}>{t('part')}:</Text>
            <Text style={styles.infoValue}>{item.part || 'Not specified'}</Text>
          </View>
          
          {item.price && (
            <View style={styles.infoItem}>
              <FontAwesome name="dollar" size={16} color="#FFD700" />
              <Text style={styles.infoLabel}> {t('price')}:</Text>
              <Text style={[styles.infoValue, styles.priceText]}>${item.price}</Text>
            </View>
          )}
        </View>

        {/* Description */}
        {item.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>{t('description')}</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          </View>
        )}

        {/* Additional Details */}
        {/* <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Item ID:</Text>
              <Text style={styles.detailValue}>{item.id}</Text>
            </View>
            
            {item.timestamp && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Added:</Text>
                <Text style={styles.detailValue}>
                  {new Date(item.timestamp).toLocaleDateString()} at {' '}
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            )}
          </View>
        </View> */}
      </View>

      {/* Full Screen Image Modal */}
      <Modal
        visible={!!fullScreenImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullScreenImage(null)}
      >
        <View style={styles.fullScreenModalContainer}>
          <TouchableOpacity 
            style={styles.fullScreenBackdrop}
            activeOpacity={1}
            onPress={() => setFullScreenImage(null)}
          >
            {/* Header with Close Button and Image Counter */}
            <View style={styles.fullScreenHeader}>
              <TouchableOpacity 
                style={styles.fullScreenCloseButton}
                onPress={() => setFullScreenImage(null)}
              >
                <FontAwesome name="times" size={24} color="#FFD700" />
              </TouchableOpacity>
              
              {item.imageUris && item.imageUris.length > 1 && (
                <View style={styles.imageCounter}>
                  <Text style={styles.imageCounterText}>
                    {currentImageIndex + 1} / {item.imageUris.length}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Image with Navigation Arrows */}
            <View style={styles.fullScreenImageContainer}>
              {item.imageUris && item.imageUris.length > 1 && (
                <TouchableOpacity 
                  style={[styles.navButton, styles.prevButton]}
                  onPress={() => navigateImage('prev')}
                >
                  <FontAwesome name="chevron-left" size={24} color="#FFD700" />
                </TouchableOpacity>
              )}
              
              {fullScreenImage && (
                <Image 
                  source={{ uri: fullScreenImage }} 
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              )}
              
              {item.imageUris && item.imageUris.length > 1 && (
                <TouchableOpacity 
                  style={[styles.navButton, styles.nextButton]}
                  onPress={() => navigateImage('next')}
                >
                  <FontAwesome name="chevron-right" size={24} color="#FFD700" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1931',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1a2b4d',
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e5d',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 12,
  },
  errorText: {
    color: '#FFD700',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  imagesSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e5d',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  imagesScroll: {
    flexDirection: 'row',
  },
  imageThumbnailContainer: {
    position: 'relative',
    marginRight: 12,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#2d3e5d',
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  imageNumberBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageNumberText: {
    color: '#0A1931',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    flex: 1,
    marginRight: 12,
  },
  conditionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoGrid: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 8,
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#CCCCCC',
    flex: 1,
  },
  priceText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionBox: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  descriptionText: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsGrid: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#CCCCCC',
    flex: 1,
  },
  // Full Screen Image Styles
  fullScreenModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  fullScreenBackdrop: {
    flex: 1,
  },
  fullScreenHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullScreenCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 43, 77, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCounter: {
    backgroundColor: 'rgba(26, 43, 77, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  navButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 43, 77, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
});