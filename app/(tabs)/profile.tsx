import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext"; // Import the custom hook

export default function Profile() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <ThemedView style={styles.container}>
      {isLoggedIn ? (
        <View>
          <ThemedText style={styles.title}>Welcome to your profile!</ThemedText>
          <Button title="View Order History" onPress={() => {}} />
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <View>
          <Text style={styles.message}>You are not logged in.</Text>
          <Button title="Login" onPress={login} />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
  },
});
