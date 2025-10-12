import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class setting extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Settings
      </Text>
      
      <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50 }}>
        Settings page to be written yet
      </Text>
      <Text style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>
        Coming soon:
      </Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({})