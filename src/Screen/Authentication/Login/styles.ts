import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../Resource/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  sayHello: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#8D6666',
    textAlign: 'center',
    marginTop: 50,
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 275,
    height: 242,
  },
  imgIcon: {
    width: 25,
    height: 24,
  },
  btnLogin: {
    backgroundColor: '#A87070',
    borderRadius: 30,
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 10,
  },
  txtBtn: {
    marginLeft: 15,
    color: 'white',
    fontSize: 15,
  },
  containerRegister: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  txtRegister: {
    fontSize: 15,
    color: '#9F7474',
    fontWeight: '600',
  },
  register: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    marginLeft: 5,
  },
  txtNote: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
  btnNote: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  
});
export default styles;
