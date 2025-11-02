

// import * as FileSystem from 'expo-file-system/legacy';
// import * as SQLite from 'expo-sqlite';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
// const { StorageAccessFramework } = FileSystem;

// // Open database
// const db = SQLite.openDatabaseSync('products.db');

// const DataExportManager = () => {
//   const [databaseData, setDatabaseData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Load data from SQLite database on component mount
//   useEffect(() => {
//     loadDatabaseData();
//   }, []);

//   // Load data from SQLite database
//   const loadDatabaseData = async () => {
//     try {
//       const products: any[] = db.getAllSync('SELECT * FROM products ORDER BY timestamp DESC');
      
//       // Convert image_paths string back to array and transform to match your expected structure
//       const transformedData = products.map(product => ({
//         id: product.id.toString(),
//         name: product.name || '',
//         description: product.description || '',
//         price: product.price || '',
//         size: product.size || '',
//         condition: product.condition || '',
//         part: product.part || '',
//         imageUris: product.image_paths ? JSON.parse(product.image_paths) : [],
//         timestamp: product.timestamp
//       }));
      
//       setDatabaseData(transformedData);
//       console.log('Loaded data from database:', transformedData.length, 'items');
//     } catch (error) {
//       console.error('Error loading database data:', error);
//       Alert.alert('Error', 'Failed to load data from database');
//     }
//   };

//   // Export JSON data to device storage
//   const exportDataToDevice = async () => {
//     if (!databaseData || databaseData.length === 0) {
//       Alert.alert('No Data', 'There is no data to export');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Prepare export data with metadata
//       const exportData = {
//         exportedData: databaseData,
//         exportInfo: {
//           totalItems: databaseData.length,
//           exportDate: new Date().toISOString(),
//           itemsWithImages: databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length,
//           appVersion: '1.0.0',
//           source: 'SQLite Database'
//         }
//       };

//       const jsonString = JSON.stringify(exportData, null, 2);
//       const fileName = `car_parts_db_export.json`;
      
//       // Use Storage Access Framework for Android
//       await saveFileWithSAF(jsonString, fileName);
      
//       // Add to export history
//       const newExport = {
//         fileName: fileName,
//         itemCount: databaseData.length,
//         exportDate: new Date().toISOString(),
//         data: exportData
//       };
      
      
//     } catch (error:any) {
//       console.error('Export failed:', error);
//       Alert.alert('❌ Export Failed', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Export data including images (creates a zip-like structure)
//   const exportDataWithImages = async () => {
//     if (!databaseData || databaseData.length === 0) {
//       Alert.alert('No Data', 'There is no data to export');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Create a folder for this export
//       const folderName = `car_parts_db_export`;
      
//       // Request storage permissions
//       const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      
//       if (!permissions.granted) {
//         Alert.alert('Permission Denied', 'Storage permission is needed to export files');
//         return;
//       }

//       // Export the JSON data
//       const jsonData = {
//         exportedData: databaseData,
//         exportInfo: {
//           totalItems: databaseData.length,
//           exportDate: new Date().toISOString(),
//           itemsWithImages: databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length,
//           appVersion: '1.0.0',
//           source: 'SQLite Database'
//         }
//       };

//       const jsonString = JSON.stringify(jsonData, null, 2);
//       const jsonFileName = `${folderName}/data.json`;
      
//       const jsonFileUri = await StorageAccessFramework.createFileAsync(
//         permissions.directoryUri,
//         jsonFileName,
//         'application/json'
//       );

//       await FileSystem.writeAsStringAsync(jsonFileUri, jsonString, { 
//         encoding: FileSystem.EncodingType.UTF8 
//       });

//       // Export images if they exist
//       let exportedImages = 0;
//       for (const item of databaseData) {
//         if (item.imageUris && item.imageUris.length > 0) {
//           for (let i = 0; i < item.imageUris.length; i++) {
//             const imageUri = item.imageUris[i];
//             const imageName = `${item.name}_${i}.jpg`;
            
//             try {
//               // Check if image file exists
//               const imageInfo = await FileSystem.getInfoAsync(imageUri);
//               if (!imageInfo.exists) {
//                 console.warn(`Image file not found: ${imageUri}`);
//                 continue;
//               }

//               // Read the image file as base64
//               const base64Data = await FileSystem.readAsStringAsync(imageUri, {
//                 encoding: FileSystem.EncodingType.Base64
//               });

//               // Create the image file
//               const imageFileUri = await StorageAccessFramework.createFileAsync(
//                 permissions.directoryUri,
//                 `${item.size}/${imageName}`,
//                 'image/jpeg'
//               );

