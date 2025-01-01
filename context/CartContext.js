import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveCartToStorage = async (cart) => {
    try {
      await AsyncStorage.setItem("guestCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("guestCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      return [];
    }
  };

  useEffect(() => {
    const initializeCart = async () => {
      const storedCart = await loadCartFromStorage();
      setCartItems(storedCart);
    };
    initializeCart();
  }, []);

  // Use `useMemo` to ensure `cartCount` recalculates when `cartItems` changes
  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (book) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.bookId === book.bookId);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.bookId === book.bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...book, quantity: 1 }];
      if (!isLoggedIn) saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      if (!isLoggedIn) saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

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
    await AsyncStorage.removeItem("guestCart");
  };

  const login = () => {
    syncCartOnLogin([]);
    setIsLoggedIn(true);
  };

  const logout = () => {
    saveCartToStorage(cartItems);
    setIsLoggedIn(false);
    setCartItems([]);
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
