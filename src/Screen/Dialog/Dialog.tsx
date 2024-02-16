import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { AVATAR, IC_WARN } from '../../Resource/images';

const Dialog = () => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <View >
      <TouchableOpacity onPress={() => setShowAlert(!showAlert)} style={styles.btn}>
        <Text style={styles.text}>Click</Text>
      </TouchableOpacity>
      <AwesomeAlert
        customView={<Image style={styles.imgWarn} source={{ uri: IC_WARN }} />}
        contentContainerStyle={styles.alertContainer}
        show={showAlert}
        title='Xóa bạn bè'
        titleStyle={styles.titleStyle}
        message='Bạn có chắc chắn muốn hủy kết bạn với người này không ? '
        messageStyle={styles.messageStyle}
        // CANCEL BUTTON
        showCancelButton={true}
        cancelText='Hủy'
        cancelButtonColor='#EEEEEE'
        cancelButtonTextStyle={styles.cancelButtonTextStyle}
        cancelButtonStyle={styles.buttonStyle}
        onCancelPressed={() =>
        {
          console.log('Cancel Button');
          setShowAlert(false)
        }}

        // CONFIRM BUTTON
        showConfirmButton={true}
        confirmText='Chấp nhận'
        confirmButtonColor='red'
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
        confirmButtonStyle={styles.buttonStyle}
        onConfirmPressed={() =>{
          console.log('Confirm Button');
          setShowAlert(false)
        }}
      />
    </View>
  )
}

export default Dialog

const styles = StyleSheet.create({

  btn:
  {
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginHorizontal: 100,
    marginVertical: 100
  },

  text:
  {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  imgWarn:
  {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 85,
   
  },

  alertContainer:
  {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15,
    borderRadius: 20,
  },

  titleStyle:
  {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30
  },

  messageStyle:
  {
    textAlign:'center',
    color: 'black',
    fontWeight:'500'
  },

  cancelButtonTextStyle:
  {
    color: 'black',
    fontSize:16,
    fontWeight:'500'
  },

  buttonStyle:
  {
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    marginHorizontal:15
  },

  confirmButtonTextStyle:
  {
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  }


})