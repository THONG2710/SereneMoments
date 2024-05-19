import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {UsersParamlist} from '../../../StoryBoard/UserStoryBoard';
import ListOtherUser from './ListOtherUser/ListOtherUser';
import SenterRequest from './SenterRequest/SenterRequest';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../Components/Inputs/InputBox';
import {Colors} from '../../../Resource/colors';
import {OtherUserProps} from './type';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {useAppSelector} from '../../../Redux/Hook';

const Tab = createMaterialTopTabNavigator<UsersParamlist>();

const OtherUsers: React.FC<OtherUserProps> = props => {
  const {navigation} = props;
  const [search, setSearch] = useState<string>('');
  const user = useAppSelector(state => state.Authentication.myAccount);

  // quay trở lại
  const onGoBack = () => {
    navigation.goBack();
  };

  // tìm kiếm
  const onFindUser = async () => {
    if (search != '') {
      if (Number(search)) {
        const res = await getData(
          'http://' +
            ID_ADRESS +
            ':3000/api/users/findUserByPhoneNumber?phoneNumber=' +
            search +
            '&id=' +
            user._id,
        );
        if (res.result) {
          setSearch('');
          navigation.navigate('findUser', {users: res.user});
        }
      } else {
        const res = await getData(
          'http://' +
            ID_ADRESS +
            ':3000/api/users/findUserByName?name=' +
            search +
            '&id=' +
            user._id,
        );
        if (res.result) {
          setSearch('');
          navigation.navigate('findUser', {users: res.user});
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.btnBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <InputBox
          onSearch={onFindUser}
          onChangeText={value => setSearch(value)}
          placeholder="Tìm kiếm..."
        />
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="ListOtherUsers"
          component={ListOtherUser}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={focused ? styles.txtLabelFocused : styles.txtLabel}>
                  NGƯỜI LẠ
                </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="SentRequests"
          component={SenterRequest}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={focused ? styles.txtLabelFocused : styles.txtLabel}>
                  YÊU CẦU
                </Text>
              );
            },
          }}
        />
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

  txtLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.BLACK,
  },

  txtLabelFocused: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.BLUE,
  },
});

export default OtherUsers;
