import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, Text, TouchableHighlight, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import Voice, { SpeechRecognizedEvent, SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const LOTTIE_JSON = require('./assets/hair1.json');

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [audioStart, setAudioStart] = useState(0);
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    setAppReady(false);
    setTimeout(() => {
      onLayout();
    }, 500);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onLayout = useCallback(async () => {
    setAppReady(true);
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('it-IT');
      console.log('called start');
      setAudioStart(1);
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      setAudioStart(0);
      setModalVisible(!isModalVisible);
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      setAudioStart(0);
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      setAudioStart(0);
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  const toggleModal = () => {
    Animated.timing(animation, {
      toValue: isModalVisible ? 0 : 1,
      duration: 500,
      useNativeDriver: true
    }).start();

    setModalVisible(!isModalVisible);
  };

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0]
        })
      }
    ]
  };

  const showAnimation = !isAppReady;

  return (
    <>
      {showAnimation && (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.splashContainer]}>
          <LottieView
            style={{
              width: '50%',
              height: '30%'
            }}
            source={LOTTIE_JSON}
            autoPlay
            loop
          />
        </View>
      )}
      {!showAnimation && (
        <>
          <LinearGradient
            colors={['#232526', '#66686a']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          />
          {audioStart === 0 && (
            <TouchableHighlight
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                zIndex: 10
              }}
              onPress={_startRecognizing}
            >
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  backgroundColor: '#66686a',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex'
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: '#232526',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                  }}
                >
                  <Feather name="mic" size={50} color="white" />
                </View>
              </View>
            </TouchableHighlight>
          )}
          {audioStart !== 0 && (
            <TouchableHighlight
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                zIndex: 10
              }}
              onPress={_stopRecognizing}
            >
              <LottieView
                source={require('./assets/audio2.json')}
                style={{
                  width: '50%',
                  height: '30%'
                }}
                autoPlay
                loop
              />
            </TouchableHighlight>
          )}

          <ScrollView style={[StyleSheet.absoluteFill, styles.textContainer]}>
            {/* <Text style={styles.stat}>{`Started: ${started}`}</Text>
            <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
            <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
            <Text style={styles.stat}>{`Error: ${error}`}</Text> */}
            {/* <Text style={styles.stat}>Results</Text> */}
            {results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
            {/* <Text style={styles.stat}>Partial Results</Text>
            {partialResults.map((result, index) => {
              return (
                <Text key={`partial-result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
            <Text style={styles.stat}>{`End: ${end}`}</Text> */}
          </ScrollView>
        </>
      )}
      <Modal isVisible={isModalVisible} style={{ margin: 0, justifyContent: 'flex-end', backgroundColor: 'red' }}>
        <Animated.View style={[{ backgroundColor: 'white', padding: 22 }, slideUp]}>
          <Text>{results}</Text>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </Animated.View>
      </Modal>
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
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232526'
  },
  textContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    zIndex: 9
    // backgroundColor: 'white'
  },
  button: {
    width: 50,
    height: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  stat: {
    textAlign: 'left',
    color: '#94a3b8',
    fontSize: 80,
    lineHeight: 80,
    margin: 30,
    padding: 5
  }
});
