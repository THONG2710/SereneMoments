import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BoxChatScreenProps} from './type';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {ChatSchema, RealmContext} from '../../../Models/ChatSchema';
import {BSON} from 'realm';
import ItemChat from '../../../Components/Items/ItemChat';
import ItemMessage from '../../../Components/Items/ItemMessage';
import {IS_REFRESH} from '../../../Redux/Action/AuthenticationActions';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';

const {useQuery, useRealm} = RealmContext;

const BoxChatScreen: React.FC<BoxChatScreenProps> = props => {
  const {navigation} = props;
  const {friend} = props.route.params;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [message, setMessage] = useState('');
  const realm = useRealm();
  const listRef = useRef<FlatList>(null);

  const friendChats = useQuery(ChatSchema, chats => {
    return chats
      .filtered(
        'sender == $0 && receiver == $1 OR receiver == $0 && sender == $1',
        new BSON.ObjectId(user._id.toString()),
        new BSON.ObjectId(friend._id.toString()),
      )
      .sorted('createdat');
  });

  const updateChat = async () => {
    realm.write(() => {
      const chats = realm
        .objects('chatmessages')
        .filtered(
          'sender == $1 && receiver == $0 && seen == $2',
          new BSON.ObjectId(user._id.toString()),
          new BSON.ObjectId(friend._id.toString()),
          false,
        );
      chats.forEach(chat => {
        chat.seen = true;
      });
    });
  };

  // gửi tin nhắn
  const onSendMessage = () => {
    if (message != '') {
      realm.write(() => {
        realm.create('chatmessages', {
          _id: new BSON.ObjectID(),
          receiver: new BSON.ObjectId(friend._id.toString()),
          content: message,
          createdat: Math.floor(Number(new Date().getTime() / 1000)),
          sender: new BSON.ObjectId(user._id.toString()),
          seen: false,
          isimage: false,
        });
        setMessage('');
      });
    } else {
      console.log('emty');
    }
  };

  // chọn ảnh từ thư viện
  const getImageFromLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        // Hình ảnh đã được chọn thành công
        if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          const reference = firebase
            .storage()
            .ref()
            .child(new Date().getTime() + '.png');
          const upload = reference.putFile(source.uri);
          upload.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            error => {
              console.log('Upload error:', error);
            },
            () => {
              upload.snapshot?.ref.getDownloadURL().then(async downloadURL => {
                realm.write(() => {
                  realm.create('chatmessages', {
                    _id: new BSON.ObjectID(),
                    receiver: new BSON.ObjectId(friend._id.toString()),
                    content: downloadURL,
                    createdat: Math.floor(Number(new Date().getTime() / 1000)),
                    sender: new BSON.ObjectId(user._id.toString()),
                    seen: false,
                    isimage: true,
                  });
                  setMessage('');
                });
              });
            },
          );
        }
      }
    });
  };

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(ChatSchema));
    });
    updateChat();
    listRef.current?.scrollToEnd({animated: true});
  }, [realm]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../../../Resource/images/btn_back.png')}></Image>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.viewName}>
            <Image
              source={
                friend.avatar
                  ? {uri: friend.avatar}
                  : require('../../../Resource/images/avatar.png')
              }
              style={styles.imageView}></Image>
            <Text style={styles.textName}>{friend.username}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../../Resource/images/btn_menu.png')}></Image>
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.boxView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={listRef}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({animated: true})
          }
          onLayout={() => listRef.current?.scrollToEnd({animated: true})}
          data={friendChats}
          renderItem={({item}) => <ItemMessage message={item} />}
          keyExtractor={item => item._id.toString()}
        />
      </View>
      {/* footer */}
      <TouchableOpacity style={styles.footer}>
        <TouchableOpacity onPress={getImageFromLibrary}>
          <Image
            source={require('../../../Resource/images/btn_send.png')}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setMessage(value)}
          value={message}
          placeholder="Tin nhắn"
        />
        <TouchableOpacity onPress={onSendMessage}>
          <Image
            source={require('../../../Resource/images/btn_url.png')}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default BoxChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  viewName: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 7,
    alignItems: 'center',
    borderRadius: 7,
    marginTop: -5,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 6,
  },
  imageView: {
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: 'black',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 32,
    height: 40,
    marginVertical: 15,
    alignItems: 'center',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    height: 40,
    marginBottom: 10,
    marginTop: 15,
  },

  textInput: {
    width: (Dimensions.get('screen').width / 3) * 2,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: -5,
    paddingHorizontal: 15,
  },

  boxView: {
    flex: 1,
    alignItems: 'flex-start',
  },

  messagesRight: {
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#4913F6',
    maxWidth: '80%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
});
