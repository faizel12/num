import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useProductForm } from '../../hooks/useProductForm';

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { savedItems } = useProductForm();

    // Find the item by ID
    const item = savedItems.find(i => i.id === id);

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Item not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Item Details</Text>

            {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}

            <View style={styles.detailCard}>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>NAME:</Text>
                    <Text style={styles.value}>{item.name || 'No Name'}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{item.description || 'No description'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Car Type:</Text>
                    <Text style={styles.value}>{item.size}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Condition:</Text>
                    <Text style={styles.value}>{item.condition}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Part Type:</Text>
                    <Text style={styles.value}>{item.part}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    errorText: { textAlign: 'center', fontSize: 18, marginTop: 50 },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 20,
        resizeMode: 'cover'
    },
    detailCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1
    },
    value: {
        fontSize: 16,
        color: '#666',
        flex: 1,
        textAlign: 'right'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2ecc71',
        flex: 1,
        textAlign: 'right'
    },
});
