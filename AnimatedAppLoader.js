import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import AnimatedSplashScreen from './AnimatedSplashScreen';

const AnimatedAppLoader = ({ image, children }) => {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
};

export default AnimatedAppLoader;
