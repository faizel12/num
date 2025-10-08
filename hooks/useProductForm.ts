
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

// Key for storing data in AsyncStorage
const STORAGE_KEY = 'product_form_data';

export const useProductForm = () => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [savedItems, setSavedItems] = useState<any[]>([]);

    const carType = ['5L', '3L', 'Dolphin', 'Abadula'];
    const conditionOptions = ['new', 'dubai'];
    const partOptions = ['Motor',
        'Leg',
        'Body',
        'sensors',
        'Meri',
        'Hose',
        'Other'];


    // Load saved items on component mount
    useEffect(() => {
        loadSavedItems();
    }, []);
    const deleteItem = async (itemId: string) => {
        try {
            const updatedItems = savedItems.filter(item => item.id !== itemId);
            setSavedItems(updatedItems);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
            return true;
        } catch (error) {
            console.error('Error deleting item:', error);
            return false;
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadSavedItems(); // Refresh when tab comes into focus
        }, [])
    );
    const loadSavedItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedItems) {
                setSavedItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error('Error loading saved items:', error);
        }
    };

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

    // Save current form data to AsyncStorage
    const saveFormData = async () => {
        try {
            const formData = getFormData();
            const newItem = {
                ...formData,
                id: Date.now().toString(), // Unique ID for each item
                timestamp: new Date().toISOString()
            };

            const updatedItems = [...savedItems, newItem];
            setSavedItems(updatedItems);

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

            // Clear form after successful save
            clearForm();

            return true;
        } catch (error) {
            console.error('Error saving form data:', error);
            return false;
        }
    };

    // Clear only the form inputs (without affecting saved items)
    const clearForm = () => {
        setSelectedSize(null);
        setSelectedCondition(null);
        setSelectedPart(null);
        setDescription('');
        setName('');
        setPrice('');
        setSelectedImage(null);
    };

    // Clear all saved items from storage
    const clearAllSavedItems = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setSavedItems([]);
            return true;
        } catch (error) {
            console.error('Error clearing saved items:', error);
            return false;
        }
    };

    const getFormData = () => ({
        size: selectedSize,
        condition: selectedCondition,
        part: selectedPart,
        description,
        name,
        price,
        imageUri: selectedImage
    });

    return {
        selectedSize,
        setSelectedSize,
        selectedCondition,
        setSelectedCondition,
        selectedPart,
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
        clearAllSavedItems,
        getFormData,
        loadSavedItems, // <- Make sure it's included here for refreshing purpose
        deleteItem, // Add this line


    };
};