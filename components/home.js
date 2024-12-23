import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useFetchData } from "@/hooks/usefetchdata"; // Import custom hook

const Home = () => {
  const books = useFetchData();
  const router = useRouter();

  // Render books by category
  const renderBooksByCategory = (category) => {
    const categoryBooks = books[category];
    if (!categoryBooks || categoryBooks.length === 0) return null;

    return (
      <ThemedView style={styles.categoryContainer}>
        <ThemedText style={styles.categoryHeader}>{category}</ThemedText>
        <FlatList
          data={categoryBooks}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() =>
                router.push({
                  pathname: `/book-detail/${item.id}`,
                  params: {
                    bookName: item.bookName,
                    description: item.description || "Unknown", // Default language if not available
                    author: item.author || "Unknown", // Default pageNo if not available
                    rating: item.rating || "N/A", // Default rating if not available
                    bookCover: item.bookCover || "N/A", // Default rating if not available
                  },
                })
              }
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

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedText style={styles.header}>Categories</ThemedText>

        {renderBooksByCategory("Mystery")}
        {renderBooksByCategory("Literature")}
        {renderBooksByCategory("Romance")}
        {renderBooksByCategory("Fantasy")}
        {renderBooksByCategory("Horror")}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bookList: {
    paddingBottom: 16,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1, // Added border width
    borderColor: "#808080", // Gray border color
  },
  bookImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  bookName: {
    fontSize: 16,
    marginLeft: 8,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
});

export default Home;
