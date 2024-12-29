import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import Pdf from "react-native-pdf";
import ReactNativeBlobUtil from "react-native-blob-util"; // Import blob-util
import { useSearchParams } from "expo-router/build/hooks";

const PdfViewerScreen = () => {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");
  const [loading, setLoading] = useState(true);
  const [localPdfPath, setLocalPdfPath] = useState(null);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const downloadPdf = async () => {
    try {
      // Define local path to save the PDF
      const localPath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/downloaded.pdf`;

      // Use react-native-blob-util to download the file
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localPath, // Save the file to this path
        trustAll: true, // Bypass SSL certificate validation
      }).fetch("GET", pdfUrl);

      setLocalPdfPath(response.path()); // Set the local path to display in the Pdf component
      setLoading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Alert.alert("Error", "Failed to download PDF. Please try again.");
    }
  };

  useEffect(() => {
    if (pdfUrl && isValidUrl(pdfUrl)) {
      downloadPdf();
    }
  }, [pdfUrl]);

  if (!pdfUrl || !isValidUrl(pdfUrl)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Invalid or missing PDF URL. Please provide a valid link.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {localPdfPath && (
        <Pdf
          source={{ uri: localPdfPath }}
          onLoadComplete={(numberOfPages) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page} of ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log("Error loading PDF:", error);
            Alert.alert("Error", "Failed to load PDF. Please try again.");
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default PdfViewerScreen;
