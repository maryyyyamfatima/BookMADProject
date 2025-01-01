import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Get the router object

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential);
        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)"); // Navigate to tabs after successful login
      })
      .catch((error) => {
        console.error("Login failed:", error.code, error.message);
        let errorMessage = "An error occurred. Please try again.";
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Too many unsuccessful attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message || "Unknown error occurred.";
        }
        // Ensure the error alert is displayed correctly
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/RegisterationScreen")} // Use router.push() for navigation
      >
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    paddingTop: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#6A0DAD", // Purple color for consistency
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 12,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#6A0DAD", // Purple color for the button
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: "#6A0DAD", // Purple color for the sign-up text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
