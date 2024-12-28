import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import Icon from "react-native-vector-icons/FontAwesome";

const CartButton = () => {
  const { cartCount } = useCart();
  const router = useRouter();

  const handleCartPress = () => {
    router.push("/CartScreen"); // Navigate to the CartScreen
  };

  console.log("Cart Count:", cartCount); // Debugging to check cart count

  return (
    <TouchableOpacity style={styles.button} onPress={handleCartPress}>
      <View style={styles.iconContainer}>
        <Icon name="shopping-cart" size={30} color="#fff" /> {/* Cart Icon */}
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
