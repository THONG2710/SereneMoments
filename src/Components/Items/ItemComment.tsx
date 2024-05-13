import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { ResponseCommentModel } from '../../Models/Model';
import { onConvertEpochtime } from '../../Service/Service';
import { Colors } from '../../Resource/colors';
import Modal from 'react-native-modal/dist/modal';
import { useAppSelector } from '../../Redux/Hook';


interface ItemCommentProps {
  comment: ResponseCommentModel;
}

const ItemComment: React.FC<ItemCommentProps> = props => {
  const { comment } = props;
  const [isVisibleMenu, setisVisibleMenu] = useState(false)
  const user = useAppSelector(state => state.Authentication.myAccount)
  const testCmt = () =>{
        if(comment.userid===user._id){
          setisVisibleMenu(true)
        }else{
          setisVisibleMenu(false)
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

        <Text style={styles.txtContent}>{comment.content}</Text>

        <Text style={styles.txtDate}>
          {onConvertEpochtime(Number(comment.createdat))}
        </Text>

      </View>
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOutDown'}
        onBackdropPress={() => setisVisibleMenu(false)}
        isVisible={isVisibleMenu}
        children={
          <View style={styles.dialogMenu}>
            <TouchableOpacity style={styles.btn} >
              <Text style={[styles.txt]}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
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
    marginTop: Dimensions.get('screen').height/4*3 ,
    
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
