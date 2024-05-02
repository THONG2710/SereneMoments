import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {ResponseCommentModel} from '../../Models/Model';
import {onConvertEpochtime} from '../../Service/Service';
import {Colors} from '../../Resource/colors';

interface ItemCommentProps{
  comment: ResponseCommentModel;
}

const ItemComment: React.FC<ItemCommentProps> = props => {
  const {comment} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgAvatar}
        source={
          comment.avatar
            ? {uri: comment.avatar}
            : require('../../Resource/images/avatar.png')
        }
      />
      <View style={styles.smallContainer}>
        <Text style={styles.txtName}>{comment.username}</Text>
        <Text style={styles.txtContent}>{comment.content}</Text>
        <Text style={styles.txtDate}>
          {onConvertEpochtime(Number(comment.createdat))}
        </Text>
      </View>
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 10,
  },

  smallContainer: {
    flexDirection: 'column',
  },

  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  txtName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.BLACK,
    marginVertical: 3,
  },

  txtContent: {
    color: Colors.BLACK,
    marginBottom: 3,
  },

  txtDate: {
    fontSize: 12,
  },
});
