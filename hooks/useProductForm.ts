// // hooks/useProductForm.ts
// import { useFocusEffect } from 'expo-router';
// import * as SQLite from 'expo-sqlite';
// import { useCallback, useEffect, useState } from 'react';
// // Temporary fix - use legacy API
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as FileSystem from 'expo-file-system/legacy';
// import { ImageQuality, useImagePicker } from './useImagePicker';


// const STORAGE_KEY = 'product_form_data';
// const IMAGE_QUALITY_KEY = 'image_quality_setting';

// // Open database
// const db = SQLite.openDatabaseSync('products.db');

// // Initialize database
// const initDatabase = () => {
//   try {
//     db.execSync(`
//       CREATE TABLE IF NOT EXISTS products (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         description TEXT,
//         price TEXT,
//         size TEXT,
//         condition TEXT,
//         part TEXT,
//         image_paths TEXT,
//         timestamp TEXT
//       );
//     `);
//     console.log('Products table created successfully');
//   } catch (error) {
//     console.log('Error creating products table:', error);
//   }
// };

// export const useProductForm = () => {
//     const [selectedSize, setSelectedSize] = useState<string | null>('Other');
//     const [selectedCondition, setSelectedCondition] = useState<string | null>('dubai');
//     const [selectedPart, setSelectedPart] = useState<string | null>('Other');
//     const [description, setDescription] = useState('');
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');

//     const [imageQuality, setImageQuality] = useState<ImageQuality>('medium'); // New state
   
//     // Initialize image picker with quality setting
//     const { selectedImages, pickImages, takePhoto, removeImage, clearAllImages } = useImagePicker(imageQuality);
   
//     // const { selectedImages, pickImages, takePhoto, removeImage, clearAllImages } = useImagePicker();   
//     const [savedItems, setSavedItems] = useState<any[]>([]);

//     const carType = ['5L', '3L', 'Dolphin','Aynamaw', 'Abadula','2L','2LT','High Roof','Other'];
//     const conditionOptions = ['new', 'dubai'];
//     const partOptions = ['Motor', 'Leg', 'Body', 'sensors', 'Meri', 'Hose', 'Other'];

//     // Initialize database and load saved items on component mount
//     useEffect(() => {
//         initDatabase();
//         loadSavedItems();
//         loadImageQualitySetting();

//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             loadSavedItems(); // Refresh when tab comes into focus
//         }, [])
//     );

//     // Load image quality setting from storage
//     const loadImageQualitySetting = async () => {
//         try {
//             const storedQuality = await AsyncStorage.getItem(IMAGE_QUALITY_KEY);
//             if (storedQuality) {
//                 setImageQuality(storedQuality as ImageQuality);
//             }
//         } catch (error) {
//             console.error('Error loading image quality setting:', error);
//         }
//     };

//         // Update image quality setting
//         const updateImageQuality = async (quality: ImageQuality) => {
//             try {
//                 setImageQuality(quality);
//                 await AsyncStorage.setItem(IMAGE_QUALITY_KEY, quality);
//                 console.log('Image quality updated to:', quality);
//             } catch (error) {
//                 console.error('Error saving image quality setting:', error);
//             }
//         };
        

//     // Save images to file system and return their paths
//     const saveImagesToFileSystem = async (imageUris: string[]): Promise<string[]> => {
//         const savedPaths: string[] = [];
        
//         try {
//             const imagesDir = FileSystem.documentDirectory + 'product_images/';
            
//             // Create directory using new API
//             const dirInfo = await FileSystem.getInfoAsync(imagesDir);
//             if (!dirInfo.exists) {
//                 await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
//             }
            
//             for (const imageUri of imageUris) {
//                 const fileName = `product_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
//                 const newImagePath = imagesDir + fileName;
                
//                 // Copy image to app directory
//                 await FileSystem.copyAsync({
//                     from: imageUri,
//                     to: newImagePath
//                 });
                
//                 savedPaths.push(newImagePath);
//             }
//         } catch (error) {
//             console.error('Error saving images:', error);
//             throw error;
//         }
        
//         return savedPaths;
//     };

//     // Load saved items from database
//     const loadSavedItems = async () => {
//         try {
//             const products:any = db.getAllSync('SELECT * FROM products ORDER BY timestamp DESC');
            
//             // Convert image_paths string back to array
//             const itemsWithImages = products.map((product:any)  => ({
//                 ...product,
//                 imageUris: product.image_paths ? JSON.parse(product.image_paths) : [],
//             }));
            
