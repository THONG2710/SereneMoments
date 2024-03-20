import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListDiariesScreen from './ListDiariesScreen/ListDiariesScreen';
import CreateDiaryScreen from './CreateDiaryScreen/CreateDiaryScreen';
import {HomeParamlist} from '../../StoryBoard/HomeStoryboard';
import ListFriend from './ListFriends/ListFriend';
import ListOtherUser from './ListOtherUser/ListOtherUser/ListOtherUser';
import OtherUsers from './ListOtherUser/OtherUser';
import Profile from './Profile/Profile';
import FindUser from './FindUser/FindUser';

const stack = createStackNavigator<HomeParamlist>();

const HomeScreen: React.FC = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
      <stack.Screen name="ListDiariesScreen" component={ListDiariesScreen} />
      <stack.Screen name="CreateDiaryScreen" component={CreateDiaryScreen} />
      <stack.Screen name='ListFriends' component={ListFriend}/>
      <stack.Screen name='OtherUsers' component={OtherUsers}/>
      <stack.Screen name='Profile' component={Profile}/>
      <stack.Screen name='findUser' component={FindUser}/>
    </stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
