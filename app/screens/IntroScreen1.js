import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IntroScreen1 = ({ navigation }) => (
  <View style={[styles.container, { backgroundColor: '#800000' }]}>
    <Text style={[styles.text, { color: 'white', fontSize: 32 }]}>BOOK HOUSE</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('IntroScreen2')}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#800000',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default IntroScreen1;