//             setSavedItems(itemsWithImages);
//             console.log(`Loaded ${itemsWithImages.length} products from database`);
//         } catch (error) {
//             console.error('Error loading saved items:', error);
//         }
//     };

//     // Delete item from database
//     const deleteItem = async (itemId: string) => {
//         try {
//             db.runSync('DELETE FROM products WHERE id = ?', [itemId]);
//             await loadSavedItems(); // Reload the list
//             return true;
//         } catch (error) {
//             console.error('Error deleting item:', error);
//             return false;
//         }
//     };

//     // Update item in database
//     const updateItem = async (itemId: string, updatedData: any) => {
//         try {
//             let imagePaths = updatedData.imageUris;
//             if (updatedData.imageUris && updatedData.imageUris.length > 0) {
//                 const hasNewImages = updatedData.imageUris.some((uri: string) => uri.startsWith('file://'));
//                 if (hasNewImages) {
//                     imagePaths = await saveImagesToFileSystem(updatedData.imageUris);
//                 }
//             }

//             db.runSync(
//                 `UPDATE products SET 
//                  name = ?, description = ?, price = ?, size = ?, 
//                  condition = ?, part = ?, image_paths = ? 
//                  WHERE id = ?`,
//                 [
//                     updatedData.name,
//                     updatedData.description,
//                     updatedData.price,
//                     updatedData.size,
//                     updatedData.condition,
//                     updatedData.part,
//                     JSON.stringify(imagePaths),
//                     itemId
//                 ]
//             );
            
//             await loadSavedItems();
//             return true;
//         } catch (error) {
//             console.error('Error updating item:', error);
//             return false;
//         }
//     };

//     // Save form data to database
//     const saveFormData = async () => {
//         try {
//             if (selectedImages.length === 0) {
//                 console.log('No images to save');
//                 return false;
//             }

//             // Save images to file system first
//             const savedImagePaths = await saveImagesToFileSystem(selectedImages);
            
//             const formData = getFormData();
//             const timestamp = new Date().toISOString();

//             // Insert into database
//             const result = db.runSync(
//                 `INSERT INTO products 
//                  (name, description, price, size, condition, part, image_paths, timestamp) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//                 [
//                     formData.name,
//                     formData.description,
//                     formData.price,
//                     formData.size,
//                     formData.condition,
//                     formData.part,
//                     JSON.stringify(savedImagePaths),
//                     timestamp
//                 ]
//             );

//             console.log('Product saved with ID:', result.lastInsertRowId);
//             await loadSavedItems();
//             clearForm();
//             return true;
//         } catch (error) {
//             console.error('Error saving form data:', error);
//             return false;
//         }
//     };

//     // Clear form
//     const clearForm = () => {
//         setSelectedSize(null);
//         setSelectedCondition(null);
//         setSelectedPart(null);
//         setDescription('');
//         setName('');
//         setPrice('');
//         clearAllImages();
//     };

//     // Clear all saved items from database
//     const clearAllSavedItems = async () => {
//         try {
//             db.runSync('DELETE FROM products');
//             setSavedItems([]);
            
//             // Optional: Also delete image files
//             try {
//                 const imagesDir = FileSystem.documentDirectory + 'product_images/';
//                 await FileSystem.deleteAsync(imagesDir, { idempotent: true });
//             } catch (imageError) {
//                 console.log('Error deleting images directory:', imageError);
//             }
            
//             return true;
//         } catch (error) {
//             console.error('Error clearing saved items:', error);
//             return false;
//         }
//     };

//     // Get form data
//     const getFormData = () => ({
//         size: selectedSize,
//         condition: selectedCondition,
//         part: selectedPart,
//         description,
//         name,
//         price,
//         imageUris: selectedImages
//     });


//     // Add this function to get storage info
//     const getImageStorageInfo = async () => {
//         try {
//             const imagesDir = FileSystem.documentDirectory + 'product_images/';
//             const dirInfo = await FileSystem.getInfoAsync(imagesDir);
            
//             let files: string[] = [];
//             let totalSize = 0;
            
//             if (dirInfo.exists) {
//                 files = await FileSystem.readDirectoryAsync(imagesDir);
                
//                 for (const file of files) {
//                     const fileInfo = await FileSystem.getInfoAsync(imagesDir + file);
//                     if (fileInfo.exists && fileInfo.size) {
//                         totalSize += fileInfo.size;
//                     }
//                 }
//             }
            
