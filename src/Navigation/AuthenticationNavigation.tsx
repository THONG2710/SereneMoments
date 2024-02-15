import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../Screen/Authentication/Login/Login';

const tab = createBottomTabNavigator();

const AuthenticationNavigation = () => {
  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name='LoginScreen' component={Login}/>
      </tab.Navigator>
    </NavigationContainer>
  )
}

export default AuthenticationNavigation