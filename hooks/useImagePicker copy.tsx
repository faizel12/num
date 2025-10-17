
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