//             return {
//                 directory: imagesDir,
//                 exists: dirInfo.exists,
//                 fileCount: files.length,
//                 files: files,
//                 totalSize: totalSize,
//                 totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2) + ' MB'
//             };
//         } catch (error) {
//             console.error('Error getting storage info:', error);
//             return null;
//         }
//     };

//     return {
//         getImageStorageInfo, // Add this line
//         imageQuality, 
//         updateImageQuality,
//         selectedSize,
//         setSelectedSize,
//         selectedCondition,
//         setSelectedCondition,
//         selectedPart,
//         setSelectedPart,
//         description,
//         setDescription,
//         name,
//         setName,
//         price,
//         setPrice,
//         selectedImages,
//         pickImages,
//         takePhoto,
//         removeImage,
//         carType,
//         conditionOptions,
//         partOptions,
//         savedItems,
//         saveFormData,
//         clearForm,
//         clearAllSavedItems,
//         getFormData,
//         loadSavedItems,
//         deleteItem,
//         updateItem,
//     };
// };
// hooks/useProductForm.ts
import { useFocusEffect } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
// Temporary fix - use legacy API
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { ImageQuality, useImagePicker } from './useImagePicker';

const STORAGE_KEY = 'product_form_data';
const IMAGE_QUALITY_KEY = 'image_quality_setting';

// Open database
const db = SQLite.openDatabaseSync('products.db');

