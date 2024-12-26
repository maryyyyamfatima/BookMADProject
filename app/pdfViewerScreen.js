import React from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";

const PdfViewerScreen = ({ route }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl }}
        style={styles.pdf}
        onError={(error) => {
          console.error("Failed to load PDF:", error);
        }}
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
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default PdfViewerScreen;
