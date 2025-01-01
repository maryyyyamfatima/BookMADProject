import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "@/config/firebase"; // Import your firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut from firebase/auth

// Create a context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to access the context
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData({ name: user.displayName, email: user.email }); // Set user data
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
