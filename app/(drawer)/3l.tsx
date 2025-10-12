// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useProductForm } from '../../hooks/useProductForm';

// export default function ThreeLScreen() {
//   const router = useRouter();
//   const { savedItems, deleteItem } = useProductForm();

//   // Filter items for 5l cars
//   const filteredItems = savedItems.filter(item => item.size === '3L');

//   // Add delete handler function
//   const handleDelete = async (itemId: string) => {
//     Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           const success = await deleteItem(itemId);
//           if (success) {
//             // Item will be automatically removed from the list
//           }
//         },
//       },
//     ]);
//   };

//   const handleItemPress = (itemId: string) => {
//     // Navigate to the detail screen with the item ID
//     router.push(`/detail/${itemId}`);
//   };

//   const renderItem = ({ item }: any) => (
//     <View style={styles.itemContainer}>
//       {/* Content area that's clickable for navigation */}
//       <TouchableOpacity
//         style={styles.contentArea}
//         onPress={() => handleItemPress(item.id)}
//       >

//         <View key={item.id} style={styles.savedItem}>
//           {item.imageUris && (
//             <Image source={{ uri: item.imageUris[0] }} style={styles.savedImage} />
//           )}
//           <View>
//             <Text style={styles.itemName}> {item.name}</Text>

//             <View style={{ marginTop:3,flexDirection: "row", alignItems: "center" }}>
//               <Text>Car Type </Text>
//               <Text style={styles.itemName}>{item.size}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
  

//       {/* Icons that are separate from the content */}
//       <View style={styles.iconRow}>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => router.push(`/edit/${item.id}`)}
//         >
//           <FontAwesome name="pencil" size={16} color="#666" />
//         </TouchableOpacity>

//         {/* Delete icon */}
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => handleDelete(item.id)}
//         >
//           <FontAwesome name="trash" size={16} color="#ff4444" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>3l Items ({filteredItems.length})</Text>
//       <FlatList
//         data={filteredItems}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No items for 5l cars</Text>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   itemContainer: {
//     backgroundColor: 'white',
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 8,
//     elevation: 2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   contentArea: {
//     flex: 1,
//   },
//   itemName: { fontSize: 18, fontWeight: 'bold' },
//   itemDetails: { fontSize: 14, color: '#666', marginTop: 4 },
//   iconRow: {
//     flexDirection: 'row',
//     gap: 12,
//     marginLeft: 10,
//   },
//   iconButton: {
//     padding: 4,
//   },
//   emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
//   savedImage: { width: 60, height: 60, borderRadius: 4, marginRight: 10 },
//   savedItem: {
//     backgroundColor: "#fff",
//     padding: 5,
//     borderRadius: 8,
//     flexDirection: "row",
//   },
// });

import CarTypeScreen from '../../components/CarTypeScreen';

export default function ThreeLScreen() {
  return <CarTypeScreen carType="3L" />;
}