// Initialize database
const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price TEXT,
        size TEXT,
        condition TEXT,
        part TEXT,
        image_paths TEXT,
        timestamp TEXT
      );
    `);
    console.log('Products table created successfully');
  } catch (error) {
    console.log('Error creating products table:', error);
  }
};

export const useProductForm = () => {
    const [selectedSize, setSelectedSize] = useState<string | null>('Other');
    const [selectedCondition, setSelectedCondition] = useState<string | null>('dubai');
    const [selectedPart, setSelectedPart] = useState<string | null>('Other');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [imageQuality, setImageQuality] = useState<ImageQuality>('medium'); // New state
   
    // Initialize image picker with quality setting
    const { selectedImages, pickImages, takePhoto, removeImage, clearAllImages } = useImagePicker(imageQuality);
   
    // const { selectedImages, pickImages, takePhoto, removeImage, clearAllImages } = useImagePicker();   
    const [savedItems, setSavedItems] = useState<any[]>([]);

    const carType = ['5L', '3L', 'Dolphin','Aynamaw', 'Abadula','2L','2LT','High Roof','Other'];
    const conditionOptions = ['new', 'dubai'];
    const partOptions = ['Motor', 'Leg', 'Body', 'sensors', 'Meri', 'Hose', 'Other'];

    // Initialize database and load saved items on component mount
    useEffect(() => {
        initDatabase();
        loadSavedItems();
        loadImageQualitySetting();

    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSavedItems(); // Refresh when tab comes into focus
        }, [])
    );

    // Load image quality setting from storage
    const loadImageQualitySetting = async () => {
        try {
            const storedQuality = await AsyncStorage.getItem(IMAGE_QUALITY_KEY);
            if (storedQuality) {
                setImageQuality(storedQuality as ImageQuality);
            }
        } catch (error) {
            console.error('Error loading image quality setting:', error);
        }
    };

    // Update image quality setting
    const updateImageQuality = async (quality: ImageQuality) => {
        try {
            setImageQuality(quality);
            await AsyncStorage.setItem(IMAGE_QUALITY_KEY, quality);
            console.log('Image quality updated to:', quality);
        } catch (error) {
            console.error('Error saving image quality setting:', error);
        }
    };

    // NEW: Get counts by engine type/model
    const getCountsByEngineType = () => {
        try {
            const products: any[] = db.getAllSync('SELECT size, COUNT(*) as count FROM products GROUP BY size');
            
            // Convert to object for easy access
            const counts: { [key: string]: number } = {};
            carType.forEach(type => {
                counts[type] = 0; // Initialize all types to 0
            });
            
            products.forEach(item => {
                if (item.size && counts.hasOwnProperty(item.size)) {
                    counts[item.size] = item.count;
                }
            });
            
            return counts;
        } catch (error) {
            console.error('Error getting counts by engine type:', error);
            return {};
        }
    };

    // NEW: Get counts by part type for a specific engine type
    const getPartCountsByEngineType = (engineType: string) => {
        try {
            const products: any[] = db.getAllSync(
                'SELECT part, COUNT(*) as count FROM products WHERE size = ? GROUP BY part',
                [engineType]
            );
            
            const counts: { [key: string]: number } = {};
            partOptions.forEach(part => {
                counts[part] = 0; // Initialize all parts to 0
            });
            
            products.forEach(item => {
                if (item.part && counts.hasOwnProperty(item.part)) {
                    counts[item.part] = item.count;
                }
            });
            
            return counts;
        } catch (error) {
            console.error('Error getting part counts by engine type:', error);
            return {};
        }
    };

    // NEW: Get detailed statistics
    const getEngineTypeStatistics = () => {
        try {
            // Get total counts by engine type
            const engineCounts = getCountsByEngineType();
            
            // Get total product count
            const totalResult: any[] = db.getAllSync('SELECT COUNT(*) as total FROM products');
            const totalProducts = totalResult[0]?.total || 0;
            
            // Get part distribution across all engine types
            const partDistribution: any[] = db.getAllSync(
                'SELECT part, COUNT(*) as count FROM products GROUP BY part'
            );
            
            const partCounts: { [key: string]: number } = {};
            partDistribution.forEach(item => {
                if (item.part) {
                    partCounts[item.part] = item.count;
                }
            });
            
            return {
                totalProducts,
                byEngineType: engineCounts,
                byPartType: partCounts,
                engineTypes: carType.map(type => ({
                    name: type,
                    count: engineCounts[type] || 0,
                    partBreakdown: getPartCountsByEngineType(type)
                }))
            };
        } catch (error) {
            console.error('Error getting engine type statistics:', error);
            return {
                totalProducts: 0,
                byEngineType: {},
                byPartType: {},
                engineTypes: []
            };
        }
    };

    // NEW: Get products by specific engine type
    const getProductsByEngineType = (engineType: string) => {
        try {
            const products: any[] = db.getAllSync(
                'SELECT * FROM products WHERE size = ? ORDER BY timestamp DESC',
                [engineType]
            );
            
            // Convert image_paths string back to array
            return products.map(product => ({
                ...product,
                imageUris: product.image_paths ? JSON.parse(product.image_paths) : [],
            }));
        } catch (error) {
            console.error('Error getting products by engine type:', error);
            return [];
        }
    };

    // NEW: Get summary for dashboard
    const getDashboardSummary = () => {
        const stats = getEngineTypeStatistics();
        
        // Find top 3 engine types by count
        const topEngineTypes = carType
            .map(type => ({
                name: type,
                count: stats.byEngineType[type] || 0
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        // Find top 3 parts by count
        const topParts = Object.entries(stats.byPartType)
            .map(([part, count]) => ({ part, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        return {
            totalProducts: stats.totalProducts,
            topEngineTypes,
            topParts,
            totalEngineTypes: carType.length,
            registeredEngineTypes: Object.values(stats.byEngineType).filter(count => count > 0).length
        };
    };

    // Save images to file system and return their paths
    const saveImagesToFileSystem = async (imageUris: string[]): Promise<string[]> => {
        const savedPaths: string[] = [];
        
        try {
            const imagesDir = FileSystem.documentDirectory + 'product_images/';
            
            // Create directory using new API
            const dirInfo = await FileSystem.getInfoAsync(imagesDir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
            }
            
            for (const imageUri of imageUris) {
                const fileName = `product_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
                const newImagePath = imagesDir + fileName;
                
                // Copy image to app directory
                await FileSystem.copyAsync({
                    from: imageUri,
                    to: newImagePath
                });
                
                savedPaths.push(newImagePath);
            }
        } catch (error) {
            console.error('Error saving images:', error);
            throw error;
        }
        
        return savedPaths;
    };

    // Load saved items from database
    const loadSavedItems = async () => {
        try {
            const products:any = db.getAllSync('SELECT * FROM products ORDER BY timestamp DESC');
            
            // Convert image_paths string back to array
            const itemsWithImages = products.map(product => ({
                ...product,
                imageUris: product.image_paths ? JSON.parse(product.image_paths) : [],
            }));
            
            setSavedItems(itemsWithImages);
            console.log(`Loaded ${itemsWithImages.length} products from database`);
        } catch (error) {
            console.error('Error loading saved items:', error);
        }
    };

    // Delete item from database
    const deleteItem = async (itemId: string) => {
        try {
            db.runSync('DELETE FROM products WHERE id = ?', [itemId]);
            await loadSavedItems(); // Reload the list
            return true;
        } catch (error) {
            console.error('Error deleting item:', error);
            return false;
        }
    };

    // Update item in database
    const updateItem = async (itemId: string, updatedData: any) => {
        try {
            let imagePaths = updatedData.imageUris;
            if (updatedData.imageUris && updatedData.imageUris.length > 0) {
                const hasNewImages = updatedData.imageUris.some((uri: string) => uri.startsWith('file://'));
                if (hasNewImages) {
                    imagePaths = await saveImagesToFileSystem(updatedData.imageUris);
                }
            }

            db.runSync(
                `UPDATE products SET 
                 name = ?, description = ?, price = ?, size = ?, 
                 condition = ?, part = ?, image_paths = ? 
                 WHERE id = ?`,
                [
                    updatedData.name,
                    updatedData.description,
                    updatedData.price,
                    updatedData.size,
                    updatedData.condition,
                    updatedData.part,
                    JSON.stringify(imagePaths),
                    itemId
                ]
            );
            
            await loadSavedItems();
            return true;
        } catch (error) {
            console.error('Error updating item:', error);
            return false;
        }
    };

    // Save form data to database
    const saveFormData = async () => {
        try {
            if (selectedImages.length === 0) {
                console.log('No images to save');
                return false;
            }

            // Save images to file system first
            const savedImagePaths = await saveImagesToFileSystem(selectedImages);
            
            const formData = getFormData();
            const timestamp = new Date().toISOString();

            // Insert into database
            const result = db.runSync(
                `INSERT INTO products 
                 (name, description, price, size, condition, part, image_paths, timestamp) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    formData.name,
                    formData.description,
                    formData.price,
                    formData.size,
                    formData.condition,
                    formData.part,
                    JSON.stringify(savedImagePaths),
                    timestamp
                ]
            );

            console.log('Product saved with ID:', result.lastInsertRowId);
            await loadSavedItems();
            clearForm();
            return true;
        } catch (error) {
            console.error('Error saving form data:', error);
            return false;
        }
    };

    // Clear form
    const clearForm = () => {
        setSelectedSize(null);
        setSelectedCondition(null);
        setSelectedPart(null);
        setDescription('');
        setName('');
        setPrice('');
        clearAllImages();
    };

    // Clear all saved items from database
    const clearAllSavedItems = async () => {
        try {
            db.runSync('DELETE FROM products');
            setSavedItems([]);
            
            // Optional: Also delete image files
            try {
                const imagesDir = FileSystem.documentDirectory + 'product_images/';
                await FileSystem.deleteAsync(imagesDir, { idempotent: true });
            } catch (imageError) {
                console.log('Error deleting images directory:', imageError);
            }
            
            return true;
        } catch (error) {
            console.error('Error clearing saved items:', error);
            return false;
        }
    };

    // Get form data
    const getFormData = () => ({
        size: selectedSize,
        condition: selectedCondition,
        part: selectedPart,
        description,
        name,
        price,
        imageUris: selectedImages
    });

    // Add this function to get storage info
    const getImageStorageInfo = async () => {
        try {
            const imagesDir = FileSystem.documentDirectory + 'product_images/';
            const dirInfo = await FileSystem.getInfoAsync(imagesDir);
            
            let files: string[] = [];
            let totalSize = 0;
            
            if (dirInfo.exists) {
                files = await FileSystem.readDirectoryAsync(imagesDir);
                
                for (const file of files) {
                    const fileInfo = await FileSystem.getInfoAsync(imagesDir + file);
                    if (fileInfo.exists && fileInfo.size) {
                        totalSize += fileInfo.size;
                    }
                }
            }
            
            return {
                directory: imagesDir,
                exists: dirInfo.exists,
                fileCount: files.length,
                files: files,
                totalSize: totalSize,
                totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2) + ' MB'
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    };

    return {
        getImageStorageInfo,
        imageQuality, 
        updateImageQuality,
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
        clearAllSavedItems,
        getFormData,
        loadSavedItems,
        deleteItem,
        updateItem,
        // NEW: Add the counting functions
        getCountsByEngineType,
        getPartCountsByEngineType,
        getEngineTypeStatistics,
        getProductsByEngineType,
        getDashboardSummary,
    };
};