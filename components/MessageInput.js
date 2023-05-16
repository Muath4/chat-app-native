import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const MessageInput = ({ message, setMessage }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Message"
      value={message}
      onChangeText={setMessage}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
});

export default MessageInput;