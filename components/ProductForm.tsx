// import React, { useState } from 'react';
// import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useProductForm } from '../hooks/useProductForm';
// export default function ProductForm() {
//     const {
//         selectedSize,
//         selectedCondition,
//         selectedPart,
//         setSelectedSize,
//         setSelectedCondition,
//         setSelectedPart,
//         description,
//         setDescription,
//         name,
//         setName,
//         price,
//         setPrice,
//         // selectedImage,
//         // pickImage,
//         selectedImages, 
//         pickImages, 
//         takePhoto, 
//         removeImage ,
//         carType,
//         conditionOptions,
//         partOptions,
//         savedItems,
//         saveFormData,
//         clearForm,
//         clearAllSavedItems
//     } = useProductForm();

//     const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);

//     const handleSave = async () => {
//         if (!name.trim()) { // Required field validation
//             Alert.alert('Error', 'Name is required');
//             return false;
//         }
//         const success = await saveFormData();
//         if (success) {
//             Alert.alert('Success', 'Data saved successfully! Form cleared for next entry.');
//         } else {
//             Alert.alert('Error', 'Failed to save data. Please try again.');
//         }
//     };

//     const handleClearAll = async () => {
//         Alert.alert(
//             'Clear All Data',
//             'Are you sure you want to delete all saved items?',
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Clear All',
//                     style: 'destructive',
//                     onPress: async () => {
//                         await clearAllSavedItems();
//                         Alert.alert('Success', 'All saved items have been cleared.');
//                     }
//                 }
//             ]
//         );
//     };

//     const renderDropdown = (
//         selectedValue: string | null,
//         onSelect: (value: string) => void,
//         options: string[],
//         placeholder: string
//     ) => (
//         <View style={styles.dropdownContainer}>
//             <Text style={styles.label}>{placeholder}:</Text>
//             <View style={styles.optionsContainer}>
//                 {options.map((option) => (
//                     <TouchableOpacity
//                         key={option}
//                         style={[
//                             styles.optionButton,
//                             selectedValue === option && styles.selectedOption
//                         ]}
//                         onPress={() => onSelect(option)}
//                     >
//                         <Text style={selectedValue === option ? styles.selectedText : styles.optionText}>
//                             {option}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </View>
//     );

//     return (
//         <ScrollView style={styles.scrollContainer}>
//             <View style={styles.container}>
//                 {/* Current Form Inputs */}
//                 <Text style={styles.sectionTitle}>Add New Item</Text>

//                 {/* <View style={styles.imageSection}>
//                     <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
//                         <Text style={styles.buttonText}>Pick an Image</Text>
//                     </TouchableOpacity>
//                     {selectedImage && (
//                         <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
//                     )}
//                 </View> */}


// <View style={styles.imageSection}>
//     <TouchableOpacity 
//         style={styles.imageButton} 
//         onPress={() => setImageSourceModalVisible(true)}
//     >
//         <Text style={styles.buttonText}>Add Images</Text>
//     </TouchableOpacity>
    
//     {/* Image source selection modal */}
//     <Modal
//         animationType="slide"
//         transparent={true}
//         visible={imageSourceModalVisible}
//         onRequestClose={() => setImageSourceModalVisible(false)}
//     >
//         <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Choose Image Source</Text>
                
//                 <TouchableOpacity 
//                     style={styles.modalButton} 
//                     onPress={() => {
//                         setImageSourceModalVisible(false);
//                         pickImages();
//                     }}
//                 >
//                     <Text style={styles.modalButtonText}>Choose from Gallery</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                     style={styles.modalButton} 
//                     onPress={() => {
//                         setImageSourceModalVisible(false);
//                         takePhoto();
//                     }}
//                 >
//                     <Text style={styles.modalButtonText}>Take Photo</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                     style={styles.cancelButton}
//                     onPress={() => setImageSourceModalVisible(false)}
//                 >
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </Modal>
    
//     {/* Display selected images (same as above) */}
//     {selectedImages.length > 0 && (
//     <View>
//     <Text style={styles.imageCountText}>
//         {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'} selected
//     </Text>
//     <ScrollView horizontal style={styles.multipleImageContainer}>
//         {selectedImages.map((imageUri, index) => (
//             <View key={index} style={styles.imagePreviewContainer}>
//                 <Image source={{ uri: imageUri }} style={styles.imagePreview} />
//                 <TouchableOpacity 
//                     style={styles.removeImageButton}
//                     onPress={() => removeImage(index)}
//                 >
//                     <Text style={styles.removeImageText}>×</Text>
//                 </TouchableOpacity>
//             </View>
//         ))}
//     </ScrollView>
// </View>    )}
// </View>
//                 {renderDropdown(selectedSize, setSelectedSize, carType, 'Select Car Type')}
//                 {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, 'Select Condition')}
//                 {renderDropdown(selectedPart, setSelectedPart, partOptions, 'Select Part')}