//               // Write the image data
//               await FileSystem.writeAsStringAsync(imageFileUri, base64Data, {
//                 encoding: FileSystem.EncodingType.Base64
//               });

//               exportedImages++;
//             } catch (imageError) {
//               console.error(`Failed to export image ${imageUri}:`, imageError);
//             }
//           }
//         }
//       }

//       Alert.alert(
//         '✅ Export Complete', 
//         `Exported ${databaseData.length} items with ${exportedImages} images to folder: ${folderName}`
//       );

//       // Add to export history
//       const newExport = {
//         fileName: folderName,
//         itemCount: databaseData.length,
//         imageCount: exportedImages,
//         exportDate: new Date().toISOString(),
//         data: jsonData
//       };
      
      
//     } catch (error:any) {
//       console.error('Export with images failed:', error);
//       Alert.alert('❌ Export Failed', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save file using Storage Access Framework
//   const saveFileWithSAF = async (fileContent: string, fileName: string) => {
//     try {
//       // Request storage permissions
//       const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      
//       if (!permissions.granted) {
//         Alert.alert('Permission Denied', 'Storage permission is needed to save files');
//         return;
//       }

//       // Create the file in the selected directory
//       const fileUri = await StorageAccessFramework.createFileAsync(
//         permissions.directoryUri,
//         fileName,
//         'application/json'
//       );

//       // Write content to the file with proper encoding
//       await FileSystem.writeAsStringAsync(fileUri, fileContent, { 
//         encoding: FileSystem.EncodingType.UTF8 
//       });

//       Alert.alert('✅ Success', `Data exported as: ${fileName}`);
      
//     } catch (error) {
//       console.error('SAF Save failed:', error);
//       throw error;
//     }
//   };

//   // Display data summary
//   const renderDataSummary = () => {
//     if (!databaseData || databaseData.length === 0) {
//       return (
//         <View style={styles.summaryContainer}>
//           <Text style={styles.sectionTitle}>📊 Data Summary</Text>
//           <Text style={styles.noDataText}>No data found in database</Text>
//         </View>
//       );
//     }

//     const itemsWithImages = databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length;
//     const totalImages = databaseData.reduce((sum, item) => sum + (item.imageUris ? item.imageUris.length : 0), 0);

//     return (
//       <View style={styles.summaryContainer}>
//         <Text style={styles.sectionTitle}>📊 Data Summary (SQLite)</Text>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryText}>📝 Total Items: {databaseData.length}</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryText}>🖼️ Items with Images: {itemsWithImages}</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text style={styles.summaryText}>📸 Total Images: {totalImages}</Text>
//         </View>
        
//         {/* Sample of first few items */}
//         <View style={styles.previewSection}>
//           <Text style={styles.previewTitle}>Preview (First 2 items):</Text>
//           {databaseData.slice(0, 2).map((item, index) => (
//             <View key={item.id || index} style={styles.itemPreview}>
//               <Text style={styles.itemName}>🚗 {item.name || 'Unnamed'}</Text>
//               <Text style={styles.itemDetail}>🔧 Part: {item.part || 'Not specified'}</Text>
//               <Text style={styles.itemDetail}>💰 Price: {item.price || 'Not specified'}</Text>
//               <Text style={styles.itemDetail}>📏 Size: {item.size || 'Not specified'}</Text>
//               <Text style={styles.itemDetail}>🖼️ Images: {item.imageUris ? item.imageUris.length : 0}</Text>
//             </View>
//           ))}
//           {databaseData.length > 2 && (
//             <Text style={styles.moreItems}>... and {databaseData.length - 2} more items</Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // Refresh data from database
//   const handleRefreshData = () => {
//     loadDatabaseData();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Refresh Button */}
//       <View style={styles.section}>
//         <Button 
//           title="🔄 Refresh Data" 
//           onPress={handleRefreshData}
//           color="#666"
//         />
//       </View>

//       {/* Data Summary */}
//       {renderDataSummary()}

//       {/* Export Buttons */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📤 Export Options</Text>
        
//         <Button 
//           title="💾 EXPORT JSON DATA ONLY" 
//           onPress={exportDataToDevice} 
//           disabled={loading || !databaseData.length}
//         />
        
//         <View style={styles.buttonSpacer} />
        
//         <Button 
//           title="📦 EXPORT DATA + IMAGES" 
//           onPress={exportDataWithImages} 
//           disabled={loading || !databaseData.length}
//           color="#4CAF50"
//         />
        
//         <Text style={styles.helpText}>
//           💡 JSON Only: Exports all data as a single JSON file{'\n'}
//           📦 Data + Images: Creates a folder with JSON data and all images
//         </Text>
//       </View>

