// useImagePicker.ts
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export type ImageQuality = 'high' | 'medium' | 'low';

export const useImagePicker = (quality: ImageQuality = 'medium') => {
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

    // Optimize image for storage
    // const optimizeImage = async (imageUri: string): Promise<string> => {
    //     try {
    //         const manipResult = await ImageManipulator.manipulateAsync(
    //             imageUri,
    //             [{ resize: { width: 800 } }], // Good size for product images
    //             { 
    //                 compress: 0.6, 
    //                 format: ImageManipulator.SaveFormat.JPEG 
    //             }
    //         );
    //         return manipResult.uri;
    //     } catch (error) {
    //         console.log('Image optimization failed, using original:', error);
    //         return imageUri; // Fallback to original
    //     }
    // };

     // Optimize image for storage based on quality setting
     const optimizeImage = async (imageUri: string): Promise<string> => {
        try {
            const settings = {
                high: { width: 1200, compress: 0.8 },
                medium: { width: 800, compress: 0.6 },
                low: { width: 600, compress: 0.5 }
            };

            const { width, compress } = settings[quality];

            const manipResult = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width } }],
                { 
                    compress,
                    format: ImageManipulator.SaveFormat.JPEG 
                }
            );
            
            console.log(`Image optimized (${quality}): ${manipResult.uri}`);
            return manipResult.uri;
        } catch (error) {
            console.log('Image optimization failed, using original:', error);
            return imageUri;
        }
    };

    // const pickImages = async () => {
    //     // Request permissions if not already granted
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //         return;
    //     }

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images'],
    //         allowsMultipleSelection: true,
    //         selectionLimit: 0, // 0 means no limit
    //         orderedSelection: true,
    //         aspect: [4, 3],
    //         quality: 1, // Get original quality first, then optimize
    //     });

    //     if (!result.canceled) {
    //         // Optimize all selected images
    //         const optimizedUris = await Promise.all(
    //             result.assets.map(asset => optimizeImage(asset.uri))
    //         );
            
    //         setSelectedImages(prev => [...prev, ...optimizedUris]);
    //     }
    // };

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 0,
            orderedSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const optimizedUris = await Promise.all(
                result.assets.map(asset => optimizeImage(asset.uri))
            );
            setSelectedImages(prev => [...prev, ...optimizedUris]);
        }
    };

    // const takePhoto = async () => {
    //     // Request camera permissions if not already granted
    //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    //     if (status !== 'granted') {
    //         alert('Sorry, we need camera permissions to make this work!');
    //         return;
    //     }

    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ['images'],
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1, // Get original quality first, then optimize
    //     });

    //     if (!result.canceled) {
    //         const newImageUri = result.assets[0].uri;
    //         // Optimize the taken photo
    //         const optimizedUri = await optimizeImage(newImageUri);
    //         setSelectedImages(prev => [...prev, optimizedUri]);
    //     }
    // };

    const takePhoto = async () => {
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
            const optimizedUri = await optimizeImage(newImageUri);
            setSelectedImages(prev => [...prev, optimizedUri]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const clearAllImages = () => {
        setSelectedImages([]);
    };

    // Get total size of selected images (for debugging/info)
    const getImagesTotalSize = async (): Promise<number> => {
        if (selectedImages.length === 0) return 0;

        try {
            let totalSize = 0;
            for (const uri of selectedImages) {
                const fileInfo = await ImagePicker.getPendingResultAsync();
                // Note: This is a simplified calculation
                // In a real app, you might want to get actual file sizes
                totalSize += 1000; // Approximate KB per optimized image
            }
            return totalSize;
        } catch (error) {
            console.error('Error calculating image sizes:', error);
            return 0;
        }
    };

    // Replace image at specific index
    const replaceImage = async (index: number) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;
            const optimizedUri = await optimizeImage(newImageUri);
            
            setSelectedImages(prev => 
                prev.map((img, i) => i === index ? optimizedUri : img)
            );
        }
    };

    return {
        selectedImages,
        pickImages,
        takePhoto,
        removeImage,
        clearAllImages,
        replaceImage,
        getImagesTotalSize,
      
    };
};