import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import React, { useState } from 'react';
import { ResponseCommentModel } from '../../Models/Model';
import { onConvertEpochtime } from '../../Service/Service';
import { Colors } from '../../Resource/colors';
import Modal from 'react-native-modal/dist/modal';
import { useAppSelector } from '../../Redux/Hook';
import { ID_ADRESS, getData, postData } from '../../Service/RequestMethod';


interface ItemCommentProps {
  comment: ResponseCommentModel;
}

const ItemComment: React.FC<ItemCommentProps> = props => {
  const { comment } = props;
  const [isVisibleMenu, setisVisibleMenu] = useState(false)
  const [testEdit, settestEdit] = useState(false)
  const [newContent, setnewContent] = useState("")


  const user = useAppSelector(state => state.Authentication.myAccount)
  const testCmt = () => {
    if (comment.userid === user._id) {
      setisVisibleMenu(true)
    } else {
      setisVisibleMenu(false)
    }

  }
  const onConfirmDelete = () => {
    setisVisibleMenu(false);
    Alert.alert('Thông báo', 'Bạn muốn xóa khoảnh khắc này?', [
      {
        onPress: () => onDelete(),
        text: 'Xóa',
      },
      {
        text: 'Hủy',
        style: 'cancel',
      },
    ]);
  };

  const onDelete = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/comments/deleteComment/' + comment._id,
      );
      console.log(comment._id);

      if (res.result) {
        Alert.alert('Thông báo', 'Xóa thành công', [
          {

            text: 'OK',
          },
        ]);
      }
    } catch (error) { }
  };
  const Edit = () => {
    settestEdit(true);
    setnewContent(comment.content.toString());
    setisVisibleMenu(false)
  }
  const updateComment=async()=>{
      if(newContent!=comment.content){
        try {
          const data = {
            id: comment._id,
            content:newContent
          }
          const res = await postData(
            'http://' + ID_ADRESS + ':3000/api/comments/updateComment' , data
          )
          if(res.result){
            settestEdit(false);
            setnewContent(newContent)
            Alert.alert('Thông báo', 'Cập nhật thành công', [
              {
    
                text: 'OK',
              },
            ]);
          }
        } catch (error) {
          
        }
      }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={testCmt}>
      <Image
        style={styles.imgAvatar}
        source={
          comment.avatar
            ? { uri: comment.avatar }
            : require('../../Resource/images/avatar.png')
        }
      />

      <View style={styles.smallContainer}>
        <Text style={styles.txtName}>{comment.username}</Text>
        {
          testEdit ? <TextInput value={newContent} onChangeText={value => setnewContent(value)}></TextInput> : <Text style={styles.txtContent}>{comment.content}</Text>
        }


        <Text style={styles.txtDate}>
          {onConvertEpochtime(Number(comment.createdat))}
        </Text>
        {
          testEdit ? <TouchableOpacity onPress={updateComment}>
          <Text>Lưu</Text>
        </TouchableOpacity>  : null
        }
       
      </View>

      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOutDown'}
        onBackdropPress={() => setisVisibleMenu(false)}
        isVisible={isVisibleMenu}
        children={
          <View style={styles.dialogMenu}>
            <TouchableOpacity style={styles.btn} onPress={onConfirmDelete} >
              <Text style={[styles.txt]}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={Edit}>
              <Text style={styles.txt}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        }
      />

    </TouchableOpacity>
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
  dialogMenu: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: Dimensions.get('screen').height / 10,
    marginTop: Dimensions.get('screen').height / 4 * 3,

    borderRadius: 10,
  },

  btn: {
    alignItems: 'center',
    height: 35,
    justifyContent: 'center',
  },

  txt: {
    color: Colors.BLACK,
  },

});
