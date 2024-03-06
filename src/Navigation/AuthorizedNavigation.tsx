import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import ListDiariesScreen from '../Screen/HomeScreen/ListDiariesScreen/ListDiariesScreen';
import MomentScreen from '../Screen/MomentScreen/MomentScreen';
import ChatScreen from '../Screen/ChatScreen/ChatScreen';
import AccountScreen from '../Screen/AccountScreen/AccountScreen';
import {AuthorizedParamlist} from '../StoryBoard/AuthorizedStoryboard';
import TodoList from '../Screen/TodoList/TodoList';
import ItemBottomHome from '../Screen/HomeScreen/components/ItemBottomHome';

const tab = createBottomTabNavigator<AuthorizedParamlist>();

const AuthorizedNavigation: React.FC = () => {
  return (
    <tab.Navigator screenOptions={{headerShown: false}}>
      <tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <ItemBottomHome
                icon={
                  focused
                    ? require('../Resource/images/homeS.png')
                    : require('../Resource/images/home.png')
                }
              />
            );
          },
        }}
      />
      <tab.Screen
        name="MomentScreen"
        component={MomentScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <ItemBottomHome
                icon={
                  focused
                    ? require('../Resource/images/momentS.png')
                    : require('../Resource/images/moment.png')
                }
              />
            );
          },
        }}
      />
      <tab.Screen
        name="TodoListScreen"
        component={TodoList}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <ItemBottomHome
                icon={
                  focused
                    ? require('../Resource/images/listS.png')
                    : require('../Resource/images/list.png')
                }
              />
            );
          },
        }}
      />
      <tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <ItemBottomHome
                icon={
                  focused
                    ? require('../Resource/images/chatS.png')
                    : require('../Resource/images/chat2.png')
                }
              />
            );
          },
        }}
      />
      <tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <ItemBottomHome
                icon={
                  focused
                    ? require('../Resource/images/accountS.png')
                    : require('../Resource/images/account.png')
                }
              />
            );
          },
        }}
      />
    </tab.Navigator>
  );
};

export default AuthorizedNavigation;
