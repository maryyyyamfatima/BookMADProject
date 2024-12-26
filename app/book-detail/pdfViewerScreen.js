import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useSearchParams } from "expo-router/build/hooks";

const PdfViewerScreen = () => {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");

  console.log("PDF URL:", pdfUrl); // Log the URL to ensure it's being passed correctly

  if (!pdfUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No PDF URL provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`,
        }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default PdfViewerScreen;
