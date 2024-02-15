import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigation from './AuthenticationNavigation';
import AuthorizedNavigation from './AuthorizedNavigation';
import { RootParamlist } from '../StoryBoard/RootStoryboard';

const stack = createStackNavigator<RootParamlist>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen
          name="AuthenticationNavigation"
          component={AuthenticationNavigation}
        />
        <stack.Screen
          name="AuthorizedNavigation"
          component={AuthorizedNavigation}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
