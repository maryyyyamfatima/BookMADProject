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
import { useFetchData } from "@/hooks/usefetchdata";

const Home = () => {
  const books = useFetchData();
  const router = useRouter();

  const renderBooksByCategory = (category, data) => {
    if (!data || data.length === 0) return null;

    return (
      <ThemedView style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/category/${category}`,
              params: { categoryName: category },
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

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedText style={styles.header}>Categories</ThemedText>

        {Object.keys(books).map((category) => (
          <React.Fragment key={category}>
            {renderBooksByCategory(category, books[category])}
          </React.Fragment>
        ))}
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
    color: "#fff",
  },
  bookList: {
    paddingBottom: 16,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
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
  scrollViewContent: {
    paddingBottom: 16,
  },
});

export default Home;
