import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NotifiicationModel, UserModel} from '../../Models/Model';
import {NotificationSchema} from '../../Models/ChatSchema';
import {useAppSelector} from '../../Redux/Hook';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {onConvertEpochtime} from '../../Service/Service';
import {Colors} from '../../Resource/colors';

interface ItemNotificationProps {
  item: NotificationSchema;
}

const ItemNotification: React.FC<ItemNotificationProps> = props => {
  const {item} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [sender, setSender] = useState<UserModel>();

  // lấy thông tin người báo cáo
  const getFriends = async () => {
    try {
      const url =
        'http://' + ID_ADRESS + ':3000/api/users/getUserById?id=' + item.sender;
      const res = await getData(url);
      if (res.result) {
        setSender(res.user);
      }
    } catch (error) {
      console.log('failed to get sender: ' + error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Image
          style={styles.imgAvatar}
          source={
            sender?.avatar
              ? {uri: sender.avatar}
              : require('../../Resource/images/avatar.png')
          }
        />
      </View>
      <View style={styles.rightGroup}>
        <Text>
          <Text style={styles.txtName}>{sender?.username}</Text>
          {` ${item.content}`}
        </Text>
        <Text>{onConvertEpochtime(Number(item.createdat))}</Text>
      </View>
    </View>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },

  rightGroup: {
    flex: 4,
  },

  txtName: {
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
});
