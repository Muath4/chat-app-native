import React from 'react';
import { Image, TouchableOpacity, Linking } from 'react-native';

const GithubLogo = () => {
  const openGithub = () => {
    Linking.openURL('https://github.com/Muath4/chat-app-native');
  };

  return (
    <TouchableOpacity onPress={openGithub}>
      <Image source={require('../assets/github-mark.svg')} style={{ width: 40, height: 40 }} />
    </TouchableOpacity>
  );
};

export default GithubLogo;
