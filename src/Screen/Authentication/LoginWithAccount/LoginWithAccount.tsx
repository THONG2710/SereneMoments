import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {LoginWithAccountProps} from './type';
import {ID_ADRESS, postData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {SET_ISLOGGED} from '../../../Redux/Action/AuthenticationActions';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';

const LoginWithAccount: React.FC<LoginWithAccountProps> = props => {
  const {navigation} = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const is_logged = useAppSelector(state => state.Authentication.isLogged);
  const usdispath = useAppDispatch();
  const [isVisible, setIsvisible] = useState(false);

  const onChangeVisiblePassword = () => {
    setIsvisible(!isVisible);
  };

  const onForgotPassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const onLogin = async () => {
    const data = {phoneNumber: phoneNumber, password: password};
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/users/loginWithPhoneNumber',
      data,
    );
    if (res.result) {
      usdispath(SET_ISLOGGED(true));
      navigation.navigate('AuthorizedNavigation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sayHello}>Xin chào.</Text>
      <Text style={styles.sayHello2}>Đăng nhập vào Semo ^.^</Text>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../Resource/images/img_logo2.png')}
        />
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_phone.png')}
        />
        <TextInput
          placeholder="Số điện thoại"
          onChangeText={setPhoneNumber}
          style={styles.txtBtn}></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={{width: 25, height: 25}}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput
          onChangeText={setPassword}
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
      <TouchableOpacity onPress={onLogin}>
        <View style={styles.btnLogin}>
          <Text style={styles.txtBtn2}>Đăng nhập</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerNote}>
        <Text style={styles.txtNote}>Quên mật khẩu ?</Text>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.btnNote}>Bấm vào đây</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginWithAccount;
