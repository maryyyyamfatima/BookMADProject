import React from "react";
import { StyleSheet, View } from "react-native";
// import Pdf from "react-native-pdf";
import { WebView } from "react-native-webview";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";

const PdfViewerScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");

  return (
    <View style={styles.container}>
      <WebView source={{ uri: pdfUrl }} style={styles.webview} />
    </View>
    // <View style={styles.container}>
    //   <Pdf
    //     source={{ uri: pdfUrl }}
    //     style={styles.pdf}
    //     onError={(error) => {
    //       console.error("Failed to load PDF:", error);
    //     }}
    //   />
    // </View>
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
