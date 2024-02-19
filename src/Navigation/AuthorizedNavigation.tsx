import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import ListDiariesScreen from '../Screen/HomeScreen/ListDiariesScreen/ListDiariesScreen';
import MomentScreen from '../Screen/MomentScreen/MomentScreen';
import ChatScreen from '../Screen/ChatScreen/ChatScreen';
import TodoListScreen from '../Screen/TodoListScreen/TodoListScreen';
import AccountScreen from '../Screen/AccountScreen/AccountScreen';
import {AuthorizedParamlist} from '../StoryBoard/AuthorizedStoryboard';

const tab = createBottomTabNavigator<AuthorizedParamlist>();

const AuthorizedNavigation: React.FC = () => {
  return (
    <tab.Navigator screenOptions={{headerShown: false}}>
      <tab.Screen name="HomeScreen" component={HomeScreen} />
      <tab.Screen name="MomentScreen" component={MomentScreen} />
      <tab.Screen name="TodoListScreen" component={TodoListScreen} />
      <tab.Screen name="ChatScreen" component={ChatScreen} />
      <tab.Screen name="AccountScreen" component={AccountScreen} />
    </tab.Navigator>
  );
};

export default AuthorizedNavigation;
