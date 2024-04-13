import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sayHello: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1B90B7',
    textAlign: 'center',
    marginTop: 20,
  },
  sayHello2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B90B7',
    textAlign: 'center',
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
    marginTop: 10,
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
    marginTop: 0,
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
  containerNote: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  txtNote: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  btnNote: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B90B7',
    marginLeft: 5,
  },

  icon_eye: {
    width: 25,
    height: 25,
    tintColor: '#59AEEF',
  },

  txtError: {
    paddingLeft: 20,
    fontSize: 14,
    color: 'red',
    marginTop: 20,
  },
});

export default styles;
