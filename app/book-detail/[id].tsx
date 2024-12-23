import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { useAuth } from '@/context/AuthContext'; // Using the custom useAuth hook

const BookDetail = () => {
  const router = useRouter(); // Use useRouter hook to get navigation
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const bookName = searchParams.get("bookName");
  const description = searchParams.get("description");
  const author = searchParams.get("author");
  const rating = searchParams.get("rating");
  const bookCover = searchParams.get("bookCover");

  const { isLoggedIn } = useAuth(); // Access the login state from the context

  const [cartCount, setCartCount] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isBottomBarVisible, setBottomBarVisible] = useState(false);
  const scheme = useColorScheme();

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    setBottomBarVisible(true);
  };

  const handleStartReading = () => {
    setIsReading(true);
  };

  const handleViewCart = () => {
    if (isLoggedIn) {
      router.push("./CartScreen"); // Navigate to the Cart screen if logged in
    } else {
      router.push("/LoginScreen"); // Navigate to the Login screen if not logged in
    }
  };

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
      <Image source={{ uri: bookCover }} style={styles.bookImage} />
      <Text
        style={[
          styles.title,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {bookName}
      </Text>
      <Text
        style={[
          styles.detail,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Description: {description}
      </Text>
      <Text
        style={[
          styles.detail,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Author: {author}
      </Text>
      <Text
        style={[
          styles.detail,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Rating: {rating}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          color="#8a2be2"
        />
        <Button
          title={isReading ? "Reading..." : "Start Reading"}
          onPress={handleStartReading}
          disabled={isReading}
          color="#8a2be2"
        />
      </View>

      {isBottomBarVisible && (
        <View style={styles.bottomBar}>
          <Text style={styles.bottomBarText}>Quantity: {cartCount}</Text>
          <Text style={styles.bottomBarText}>Price: ${cartCount * 10}</Text>
          <TouchableOpacity style={styles.viewCartButton} onPress={handleViewCart}>
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 30,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#8a2be2",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomBarText: {
    color: "#FFF",
    fontSize: 16,
  },
  viewCartButton: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
  },
  viewCartButtonText: {
    color: "#8a2be2",
    fontWeight: "bold",
  },
});

export default BookDetail;
