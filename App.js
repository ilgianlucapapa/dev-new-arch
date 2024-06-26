import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import ImageColors from 'react-native-image-colors';

const App = () => {
  const [dominantColor, setDominantColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageUrl = 'https://your-image-url-here.jpg'; // Replace with your image URL

  useEffect(() => {
    const fetchDominantColor = async () => {
      try {
        const result = await ImageColors.getColors(imageUrl, {
          fallback: '#000000',
          cache: true,
          key: imageUrl
        });

        if (result.platform === 'android') {
          setDominantColor(result.dominant);
        } else if (result.platform === 'ios') {
          setDominantColor(result.primary);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDominantColor();
  }, [imageUrl]);

  return (
    <View style={[styles.container, { backgroundColor: dominantColor }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Text style={styles.text}>Dominant Color: {dominantColor}</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  }
});

export default App;
