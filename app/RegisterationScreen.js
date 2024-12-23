import React, { useState } from "react";
import { TextInput, Button, StyleSheet, View, Alert, Text } from "react-native";
import { auth, database } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "expo-router"; // Import useRouter for navigation

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
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa" // Lighter text color for placeholder
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa" // Lighter text color for placeholder
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa" // Lighter text color for placeholder
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Registering..." : "Register"}
        onPress={handleRegister}
        disabled={loading}
        color="#8e44ad" // Purple color for the button
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Button
          title="Login"
          onPress={() => router.push("/LoginScreen")} // Use router.push for login navigation
          disabled={loading}
          color="#8e44ad" // Purple color for the button
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#333", // Dark grey background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff", // White text color for title
  },
  input: {
    height: 50,
    borderColor: "#555", // Lighter grey border
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#444", // Dark grey input fields for contrast
    color: "#fff", // White text color for input fields
  },
  footer: {
    marginTop: 20,
    flexDirection: "row", // Align text and button in a row
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Align the content vertically
  },
  footerText: {
    color: "#fff", // White text for footer
    marginRight: 5, // Add space between text and button
  },
});

export default RegistrationScreen;
