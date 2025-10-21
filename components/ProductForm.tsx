
import { useTranslation } from '@/hooks/useTranslation';
import React, { useState } from 'react';

import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
    const { t } = useTranslation();

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
        
            // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#0A1931' }} // ← SET SAME BACKGROUND COLOR
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
          >
       <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Current Form Inputs */}
                <Text style={styles.sectionTitle}>{t('addItem')}</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('name')}:</Text>
                    <TextInput
                        style={[
                            styles.textInput,
                            !name.trim() && styles.errorInput
                        ]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Item Name *"
                        placeholderTextColor="#CCCCCC"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('description')}:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description"
                        placeholderTextColor="#CCCCCC"
                        multiline
                    />
                </View>
                {/* Image Section with Multiple Images and Camera */}
                <View style={styles.imageSection}>
                    <Text style={styles.label}>{t('images')}:</Text>
                    
                    {/* Main Add Images Button */}
                    <TouchableOpacity 
                        style={styles.imageButton} 
                        onPress={() => setImageSourceModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>{t('addImages')}</Text>
                    </TouchableOpacity>
                    
                    {/* Image Source Selection Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={imageSourceModalVisible}
                        onRequestClose={() => setImageSourceModalVisible(false)}
                    >
                                        <TouchableWithoutFeedback onPressOut={() => setImageSourceModalVisible(false)}>

                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>{t('checkImageStorage')}</Text>
                                
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
                                    <Text style={styles.modalButtonText}>{t('takePhoto')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => setImageSourceModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
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

                {renderDropdown(selectedSize, setSelectedSize, carType, t('selectCarType'))}
                {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, t('selectCondition'))}
                {renderDropdown(selectedPart, setSelectedPart, partOptions, t('selectPart'))}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{t('price')}:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={price}
                        onChangeText={setPrice}
                        placeholder={t('enterPrice')}
                        placeholderTextColor="#CCCCCC"
                        keyboardType="numeric"
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
                        <Text style={styles.buttonText}>{t('save')} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearForm}>
                        <Text style={styles.buttonText}>{t('clear')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Saved Items Display */}
                <View style={styles.savedSection}>
                    <View style={styles.savedHeader}>
                        <Text style={styles.sectionTitle}>{t('savedItems')} ({savedItems.length})</Text>
                        {savedItems.length > 0 && (
                            <TouchableOpacity onPress={handleClearAll}>
                                <Text style={styles.clearAllText}>{t('clearAllData')}</Text>
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
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('name')}:</Text> {item.name}</Text>
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('carType')}:</Text> {item.size}</Text>
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('condition')}:</Text> {item.condition}</Text>
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('part')}:</Text> {item.part}</Text>
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('description')}:</Text> {item.description}</Text>
                                <Text style={styles.savedText}><Text style={styles.bold}>{t('price')}:</Text> {item.price}</Text>
                            </View>
                        </View>
                    ))}

                    {savedItems.length === 0 && (
                        <Text style={styles.noItemsText}>No saved items yet</Text>
                    )}
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#0A1931',
    },
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFD700',
    },
    imageSection: {
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#1a2b4d',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#2d3e5d',
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
        borderWidth: 1,
        borderColor: '#2d3e5d',
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
        color: '#CCCCCC',
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
        color: '#FFD700',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1a2b4d',
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2d3e5d',
    },
    selectedOption: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    optionText: {
        color: '#CCCCCC',
    },
    selectedText: {
        color: '#0A1931',
        fontWeight: '600',
    },
    inputContainer: {
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#2d3e5d',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#1a2b4d',
        color: '#FFFFFF',
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
        backgroundColor: '#1a2b4d',
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    clearButton: {
        backgroundColor: '#1a2b4d',
        borderWidth: 1,
        borderColor: '#2d3e5d',
    },
    buttonText: {
        color: '#FFD700',
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
        color: '#ff6b6b',
        fontWeight: '600',
    },
    savedItem: {
        backgroundColor: '#1a2b4d',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        borderLeftWidth: 3,
        borderLeftColor: '#FFD700',
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
        borderWidth: 1,
        borderColor: '#2d3e5d',
    },
    savedDetails: {
        flex: 1,
    },
    savedText: {
        color: '#CCCCCC',
        marginBottom: 2,
    },
    bold: {
        fontWeight: 'bold',
        color: '#FFD700',
    },
    noItemsText: {
        textAlign: 'center',
        color: '#CCCCCC',
        fontStyle: 'italic',
        marginVertical: 20,
    },
    // Modal Styles
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
        paddingBottom: 30,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFD700',
    },
    modalButton: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#2d3e5d',
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3d4e6d',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: '600',
    },
    cancelButton: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#2d3e5d',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3d4e6d',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff6b6b',
    },
});
