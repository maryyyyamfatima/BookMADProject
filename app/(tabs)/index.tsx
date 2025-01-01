import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { AuthProvider } from '@/context/AuthContext'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Home from '@/components/home'; 
import { CartProvider } from '@/context/CartContext'; 
import CartButton from '@/components/CartButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '@/app/LoginScreen'

export default function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(1); // Tracks the current intro screen step

  useEffect(() => {
    // Clear AsyncStorage to reset the intro screens history
    const resetIntroHistory = async () => {
      await AsyncStorage.removeItem('introShown');
      checkIntro(); // Check intro status after clearing history
    };

    // Uncomment the following line to clear the history
    // resetIntroHistory();

    const checkIntro = async () => {
      const introShown = await AsyncStorage.getItem('introShown');
      if (introShown) {
        setShowIntro(false);
      } else {
        setShowIntro(true);
        await AsyncStorage.setItem('introShown', 'true');
      }
    };
    checkIntro();
  }, []);

  const handleNext = () => {
    if (introStep < 3) {
      setIntroStep(introStep + 1); // Move to next intro screen
    } else {
      setShowIntro(false); // All intro screens completed, proceed to main content
    }
  };

  if (showIntro) {
    return (
      <View style={styles.container}>
        {introStep === 1 && (
          <>
            <ThemedText style={styles.title}>Welcome to Book House!</ThemedText>
            <ThemedText style={styles.description}>
              A place where you can explore a wide variety of books. Whether you are a fiction fan or a non-fiction lover, we have something for everyone.
            </ThemedText>
          </>
        )}
        {introStep === 2 && (
          <>
            <ThemedText style={styles.title}>This is a reading and buying books app!</ThemedText>
            <ThemedText style={styles.description}>
              Discover, read, and buy books all in one place. Book House makes it easy to find your next great read, buy it, and keep it handy on your device.
            </ThemedText>
          </>
        )}
        {introStep === 3 && (
          <>
            <ThemedText style={styles.title}>LET'S GET STARTED</ThemedText>
            <ThemedText style={styles.description}>
              You're all set to begin your journey with Book House. Explore your favorite books and enjoy a seamless reading experience.
            </ThemedText>
          </>
        )}

        <Button title={introStep === 3 ? 'Finish' : 'Next'} onPress={handleNext} color="#800000" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
    
          <ThemedText style={styles.title}>Welcome</ThemedText>
          <CartButton />
          <Home />
          {/* <LoginScreen /> */}
        
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 60,
    lineHeight: 40,
    paddingBottom: 10,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Center the title
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center', // Center the description text
    paddingHorizontal: 20, // To ensure the text is not too close to the edges
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#800000', // Maroon color
  },
});
