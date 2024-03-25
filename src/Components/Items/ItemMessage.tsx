import {Dimensions, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {MessageModel} from '../../Models/Model';
import {ChatSchema} from '../../Models/ChatSchema';
import {useAppSelector} from '../../Redux/Hook';
import {BSON} from 'realm';
import {Colors} from '../../Resource/colors';

interface ItemMessageProps extends ViewProps {
  message: ChatSchema;
}

const ItemMessage: React.FC<ItemMessageProps> = props => {
  const {message} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  return (
    <View style={styles.container}>
      <Text
        style={
          message.sender.toString() == user._id
            ? styles.myMessage
            : styles.friendMessage
        }>
        {message.content}
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
});
