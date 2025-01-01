import React from "react";
import { StyleSheet, Image, Button, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function Profile() {
  const { isLoggedIn, userData, logout } = useAuth(); // Access the logout function
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ThemedText type="title" style={styles.text}>
          Please log in to view your profile
        </ThemedText>
        <Button
          title="Log In"
          onPress={() => router.push("/LoginScreen")}
        />
      </ThemedView>
    );
  }

  const handleLogout = () => {
    logout(); // Calls the logout function from context
    router.push("/LoginScreen"); // Redirect to login screen after logout
  };

  const handleClearCache = () => {
    // Add logic to clear cache
    alert("Cache cleared!");
  };

  const handleClearHistory = () => {
    // Add logic to clear history
    alert("History cleared!");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileHeader}>
        <Image
          source={{ uri: userData?.avatar || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <ThemedText type="title" style={styles.name}>
          {userData?.name || "User"}
        </ThemedText>
        <ThemedText style={styles.email}>
          {userData?.email || "Email not provided"}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Favourites</ThemedText>
        <ThemedText style={styles.label}>Languages</ThemedText>
        <ThemedText style={styles.label}>Location</ThemedText>
        <ThemedText style={styles.label}>Subscription</ThemedText>
        <ThemedText style={styles.label}>Display</ThemedText>
      </ThemedView>

      <ThemedView style={styles.actions}>
        <ThemedText style={styles.actionText} onPress={handleClearCache}>
          Clear Cache
        </ThemedText>
        <ThemedText style={styles.actionText} onPress={handleClearHistory}>
          Clear History
        </ThemedText>
        <ThemedText style={styles.actionText} onPress={handleLogout}>
          Log Out
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.version}>App Version 2.3</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  center: {
    justifyContent: "center", // Centers content vertically when not logged in
    alignItems: "center", // Centers content horizontally when not logged in
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  section: {
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  actions: {
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 16,
    color: "#d9534f",
    marginBottom: 10,
    textDecorationLine: "underline", // Adds underline to the action texts
  },
  version: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    marginTop: 20,
  },
});
