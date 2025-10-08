import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [permission, setPermission] = useState<boolean | null>(null);

    const pickImage = async () => {
        // Request permission if not already granted
        if (permission === null) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPermission(status === 'granted');

            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        // Open image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
    };

    return {
        selectedImage,
        pickImage,
        clearImage,
        hasPermission: permission === true
    };
};