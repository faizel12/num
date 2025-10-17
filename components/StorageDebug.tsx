// app/components/StorageDebug.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProductForm } from '../hooks/useProductForm';

export default function StorageDebug() {
  const { getImageStorageInfo, savedItems } = useProductForm();
  const [storageInfo, setStorageInfo] = useState<any>(null);

  const loadStorageInfo = async () => {
    const info = await getImageStorageInfo();
    setStorageInfo(info);
  };

  useEffect(() => {
    loadStorageInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Storage Debug</Text>
      
      <TouchableOpacity style={styles.refreshButton} onPress={loadStorageInfo}>
        <Text style={styles.refreshButtonText}>Refresh Info</Text>
      </TouchableOpacity>

      {storageInfo ? (
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Storage Directory</Text>
          <Text style={styles.infoText}>Path: {storageInfo.directory}</Text>
          <Text style={styles.infoText}>Exists: {storageInfo.exists ? 'Yes' : 'No'}</Text>
          
          <Text style={styles.sectionTitle}>Files</Text>
          <Text style={styles.infoText}>File Count: {storageInfo.fileCount}</Text>
          <Text style={styles.infoText}>Total Size: {storageInfo.totalSizeMB}</Text>
          
          <Text style={styles.sectionTitle}>File List</Text>
          {storageInfo.files.map((file: string, index: number) => (
            <Text key={index} style={styles.fileText}>• {file}</Text>
          ))}
        </View>
      ) : (
        <Text>Loading storage info...</Text>
      )}

      <Text style={styles.sectionTitle}>Database Items</Text>
      <Text style={styles.infoText}>Total Items: {savedItems.length}</Text>
      
      {savedItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemName}>ID: {item.id} - {item.name}</Text>
          <Text style={styles.itemImages}>
            Images: {item.imageUris ? item.imageUris.length : 0}
          </Text>
          {item.imageUris && item.imageUris.map((uri: string, index: number) => (
            <Text key={index} style={styles.imageUri}>  {uri}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  refreshButton: { backgroundColor: '#FFD700', padding: 12, borderRadius: 8, marginBottom: 16 },
  refreshButtonText: { textAlign: 'center', fontWeight: 'bold' },
  infoContainer: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  infoText: { fontSize: 14, marginBottom: 4 },
  fileText: { fontSize: 12, fontFamily: 'monospace', marginBottom: 2 },
  itemContainer: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 8 },
  itemName: { fontWeight: 'bold', marginBottom: 4 },
  itemImages: { fontSize: 12, color: '#666' },
  imageUri: { fontSize: 10, fontFamily: 'monospace', color: '#999' },
});