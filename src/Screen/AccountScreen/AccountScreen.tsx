import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile/Profile';
import { AccountParamlist } from '../../StoryBoard/AccountStoryboard';
import AuthenticationNavigation from '../../Navigation/AuthenticationNavigation';
import EditProfile from './EditProfile/EditProfile';

const stack = createStackNavigator<AccountParamlist>();

const AccountScreen = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="profileScreen" component={Profile} />
      <stack.Screen name='EditProfile' component={EditProfile}/>
    </stack.Navigator>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
