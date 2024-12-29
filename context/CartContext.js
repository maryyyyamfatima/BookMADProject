import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login status

  // Helper to persist cart to local storage
  const saveCartToStorage = async (cart) => {
    try {
      await AsyncStorage.setItem("guestCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  };

  // Helper to load cart from local storage
  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("guestCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      return [];
    }
  };

  // Load cart items on app startup (for guest users)
  useEffect(() => {
    const initializeCart = async () => {
      const storedCart = await loadCartFromStorage();
      setCartItems(storedCart);
    };
    initializeCart();
  }, []);

  // Compute cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add item to cart
  const addToCart = (book) => {
    console.log("Adding to cart:", book);
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.bookId === book.bookId);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.bookId === book.bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...book, quantity: 1 }];
      console.log("Updated Cart:", updatedCart); // Debugging
      if (!isLoggedIn) saveCartToStorage(updatedCart); // Save to local storage for guest users
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    console.log("Removing from cart:", bookId); // Debugging
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Keep only items with quantity > 0
      console.log("Updated Cart:", updatedCart); // Debugging
      if (!isLoggedIn) saveCartToStorage(updatedCart); // Save to local storage for guest users
      return updatedCart;
    });
  };

  // Sync guest cart to user's cart upon login
  const syncCartOnLogin = async (userCart) => {
    const guestCart = await loadCartFromStorage();
    const mergedCart = [...userCart];

    guestCart.forEach((guestItem) => {
      const existingItem = mergedCart.find(
        (item) => item.bookId === guestItem.bookId
      );
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        mergedCart.push(guestItem);
      }
    });

    setCartItems(mergedCart);
    await AsyncStorage.removeItem("guestCart"); // Clear guest cart after sync
    console.log("Merged Cart After Login:", mergedCart); // Debugging
  };

  // Simulate login and logout
  const login = () => {
    console.log("Logging in...");
    syncCartOnLogin([]); // Pass empty array or user cart if using a backend
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log("Logging out...");
    saveCartToStorage(cartItems); // Save current cart to guest cart
    setIsLoggedIn(false);
    setCartItems([]); // Clear cart on logout
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
