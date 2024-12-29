import React from "react";
import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFetchData } from "@/hooks/usefetchdata";
import { useRouter, RelativePathString } from "expo-router";

const CategoryPage = () => {
  const { category } = useLocalSearchParams();
  const books: { [key: string]: any[] } = useFetchData();
  const router = useRouter();

  // Get the books for the selected category
  const categoryBooks = typeof category === 'string' ? books[category] || [] : [];

  const renderBookItem = ({ item }: { item: { id: string; bookName: string; description?: string; author?: string; rating?: string; bookCover?: string; price?: string; pdfUrl?: string; } }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() =>
        router.push({
          pathname: `/book-detail/[id]` as RelativePathString,
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
      <ThemedView style={styles.imageWrapper}>
        <Image
          source={{ uri: item.bookCover }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      </ThemedView>
      <ThemedText style={styles.bookTitle} numberOfLines={2}>
        {item.bookName}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>{category} Books</ThemedText>
      <FlatList
        data={categoryBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    padding: 6,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
  },
  bookItem: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 2,
    padding: 12,
  },
  imageWrapper: {
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#eaeaea",
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 4,
  },
});

export default CategoryPage;
