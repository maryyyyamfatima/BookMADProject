import React from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/AuthContext'; // Adjust the path based on your project structure
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Home from '@/components/home'; // Adjust the path based on your directory structure
import LoginButton from '@/components/LoginButton'; // Adjust path

export default function Index() {
  return (
    <AuthProvider>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Welcome</ThemedText>
        <LoginButton />
        <Home />
      </ThemedView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingTop: 60,
    paddingBottom: 10,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Center the title
  },
});
