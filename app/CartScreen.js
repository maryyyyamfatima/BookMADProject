import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookName = searchParams.get("bookName") || "Unknown Book";
  const author = searchParams.get("author") || "Unknown Author";
  const bookCover = searchParams.get("bookCover") || "";
  const price = parseFloat(searchParams.get("price") || "0");

  const handleProceedToCheckout = () => {
    // Navigate to a checkout or payment screen
    router.push("/CheckoutScreen");
  };

  const handleContinueShopping = () => {
    // Navigate back to the main book list or previous page
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>

      {bookCover ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.cartItem}>
            <Image source={{ uri: bookCover }} style={styles.bookCover} />
            <View style={styles.detailsContainer}>
              <Text style={styles.bookTitle}>{bookName}</Text>
              <Text style={styles.bookAuthor}>by {author}</Text>
              <Text style={styles.bookPrice}>${price.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.cartActions}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleProceedToCheckout}
            >
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinueShopping}
            >
              <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#BBB",
    marginVertical: 5,
  },
  bookPrice: {
    fontSize: 16,
    color: "#8a2be2",
  },
  cartActions: {
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: "#8a2be2",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});

export default CartScreen;
