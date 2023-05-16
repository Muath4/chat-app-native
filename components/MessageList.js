import React, { forwardRef } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MessageList = forwardRef(({ messages }, ref) => (
  <FlatList
    ref={ref}
    data={messages}
    renderItem={({ item }) => (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{item.user}: {item.text}</Text>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
));

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
  },
});

export default MessageList;