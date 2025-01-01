import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { auth, database } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const router = useRouter(); // Initialize the router

  const handleRegister = () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true); // Start loading state

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Create user profile in the Realtime Database
        set(ref(database, "users/" + user.uid), {
          name,
          email,
        });

        Alert.alert("Success", "Registration successful!");
        setLoading(false); // End loading state
        router.push("/index"); // Navigate to the home screen using router.push
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false); // End loading state
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Create Account</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/LoginScreen")} // Navigate to login screen
      >
        <Text style={styles.signInText}>Already have an account? Login</Text>
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
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#6A0DAD", // Purple color for consistency with login
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
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 20,
    color: "#6A0DAD", // Purple color for the sign-in text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistrationScreen;
