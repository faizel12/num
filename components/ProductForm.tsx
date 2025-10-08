import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        selectedImage,
        pickImage,
        carType,
        conditionOptions,
        partOptions,
        savedItems,
        saveFormData,
        clearForm,
        clearAllSavedItems
    } = useProductForm();

    const handleSave = async () => {
        if (!name.trim()) { // Required field validation
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

                <View style={styles.imageSection}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                    )}
                </View>

                {renderDropdown(selectedSize, setSelectedSize, carType, 'Select Car Type')}
                {renderDropdown(selectedCondition, setSelectedCondition, conditionOptions, 'Select Condition')}
                {renderDropdown(selectedPart, setSelectedPart, partOptions, 'Select Part')}


                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    {/* <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter Name"

                    /> */}

                    <TextInput
                        style={[
                            styles.textInput,
                            !name.trim() && styles.errorInput // Add this line
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
                            {item.imageUri && (
                                <Image source={{ uri: item.imageUri }} style={styles.savedImage} />
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
    scrollContainer: { flex: 1 },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2, // Make it more prominent
    },

    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    imageSection: { alignItems: 'center', marginBottom: 20 },
    imageButton: { backgroundColor: '#6B46C1', padding: 15, borderRadius: 5, marginBottom: 10 },
    imagePreview: { width: 200, height: 200, borderRadius: 10 },
    dropdownContainer: { marginBottom: 20 },
    inputContainer: { marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    optionButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
    selectedOption: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
    optionText: { color: '#333' },
    selectedText: { color: '#fff', fontWeight: 'bold' },
    textInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, minHeight: 50 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    actionButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
    saveButton: { backgroundColor: '#10B981' },
    clearButton: { backgroundColor: '#6B7280' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    savedSection: { marginTop: 20 },
    savedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    clearAllText: { color: '#EF4444', fontWeight: 'bold' },
    savedItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row' },
    savedImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
    savedDetails: { flex: 1 },
    bold: { fontWeight: 'bold' },
    noItemsText: { textAlign: 'center', color: '#6B7280', fontStyle: 'italic' }
});