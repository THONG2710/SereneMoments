import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Style';
import {SelectList} from 'react-native-dropdown-select-list';
import ItemMoment from './Component/ItemMoment';
import TakeAMoment from './TakeMoment/TakeMoment';
import Swiper from 'react-native-swiper';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../Redux/Hook';
import {MomentModel, UserModel} from '../../Models/Model';
import {MomentScreenProps} from './Type';
import ShowMoments from './ShowMoments/ShowMoments';
import {SAVE_MYFRIENDMOMENTS} from '../../Redux/Action/MomentActions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MomentParamlist} from '../../StoryBoard/MomentStoryboard';
import Profile from './Profile/Profile';

const Stack = createNativeStackNavigator<MomentParamlist>();

const MomentScreen: React.FC<MomentScreenProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ShowMoments" component={ShowMoments} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MomentScreen;
