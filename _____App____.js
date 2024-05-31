import React, { useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
// import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedAppLoader from './AnimatedAppLoader';
import Constants from 'expo-constants';
import DraggableComponents from './DraggableComponents/DraggableComponents';

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  const webViewRef = useRef(null);
  const [logMessages, setLogMessages] = React.useState([]);

  const onContentProcessDidTerminate = () => webViewRef.current?.reload();
  //   {/* https://s3.eu-west-1.amazonaws.com/chat.myclienteling.com/whitelabel/v_3/index.html */}
  /**
   * @function handleMessage
   * @param {String} message
   * @description this is the message from React PWA. Handle it here
   */
  const handleMessage = (message = null) => {
    console.log('************************************');
    console.log('************************************');
    console.log('MESSAGE RECEIVED');
    console.log('************************************');
    const messageReceived = message?.nativeEvent?.data;
    console.log(JSON.stringify(messageReceived));
    setLogMessages(prevMessages => [...prevMessages, messageReceived]);
    console.log('************************************');
    console.log('************************************');
    console.log('************************************');
  };

  /**
   * @function callWebAppFunction
   * @description send any msg from React native app to PWA web
   * @description this method will also be fired when the web view loaded succesfully - did mount 1st time - onLoad prop in <Webview>
   */
  const callWebAppFunction = () => {
    if (webViewRef.current) {
      console.log('**************************');
      console.log('**************************');
      console.log('**************************');
      console.log('CHANGE VIDEO SOURCE');
      console.log('**************************');
      console.log('**************************');
      console.log('**************************');
      const script = `console.log("onChangeVideoSource: ", window.onChangeVideoSource); if (window.onChangeVideoSource) { window.onChangeVideoSource(); }`;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const injectedJavaScript = `
    (function() {
      const originalLog = console.log;
      console.log = function(...args) {
        window.ReactNativeWebView.postMessage(JSON.stringify(args));
        originalLog.apply(console, args);
      };
    })();
  `;

  return (
    <>
      <AnimatedAppLoader image={{ uri: Constants.expoConfig.splash.image }}>
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
          {logMessages && logMessages.length > 0 && (
            <ScrollView style={styles.scrollView}>
              {logMessages.map((msg, index) => (
                <Text key={index}>{msg}</Text>
              ))}
            </ScrollView>
          )}
        </View>
        <DraggableComponents onCamera={callWebAppFunction}>
          <WebView
            ref={webViewRef}
            onContentProcessDidTerminate={onContentProcessDidTerminate}
            style={styles.wwContainer}
            originWhitelist={['*']}
            // source={{ uri: 'https://s3.eu-west-1.amazonaws.com/chat.myclienteling.com/whitelabel/v_3/index.html' }}
            source={{ uri: 'https://google.com' }}
            startInLoadingState
            mediaCapturePermissionGrantType="grant"
            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
            javaScriptEnabled
            domStorageEnabled
            cacheEnabled
            thirdPartyCookiesEnabled
            allowsProtectedMedia
            allowUniversalAccessFromFileURLs
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            injectedJavaScript={injectedJavaScript}
            onMessage={handleMessage}
            // onLoadEnd={callWebAppFunction}
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
        </DraggableComponents>
      </AnimatedAppLoader>
    </>
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
    // position: 'absolute',
    // bottom: 50,
    // left: 0,
    // right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 250,
    padding: 2,
    margin: 2,
    borderRadius: 5,
    overflow: 'hidden',
    zIndex: 10
  },
  scrollView: {
    backgroundColor: 'floralwhite',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10
  }
});