//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Name:</Text>
//                     <TextInput
//                         style={[
//                             styles.textInput,
//                             !name.trim() && styles.errorInput // Add this line
//                         ]}
//                         value={name}
//                         onChangeText={setName}
//                         placeholder="Item Name *"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Description:</Text>
//                     <TextInput
//                         style={styles.textInput}
//                         value={description}
//                         onChangeText={setDescription}
//                         placeholder="Enter description"
//                         multiline
//                     />
//                 </View>


//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Price:</Text>
//                     <TextInput
//                         style={styles.textInput}
//                         value={price}
//                         onChangeText={setPrice}
//                         placeholder="Enter price"
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 {/* Action Buttons */}
//                 <View style={styles.buttonRow}>
//                     <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
//                         <Text style={styles.buttonText}>Save & Clear Form</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearForm}>
//                         <Text style={styles.buttonText}>Clear Form Only</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Saved Items Display */}
//                 <View style={styles.savedSection}>
//                     <View style={styles.savedHeader}>
//                         <Text style={styles.sectionTitle}>Saved Items ({savedItems.length})</Text>
//                         {savedItems.length > 0 && (
//                             <TouchableOpacity onPress={handleClearAll}>
//                                 <Text style={styles.clearAllText}>Clear All</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* {savedItems.map((item) => (
//                         <View key={item.id} style={styles.savedItem}>
//                             {item.imageUri && (
//                                 <Image source={{ uri: item.imageUri }} style={styles.savedImage} />
//                             )}
//                             <View style={styles.savedDetails}>
//                                 <Text><Text style={styles.bold}>Name:</Text> {item.name}</Text>
//                                 <Text><Text style={styles.bold}>Car Type:</Text> {item.size}</Text>
//                                 <Text><Text style={styles.bold}>Condition:</Text> {item.condition}</Text>
//                                 <Text><Text style={styles.bold}>Part:</Text> {item.part}</Text>
//                                 <Text><Text style={styles.bold}>Description:</Text> {item.description}</Text>
//                                 <Text><Text style={styles.bold}>Price:</Text> {item.price}</Text>
//                             </View>
//                         </View>
//                     ))} */}

// {savedItems.map((item) => (
//     <View key={item.id} style={styles.savedItem}>
//         {/* Display multiple images for saved items */}
//         {item.imageUris && item.imageUris.length > 0 && (
//             <ScrollView horizontal style={styles.savedImagesContainer}>
//                 {item.imageUris.map((imageUri, index) => (
//                     <Image 
//                         key={index} 
//                         source={{ uri: imageUri }} 
//                         style={styles.savedImage} 
//                     />
//                 ))}
//             </ScrollView>
//         )}
//         <View style={styles.savedDetails}>
//             {/* ... rest of your saved item details ... */}
                                    
//         </View>
//     </View>
// ))}
//                     {savedItems.length === 0 && (
//                         <Text style={styles.noItemsText}>No saved items yet</Text>
//                     )}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: { flex: 1 },
//     errorInput: {
//         borderColor: 'red',
//         borderWidth: 2, // Make it more prominent
//     },

//     container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
//     sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
//     imageSection: { alignItems: 'center', marginBottom: 20 },
//     imageButton: { backgroundColor: '#6B46C1', padding: 15, borderRadius: 5, marginBottom: 10 },
//     // imagePreview: { width: 200, height: 200, borderRadius: 10 },
//     dropdownContainer: { marginBottom: 20 },
//     inputContainer: { marginBottom: 20 },
//     label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
//     optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//     optionButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
//     selectedOption: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
//     optionText: { color: '#333' },
//     selectedText: { color: '#fff', fontWeight: 'bold' },
//     textInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, minHeight: 50 },
//     buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
//     actionButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
//     saveButton: { backgroundColor: '#10B981' },
//     clearButton: { backgroundColor: '#6B7280' },
//     buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//     savedSection: { marginTop: 20 },
//     savedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
//     clearAllText: { color: '#EF4444', fontWeight: 'bold' },
//     savedItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row' },
//     savedImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
//     savedDetails: { flex: 1 },
//     bold: { fontWeight: 'bold' },
//     noItemsText: { textAlign: 'center', color: '#6B7280', fontStyle: 'italic' },
    
