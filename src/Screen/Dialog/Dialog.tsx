import { Image, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
interface DialogProps extends ViewProps {
  isvisible: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
}
const Dialog: React.FC<DialogProps> = (props) => {
  const { isvisible, onCancel, onConfirm, title, message } = props;

  return (
    <View >
      <AwesomeAlert
        customView={<Image style={styles.imgWarn} source={require('../../Resource/Image2/warn.png')} />}
        contentContainerStyle={styles.alertContainer}
        show={isvisible}
        title={title}
        titleStyle={styles.titleStyle}
        message={message}
        messageStyle={styles.messageStyle}
        // CANCEL BUTTON
        showCancelButton={true}
        cancelText='Hủy'
        cancelButtonColor='#EEEEEE'
        cancelButtonTextStyle={styles.cancelButtonTextStyle}
        cancelButtonStyle={styles.buttonStyle}
        onCancelPressed={onCancel}

        // CONFIRM BUTTON
        showConfirmButton={true}
        confirmText='Chấp nhận'
        confirmButtonColor='red'
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
        confirmButtonStyle={styles.buttonStyle}
        onConfirmPressed={onConfirm}
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
    bottom: 70,
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
    textAlign: 'center',
    color: 'black',
    fontWeight: '500'
  },

  cancelButtonTextStyle:
  {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },

  buttonStyle:
  {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 15
  },

  confirmButtonTextStyle:
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }


})