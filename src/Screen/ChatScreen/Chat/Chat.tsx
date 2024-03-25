import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ChatScreenProps} from './type';
import {RealmContext, ChatSchema} from '../../../Models/ChatSchema';
import {BSON} from 'realm';
import {Realm} from '@realm/react';
import {Colors} from '../../../Resource/colors';
import ItemChat from '../../../Components/Items/ItemChat';
import {useAppSelector} from '../../../Redux/Hook';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {UserModel} from '../../../Models/Model';
// import { useQuery, useRealm } from '@realm/react';

const Chat: React.FC<ChatScreenProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const friend = useAppSelector(state => state.Friends.myFriends);

  // đến trang box chat
  const onMoveToBoxChat = (friend: UserModel) => {
    navigation.navigate('BoxChatScreen', {friend: friend});
  };

  useEffect(() => {}, []);

  const pressHandler = () => {
    Alert.alert(
      'Xóa bạn bè',
      'Bạn có chắc chắn muốn hủy kết bạn với người này không ?',
      [
        {text: 'Chấp nhận', onPress: () => console.log('Đã hủy kết bạn')},
        {text: 'Hủy', onPress: () => console.log('...')},
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text3}> Tin nhắn</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm..."></TextInput>
      </View>
      {/* body */}
      <View style={styles.body}>
        <FlatList
          data={friend}
          renderItem={({item}) => (
            <ItemChat
              onMoveToBoxChat={() => onMoveToBoxChat(item)}
              user={item}
            />
          )}
          keyExtractor={item => item._id.toString()}
        />
      </View>
      {/* <View>
        <Text style={styles.text4}>Gần đây</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('BoxChatScreen')}
        onLongPress={() => pressHandler()}>
        <Image
          source={require('../../../Resource/images/Ellipse3.png')}
          // style={styles.image6}
        ></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton2}
        onPress={() => navigation.navigate('BoxChatScreen')}>
        <Image
          source={require('../../../Resource/images/Ellipse3.png')}
          // style={styles.image6}
        ></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton3}
        onPress={() => navigation.navigate('BoxChatScreen')}>
        <Image
          source={require('../../../Resource/images/Ellipse3.png')}
          // style={styles.image6}
        ></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  header: {
    width: '100%',
    height: Dimensions.get('screen').height / 8,
  },

  textInput: {
    width: Dimensions.get('screen').width - 32,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  viewButton2: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 32,
    marginHorizontal: 16,
    height: Dimensions.get('screen').height / 11,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 5,
  },

  text1: {
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#176B87',
  },

  text2: {
    left: 10,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666666',
  },

  text3: {
    width: Dimensions.get('screen').width,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },

  body: {
    flex: 1,
    marginTop: 15,
  },
});
