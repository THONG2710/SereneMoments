import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {MessageModel} from '../../Models/Model';
import {ChatSchema} from '../../Models/ChatSchema';
import {useAppSelector} from '../../Redux/Hook';
import {BSON} from 'realm';
import {Colors} from '../../Resource/colors';
import {onConvertEpochtime} from '../../Service/Service';

interface ItemMessageProps extends ViewProps {
  message: ChatSchema;
}

const ItemMessage: React.FC<ItemMessageProps> = props => {
  const {message} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  return (
    <View style={styles.container}>
      {message.isimage ? (
        <View
          style={
            message.sender.toString() == user._id
              ? styles.myContainerImage
              : styles.containerImage
          }>
          <Image
            style={styles.styleImage}
            source={
              message.content
                ? {uri: message.content}
                : require('../../Resource/images/img.jpg')
            }
          />
        </View>
      ) : (
        <Text
          style={
            message.sender.toString() == user._id
              ? styles.myMessage
              : styles.friendMessage
          }>
          {message.content}
        </Text>
      )}

      <Text
        style={
          message.sender.toString() == user._id
            ? styles.myMessageTime
            : styles.friendMessageTime
        }>
        {onConvertEpochtime(Number(message.createdat))}
      </Text>
    </View>
  );
};

export default ItemMessage;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },

  myMessage: {
    backgroundColor: Colors.BLUE,
    color: Colors.WHITE,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
    alignSelf: 'flex-end',
    marginRight: 16,
  },

  friendMessage: {
    backgroundColor: Colors.LIGHT_GRAY,
    color: Colors.BLACK,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },

  myMessageTime: {
    color: Colors.BLACK,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 16,
  },

  friendMessageTime: {
    color: Colors.BLACK,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },

  styleImage: {
    width: Dimensions.get('screen').width / 2,
    height: 200,
    borderRadius: 10,
    marginLeft: 100,
  },

  containerImage: {
    width: Dimensions.get('screen').width,
    alignItems: 'flex-start',
    marginLeft: -85,
  },

  myContainerImage: {
    width: Dimensions.get('screen').width - 15,
    alignItems: 'flex-end',
    marginRight: 15,
  },
});