//      // Multiple images container
//      multipleImageContainer: {
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     imagePreviewContainer: {
//         position: 'relative',
//         marginRight: 10,
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         borderRadius: 8,
//     },
//     removeImageButton: {
//         position: 'absolute',
//         top: -5,
//         right: -5,
//         backgroundColor: '#ff4444',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     removeImageText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 14,
//     },
//     imageCountText: {
//         fontSize: 12,
//         color: '#666',
//         marginTop: 5,
//         textAlign: 'center',
//     },
//     savedImagesContainer: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     imageSourceButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//     },
//     imageSourceButton: {
//         flex: 1,
//         backgroundColor: '#007AFF',
//         padding: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginHorizontal: 5,
//     },

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

import React, { useState } from 'react';
import {
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
import { useProductForm } from '../hooks/useProductForm';

export default function ProductForm() {
    const {
        selectedSize,
        selectedCondition,
        selectedPart,
        setSelectedSize,
        setSelectedCondition,
        setSelectedPart,
        description,
        setDescription,
        name,
        setName,
        price,
        setPrice,
        selectedImages,
        pickImages,
        takePhoto,
        removeImage,
        carType,
        conditionOptions,
        partOptions,
        savedItems,
        saveFormData,
        clearForm,
        clearAllSavedItems
    } = useProductForm();

    const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Name is required');
            return false;
        }
        const success = await saveFormData();
        if (success) {
            Alert.alert('Success', 'Data saved successfully! Form cleared for next entry.');
        } else {
            Alert.alert('Error', 'Failed to save data. Please try again.');
        }
    };

    const handleClearAll = async () => {
        Alert.alert(
            'Clear All Data',
            'Are you sure you want to delete all saved items?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        await clearAllSavedItems();
                        Alert.alert('Success', 'All saved items have been cleared.');
                    }
                }
            ]
        );
    };

    const renderDropdown = (
        selectedValue: string | null,
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

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Current Form Inputs */}
                <Text style={styles.sectionTitle}>Add New Item</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={[
                            styles.textInput,
                            !name.trim() && styles.errorInput
                        ]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Item Name *"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description"
                        multiline
                    />
                </View>
                {/* Image Section with Multiple Images and Camera */}
                <View style={styles.imageSection}>
                    <Text style={styles.label}>Images:</Text>
                    
                    {/* Main Add Images Button */}
                    <TouchableOpacity 
                        style={styles.imageButton} 
                        onPress={() => setImageSourceModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>Add Images</Text>
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
                                    onPress={() => {
                                        setImageSourceModalVisible(false);
                                        pickImages();
                                    }}
                                >
                                    <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.modalButton} 
                                    onPress={() => {
                                        setImageSourceModalVisible(false);
                                        takePhoto();
                                    }}
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

                {renderDropdown(selectedSize, setSelectedSize, carType, 'Select Car Type')}
                {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, 'Select Condition')}
                {renderDropdown(selectedPart, setSelectedPart, partOptions, 'Select Part')}

              

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
                    <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save & Clear Form</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearForm}>
                        <Text style={styles.buttonText}>Clear Form Only</Text>
                    </TouchableOpacity>
                </View>

                {/* Saved Items Display */}
                <View style={styles.savedSection}>
                    <View style={styles.savedHeader}>
                        <Text style={styles.sectionTitle}>Saved Items ({savedItems.length})</Text>
                        {savedItems.length > 0 && (
                            <TouchableOpacity onPress={handleClearAll}>
                                <Text style={styles.clearAllText}>Clear All</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {savedItems.map((item) => (
                        <View key={item.id} style={styles.savedItem}>
                            {/* Display multiple images for saved items */}
                            {item.imageUris && item.imageUris.length > 0 && (
                                <ScrollView horizontal style={styles.savedImagesContainer}>
                                    {item.imageUris.map((imageUri:any, index:any) => (
                                        <Image 
                                            key={index} 
                                            source={{ uri: imageUri }} 
                                            style={styles.savedImage} 
                                        />
                                    ))}
                                </ScrollView>
                            )}
                            <View style={styles.savedDetails}>
                                <Text><Text style={styles.bold}>Name:</Text> {item.name}</Text>
                                <Text><Text style={styles.bold}>Car Type:</Text> {item.size}</Text>
                                <Text><Text style={styles.bold}>Condition:</Text> {item.condition}</Text>
                                <Text><Text style={styles.bold}>Part:</Text> {item.part}</Text>
                                <Text><Text style={styles.bold}>Description:</Text> {item.description}</Text>
                                <Text><Text style={styles.bold}>Price:</Text> {item.price}</Text>
                            </View>
                        </View>
                    ))}

                    {savedItems.length === 0 && (
                        <Text style={styles.noItemsText}>No saved items yet</Text>
                    )}
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
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
    inputContainer: {
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: 'white',
    },
    errorInput: {
        borderColor: '#ff4444',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    clearButton: {
        backgroundColor: '#FF9800',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    savedSection: {
        marginTop: 20,
    },
    savedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    clearAllText: {
        color: '#ff4444',
        fontWeight: '600',
    },
    savedItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    savedImagesContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    savedImage: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginRight: 10,
    },
    savedDetails: {
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    noItemsText: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        marginVertical: 20,
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
    cancelButton: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff4444',
    },
});