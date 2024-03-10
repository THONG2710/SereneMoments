import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {UserModel} from '../../../Models/Model';
import TextButton from '../../../Components/Buttons/TextButton';
import {Colors} from '../../../Resource/colors';

interface ItemUserProps extends ViewProps {
  user: UserModel;
  onPress?: () => void;
  isSent?: boolean;
}

const ItemUser: React.FC<ItemUserProps> = props => {
  const {user, onPress, isSent} = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
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
      <View style={styles.right}>
        <TextButton
          style={
            isSent ? styles.right_btnStyleCancel : styles.right_btnStyleAdd
          }
          label={isSent ? 'Hủy' : 'Kết bạn'}
        />
      </View>
    </Pressable>
  );
};

export default ItemUser;

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

  left_imgcontainer: {},

  left_imgAvatar: {
    width: 50,
    height: 50,
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
    backgroundColor: Colors.BLUE,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },

  right_btnStyleCancel: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
});
