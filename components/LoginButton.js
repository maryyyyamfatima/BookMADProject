import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Adjust based on your navigation setup

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/LoginScreen"); // Adjust the route to your login screen
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#fff", // Purple color
    borderRadius: 5,
    position: "absolute", // Align to the right
    right: 16,
    top: 50, // Adjust based on your layout
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginButton;
