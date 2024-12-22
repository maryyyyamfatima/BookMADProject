import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getDatabase, ref, onValue } from "firebase/database"; // Correct Firebase v9 imports
import { useRouter } from "expo-router";

// Firebase configuration
import { app } from "@/config/firebase"; // Ensure this points to your Firebase app config

const Home = () => {
  const [myBooks, setMyBooks] = useState([]);
  const router = useRouter();

  // Fetch books data from Firebase
  useEffect(() => {
    const db = getDatabase(app); // Initialize Firebase Realtime Database instance
    const booksRef = ref(db, "books"); // Reference to the 'books' node
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data to array format
        const booksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMyBooks(booksArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedText style={styles.header}>My Books</ThemedText>

      {/* Books List */}
      <FlatList
        data={myBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => router.push(`/book-detail/${item.id}`)}
          >
            <Image
              source={{ uri: item.bookCover }}
              style={styles.bookImage}
              resizeMode="cover"
            />
            <ThemedText style={styles.bookName}>{item.bookName}</ThemedText>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.bookList}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Direct color value instead of constant
    padding: 16, // Simple padding value
  },
  header: {
    fontSize: 24, // Direct font size
    fontWeight: "bold",
    color: "#000000", // Black color for text
    marginBottom: 16, // Space below header
  },
  bookList: {
    paddingBottom: 16, // Padding at the bottom of the list
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#f0f0f0", // Light gray background
    borderRadius: 8,
    padding: 8,
  },
  bookImage: {
    width: 50,
    height: 75,
    borderRadius: 4, // Rounded corners for image
  },
  bookName: {
    fontSize: 16, // Text size for book name
    color: "#000000", // Text color (black)
    marginLeft: 8, // Space between image and text
  },
});

export default Home;
