import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const DataExportManager = () => {
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    loadLocalData();
  }, []);

  // Load your actual data from local storage
  const loadLocalData = async () => {
    try {
      // Replace 'your-storage-key' with your actual AsyncStorage key
      const storedData = await AsyncStorage.getItem('your-storage-key');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setLocalData(parsedData);
        console.log('Loaded data:', parsedData.length, 'items');
      } else {
        console.log('No data found in local storage');
        // If no data found, use the sample data you provided for testing
        setLocalData([
          {
            "condition": "", 
            "description": "", 
            "id": "1760476909180", 
            "imageUris": ["file:///data/user/0/host.exp.exponent/cache/ImagePicker/ecfb1460-0b00-44cb-b8d2-1797a178b743.jpeg"], 
            "name": "Gg", 
            "part": "", 
            "price": "", 
            "size": "", 
            "timestamp": "2025-10-14T21:21:49.180Z"
          }, 
          {
            "condition": "dubai", 
            "description": "Desc", 
            "id": "1760551231391", 
            "imageUris": [], 
            "name": "Nam", 
            "part": "Motor", 
            "price": "4500", 
            "size": "5L", 
            "timestamp": "2025-10-15T18:00:31.391Z"
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading local data:', error);
    }
  };

  // Export JSON data to device storage
  const exportDataToDevice = async () => {
    if (!localData || localData.length === 0) {
      Alert.alert('No Data', 'There is no data to export');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare export data with metadata
      const exportData = {
        exportedData: localData,
        exportInfo: {
          totalItems: localData.length,
          exportDate: new Date().toISOString(),
          itemsWithImages: localData.filter(item => item.imageUris && item.imageUris.length > 0).length,
          appVersion: '1.0.0'
        }
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const fileName = `car_parts_export_${Date.now()}.json`;
      
      // Use Storage Access Framework for Android
      await saveFileWithSAF(jsonString, fileName);
      
      // Add to export history
      const newExport = {
        fileName: fileName,
        itemCount: localData.length,
        exportDate: new Date().toISOString(),
        data: exportData
      };
      
      setExportHistory(prev => [newExport, ...prev]);
      
    } catch (error) {
      console.error('Export failed:', error);
      Alert.alert('❌ Export Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Export data including images (creates a zip-like structure)
  const exportDataWithImages = async () => {
    if (!localData || localData.length === 0) {
      Alert.alert('No Data', 'There is no data to export');
      return;
    }

    try {
      setLoading(true);
      
      // Create a folder for this export
      const folderName = `car_parts_export_${Date.now()}`;
      
      // Request storage permissions
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('Permission Denied', 'Storage permission is needed to export files');
        return;
      }

      // Create the main folder
      const folderUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        folderName,
        'application/json' // This will create a folder-like structure
      );

      // Export the JSON data
      const jsonData = {
        exportedData: localData,
        exportInfo: {
          totalItems: localData.length,
          exportDate: new Date().toISOString(),
          itemsWithImages: localData.filter(item => item.imageUris && item.imageUris.length > 0).length,
          appVersion: '1.0.0'
        }
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      const jsonFileName = `${folderName}/data.json`;
      
      const jsonFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        jsonFileName,
        'application/json'
      );

      await FileSystem.writeAsStringAsync(jsonFileUri, jsonString, { 
        encoding: FileSystem.EncodingType.UTF8 
      });

      // Export images if they exist
      let exportedImages = 0;
      for (const item of localData) {
        if (item.imageUris && item.imageUris.length > 0) {
          for (let i = 0; i < item.imageUris.length; i++) {
            const imageUri = item.imageUris[i];
            const imageName = `images/${item.id}_${i}.jpg`;
            
            try {
              // Read the image file as base64
              const base64Data = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64
              });

              // Create the image file
              const imageFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                `${folderName}/${imageName}`,
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
        `Exported ${localData.length} items with ${exportedImages} images to folder: ${folderName}`
      );

      // Add to export history
      const newExport = {
        fileName: folderName,
        itemCount: localData.length,
        imageCount: exportedImages,
        exportDate: new Date().toISOString(),
        data: jsonData
      };
      
      setExportHistory(prev => [newExport, ...prev]);
      
    } catch (error) {
      console.error('Export with images failed:', error);
      Alert.alert('❌ Export Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save file using Storage Access Framework
  const saveFileWithSAF = async (fileContent, fileName) => {
    try {
      // Request storage permissions
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('Permission Denied', 'Storage permission is needed to save files');
        return;
      }

      // Create the file in the selected directory
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
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
    if (!localData || localData.length === 0) {
      return null;
    }

    const itemsWithImages = localData.filter(item => item.imageUris && item.imageUris.length > 0).length;
    const totalImages = localData.reduce((sum, item) => sum + (item.imageUris ? item.imageUris.length : 0), 0);

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>📊 Data Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>📝 Total Items: {localData.length}</Text>
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
          {localData.slice(0, 2).map((item, index) => (
            <View key={item.id || index} style={styles.itemPreview}>
              <Text style={styles.itemName}>🚗 {item.name || 'Unnamed'}</Text>
              <Text style={styles.itemDetail}>🔧 Part: {item.part || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>💰 Price: {item.price || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>📏 Size: {item.size || 'Not specified'}</Text>
              <Text style={styles.itemDetail}>🖼️ Images: {item.imageUris ? item.imageUris.length : 0}</Text>
            </View>
          ))}
          {localData.length > 2 && (
            <Text style={styles.moreItems}>... and {localData.length - 2} more items</Text>
          )}
        </View>
      </View>
    );
  };



  return (
    <ScrollView style={styles.container}>
      {/* Data Summary */}
      {renderDataSummary()}

      {/* Export Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📤 Export Options</Text>
        
        <Button 
          title="💾 EXPORT JSON DATA ONLY" 
          onPress={exportDataToDevice} 
          disabled={loading || !localData.length}
        />
        
        <View style={styles.buttonSpacer} />
        
        <Button 
          title="📦 EXPORT DATA + IMAGES" 
          onPress={exportDataWithImages} 
          disabled={loading || !localData.length}
          color="#4CAF50"
        />
        
        <Text style={styles.helpText}>
          💡 JSON Only: Exports all data as a single JSON file{'\n'}
          📦 Data + Images: Creates a folder with JSON data and all images
        </Text>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Exporting data...</Text>
        </View>
      )}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#666'
  },
  previewSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  itemPreview: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3'
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  itemDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2
  },
  moreItems: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  buttonSpacer: {
    height: 10
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    lineHeight: 16
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  exportItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50'
  },
  exportFileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  exportDetails: {
    fontSize: 12,
    color: '#666'
  },
  placeholder: {
    alignItems: 'center',
    padding: 20
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22
  }
});

export default DataExportManager;