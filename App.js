import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Join A Chat Room' }}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={({ route }) => ({ title: route.params.roomId })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;