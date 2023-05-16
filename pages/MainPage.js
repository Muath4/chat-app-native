import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppLogo from '../components/AppLogo';
import GithubLogo from '../components/GithubLogo';

const MainPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <AppLogo />
        <GithubLogo />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter room ID"
        value={roomId}
        onChangeText={setRoomId}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChatPage', { name, roomId })}
        disabled={!name || !roomId}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MainPage;