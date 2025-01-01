import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { router } from "expo-router";

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth(); // Get login status from AuthContext
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      const subtotal = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

      router.push({
        pathname: "/CheckoutScreen",
        params: {
          cartItems: JSON.stringify(cartItems),
          subtotal: subtotal,
        },
      });
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleContinueShopping = () => {
    router.push("/(tabs)");
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>
          You need to be logged in to view your cart.
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/LoginScreen")} // Redirect to login screen
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>

      {loading ? (
        <Text style={styles.emptyCartText}>Loading your cart...</Text>
      ) : cartItems.length > 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {cartItems.map((item) => (
            <View key={item.bookId} style={styles.cartItem}>
              <Image
                source={{ uri: item.bookCover }}
                style={styles.bookCover}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.bookTitle}>{item.bookName}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
                <Text style={styles.bookPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.bookId)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.subtotalText}>
            Subtotal: $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </Text>

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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 16,
    color: "#FFF",
    marginHorizontal: 10,
  },
  subtotalText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginVertical: 10,
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
