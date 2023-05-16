import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LeaveRoomButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Leave the room</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LeaveRoomButton;