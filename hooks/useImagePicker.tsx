
// import { Ionicons } from '@expo/vector-icons'; // You may need to install this
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import {
//     Alert,
//     FlatList,
//     Image,
//     Modal,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function MultipleImagePickerWithCamera() {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Request permissions when component mounts
//   React.useEffect(() => {
//     (async () => {
//       const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      
//       if (galleryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
//         Alert.alert('Permission required', 'Sorry, we need camera and gallery permissions to make this work!');
//       }
//     })();
//   }, []);

//   const pickImages = async () => {
//     setModalVisible(false);
    
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       allowsMultipleSelection: true,
//       selectionLimit: 0, // 0 means no limit
//       orderedSelection: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setSelectedImages(prev => [...prev, ...result.assets]);
//     }
//   };

//   const takePhoto = async () => {
//     setModalVisible(false);
    
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ['images'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setSelectedImages(prev => [...prev, ...result.assets]);
//     }
//   };

//   const removeImage = (index) => {
//     setSelectedImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const clearAllImages = () => {
//     setSelectedImages([]);
//   };

//   const renderImageItem = ({ item, index }) => (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item.uri }} style={styles.image} />
//       <TouchableOpacity 
//         style={styles.removeButton}
//         onPress={() => removeImage(index)}
//       >
//         <Ionicons name="close-circle" size={24} color="#ff4444" />
//       </TouchableOpacity>
//       <Text style={styles.fileName} numberOfLines={1}>
//         {item.fileName || `Image ${index + 1}`}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Image Picker</Text>
      
//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity 
//           style={styles.mainButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Ionicons name="images" size={24} color="white" />
//           <Text style={styles.mainButtonText}>Add Images</Text>
//         </TouchableOpacity>

//         {selectedImages.length > 0 && (
//           <TouchableOpacity 
//             style={styles.clearButton}
//             onPress={clearAllImages}
//           >
//             <Text style={styles.clearButtonText}>Clear All</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Image Count */}
//       <Text style={styles.countText}>
//         {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'} selected
//       </Text>

//       {/* Images Grid */}
//       {selectedImages.length > 0 ? (
//         <FlatList
//           data={selectedImages}
//           renderItem={renderImageItem}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyState}>
//           <Ionicons name="images-outline" size={64} color="#ccc" />
//           <Text style={styles.emptyStateText}>No images selected</Text>
//           <Text style={styles.emptyStateSubtext}>
//             Tap "Add Images" to select from gallery or take a photo
//           </Text>
//         </View>
//       )}

//       {/* Source Selection Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Choose Source</Text>
            
//             <TouchableOpacity style={styles.modalButton} onPress={pickImages}>
//               <Ionicons name="image" size={24} color="#007AFF" />
//               <Text style={styles.modalButtonText}>Choose from Gallery</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
//               <Ionicons name="camera" size={24} color="#007AFF" />
//               <Text style={styles.modalButtonText}>Take Photo</Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.cancelButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   mainButton: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   mainButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   clearButton: {
//     padding: 15,
//     backgroundColor: '#ff4444',
//     borderRadius: 10,
//     justifyContent: 'center',
//   },
//   clearButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   countText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#666',
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   removeButton: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'white',
//     borderRadius: 12,
//   },
//   fileName: {
//     marginTop: 8,
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//     width: '100%',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 100,
//   },
//   emptyStateText: {
//     fontSize: 18,
//     color: '#999',
//     marginTop: 16,
//     fontWeight: '600',
//   },
//   emptyStateSubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 8,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: 30,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   modalButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: '#f8f8f8',
//     marginBottom: 10,
//   },
//   modalButtonText: {
//     fontSize: 16,
//     marginLeft: 12,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   cancelButton: {
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#ff4444',
//   },
// });

// // useImagePicker.ts
// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';

// export const useImagePicker = () => {
//     const [selectedImages, setSelectedImages] = useState<string[]>([]);

//     const pickImages = async () => {
//         // Request permissions first
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Sorry, we need camera roll permissions to make this work!');
//             return;
//         }

//         // Launch image picker with multiple selection enabled
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ['images'],
//             allowsMultipleSelection: true, // Enable multiple selection
//             selectionLimit: 0, // 0 means no limit
//             orderedSelection: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             // Extract URIs from all selected assets
//             const uris = result.assets.map(asset => asset.uri);
//             setSelectedImages(uris);
//         }
//     };

//     const removeImage = (index: number) => {
//         setSelectedImages(prev => prev.filter((_, i) => i !== index));
//     };

//     const clearAllImages = () => {
//         setSelectedImages([]);
//     };

//     return {
//         selectedImages,
//         pickImages,
//         removeImage,
//         clearAllImages
//     };
// };

// useImagePicker.ts
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export const useImagePicker = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // Request permissions when hook is initialized
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            
            if (galleryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
                console.warn('Camera or gallery permissions not granted');
            }
        })();
    }, []);

    const pickImages = async () => {
        // Request permissions if not already granted
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 0, // 0 means no limit
            orderedSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uris = result.assets.map(asset => asset.uri);
            setSelectedImages(prev => [...prev, ...uris]);
        }
    };

    const takePhoto = async () => {
        // Request camera permissions if not already granted
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;
            setSelectedImages(prev => [...prev, newImageUri]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const clearAllImages = () => {
        setSelectedImages([]);
    };

    return {
        selectedImages,
        pickImages,
        takePhoto, // Add camera function to return
        removeImage,
        clearAllImages
    };
};