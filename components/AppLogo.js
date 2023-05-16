import React from 'react';
import { Image } from 'react-native';

const AppLogo = () => (
  <Image source={require('../assets/logo.png')} style={{ width: 40, height: 40 }} />
);

export default AppLogo;
