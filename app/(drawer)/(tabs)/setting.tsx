
// import React, { useState } from 'react';
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useProductForm } from '../../../hooks/useProductForm'; // Adjust path as needed

// const SettingsScreen = () => {
//   const [isAmharic, setIsAmharic] = useState(false);
//   const { getImageStorageInfo, clearAllSavedItems } = useProductForm(); // Get the functions from hook

//   const LanguageToggle = () => (
//     <View style={styles.toggleContainer}>
//       <Text style={styles.sectionTitle}>
//         {isAmharic ? 'ቋንቋ' : 'Language'}
//       </Text>
      
//       <View style={styles.toggleButtons}>
//         <TouchableOpacity 
//           style={[styles.toggleButton, !isAmharic && styles.activeToggle]}
//           onPress={() => setIsAmharic(false)}
//         >
//           <Text style={[styles.toggleText, !isAmharic && styles.activeText]}>
//             English
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.toggleButton, isAmharic && styles.activeToggle]}
//           onPress={() => setIsAmharic(true)}
//         >
//           <Text style={[styles.toggleText, isAmharic && styles.activeText]}>
//             አማርኛ
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const handleCheckStorage = async () => {
//     try {
//       const info = await getImageStorageInfo();
//       console.log('Image Storage Info:', info);
      
//       Alert.alert(
//         isAmharic ? 'የምስል ማከማቻ መረጃ' : 'Image Storage Info',
//         isAmharic 
//           ? `ፋይሎች: ${info?.fileCount || 0}\nመጠን: ${info?.totalSizeMB || '0.00 MB'}\nአቅጣጫ: ${info?.directory ? '✓' : '✗'}`
//           : `Files: ${info?.fileCount || 0}\nSize: ${info?.totalSizeMB || '0.00 MB'}\nDirectory: ${info?.directory ? 'Exists' : 'Missing'}`,
//         [{ text: isAmharic ? 'እሺ' : 'OK' }]
//       );
//     } catch (error) {
//       console.error('Error checking storage:', error);
//       Alert.alert(
//         isAmharic ? 'ስህተት' : 'Error',
//         isAmharic ? 'የምስል ማከማቻ መረጃ ማንበብ አልተቻለም' : 'Failed to read image storage info'
//       );
//     }
//   };

//   const handleClearAllData = () => {
//     Alert.alert(
//       isAmharic ? 'ሁሉንም ውሂብ አጥፋ' : 'Clear All Data',
//       isAmharic 
//         ? 'ሁሉንም የተቀመጡ እቃዎች እና ምስሎች ማጥፋት እፈልጋለሁ? \nይህ ተገላቢጦሽ አይደለም!'
//         : 'Are you sure you want to delete ALL saved items and images?\nThis action cannot be undone!',
//       [
//         { 
//           text: isAmharic ? 'ተወ' : 'Cancel', 
//           style: 'cancel' 
//         },
//         {
//           text: isAmharic ? 'አጥፋ' : 'Delete All',
//           style: 'destructive',
//           onPress: async () => {
//             const success = await clearAllSavedItems();
//             if (success) {
//               Alert.alert(
//                 isAmharic ? 'ተሳክቷል' : 'Success',
//                 isAmharic ? 'ሁሉም ውሂብ ተሰርዟል' : 'All data has been cleared'
//               );
//             } else {
//               Alert.alert(
//                 isAmharic ? 'ስህተት' : 'Error',
//                 isAmharic ? 'ውሂቡ ሊሰረዝ አልቻለም' : 'Failed to clear data'
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>
//           {isAmharic ? 'ቅንብሮች' : 'Settings'}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <LanguageToggle />
//       </View>

//       {/* Storage Management Section */}
//       <View style={styles.section}>
//         <View style={styles.toggleContainer}>
//           <Text style={styles.sectionTitle}>
//             {isAmharic ? 'የምስል ማከማቻ' : 'Image Storage'}
//           </Text>
          
//           <TouchableOpacity 
//             style={styles.debugButton}
//             onPress={handleCheckStorage}
//           >
//             <Text style={styles.debugButtonText}>
//               {isAmharic ? 'የምስል ማከማቻ መረጃ ይመልከቱ' : 'Check Image Storage'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={[styles.debugButton, styles.clearDataButton]}
//             onPress={handleClearAllData}
//           >
//             <Text style={[styles.debugButtonText, styles.clearDataButtonText]}>
//               {isAmharic ? 'ሁሉንም ውሂብ አጥፋ' : 'Clear All Data'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* App Info Section */}
//       <View style={styles.section}>
//         <View style={styles.toggleContainer}>
//           <Text style={styles.sectionTitle}>
//             {isAmharic ? 'ስለ መተግበሪያው' : 'About App'}
//           </Text>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>
//               {isAmharic ? 'የውሂብ አይነት' : 'Storage Type'}:
//             </Text>
//             <Text style={styles.infoValue}>SQLite Database</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>
//               {isAmharic ? 'ምስሎች' : 'Images'}:
//             </Text>
//             <Text style={styles.infoValue}>
//               {isAmharic ? 'በመሳሪያው ላይ የሚቀመጡ' : 'Stored on device'}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A1931',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#1a2b4d',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFD700',
//   },
//   section: {
//     margin: 16,
//   },
//   toggleContainer: {
//     backgroundColor: '#1a2b4d',
//     borderRadius: 12,
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     marginBottom: 16,
//   },
//   toggleButtons: {
//     flexDirection: 'row',
//     backgroundColor: '#2d3e5d',
//     borderRadius: 25,
//     padding: 4,
//     borderWidth: 1,
//     borderColor: '#3d4e6d',
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   activeToggle: {
//     backgroundColor: '#FFD700',
//   },
//   toggleText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#CCCCCC',
//   },
//   activeText: {
//     color: '#0A1931',
//     fontWeight: '700',
//   },
//   debugButton: {
//     backgroundColor: '#2d3e5d',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#3d4e6d',
//   },
//   clearDataButton: {
//     backgroundColor: '#7a1c1c',
//     borderColor: '#9a2c2c',
//   },
//   debugButtonText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   clearDataButtonText: {
//     color: '#FF6B6B',
//     fontWeight: '700',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2d3e5d',
//   },
//   infoLabel: {
//     color: '#CCCCCC',
//     fontSize: 14,
//   },
//   infoValue: {
//     color: '#FFD700',
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });

// export default SettingsScreen;

// app/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ImageQuality } from '../../../hooks/useImagePicker';
import { useProductForm } from '../../../hooks/useProductForm';

const SettingsScreen = () => {
  const [isAmharic, setIsAmharic] = useState(false);
  const { 
    getImageStorageInfo, 
    clearAllSavedItems, 
    imageQuality, 
    updateImageQuality,
    savedItems 
  } = useProductForm();

  const LanguageToggle = () => (
    <View style={styles.toggleContainer}>
      <Text style={styles.sectionTitle}>
        {isAmharic ? 'ቋንቋ' : 'Language'}
      </Text>
      
      <View style={styles.toggleButtons}>
        <TouchableOpacity 
          style={[styles.toggleButton, !isAmharic && styles.activeToggle]}
          onPress={() => setIsAmharic(false)}
        >
          <Text style={[styles.toggleText, !isAmharic && styles.activeText]}>
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, isAmharic && styles.activeToggle]}
          onPress={() => setIsAmharic(true)}
        >
          <Text style={[styles.toggleText, isAmharic && styles.activeText]}>
            አማርኛ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ImageQualitySettings = () => {
    const qualitySettings: { value: ImageQuality; label: string; amharicLabel: string; description: string; amharicDescription: string }[] = [
      { 
        value: 'high', 
        label: 'High', 
        amharicLabel: 'ከፍተኛ',
        description: 'Best quality • ~250KB per image',
        amharicDescription: 'ጥሩ ጥራት • ~250KB በአንድ ምስል'
      },
      { 
        value: 'medium', 
        label: 'Medium', 
        amharicLabel: 'መካከለኛ',
        description: 'Good balance • ~100KB per image',
        amharicDescription: 'መጠነ ሰለም • ~100KB በአንድ ምስል'
      },
      { 
        value: 'low', 
        label: 'Low', 
        amharicLabel: 'ዝቅተኛ',
        description: 'Small size • ~50KB per image',
        amharicDescription: 'ትንሽ መጠን • ~50KB በአንድ ምስል'
      }
    ];

    return (
      <View style={styles.toggleContainer}>
        <Text style={styles.sectionTitle}>
          {isAmharic ? 'የምስል ጥራት' : 'Image Quality'}
        </Text>
        
        <Text style={styles.qualityDescription}>
          {isAmharic 
            ? 'አዲስ ምስሎች በሚጨመሩበት ጊዜ የሚተገበር ጥራት' 
            : 'Quality applied when adding new images'
          }
        </Text>
        
        <View style={styles.qualityOptions}>
          {qualitySettings.map((setting) => (
            <TouchableOpacity 
              key={setting.value}
              style={[
                styles.qualityOption,
                imageQuality === setting.value && styles.activeQualityOption
              ]}
              onPress={() => updateImageQuality(setting.value)}
            >
              <View style={styles.qualityOptionContent}>
                <View style={styles.qualityHeader}>
                  <Text style={[
                    styles.qualityLabel,
                    imageQuality === setting.value && styles.activeQualityLabel
                  ]}>
                    {isAmharic ? setting.amharicLabel : setting.label}
                  </Text>
                  {imageQuality === setting.value && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={[
                  styles.qualityDescriptionText,
                  imageQuality === setting.value && styles.activeQualityDescription
                ]}>
                  {isAmharic ? setting.amharicDescription : setting.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.currentSetting}>
          {isAmharic ? 'አሁን ያለው ቅንብር' : 'Current setting'}:{' '}
          <Text style={styles.currentSettingValue}>
            {isAmharic 
              ? qualitySettings.find(s => s.value === imageQuality)?.amharicLabel
              : qualitySettings.find(s => s.value === imageQuality)?.label
            }
          </Text>
        </Text>
      </View>
    );
  };

  const StorageProjection = () => {
    const avgSizePerItem = {
      high: 250,    // KB
      medium: 100,  // KB
      low: 50       // KB
    };

    const projectedSize = (items: number) => {
      const sizeKB = items * avgSizePerItem[imageQuality];
      if (sizeKB < 1024) return `${Math.round(sizeKB)} KB`;
      if (sizeKB < 1024 * 1024) return `${(sizeKB / 1024).toFixed(1)} MB`;
      return `${(sizeKB / (1024 * 1024)).toFixed(1)} GB`;
    };

    return (
      <View style={styles.projectionContainer}>
        <Text style={styles.projectionTitle}>
          {isAmharic ? 'የማከማቻ ትንበያ' : 'Storage Projection'}
        </Text>
        
        <View style={styles.projectionRow}>
          <Text style={styles.projectionLabel}>
            {isAmharic ? 'የአሁኑ ሁኔታ' : 'Current'} ({savedItems.length} {isAmharic ? 'እቃዎች' : 'items'}):
          </Text>
          <Text style={styles.projectionValue}>
            {projectedSize(savedItems.length)}
          </Text>
        </View>
        
        <View style={styles.projectionRow}>
          <Text style={styles.projectionLabel}>
            {isAmharic ? 'ለ 500 እቃዎች' : 'For 500 items'}:
          </Text>
          <Text style={styles.projectionValue}>
            {projectedSize(500)}
          </Text>
        </View>
        
        <View style={styles.projectionRow}>
          <Text style={styles.projectionLabel}>
            {isAmharic ? 'ለ 1000 እቃዎች' : 'For 1000 items'}:
          </Text>
          <Text style={styles.projectionValue}>
            {projectedSize(1000)}
          </Text>
        </View>

        <View style={styles.projectionRow}>
          <Text style={styles.projectionLabel}>
            {isAmharic ? 'ለ 2000 እቃዎች' : 'For 2000 items'}:
          </Text>
          <Text style={styles.projectionValue}>
            {projectedSize(2000)}
          </Text>
        </View>
      </View>
    );
  };

  const handleCheckStorage = async () => {
    try {
      const info = await getImageStorageInfo();
      console.log('Image Storage Info:', info);
      
      Alert.alert(
        isAmharic ? 'የምስል ማከማቻ መረጃ' : 'Image Storage Info',
        isAmharic 
          ? `ፋይሎች: ${info?.fileCount || 0}\nመጠን: ${info?.totalSizeMB || '0.00 MB'}\nአቅጣጫ: ${info?.directory ? '✓' : '✗'}`
          : `Files: ${info?.fileCount || 0}\nSize: ${info?.totalSizeMB || '0.00 MB'}\nDirectory: ${info?.directory ? 'Exists' : 'Missing'}`,
        [{ text: isAmharic ? 'እሺ' : 'OK' }]
      );
    } catch (error) {
      console.error('Error checking storage:', error);
      Alert.alert(
        isAmharic ? 'ስህተት' : 'Error',
        isAmharic ? 'የምስል ማከማቻ መረጃ ማንበብ አልተቻለም' : 'Failed to read image storage info'
      );
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      isAmharic ? 'ሁሉንም ውሂብ አጥፋ' : 'Clear All Data',
      isAmharic 
        ? 'ሁሉንም የተቀመጡ እቃዎች እና ምስሎች ማጥፋት እፈልጋለሁ? \nይህ ተገላቢጦሽ አይደለም!'
        : 'Are you sure you want to delete ALL saved items and images?\nThis action cannot be undone!',
      [
        { 
          text: isAmharic ? 'ተወ' : 'Cancel', 
          style: 'cancel' 
        },
        {
          text: isAmharic ? 'አጥፋ' : 'Delete All',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllSavedItems();
            if (success) {
              Alert.alert(
                isAmharic ? 'ተሳክቷል' : 'Success',
                isAmharic ? 'ሁሉም ውሂብ ተሰርዟል' : 'All data has been cleared'
              );
            } else {
              Alert.alert(
                isAmharic ? 'ስህተት' : 'Error',
                isAmharic ? 'ውሂቡ ሊሰረዝ አልቻለም' : 'Failed to clear data'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isAmharic ? 'ቅንብሮች' : 'Settings'}
        </Text>
      </View>

      <View style={styles.section}>
        <LanguageToggle />
      </View>

      {/* Image Quality Settings */}
      <View style={styles.section}>
        <ImageQualitySettings />
      </View>

      {/* Storage Projection */}
      <View style={styles.section}>
        <StorageProjection />
      </View>

      {/* Storage Management Section */}
      <View style={styles.section}>
        <View style={styles.toggleContainer}>
          <Text style={styles.sectionTitle}>
            {isAmharic ? 'የምስል ማከማቻ' : 'Image Storage'}
          </Text>
          
          <TouchableOpacity 
            style={styles.debugButton}
            onPress={handleCheckStorage}
          >
            <Text style={styles.debugButtonText}>
              {isAmharic ? 'የምስል ማከማቻ መረጃ ይመልከቱ' : 'Check Image Storage'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.debugButton, styles.clearDataButton]}
            onPress={handleClearAllData}
          >
            <Text style={[styles.debugButtonText, styles.clearDataButtonText]}>
              {isAmharic ? 'ሁሉንም ውሂብ አጥፋ' : 'Clear All Data'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <View style={styles.toggleContainer}>
          <Text style={styles.sectionTitle}>
            {isAmharic ? 'ስለ መተግበሪያው' : 'About App'}
          </Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              {isAmharic ? 'የውሂብ አይነት' : 'Storage Type'}:
            </Text>
            <Text style={styles.infoValue}>SQLite Database</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              {isAmharic ? 'የምስል ጥራት' : 'Image Quality'}:
            </Text>
            <Text style={styles.infoValue}>
              {imageQuality === 'high' ? (isAmharic ? 'ከፍተኛ' : 'High') :
               imageQuality === 'medium' ? (isAmharic ? 'መካከለኛ' : 'Medium') :
               (isAmharic ? 'ዝቅተኛ' : 'Low')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1931',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2b4d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  section: {
    margin: 16,
  },
  toggleContainer: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
  },
  toggleButtons: {
    flexDirection: 'row',
    backgroundColor: '#2d3e5d',
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFD700',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CCCCCC',
  },
  activeText: {
    color: '#0A1931',
    fontWeight: '700',
  },
  // Image Quality Styles
  qualityDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  qualityOptions: {
    gap: 12,
    marginBottom: 16,
  },
  qualityOption: {
    backgroundColor: '#2d3e5d',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeQualityOption: {
    borderColor: '#FFD700',
    backgroundColor: '#2d3e5d',
  },
  qualityOptionContent: {
    flex: 1,
  },
  qualityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  qualityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CCCCCC',
  },
  activeQualityLabel: {
    color: '#FFD700',
    fontWeight: '700',
  },
  selectedIndicator: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: '#0A1931',
    fontWeight: 'bold',
    fontSize: 14,
  },
  qualityDescriptionText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 18,
  },
  activeQualityDescription: {
    color: '#CCCCCC',
  },
  currentSetting: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  currentSettingValue: {
    color: '#FFD700',
    fontWeight: '600',
  },
  // Storage Projection Styles
  projectionContainer: {
    backgroundColor: '#1a2b4d',
    borderRadius: 12,
    padding: 16,
  },
  projectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
  },
  projectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e5d',
  },
  projectionLabel: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  projectionValue: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500',
  },
  // Button Styles
  debugButton: {
    backgroundColor: '#2d3e5d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  clearDataButton: {
    backgroundColor: '#7a1c1c',
    borderColor: '#9a2c2c',
  },
  debugButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  clearDataButtonText: {
    color: '#FF6B6B',
    fontWeight: '700',
  },
  // Info Styles
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e5d',
  },
  infoLabel: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  infoValue: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingsScreen;