import React, { createContext, useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth"; // Ensure Firebase is properly set up

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Optional: To handle initial loading state

  useEffect(() => {
    // Listen to Firebase authentication state changes
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user);
        setIsLoggedIn(true);
      } else {
        console.log("User is not logged in");
        setIsLoggedIn(false);
      }
      setLoading(false); // Stop loading once we know the auth state
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message); // Inform the user
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
