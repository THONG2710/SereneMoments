import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListDiariesScreen from './ListDiariesScreen/ListDiariesScreen';
import CreateDiaryScreen from './CreateDiaryScreen/CreateDiaryScreen';
import {HomeParamlist} from '../../StoryBoard/HomeStoryboard';
import ListFriend from './ListFriends/ListFriend';
import ListOtherUser from './ListOtherUser/ListOtherUser/ListOtherUser';
import OtherUsers from './ListOtherUser/OtherUser';

const stack = createStackNavigator<HomeParamlist>();

const HomeScreen: React.FC = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
      <stack.Screen name="ListDiariesScreen" component={ListDiariesScreen} />
      <stack.Screen name="CreateDiaryScreen" component={CreateDiaryScreen} />
      <stack.Screen name='ListFriends' component={ListFriend}/>
      <stack.Screen name='OtherUsers' component={OtherUsers}/>
    </stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
