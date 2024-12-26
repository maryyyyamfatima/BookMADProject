import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSearchParams } from "expo-router/build/hooks";

const CheckoutScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookName = searchParams.get("bookName") || "Unknown Book";
  const cartCount = searchParams.get("cartCount") || "Unknown Author";
  const bookCover = searchParams.get("bookCover") || "";
  const price = parseFloat(searchParams.get("price") || "0");
  const subtotal = parseFloat(searchParams.get("subtotal") || "0");

  // State for input fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    console.log("Proceeding to payment...");
    router.push("/PaymentScreen");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText style={styles.headerText}>Checkout</ThemedText>

        {/* Order Summary Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
          <View style={styles.orderItem}>
            <ThemedText style={styles.itemName}>{bookName}</ThemedText>
            <ThemedText style={styles.itemPrice}>{price}</ThemedText>
          </View>
          <View style={styles.separator} />
          <ThemedText style={styles.totalAmount}>
            Total:{"  "}
            <ThemedText style={styles.price}>{"$" + subtotal}</ThemedText>
          </ThemedText>
        </ThemedView>

        {/* Shipping Information */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Shipping Information
          </ThemedText>
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="State"
            value={state}
            onChangeText={setState}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="ZIP Code"
            value={zip}
            onChangeText={setZip}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            placeholderTextColor="#aaa"
          />
        </ThemedView>

        {/* Payment Details */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Details</ThemedText>
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.themedInput]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <ThemedText style={styles.buttonText}>Proceed to Payment</ThemedText>
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
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  price: {
    color: "#4CAF50",
  },
});

export default CheckoutScreen;
