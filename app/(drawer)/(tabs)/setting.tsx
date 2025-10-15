import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = () => {
  const [isAmharic, setIsAmharic] = useState(false);

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
});

export default SettingsScreen;