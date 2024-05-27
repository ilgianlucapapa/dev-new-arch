import React, { useEffect, useState, useRef } from 'react';
import { get } from 'lodash';
import { View, Animated, PanResponder, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const DraggableComponents = ({ children, onCamera }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: pan.y
            }
          ],
          {
            useNativeDriver: false
          }
        )(e, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [minimize, setMinimize] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const micHandler = async () => {
    setMic(!mic);
  };
  const cameraHandler = async () => {
    setCamera(!camera);
    onCamera();
  };
  const flipCameraHandler = async () => {
    setCamera(!camera);
  };
  const minimizeMaximizeHandler = () => {
    setMinimize(!minimize);
  };
  const fullScreenHandler = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        bottom: 50,
        position: 'absolute',
        left: 0,
        right: 0
      }}
      {...panResponder.panHandlers}
    >
      <View style={fullScreen ? styles.boxFullScreen : minimize ? styles.boxMinimize : styles.box}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.icons} onPress={cameraHandler}>
            <Foundation name="camera" size={20} color={'#333'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons} onPress={micHandler}>
            <Foundation name="microphone" size={20} color={'#333'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons} onPress={flipCameraHandler}>
            <MaterialIcons name={'flip-camera-ios'} size={20} color={'#333'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons} onPress={fullScreenHandler}>
            <MaterialIcons name={fullScreen ? 'fullscreen-exit' : 'fullscreen'} size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons} onPress={minimizeMaximizeHandler}>
            <MaterialIcons name={'minimize'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Animated.View>
  );
};

export default DraggableComponents;
