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
  RefreshControl,
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
import {ChatMessageModel, UserModel} from '../../../Models/Model';

const {useQuery, useRealm} = RealmContext;

const Chat: React.FC<ChatScreenProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [txtSerch, setTxtSerch] = useState<string>('');
  const [listSearch, setListSearch] = useState<ChatMessageModel[]>([]);
  const [listFull, setListFull] = useState<ChatMessageModel[]>([]);
  const realm = useRealm();
  const [isReFresh, setisReFresh] = useState<boolean>(false);

  // đến trang box chat
  const onMoveToBoxChat = (friend: UserModel) => {
    navigation.navigate('BoxChatScreen', {friend: friend});
  };

  const message = useQuery(ChatSchema, chats => {
    return chats
      .filtered(
        'sender == $0 OR receiver == $0',
        new BSON.ObjectId(user._id.toString()),
      )
      .sorted('createdat', true);
  });

  // tìm kiếm
  const onSearch = (value: string) => {
    setTxtSerch(value);
    if (value == '') {
      setListSearch(listFull);
    } else {
      const searchFriends = listSearch.filter(item =>
        item.friend.username.toLocaleLowerCase().includes(value),
      );
      setListSearch(searchFriends);
    }
  };

  // lấy danh sách chat
  const onGetNewChatMessage = async () => {
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/chatMessage/getNewMessages/' +
          user._id,
      );
      if (res.result) {
        const sort = res.messages.sort(
          (a: ChatMessageModel, b: ChatMessageModel) =>
            Number(b.message.createdat) - Number(a.message.createdat),
        );
        setListSearch(sort);
        setListFull(sort);
      }
    } catch (error) {
      console.log('failed to get new chat message: ' + error);
    }
    setisReFresh(false);
  };

  useEffect(() => {
    onGetNewChatMessage();
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(ChatSchema));
    });
    console.log(message.length);
  }, [realm, message.length, isReFresh]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.text3}> Tin nhắn</Text>
        <TextInput
          style={styles.textInput}
          value={txtSerch}
          onChangeText={value => onSearch(value)}
          placeholder="Tìm kiếm..."></TextInput>
      </View>
      {/* body */}
      <View style={styles.body}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isReFresh}
              onRefresh={() => setisReFresh(true)}
            />
          }
          data={listSearch}
          renderItem={({item}) => (
            <ItemChat
              onMoveToBoxChat={() => onMoveToBoxChat(item.friend)}
              user={item.friend}
            />
          )}
          keyExtractor={item => item.friend._id.toString()}
        />
      </View>
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
