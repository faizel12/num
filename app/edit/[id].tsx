// import * as ImagePicker from 'expo-image-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useProductForm } from '../../hooks/useProductForm';

// export default function EditScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const { savedItems, updateItem, carType, conditionOptions, partOptions } = useProductForm();
  
//   const [name, setName] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedCondition, setSelectedCondition] = useState('');
//   const [selectedPart, setSelectedPart] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load item data when component mounts
//   useEffect(() => {
//     const item = savedItems.find(i => i.id === id);
//     if (item) {
//       setName(item.name || '');
//       setSelectedSize(item.size || '');
//       setSelectedCondition(item.condition || '');
//       setSelectedPart(item.part || '');
//       setDescription(item.description || '');
//       setPrice(item.price || '');
//       setSelectedImage(item.imageUri || null);
//     }
//     setLoading(false);
//   }, [id, savedItems]);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Name is required');
//       return;
//     }

//     const updatedData = {
//       name,
//       size: selectedSize,
//       condition: selectedCondition,
//       part: selectedPart,
//       description,
//       price,
//       imageUri: selectedImage
//     };

//     const success = await updateItem(id as string, updatedData);
//     if (success) {
//       Alert.alert('Success', 'Item updated successfully!');
//       router.back();
//     } else {
//       Alert.alert('Error', 'Failed to update item');
//     }
//   };

//   const renderDropdown = (
//     selectedValue: string,
//     onSelect: (value: string) => void,
//     options: string[],
//     placeholder: string
//   ) => (
//     <View style={styles.dropdownContainer}>
//       <Text style={styles.label}>{placeholder}:</Text>
//       <View style={styles.optionsContainer}>
//         {options.map((option) => (
//           <TouchableOpacity
//             key={option}
//             style={[
//               styles.optionButton,
//               selectedValue === option && styles.selectedOption
//             ]}
//             onPress={() => onSelect(option)}
//           >
//             <Text style={selectedValue === option ? styles.selectedText : styles.optionText}>
//               {option}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text>Loading item...</Text>
//       </View>
//     );
//   }

//   return (

//     <ScrollView style={styles.scrollContainer}>


//       <View style={styles.container}>
//         <Text style={styles.title}>Edit Item</Text>

//         {/* Name Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Item Name *</Text>
//           <TextInput
//             style={[
//               styles.textInput,
//               !name.trim() && styles.errorInput
//             ]}
//             value={name}
//             onChangeText={setName}
//             placeholder="Enter item name"
//           />
//         </View>

//         {/* Image Picker */}
//         <View style={styles.imageSection}>
//           <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
//             <Text style={styles.buttonText}>
//               {selectedImage ? 'Change Image' : 'Pick an Image'}
//             </Text>
//           </TouchableOpacity>
//           {selectedImage && (
//             <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
//           )}
//         </View>

//         {/* Dropdowns */}
//         {renderDropdown(selectedSize, setSelectedSize, carType, 'Select Car')}
//         {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, 'Select Condition')}
//         {renderDropdown(selectedPart, setSelectedPart, partOptions, 'Select Part')}

//         {/* Description Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Description:</Text>
//           <TextInput
//             style={[styles.textInput, styles.textArea]}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Enter description"
//             multiline
//             numberOfLines={4}
//           />
//         </View>

//         {/* Price Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Price:</Text>
//           <TextInput
//             style={styles.textInput}
//             value={price}
//             onChangeText={setPrice}
//             placeholder="Enter price"
//             keyboardType="numeric"
//           />
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => router.back()}>
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={handleUpdate}>
//             <Text style={styles.buttonText}>Update Item</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//  </ScrollView>

