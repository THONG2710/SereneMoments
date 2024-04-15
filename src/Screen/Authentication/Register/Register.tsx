import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import { RegisterProps } from './type';
import { useEffect, useState } from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import { text } from 'stream/consumers';
import {
  isValidPassword,
  isValidPhoneNumber,
  isValidRePassword,
} from '../../Validations/Validate';
const Register: React.FC<RegisterProps> = props => {
  const { navigation } = props;

  const [isVisible, setIsvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassWord, setErrorPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');
  const onRegisterAccount = () => {
    navigation.navigate('LoginWithAccount');
  };

  const onLogin = () => {
    navigation.goBack();
  };
  const onChangeVisiblePassword = () => {
    setIsvisible(!isVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sayHello}>Xin chào.</Text>
      <Text style={styles.sayHello2}>Đăng ký ngay !! ^.^</Text>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../Resource/images/logo.png')}
        />
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_user_r.png')}
        />
        <TextInput
          style={styles.txtBtn}
          placeholder="Nhập tên"
          secureTextEntry={true}></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_phone.png')}
        />
        <TextInput
          onChangeText={text => {
            setErrorPhoneNumber(
              isValidPhoneNumber(text) == true
                ? ''
                : ' SDT chưa đúng định dạng',
            );
            setPhoneNumber(text);
          }}
          style={styles.txtBtn}
          placeholder="Nhập số điện thoại"></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={{ width: 25, height: 25, tintColor: '#59AEEF' }}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput
          onChangeText={text => {
            setErrorPassword(
              isValidPassword(text) == true
                ? ''
                : 'Mật khẩu phải có ít nhất 8 kí tự',
            );
            setPassword(text);
          }}
          style={styles.txtBtn}
          placeholder="Mật khẩu"
          secureTextEntry={!isVisible}></TextInput>
        <ButtonIcon
          styles={styles.icon_eye}
          onPress={onChangeVisiblePassword}
          url={
            isVisible
              ? require('../../../Resource/images/visible.png')
              : require('../../../Resource/images/hidden.png')
          }
        />
      </View>
      {/* <Text style={styles.txtError}>{errorPassWord}</Text> */}
      <View style={styles.btnRegister}>
        <Image
          style={{ width: 25, height: 25, tintColor: '#59AEEF' }}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput
          onChangeText={text => {
            setErrorPassword(
              isValidPassword(text) == true
                ? ''
                : 'Mật khẩu phải có ít nhất 8 kí tự',
            );
            setPassword(text);
          }}
          style={styles.txtBtn}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={!isVisible}></TextInput>

        <ButtonIcon
          styles={styles.icon_eye}
          onPress={onChangeVisiblePassword}
          url={
            isVisible
              ? require('../../../Resource/images/visible.png')
              : require('../../../Resource/images/hidden.png')
          }
        />
      </View>
      <Text style={styles.txtError}>
        {errorPassWord},{errorPhoneNumber}
      </Text>
      <TouchableOpacity onPress={onRegisterAccount}>
        <View style={styles.btnLogin}>
          <Text style={styles.txtBtn2}>Đăng ký</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerNote}>
        <Text style={styles.txtNote}>Bạn đã sẵn sàng tạo tài khoản ?</Text>
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.btnNote}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
