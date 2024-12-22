import React, { useEffect, useState } from "react";
import { useRouter, SearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/config/firebase";
import { useSearchParams } from "expo-router/build/hooks";

const BookDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the dynamic `id` parameter from the URL
  interface Book {
    bookCover: string;
    bookName: string;
    author: string;
    description: string;
    rating: number;
  }

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const db = getDatabase(app);
      const bookRef = ref(db, `books/${id}`); // Reference to a specific book by ID
      get(bookRef).then((snapshot) => {
        if (snapshot.exists()) {
          setBook(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    }
  }, [id]);

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.bookCover }} style={styles.bookImage} />
      <Text style={styles.bookName}>{book.bookName}</Text>
      <Text>{book.author}</Text>
      <Text>{book.description}</Text>
      <Text>Rating: {book.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  bookImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  bookName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default BookDetail;
