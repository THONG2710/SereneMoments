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

interface ItemChatProps extends ViewProps {
  user: UserModel;
  onMoveToBoxChat: () => void;
}

const ItemChat: React.FC<ItemChatProps> = props => {
  const {user, onMoveToBoxChat} = props;

  return (
    <TouchableOpacity style={styles.viewButton2} onPress={onMoveToBoxChat}>
      <Image
        source={require('../../Resource/images/Ellipse3.png')}
        // style={styles.image6}
      ></Image>
      <TouchableOpacity>
        <Text style={styles.text1}>{user.username}</Text>
        <Text style={styles.text2}>Xin chào</Text>
      </TouchableOpacity>
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
});
