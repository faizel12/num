import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      setSelectedImage(item.imageUri || null);
    }
    setLoading(false);
  }, [id, savedItems]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
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
      imageUri: selectedImage
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

        {/* Image Picker */}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>
              {selectedImage ? 'Change Image' : 'Pick an Image'}
            </Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
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
  scrollContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 20, marginBottom:60 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  
  // Input Styles
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
  
  // Image Styles
  imageSection: { alignItems: 'center', marginBottom: 20 },
  imageButton: { 
    backgroundColor: '#6B46C1', 
    padding: 15, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  imagePreview: { 
    width: 200, 
    height: 200, 
    borderRadius: 10 
  },
  
  // Dropdown Styles
  dropdownContainer: { marginBottom: 20 },
  optionsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  optionButton: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8 
  },
  selectedOption: { 
    backgroundColor: '#007AFF', 
    borderColor: '#007AFF' 
  },
  optionText: { 
    color: '#333' 
  },
  selectedText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  
  // Button Styles
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  actionButton: { 
    flex: 1, 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
  cancelButton: { 
    backgroundColor: '#6B7280' 
  },
  updateButton: { 
    backgroundColor: '#10B981' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});