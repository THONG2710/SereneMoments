import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sayHello2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B90B7',
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
  btnRegister: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
  },
  btnLogin: {
    backgroundColor: '#59AEEF',
    borderRadius: 30,
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 30,
    justifyContent: 'center',
  },
  imgIcon: {
    width: 25,
    height: 24,
    tintColor: '#59AEEF',
  },
  txtBtn: {
    marginLeft: 10,
    width: '80%',
  },
  txtBtn2: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
  },
});

export default styles;
