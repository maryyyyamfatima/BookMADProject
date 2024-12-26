import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const BookDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const bookName = searchParams.get("bookName");
  const description = searchParams.get("description");
  const author = searchParams.get("author");
  const rating = searchParams.get("rating");
  const bookCover = searchParams.get("bookCover");
  const price = parseFloat(searchParams.get("price") || "0");
  const pdfUrl = searchParams.get("pdfUrl");

  const { isLoggedIn } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleViewCart = () => {
    if (isLoggedIn) {
      router.push("./CartScreen");
    } else {
      router.push("/LoginScreen");
    }
  };

  const totalPrice = cartCount * price;

  if (!id || !bookName || !description || !author || !rating || !bookCover || !price || !pdfUrl) {
    return <Text style={styles.errorText}>Missing book details or cover image.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Top Half: Background and Book Info */}
      <View style={styles.topHalf}>
        <ImageBackground
          source={{ uri: bookCover }}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>
        <View style={styles.bookInfoContainer}>
          <Image source={{ uri: bookCover }} style={styles.bookCover} />
          <Text style={styles.title}>{bookName}</Text>
          <Text style={styles.author}>{author}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>Rating: {rating}</Text>
            <Text style={styles.price}>Price: ${price}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Half: Description and Buttons */}
      <ScrollView style={styles.bottomHalf}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() =>
            router.push({
              pathname: `./pdfViewerScreen`,
              params: {
                pdfUrl: pdfUrl || "N/A",
              },
              })
            }
    >
          <Text style={styles.buttonText}>Start Reading</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Cart Bottom Bar (Only visible when items are in the cart) */}
      {cartCount > 0 && (
        <View style={styles.cartBottomBar}>
          <View style={styles.cartInfoContainer}>
            <Text style={styles.cartText}>
              Items: {cartCount} | Total: ${totalPrice.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
            <Text style={styles.cartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topHalf: {
    flex: 1.4, // Increase the flex value to make the top half larger
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bookInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  bookCover: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#BBB",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    color: "#FFF",
  },
  price: {
    fontSize: 16,
    color: "#FFF",
  },
  bottomHalf: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#111",
  },
  descriptionTitle: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#BBB",
    lineHeight: 24,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#8a2be2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#555",
  },
  cartBottomBar: {
    backgroundColor: "#8a2be2",  // Purple background
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cartInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#6a0dad",  // Darker purple
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default BookDetail;
