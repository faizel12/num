import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const JsonManager = () => {
  const [importedData, setImportedData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [storedItems, setStoredItems] = useState([]);
  const [showDataPreview, setShowDataPreview] = useState(false);

  // Load stored items on component mount
  useEffect(() => {
    loadStoredItems();
  }, []);

  const loadStoredItems = async () => {
    try {
      const items = await AsyncStorage.getItem('product_form_data');
      if (items) {
        const parsedItems = JSON.parse(items);
        setStoredItems(parsedItems);
        console.log('Loaded items:', parsedItems.length);
      }
    } catch (error) {
      console.error('Error loading stored items:', error);
    }
  };

  // Export JSON to device storage
  const handleExport = async () => {
    try {
      setLoading(true);
      
      if (!storedItems || storedItems.length === 0) {
        Alert.alert('No Data', 'There is no data to export');
        return;
      }

      const exportData = {
        products: storedItems,
        exportInfo: {
          totalItems: storedItems.length,
          exportDate: new Date().toISOString(),
          appVersion: '1.0.0'
        }
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const fileName = `car_parts_${Date.now()}.json`;
      
      await saveFileWithSAF(jsonString, fileName);
      
    } catch (error: any) {
      console.error('Export failed:', error);
      Alert.alert('Export Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save file using Storage Access Framework (Android)
  const saveFileWithSAF = async (fileContent: any, fileName: any) => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      
      if (!permissions.granted) {
        Alert.alert('Permission Required', 'Storage access is needed to save your data');
        return;
      }

      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/json'
      );

      await FileSystem.writeAsStringAsync(fileUri, fileContent, { 
        encoding: FileSystem.EncodingType.UTF8 
      });

      Alert.alert('Success', `Data exported successfully!\n\nFile: ${fileName}`);
      
    } catch (error: any) {
      console.error('SAF Save failed:', error);
      Alert.alert('Save Failed', error.message);
    }
  };

  // Import JSON from device storage
  const handleImport = async () => {
    try {
      setLoading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
        multiple: false
      });

      console.log('Picker result:', result);

      if (result.canceled) {
        console.log('User cancelled file selection');
        return;
      }

      const file = result.assets[0];
      
      if (file) {
        console.log('File selected:', file.uri, 'Size:', file.size);
        
        const fileContent = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.UTF8
        });
        
        console.log('File content length:', fileContent.length);
        
        const jsonData = JSON.parse(fileContent);
        
        setImportedData(jsonData);
        setFileName(file.name);
        
        Alert.alert('Success', 'File imported successfully!');
      }
      
    } catch (error: any) {
      console.error('Import failed:', error);
      if (error.message.includes('cancel')) {
        console.log('User cancelled the operation');
      } else {
        Alert.alert('Import Failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Apply imported data to replace current data
  const applyImportedData = async () => {
    try {
      if (!importedData) {
        Alert.alert('No Data', 'No imported data to apply');
        return;
      }

      // Check if the imported data has the expected structure
      const products = importedData.products || importedData;
      
      if (!Array.isArray(products)) {
        Alert.alert('Invalid Data', 'The imported file does not contain valid product data');
        return;
      }

      await AsyncStorage.setItem('product_form_data', JSON.stringify(products));
      setStoredItems(products);
      setImportedData(null);
      
      Alert.alert('Success', `Applied ${products.length} products to your data`);
      
    } catch (error: any) {
      console.error('Apply data failed:', error);
      Alert.alert('Apply Failed', error.message);
    }
  };

  // Display imported data
  const renderImportedData = () => {
    if (!importedData) return null;

    const products = importedData.products || importedData;
    const productCount = Array.isArray(products) ? products.length : 0;

    return (
      <View style={styles.dataContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📁 Imported Data</Text>
          <Text style={styles.fileName}>{fileName}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{productCount}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          {importedData.exportInfo && (
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {new Date(importedData.exportInfo.exportDate).toLocaleDateString()}
              </Text>
              <Text style={styles.statLabel}>Exported</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.applyButton]}
            onPress={applyImportedData}
          >
            <Text style={styles.buttonText}>Apply to App</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.previewButton]}
            onPress={() => setShowDataPreview(true)}
          >
            <Text style={styles.buttonText}>Preview Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Data preview modal
  const renderDataPreview = () => {
    if (!importedData) return null;

    const products = importedData.products || importedData;

    return (
      <Modal
        visible={showDataPreview}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Data Preview</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowDataPreview(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.rawJson}>
              {JSON.stringify(importedData, null, 2)}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  // Current data summary
  const renderCurrentData = () => {
    if (storedItems.length === 0) return null;

    return (
      <View style={styles.currentDataContainer}>
        <Text style={styles.sectionTitle}>📊 Your Current Data</Text>
        <View style={styles.dataStats}>
          <Text style={styles.dataStatText}>
            {storedItems.length} product{storedItems.length !== 1 ? 's' : ''} stored
          </Text>
          <Text style={styles.dataStatSubtext}>
            Ready for export
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Data Manager</Text>
        <Text style={styles.subtitle}>Export and import your product data</Text>
      </View>

      {renderCurrentData()}

      <View style={styles.addSection}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.exportButton]}
          onPress={handleExport}
          disabled={loading || storedItems.length === 0}
        >
          <Text style={styles.actionButtonText}>📤 Export Data</Text>
          <Text style={styles.actionButtonSubtext}>
            {storedItems.length} items ready
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.importButton]}
          onPress={handleImport}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>📥 Import Data</Text>
          <Text style={styles.actionButtonSubtext}>
            Replace current data
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {renderImportedData()}
      {renderDataPreview()}

      {storedItems.length === 0 && !loading && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No Data Yet</Text>
          <Text style={styles.emptyStateText}>
            Add some products in the app first, then come back to export them.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1931', // Dark blue background
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  // Current Data Section
  currentDataContainer: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dataStats: {
    marginTop: 8,
  },
  dataStatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  dataStatSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
  },
  // Button Section
  addSection: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  exportButton: {
    backgroundColor: '#2d3e5d',
  },
  importButton: {
    backgroundColor: '#2d3e5d',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFD700',
  },
  actionButtonSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
  },
  // Imported Data Section
  dataContainer: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fileName: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'monospace',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#2d3e5d',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  previewButton: {
    backgroundColor: '#2d3e5d',
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  buttonText: {
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 14,
  },
  // Loading
  loadingContainer: {
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#CCCCCC',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#0A1931',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a2b4d',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4e6d',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFD700',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  rawJson: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#CCCCCC',
    backgroundColor: '#1a2b4d',
    padding: 12,
    borderRadius: 8,
  },
});

export default JsonManager;