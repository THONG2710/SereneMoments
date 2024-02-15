import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile/Profile';

const stack = createStackNavigator();

const AccountScreen = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="ProfileScreen" component={Profile} />
    </stack.Navigator>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
