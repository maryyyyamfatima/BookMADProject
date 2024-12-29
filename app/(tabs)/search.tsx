import React, { useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SearchBar from "@/components/SearchBar";
import { useFetchData } from "@/hooks/usefetchdata";
import { useRouter } from "expo-router";

const Search = () => {
  const books: { [key: string]: any[] } = useFetchData();
  const [filteredBooks, setFilteredBooks] = useState<{ [key: string]: any[] }>({});
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBooks({});
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const lowerCaseQuery = query.toLowerCase();
    const newFilteredBooks: { [key: string]: any[] } = {};

    Object.keys(books).forEach((category) => {
      const categoryBooks = books[category];

      if (category.toLowerCase().includes(lowerCaseQuery)) {
        newFilteredBooks[category] = categoryBooks;
      } else {
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

  const renderBooksByCategory = (category: string, data: any[]) => {
    if (!data || data.length === 0) return null;

    return (
      <ThemedView style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/category/[category]`,
              params: { categoryName: category, category },
            })
          }
        >
          <ThemedText style={styles.categoryHeader}>{category} &gt;</ThemedText>
        </TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() =>
                router.push({
                  pathname: `/book-detail/[id]`,
                  params: {
                    id: item.id,
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
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.bookCover }}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.bookList}
        />
      </ThemedView>
    );
  };

  const displayBooks = Object.keys(filteredBooks).length
    ? filteredBooks
    : null;

  return (
    <ThemedView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {hasSearched ? (
        displayBooks ? (
          Object.keys(displayBooks).map((category) =>
            renderBooksByCategory(category, displayBooks[category])
          )
        ) : (
          <ThemedText style={styles.notFound}>Book not found</ThemedText>
        )
      ) : (
        <ThemedText style={styles.defaultMessage}>Search books</ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
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
    marginRight: 16,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    width: 125,
    height: 180,
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  notFound: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#808080",
  },
  defaultMessage: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#808080",
  },
});

export default Search;
