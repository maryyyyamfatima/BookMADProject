import React, { useState } from "react";
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
import { useFetchData } from "@/hooks/usefetchdata";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const books = useFetchData();
  const [filteredBooks, setFilteredBooks] = useState({});
  const router = useRouter();

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks({});
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const newFilteredBooks = {};

    Object.keys(books).forEach((category) => {
      const categoryBooks = books[category];

      // Check if the category name matches the query
      if (category.toLowerCase().includes(lowerCaseQuery)) {
        newFilteredBooks[category] = categoryBooks;
      } else {
        // Otherwise, filter books by name within the category
        const filtered = categoryBooks.filter((book) =>
          book.bookName.toLowerCase().includes(lowerCaseQuery)
        );
        if (filtered.length > 0) {
          newFilteredBooks[category] = filtered;
        }
      }
    });

    setFilteredBooks(newFilteredBooks);
  };

  const renderBooksByCategory = (category, data) => {
    if (!data || data.length === 0) return null;

    return (
      <ThemedView style={styles.categoryContainer}>
        <ThemedText style={styles.categoryHeader}>{category}</ThemedText>
        <FlatList
          data={data}
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
                    description: item.description || "Unknown",
                    author: item.author || "Unknown",
                    rating: item.rating || "N/A",
                    bookCover: item.bookCover || "N/A",
                    price: item.price || "N/A",
                    pdfUrl: item.pdfUrl || "N/A",
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

  const displayBooks = Object.keys(filteredBooks).length
    ? filteredBooks
    : books;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedText style={styles.header}>Categories</ThemedText>
        <SearchBar onSearch={handleSearch} />

        {Object.keys(displayBooks).map((category) =>
          renderBooksByCategory(category, displayBooks[category])
        )}
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
    borderWidth: 1,
    borderColor: "#808080",
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
