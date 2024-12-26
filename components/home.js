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

const Home = () => {
  const books = useFetchData();
  const router = useRouter();

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

        {Object.keys(books).map((category) =>
          renderBooksByCategory(category, books[category])
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
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
    width: 130,
    height: 155,
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
