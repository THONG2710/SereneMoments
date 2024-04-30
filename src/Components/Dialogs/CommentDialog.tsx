import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Resource/colors';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {ResponseCommentModel} from '../../Models/Model';
import ItemComment from '../Items/ItemComment';

interface CommentDialogProps extends ViewProps {
  idMoment: string;
}

const CommentDialog: React.FC<CommentDialogProps> = props => {
  const {idMoment} = props;
  const [comments, setComments] = useState<ResponseCommentModel[]>([]);

  // lấy comment
  const onHandleGetCommentFromDatabase = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/comments/getComments/' + idMoment,
      );
      if (res.result) {
        setComments(res.comments);
      }
    } catch (error) {
      console.log('failed to get comment: ' + error);
    }
  };

  // header component
  const onRenderHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.txtTitle}>{comments.length} lượt bình luận</Text>
      </View>
    );
  };

  useEffect(() => {
    onHandleGetCommentFromDatabase();
  }, []);

  return (
    <View style={styles.container}>
      {comments.length > 0 ? (
        <FlatList
          ListHeaderComponent={onRenderHeaderComponent}
          data={comments}
          renderItem={({item}) => <ItemComment comment={item} />}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <Text>Không có bình luận nào</Text>
      )}
    </View>
  );
};

export default CommentDialog;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
    backgroundColor: Colors.WHITE,
    marginLeft: -20,
    marginTop: Dimensions.get('screen').height / 2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },

  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginVertical: 10,
  }
});
