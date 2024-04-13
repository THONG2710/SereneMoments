import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile/Profile';
import { AccountParamlist } from '../../StoryBoard/AccountStoryboard';
import AuthenticationNavigation from '../../Navigation/AuthenticationNavigation';
import EditProfile from './EditProfile/EditProfile';
import MomentHistory from './MomentHistory/MomentHistory';
import MyFriend from './MyFriends/MyFriend';
import DiariesHistory from './DiariesHistory/DiariesHistory';
import DetailTodoListHistory from './DetailTodoListHistory/DetailTodoListHistory';
import TodolistHistory from './TodoListHistory/TodolistHistory';
import DetailMomentHistory from './DetailMomentHistory/DetailMomentHistory';

const stack = createStackNavigator<AccountParamlist>();

const AccountScreen = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="profileScreen" component={Profile} />
      <stack.Screen name='EditProfile' component={EditProfile}/>
      <stack.Screen name='MomentHistor' component={MomentHistory}/>
      <stack.Screen name='MyFriends' component={MyFriend}/>
      <stack.Screen name='DiariesHistory' component={DiariesHistory}/>
      <stack.Screen name='DetailTodoListHistory' component={DetailTodoListHistory}/>
      <stack.Screen name='TodoListHistory' component={TodolistHistory}/>
      <stack.Screen name='DetailMomentHistory' component={DetailMomentHistory}/>


    </stack.Navigator>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
