import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserModel} from '../../../Models/Model';
import { Colors } from '../../../Resource/colors';

interface ItemFindProps {
  user: UserModel;
  onPress: (id: string) => void;
}

const ItemFind: React.FC<ItemFindProps> = props => {
  const {user, onPress} = props;
  return (
    <Pressable style={styles.container} onPress={() => onPress(user._id.toString())}>
      <View style={styles.left}>
        <View style={styles.left_imgcontainer}>
          <Image
            style={styles.left_imgAvatar}
            source={
              user.avatar
                ? {uri: user.avatar}
                : require('../../../Resource/images/avatar.png')
            }
          />
        </View>
        <Text style={styles.left_txtName}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default ItemFind;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  //   left
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  left_imgcontainer: {
    width:55,
    height:55,
    borderWidth:2,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#97D4EB'
  },

  left_imgAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  left_txtName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.BLACK,
    marginHorizontal: 10,
  },

  //   right
  right: {},

  right_btnStyleAdd: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    fontWeight: 'bold',
    
  },

  right_btnStyleCancel: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },

});
