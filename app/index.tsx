
// index.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductForm from '../components/ProductForm'; // Adjust the import path to where your component is located

const App = () => {
  return (
    <View style={styles.container}>
      <ProductForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;