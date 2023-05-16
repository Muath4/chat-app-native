import * as signalR from '@microsoft/signalr';

let connection = null;

export const connect = async (url) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

  await connection.start();
};

export const disconnect = () => {
  if (connection) {
    connection.stop();
  }
};

export const joinRoom = (roomId, userName) => {
  connection.invoke('JoinRoom', roomId, userName);
};

export const leaveRoom = (roomId, userName) => {
  connection.invoke('LeaveRoom', roomId, userName);
};

export const sendMessage = (roomId, user, message) => {
  connection.invoke('SendMessage', roomId, user, message);
};

export const onMessageReceived = (callback) => {
  connection.on('ReceiveMessage', callback);
};

export const onUpdateUserCount = (callback) => {
  connection.on('UpdateUserCount', callback);
};