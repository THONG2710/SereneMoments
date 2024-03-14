import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UsersParamlist } from '../../../StoryBoard/UserStoryBoard';
import ListOtherUser from './ListOtherUser/ListOtherUser';
import SenterRequest from './SenterRequest/SenterRequest';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../Components/Inputs/InputBox';
import { Colors } from '../../../Resource/colors';

const Tab = createMaterialTopTabNavigator<UsersParamlist>();
const OtherUsers: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonIcon
          styles={styles.btnBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <InputBox placeholder="Tìm bạn mới..." />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="ListOtherUsers">
          {() => <ListOtherUser searchText={searchText} />}
        </Tab.Screen>
        <Tab.Screen name='SentRequests'>
          {() => <SenterRequest searchText={searchText} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
  },

  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    paddingHorizontal: 20,
  },

  btnBack: {
    width: 30,
    height: 30,
  },
});

export default OtherUsers;