//       {/* Loading Indicator */}
//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text style={styles.loadingText}>Exporting data...</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   section: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   summaryContainer: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   summaryText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   previewSection: {
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   previewTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   itemPreview: {
//     backgroundColor: '#f9f9f9',
//     padding: 12,
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   itemDetail: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 2,
//   },
//   moreItems: {
//     fontSize: 12,
//     fontStyle: 'italic',
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   noDataText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   buttonSpacer: {
//     height: 12,
//   },
//   helpText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 12,
//     lineHeight: 16,
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default DataExportManager;

import * as FileSystem from 'expo-file-system/legacy';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from './colors'; // Import your color palette

const { StorageAccessFramework } = FileSystem;

// Open database
const db = SQLite.openDatabaseSync('products.db');

const DataExportManager = () => {
  const [databaseData, setDatabaseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data from SQLite database on component mount
  useEffect(() => {
    loadDatabaseData();
  }, []);

  // Load data from SQLite database
  const loadDatabaseData = async () => {
    try {
      const products: any[] = db.getAllSync('SELECT * FROM products ORDER BY timestamp DESC');
      
      // Convert image_paths string back to array and transform to match your expected structure
      const transformedData = products.map(product => ({
        id: product.id.toString(),
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        size: product.size || '',
        condition: product.condition || '',
        part: product.part || '',
        imageUris: product.image_paths ? JSON.parse(product.image_paths) : [],
        timestamp: product.timestamp
      }));
      
      setDatabaseData(transformedData);
      console.log('Loaded data from database:', transformedData.length, 'items');
    } catch (error) {
      console.error('Error loading database data:', error);
      Alert.alert('Error', 'Failed to load data from database');
    }
  };

  // Export JSON data to device storage
  const exportDataToDevice = async () => {
    if (!databaseData || databaseData.length === 0) {
      Alert.alert('No Data', 'There is no data to export');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare export data with metadata
      const exportData = {
        exportedData: databaseData,
        exportInfo: {
          totalItems: databaseData.length,
          exportDate: new Date().toISOString(),
          itemsWithImages: databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length,
          appVersion: '1.0.0',
          source: 'SQLite Database'
        }
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const fileName = `car_parts_db_export.json`;
      
      // Use Storage Access Framework for Android
      await saveFileWithSAF(jsonString, fileName);
      
      // Add to export history
      const newExport = {
        fileName: fileName,
        itemCount: databaseData.length,
        exportDate: new Date().toISOString(),
        data: exportData
      };
      
      
    } catch (error:any) {
      console.error('Export failed:', error);
      Alert.alert('❌ Export Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Export data including images (creates a zip-like structure)
  const exportDataWithImages = async () => {
    if (!databaseData || databaseData.length === 0) {
      Alert.alert('No Data', 'There is no data to export');
      return;
    }

    try {
      setLoading(true);
      
      // Create a folder for this export
      const folderName = `car_parts_db_export`;
      
      // Request storage permissions
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('Permission Denied', 'Storage permission is needed to export files');
        return;
      }

      // Export the JSON data
      const jsonData = {
        exportedData: databaseData,
        exportInfo: {
          totalItems: databaseData.length,
          exportDate: new Date().toISOString(),
          itemsWithImages: databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length,
          appVersion: '1.0.0',
          source: 'SQLite Database'
        }
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      const jsonFileName = `${folderName}/data.json`;
      
      const jsonFileUri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        jsonFileName,
        'application/json'
      );

      await FileSystem.writeAsStringAsync(jsonFileUri, jsonString, { 
        encoding: FileSystem.EncodingType.UTF8 
      });

      // Export images if they exist
      let exportedImages = 0;
      for (const item of databaseData) {
        if (item.imageUris && item.imageUris.length > 0) {
          for (let i = 0; i < item.imageUris.length; i++) {
            const imageUri = item.imageUris[i];
            const imageName = `${item.name}_${i}.jpg`;
            
            try {
              // Check if image file exists
              const imageInfo = await FileSystem.getInfoAsync(imageUri);
              if (!imageInfo.exists) {
                console.warn(`Image file not found: ${imageUri}`);
                continue;
              }

              // Read the image file as base64
              const base64Data = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64
              });

              // Create the image file
              const imageFileUri = await StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                `${item.size}/${imageName}`,
                'image/jpeg'
              );

              // Write the image data
              await FileSystem.writeAsStringAsync(imageFileUri, base64Data, {
                encoding: FileSystem.EncodingType.Base64
              });

              exportedImages++;
            } catch (imageError) {
              console.error(`Failed to export image ${imageUri}:`, imageError);
            }
          }
        }
      }

      Alert.alert(
        '✅ Export Complete', 
        `Exported ${databaseData.length} items with ${exportedImages} images to folder: ${folderName}`
      );

      // Add to export history
      const newExport = {
        fileName: folderName,
        itemCount: databaseData.length,
        imageCount: exportedImages,
        exportDate: new Date().toISOString(),
        data: jsonData
      };
      
      
    } catch (error:any) {
      console.error('Export with images failed:', error);
      Alert.alert('❌ Export Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save file using Storage Access Framework
  const saveFileWithSAF = async (fileContent: string, fileName: string) => {
    try {
      // Request storage permissions
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('Permission Denied', 'Storage permission is needed to save files');
        return;
      }

      // Create the file in the selected directory
      const fileUri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/json'
      );

      // Write content to the file with proper encoding
      await FileSystem.writeAsStringAsync(fileUri, fileContent, { 
        encoding: FileSystem.EncodingType.UTF8 
      });

      Alert.alert('✅ Success', `Data exported as: ${fileName}`);
      
    } catch (error) {
      console.error('SAF Save failed:', error);
      throw error;
    }
  };

  // Display data summary
  const renderDataSummary = () => {
    if (!databaseData || databaseData.length === 0) {
      return (
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>📊 Data Summary</Text>
          <Text style={styles.noDataText}>No data found in database</Text>
        </View>
      );
    }

    const itemsWithImages = databaseData.filter(item => item.imageUris && item.imageUris.length > 0).length;
    const totalImages = databaseData.reduce((sum, item) => sum + (item.imageUris ? item.imageUris.length : 0), 0);

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>📊 Data Summary (SQLite)</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>📝 Total Items: {databaseData.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>🖼️ Items with Images: {itemsWithImages}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>📸 Total Images: {totalImages}</Text>
        </View>
        
        {/* Sample of first few items */}
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>Preview (First 2 items):</Text>
          {databaseData.slice(0, 2).map((item, index) => (
            <View key={item.id || index} style={styles.itemPreview}>
              <Text style={styles.itemName}>🚗 {item.name || 'Unnamed'}</Text>
              <Text style={styles.itemDetail}>🔧 Part: {item.part || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>💰 Price: {item.price || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>📏 Size: {item.size || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>🖼️ Images: {item.imageUris ? item.imageUris.length : 0}</Text>
            </View>
          ))}
          {databaseData.length > 2 && (
            <Text style={styles.moreItems}>... and {databaseData.length - 2} more items</Text>
          )}
        </View>
      </View>
    );
  };

  // Refresh data from database
  const handleRefreshData = () => {
    loadDatabaseData();
  };

  // Custom Button Component with Theme
  const ThemedButton = ({ title, onPress, disabled, color = 'secondary', style = {} }: any) => (
    <View style={[styles.themedButton, styles[`${color}Button`], style]}>
      <Button 
        title={title} 
        onPress={onPress}
        disabled={disabled}
        color={Colors.text.primary}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Refresh Button */}
      <View style={styles.section}>
        <ThemedButton 
          title="🔄 Refresh Data" 
          onPress={handleRefreshData}
          color="secondary"
        />
      </View>

      {/* Data Summary */}
      {renderDataSummary()}

      {/* Export Buttons */}
      <View style={[styles.section,{marginBottom:40}]}>
        <Text style={styles.sectionTitle}>📤 Export Options</Text>
        
        <ThemedButton 
          title="💾 EXPORT JSON DATA ONLY" 
          onPress={exportDataToDevice} 
          disabled={loading || !databaseData.length}
          color="primary"
        />
        
        <View style={styles.buttonSpacer} />
        
        <ThemedButton 
          title="📦 EXPORT DATA + IMAGES" 
          onPress={exportDataWithImages} 
          disabled={loading || !databaseData.length}
          color="success"
        />
        
        <Text style={styles.helpText}>
          💡 JSON Only: Exports all data as a single JSON file{'\n'}
          📦 Data + Images: Creates a folder with JSON data and all images
        </Text>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary[500]} />
          <Text style={styles.loadingText}>Exporting data...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.primary,
    
  },
  section: {
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
    shadowColor: Colors.text.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text.primary,
  },
  summaryContainer: {
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  previewSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.medium,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.text.primary,
  },
  itemPreview: {
    backgroundColor: Colors.background.tertiary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.text.primary,
  },
  itemDetail: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: 8,
  },
  noDataText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  buttonSpacer: {
    height: 12,
  },
  helpText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background.secondary,
    margin: 16,
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  // Themed Button Styles
  themedButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: Colors.button.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.button.secondary,
  },
  successButton: {
    backgroundColor: Colors.status.success,
  },
  dangerButton: {
    backgroundColor: Colors.status.error,
  },
  goldButton: {
    backgroundColor: Colors.button.gold,
  },
});

export default DataExportManager;