//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: { flex: 1, backgroundColor: '#f5f5f5' },
//   container: { flex: 1, padding: 20, marginBottom:60 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  
//   // Input Styles
//   inputContainer: { marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
//   textInput: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   textArea: {
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   errorInput: {
//     borderColor: 'red',
//     borderWidth: 2,
//   },
  
//   // Image Styles
//   imageSection: { alignItems: 'center', marginBottom: 20 },
//   imageButton: { 
//     backgroundColor: '#6B46C1', 
//     padding: 15, 
//     borderRadius: 5, 
//     marginBottom: 10 
//   },
//   imagePreview: { 
//     width: 200, 
//     height: 200, 
//     borderRadius: 10 
//   },
  
//   // Dropdown Styles
//   dropdownContainer: { marginBottom: 20 },
//   optionsContainer: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     gap: 10 
//   },
//   optionButton: { 
//     paddingHorizontal: 16, 
//     paddingVertical: 8, 
//     backgroundColor: '#fff', 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 8 
//   },
//   selectedOption: { 
//     backgroundColor: '#007AFF', 
//     borderColor: '#007AFF' 
//   },
//   optionText: { 
//     color: '#333' 
//   },
//   selectedText: { 
//     color: '#fff', 
//     fontWeight: 'bold' 
//   },
  
//   // Button Styles
//   buttonRow: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     marginTop: 20 
//   },
//   actionButton: { 
//     flex: 1, 
//     padding: 16, 
//     borderRadius: 8, 
//     alignItems: 'center', 
//     marginHorizontal: 5 
//   },
//   cancelButton: { 
//     backgroundColor: '#6B7280' 
//   },
//   updateButton: { 
//     backgroundColor: '#10B981' 
//   },
//   buttonText: { 
//     color: '#fff', 
//     fontSize: 16, 
//     fontWeight: 'bold' 
//   },
// });

import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useProductForm } from '../../hooks/useProductForm';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { savedItems, updateItem, carType, conditionOptions, partOptions } = useProductForm();
  
  const [name, setName] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);

  // Load item data when component mounts
  useEffect(() => {
    const item = savedItems.find(i => i.id === id);
    if (item) {
      setName(item.name || '');
      setSelectedSize(item.size || '');
      setSelectedCondition(item.condition || '');
      setSelectedPart(item.part || '');
      setDescription(item.description || '');
      setPrice(item.price || '');
      
      // Handle both old (imageUri) and new (imageUris) data formats
      if (item.imageUris) {
        setSelectedImages(item.imageUris);
      } else if (item.imageUri) {
        setSelectedImages([item.imageUri]);
      } else {
        setSelectedImages([]);
      }
    }
    setLoading(false);
  }, [id, savedItems]);

  const pickImages = async () => {
    setImageSourceModalVisible(false);
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 0,
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
    setImageSourceModalVisible(false);
    
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

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    const updatedData = {
      name,
      size: selectedSize,
      condition: selectedCondition,
      part: selectedPart,
      description,
      price,
      imageUris: selectedImages // Changed from imageUri to imageUris array
    };

    const success = await updateItem(id as string, updatedData);
    if (success) {
      Alert.alert('Success', 'Item updated successfully!');
      router.back();
    } else {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  const renderDropdown = (
    selectedValue: string,
    onSelect: (value: string) => void,
    options: string[],
    placeholder: string
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{placeholder}:</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedValue === option && styles.selectedOption
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={selectedValue === option ? styles.selectedText : styles.optionText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading item...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Item</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={[
              styles.textInput,
              !name.trim() && styles.errorInput
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
          />
        </View>

        {/* Updated Image Section with Multiple Images */}
        <View style={styles.imageSection}>
          <Text style={styles.label}>Images:</Text>
          
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={() => setImageSourceModalVisible(true)}
          >
            <Text style={styles.buttonText}>
              {selectedImages.length > 0 ? 'Add More Images' : 'Add Images'}
            </Text>
          </TouchableOpacity>

          {/* Image Source Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={imageSourceModalVisible}
            onRequestClose={() => setImageSourceModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose Image Source</Text>
                
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={pickImages}
                >
                  <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={takePhoto}
                >
                  <Text style={styles.modalButtonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setImageSourceModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Display Selected Images */}
          {selectedImages.length > 0 && (
            <View>
              <Text style={styles.imageCountText}>
                {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'} selected
              </Text>
              <ScrollView horizontal style={styles.multipleImageContainer}>
                {selectedImages.map((imageUri, index) => (
                  <View key={index} style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Dropdowns */}
        {renderDropdown(selectedSize, setSelectedSize, carType, 'Select Car')}
        {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, 'Select Condition')}
        {renderDropdown(selectedPart, setSelectedPart, partOptions, 'Select Part')}

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.textInput}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#ff4444',
  },
  imageSection: {
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  multipleImageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageCountText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: '#333',
  },
  selectedText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  // cancelButton: {
  //   padding: 16,
  //   borderRadius: 10,
  //   backgroundColor: '#f8f8f8',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
  },
});