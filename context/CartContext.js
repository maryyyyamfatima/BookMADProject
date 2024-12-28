import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (book) => {
    console.log("Adding to cart:", book);
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.bookId === book.bookId);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.bookId === book.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Updated Cart:", updatedCart); // Debugging
        return updatedCart;
      }
      const newCart = [...prevCart, { ...book, quantity: 1 }];
      console.log("New Cart:", newCart); // Debugging
      return newCart;
    });
  };

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
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
