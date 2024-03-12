import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {UsersParamlist} from '../../../StoryBoard/UserStoryBoard';
import ListOtherUser from './ListOtherUser/ListOtherUser';
import SenterRequest from './SenterRequest/SenterRequest';

const Tab = createMaterialTopTabNavigator<UsersParamlist>();
const OtherUsers: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListOtherUsers" component={ListOtherUser} />
      <Tab.Screen name='SentRequests' component={SenterRequest}/>
    </Tab.Navigator>
  );
};

export default OtherUsers;

const styles = StyleSheet.create({});
