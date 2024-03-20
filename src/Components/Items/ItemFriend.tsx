import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {Colors} from '../../Resource/colors';
import {UserModel} from '../../Models/Model';

interface ItemFriendProps extends ViewProps {
  information: UserModel;
  onPress: (id: string) => void;
}

const ItemFriend: React.FC<ItemFriendProps> = props => {
  const {information, onPress} = props;
  return (
    <Pressable style={styles.container} onPress={() => onPress(information._id.toString())}>
      <Shadow style={styles.hd_shadow} distance={2} offset={[0, 5]}>
        <View style={styles.hdA_btn}>
          <Image
            source={
              information.avatar
                ? {uri: information.avatar}
                : require('../../Resource/images/avatar.png')
            }
            style={styles.hdA_img}
          />
        </View>
      </Shadow>
      <Text style={styles.txtName}>{information.username}</Text>
    </Pressable>
  );
};

export default ItemFriend;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 100,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  hd_shadow: {
    borderRadius: 50,
  },

  hdA_img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 10,
  },

  hdA_btn: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.WHITE,
  },

  txtName: {
    fontSize: 14,
    marginTop: 10,
  },
});
