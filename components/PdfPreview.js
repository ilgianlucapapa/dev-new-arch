import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfPreview = ({ pdfUrl }) => {
  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
        activityIndicator={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default PdfPreview;
