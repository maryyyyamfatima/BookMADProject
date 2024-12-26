// SearchBar.js
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text); // Trigger the search function passed as a prop
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search books..."
        placeholderTextColor="#808080" // Adjust this to your theme
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  input: {
    height: 45,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});

export default SearchBar;
