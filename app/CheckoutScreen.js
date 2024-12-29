import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useCart } from "@/context/CartContext";
import { database } from "@/config/firebase";
import { ref, set, push } from "firebase/database";

const CheckoutScreen = () => {
  const router = useRouter();
  const { cartItems, setCartItems } = useCart(); // Destructure setCartItems from useCart

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // State for input fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // Track errors for input fields
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    country: false,
  });

  // State for Cash on Delivery selection
  const [isCODSelected, setIsCODSelected] = useState(false);

  const handleConfirmOrder = () => {
    let formValid = true;
    let updatedErrors = { ...errors };

    // Check if all fields are filled
    if (!name) {
      updatedErrors.name = true;
      formValid = false;
    }
    if (!address) {
      updatedErrors.address = true;
      formValid = false;
    }
    if (!city) {
      updatedErrors.city = true;
      formValid = false;
    }
    if (!state) {
      updatedErrors.state = true;
      formValid = false;
    }
    if (!zip) {
      updatedErrors.zip = true;
      formValid = false;
    }
    if (!country) {
      updatedErrors.country = true;
      formValid = false;
    }

    if (!isCODSelected) {
      Alert.alert("Error", "Please select a payment method.");
      return;
    }

    setErrors(updatedErrors); // Update the error states

    if (!formValid) {
      Alert.alert(
        "Error",
        "Please fill in all fields before confirming your order."
      );
      return;
    }

    const order = {
      customer: {
        name,
        address,
        city,
        state,
        zip,
        country,
      },
      paymentMethod: isCODSelected ? "Cash on Delivery" : "Other",
      items: cartItems.map((item) => ({
        bookName: item.bookName,
        quantity: item.quantity,
        price: item.price,
      })),
      total: subtotal,
      timestamp: new Date().toISOString(),
    };

    const ordersRef = ref(database, "orders");
    const newOrderRef = push(ordersRef);
    set(newOrderRef, order)
      .then(() => {
        // Clear the cart after successful order placement
        setCartItems([]); // Reset the cart

        Alert.alert(
          "Order Confirmed!",
          "Your order has been successfully placed.",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate back to the home screen
                router.push("/(tabs)");
              },
            },
          ]
        );
      })
      .catch((error) => {
        Alert.alert("Error", "There was an issue placing your order.");
        console.error(error);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText style={styles.headerText}>Checkout</ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
          {cartItems.map((item) => (
            <View key={item.bookId} style={styles.orderItem}>
              <ThemedText style={styles.itemName}>
                {item.bookName} (x{item.quantity})
              </ThemedText>
              <ThemedText style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </ThemedText>
            </View>
          ))}
          <View style={styles.separator} />
          <ThemedText style={styles.totalAmount}>
            Total:{" "}
            <ThemedText style={styles.price}>${subtotal.toFixed(2)}</ThemedText>
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Shipping Information
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.name && styles.errorInput,
            ]}
            placeholder="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (text) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.address && styles.errorInput,
            ]}
            placeholder="Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              if (text) setErrors((prev) => ({ ...prev, address: false }));
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.city && styles.errorInput,
            ]}
            placeholder="City"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              if (text) setErrors((prev) => ({ ...prev, city: false }));
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.state && styles.errorInput,
            ]}
            placeholder="State"
            value={state}
            onChangeText={(text) => {
              setState(text);
              if (text) setErrors((prev) => ({ ...prev, state: false }));
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.zip && styles.errorInput,
            ]}
            placeholder="ZIP Code"
            value={zip}
            onChangeText={(text) => {
              setZip(text);
              if (text) setErrors((prev) => ({ ...prev, zip: false }));
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[
              styles.input,
              styles.themedInput,
              errors.country && styles.errorInput,
            ]}
            placeholder="Country"
            value={country}
            onChangeText={(text) => {
              setCountry(text);
              if (text) setErrors((prev) => ({ ...prev, country: false }));
            }}
            placeholderTextColor="#aaa"
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
          <TouchableOpacity
            style={[
              styles.paymentOptionContainer,
              isCODSelected ? styles.selected : styles.unselected,
            ]}
            onPress={() => setIsCODSelected(!isCODSelected)}
          >
            <ThemedText style={styles.paymentOptionText}>
              Cash on Delivery
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
          <ThemedText style={styles.buttonText}>Place Order</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 8,
  },
  section: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  themedInput: {
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  errorInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "#4CAF50",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#4CAF50",
  },
  separator: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  paymentOptionContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "#4CAF50",
  },
  unselected: {
    backgroundColor: "#f5f5f5",
  },
  paymentOptionText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});

export default CheckoutScreen;
