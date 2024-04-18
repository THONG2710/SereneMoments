import { Image, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
interface DialogConfirmSuccessProps extends ViewProps {
  isvisible: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
}
const DialogConfirmSuccess: React.FC<DialogConfirmSuccessProps> = (props) => {
  const { isvisible, onCancel, onConfirm, title, message } = props;

  return (
    <View >
      <AwesomeAlert
        customView={<Image style={styles.imgWarn} source={require('../../Resource/Image2/success.png')} />}
        contentContainerStyle={styles.alertContainer}
        show={isvisible}
        title={title}
        titleStyle={styles.titleStyle}
        message={message}
        messageStyle={styles.messageStyle}
        
        showCancelButton={true}
        cancelText='Hủy'
        cancelButtonColor='#EEEEEE'
        cancelButtonTextStyle={styles.cancelButtonTextStyle}
        cancelButtonStyle={styles.buttonStyle}
        onCancelPressed={onCancel}

        // CONFIRM BUTTON
        showConfirmButton={true}
        confirmText='Chấp nhận'
        confirmButtonColor='#499EDC'
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
        confirmButtonStyle={styles.buttonStyle}
        onConfirmPressed={onConfirm}
      />
    </View>
  )
}

export default DialogConfirmSuccess

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
    width: 60,
    height: 60,
    position: 'absolute',
    top:-35,

  },

  alertContainer:
  {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15,
    borderRadius: 20,
    height:270
  },

  titleStyle:
  {
    fontSize: 28,
    color: '#499EDC',
    fontWeight: 'bold',
    marginTop: 50
  },

  messageStyle:
  {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:15,
    color: '#499EDC',
    bottom:10
  },

  cancelButtonTextStyle:
  {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },

  buttonStyle:
  {
    width: '40%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 15,
    top:20,
    
  },

  confirmButtonTextStyle:
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }


})