// VideoItem.js
import React, { forwardRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, PixelRatio, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoItem = forwardRef(
  ({ videoSource }, ref) => (
    console.log('videoSource', videoSource),
    (
      <Video
        ref={ref}
        style={styles.video}
        source={{ uri: videoSource }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        isMuted
      />
    )
  )
);

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: '#000'
  }
});

export default VideoItem;
