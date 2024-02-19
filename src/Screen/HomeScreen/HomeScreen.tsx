import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListDiariesScreen from './ListDiariesScreen/ListDiariesScreen';
import CreateDiaryScreen from './CreateDiaryScreen/CreateDiaryScreen';
import {HomeParamlist} from '../../StoryBoard/HomeStoryboard';

const stack = createStackNavigator<HomeParamlist>();

const HomeScreen: React.FC = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="ListDiariesScreen" component={ListDiariesScreen} />
      <stack.Screen name="CreateDiaryScreen" component={CreateDiaryScreen} />
    </stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
