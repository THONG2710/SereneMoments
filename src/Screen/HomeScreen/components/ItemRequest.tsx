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
import LinearButtonAdd from '../../../Components/Buttons/LinearButtonAdd';
import LinearButtonCancel from '../../../Components/Buttons/LinearButtonCancel';

interface ItemRequestProps extends ViewProps {
  user: UserModel;
  onPress?: () => void;
  onCancelRequest: () => void;
  onAcceptRequest: () => void;
}

const ItemRequest: React.FC<ItemRequestProps> = props => {
  const {user, onPress, onCancelRequest, onAcceptRequest} = props;
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
        <LinearButtonAdd onPress={() => onAcceptRequest()} style={styles.right_btnStyleAdd} label={'Xác nhận'} />
        <LinearButtonCancel
          onPress={() => onCancelRequest()}
          style={styles.right_btnStyleCancel}
          label={'Xóa'}
        />
      </View>
    </Pressable>
  );
};

export default ItemRequest;

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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  right_btnStyleAdd: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
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
