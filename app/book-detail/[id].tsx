import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";

const BookDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const bookName = searchParams.get('bookName');
  const description = searchParams.get('description');
  const author = searchParams.get('author');
  const rating = searchParams.get('rating');
  const bookCover = searchParams.get('bookCover'); // Ensure bookCover is received

  const scheme = useColorScheme();

  // Ensure bookCover is being passed correctly and show a fallback in case it's empty
  if (!id || !bookName || !description || !author || !rating || !bookCover) {
    return <Text style={styles.errorText}>Missing book details or cover image.</Text>;
  }

  return (
    <View
      style={[
        styles.container,
        scheme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Only display image if bookCover is available */}
      <Image source={{ uri: bookCover }} style={styles.bookImage} />
      
      <Text
        style={[styles.title, scheme === "dark" ? styles.darkText : styles.lightText]}
      >
        {bookName}
      </Text>
      <Text
        style={[styles.detail, scheme === "dark" ? styles.darkText : styles.lightText]}
      >
        Description: {description}
      </Text>
      <Text
        style={[styles.detail, scheme === "dark" ? styles.darkText : styles.lightText]}
      >
        Author: {author}
      </Text>
      <Text
        style={[styles.detail, scheme === "dark" ? styles.darkText : styles.lightText]}
      >
        Rating: {rating}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#E6E6FA",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginTop: 8,
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#FFF",
  },
  bookImage: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default BookDetail;
