import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "@/context/AuthContext"; // Import the custom hook

const CartButton = () => {
  const { cartCount } = useCart();
  const { isLoggedIn, loading } = useAuth(); // Include loading state
  const router = useRouter();

  const handleCartPress = () => {
    if (loading) {
      alert("Checking login status...");
      return;
    }

    if (!isLoggedIn) {
      alert("Please log in to view your cart.");
      router.push("/LoginScreen");
      return;
    }

    router.push("/CartScreen");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCartPress}>
      <View style={styles.iconContainer}>
        <Icon name="shopping-cart" size={30} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: "absolute", // Align the button to the right
    right: 16,
    top: 60, // Adjust based on your layout
  },
  iconContainer: {
    position: "relative",
  },
  cartCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff0000", // Red background for the count bubble
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CartButton;
