import React, { useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import { useCart } from "@/context/CartContext"; // Use Cart context to get cart data
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native"; // For screen focus detection

const CartButton = () => {
  const { cartCount } = useCart(); // Retrieve the cart count from the context
  const router = useRouter();

  // Force re-render on focus
  useFocusEffect(
    useCallback(() => {
      // Simply being inside this effect will trigger re-renders when focused
      console.log("Cart Button Focused. Cart Count:", cartCount);
    }, [cartCount]) // Dependency ensures this runs when cartCount changes
  );

  const handleCartPress = () => {
    router.push("/CartScreen"); // Navigate to the CartScreen
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
    top: 55,
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
