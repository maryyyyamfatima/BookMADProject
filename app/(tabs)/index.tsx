import React from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/AuthContext'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Home from '@/components/home'; 
import LoginButton from '@/components/LoginButton'; 
import {CartProvider} from '@/context/CartContext'; 
import CartButton from '@/components/CartButton';

export default function Index() {
  return (
    <AuthProvider>
      <CartProvider>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Welcome</ThemedText>
        {/* <LoginButton /> */}
        <CartButton />
        <Home />
      </ThemedView>
      </CartProvider>
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
