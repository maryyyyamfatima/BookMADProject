import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state from AsyncStorage on app startup
  useEffect(() => {
    const loadAuthState = async () => {
      const storedLoginState = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(storedLoginState === "true");
    };
    loadAuthState();
  }, []);

  // Simulate login
  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem("isLoggedIn", "true");
  };

  // Simulate logout
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
