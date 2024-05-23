import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text } from 'react-native';
// import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';

export default function App() {
  const webViewRef = useRef(null);
  const onContentProcessDidTerminate = () => webViewRef.current?.reload();

  return (
    <>
      <LinearGradient
        colors={['#232526', '#66686a']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <LottieView
          source={require('./assets/camera.json')}
          style={{
            width: '50%',
            height: '30%'
          }}
          autoPlay
          loop
        />
      </View>
      <WebView
        ref={webViewRef}
        onContentProcessDidTerminate={onContentProcessDidTerminate}
        style={styles.wwContainer}
        originWhitelist={['*']}
        source={{ uri: 'https://www.moncler.com' }}
        startInLoadingState
        renderLoading={() => {
          return (
            <ActivityIndicator
              color="white"
              size="large"
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
            />
          );
        }}
      />
    </>
    //   {/* https://s3.eu-west-1.amazonaws.com/chat.myclienteling.com/whitelabel/v_3/index.html */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  wwContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 250,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 10
  }
});
