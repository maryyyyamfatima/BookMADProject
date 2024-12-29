import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IntroScreen3 = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>LET'S GET STARTED</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.replace('Main')}
    >
      <Text style={styles.buttonText}>Start</Text>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default IntroScreen3;
