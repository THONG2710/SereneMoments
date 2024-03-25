import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BoxChatScreen from './BoxChat/BoxChat';
import { ChatParamlist } from '../../StoryBoard/ChatStoryboard';
import Chat from './Chat/Chat';

const stack = createStackNavigator<ChatParamlist>();

const ChatScreen = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Chat" component={Chat} />
      <stack.Screen name="BoxChatScreen" component={BoxChatScreen} />
    </stack.Navigator>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
