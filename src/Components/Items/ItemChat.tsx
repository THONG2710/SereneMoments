import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Resource/colors';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {UserModel} from '../../Models/Model';
import {ChatSchema, RealmContext} from '../../Models/ChatSchema';
import {BSON} from 'realm';
import {useAppDispatch, useAppSelector} from '../../Redux/Hook';
import {IS_REFRESH} from '../../Redux/Action/AuthenticationActions';
import {onConvertEpochtime} from '../../Service/Service';

interface ItemChatProps extends ViewProps {
  user: UserModel;
  onMoveToBoxChat: () => void;
}

const {useQuery, useRealm} = RealmContext;

const ItemChat: React.FC<ItemChatProps> = props => {
  const {user, onMoveToBoxChat} = props;
  const myAccount = useAppSelector(state => state.Authentication.myAccount);

  const realm = useRealm();

  const message = useQuery(ChatSchema, chats => {
    return chats
      .filtered(
        'sender == $0 && receiver == $1 OR receiver == $0 && sender == $1',
        new BSON.ObjectId(user._id.toString()),
        new BSON.ObjectId(myAccount._id.toString()),
      )
      .sorted('createdat', true);
  });

  const seen = useQuery(ChatSchema, chats => {
    return chats
      .filtered(
        'sender == $0 && receiver == $1 && seen = $2',
        new BSON.ObjectId(user._id.toString()),
        new BSON.ObjectId(myAccount._id.toString()),
        false,
      )
      .sorted('createdat', true);
  });

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(ChatSchema));
    });
  }, [realm]);

  return (
    <TouchableOpacity
      style={
        seen.length <= 0
          ? styles.viewButton2
          : [styles.viewButton2, {backgroundColor: '#E0F4FF'}]
      }
      onPress={onMoveToBoxChat}>
      <View style={styles.rightFrame}>
        <Image
          style={styles.imgAvatar}
          source={
            user.avatar
              ? {uri: user.avatar}
              : require('../../Resource/images/avatar.png')
          }
          // style={styles.image6}
        ></Image>
        <View>
          <Text style={styles.text1}>{user.username}</Text>
          <Text style={styles.text2} numberOfLines={1}>
            {message[0]?.isimage ? 'Hình ảnh' : message[0]?.content}
          </Text>
          {
            message.length == 0 ? null : <Text style={styles.time}>
            {onConvertEpochtime(Number(message[0]?.createdat))}
          </Text>
          }
          
        </View>
      </View>
      {seen.length > 0 ? (
        <View style={styles.containerSeen}>
          <Text style={styles.txtSeen}>{seen.length}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ItemChat;

const styles = StyleSheet.create({
  textInput: {
    width: Dimensions.get('screen').width - 32,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  rightFrame: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 5,
    width: Dimensions.get('screen').width / 2,
  },

  text3: {
    width: Dimensions.get('screen').width,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },

  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  containerSeen: {
    borderRadius: 50,
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 25,
    minWidth: 25,
    position: 'absolute',
    right: 12,
  },

  txtSeen: {
    color: Colors.WHITE,
    paddingHorizontal: 5,
  },

  time: {
    fontSize: 10,
    marginLeft: '60%',
  },
});
