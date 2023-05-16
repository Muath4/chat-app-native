import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MessageList from '../components/MessageList';
import UserCountLabel from '../components/UserCountLabel';
import LoadingCircle from '../components/LoadingCircle';
import { connect, disconnect, joinRoom, leaveRoom, sendMessage, onMessageReceived, onUpdateUserCount } from '../utils/signalR';
import MessageInput from '../components/MessageInput';
import SendButton from '../components/SendButton';
import LeaveRoomButton from '../components/LeaveRoomButton';

const ChatPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, roomId } = route.params;

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef();

  useEffect(() => {
    initializeChat();

    return () => {
      leaveRoom(roomId, name);
      disconnect();
    };
  }, []);

  const initializeChat = async () => {
    setLoading(true);
    let retryCount = 0;
  
    const connectAndJoin = async () => {
      try {
        await connect('https://mchatapp.azurewebsites.net/chatHub/');
        setLoading(false);
        joinRoom(roomId, name);
        subscribeToMessages();
        subscribeToUserCountUpdates();
      } catch (error) {
        console.error('Connection error:', error);
        if (retryCount < 3) {
          retryCount++;
          console.log(`Retry attempt ${retryCount}`);
          await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
          await connectAndJoin();
        } else {
          setLoading(false);
          navigation.goBack();
        }
      }
    };
  
    await connectAndJoin();
  };

  const subscribeToMessages = () => {
    onMessageReceived((user, message) => {
      setMessages((prevMessages) => [...prevMessages, { user, text: message }]);
      messagesEndRef.current.scrollToEnd({ animated: true });
    });
  };

  const subscribeToUserCountUpdates = () => {
    onUpdateUserCount((count) => {
      setUserCount(count);
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(roomId, name, message);
      setMessage('');
    }
  };

  const handleLeaveRoom = () => {
    navigation.goBack();
  };

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <UserCountLabel userCount={userCount} />
      <MessageList messages={messages} ref={messagesEndRef} />
      <View style={styles.inputContainer}>
        <MessageInput message={message} setMessage={setMessage} />
        <SendButton onPress={handleSendMessage} />
        <LeaveRoomButton onPress={handleLeaveRoom} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ChatPage;