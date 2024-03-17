import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {LoginWithAccountProps} from './type';
import {ID_ADRESS, postData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {
  SAVE_USER,
  SET_ISLOGGED,
} from '../../../Redux/Action/AuthenticationActions';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import LoadingDialog from '../../../Components/Dialogs/LoadingDialog';
import {isValidPassword, isValidPhoneNumber} from '../../Validations/Validate';
const LoginWithAccount: React.FC<LoginWithAccountProps> = props => {
  const {navigation} = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const is_logged = useAppSelector(state => state.Authentication.isLogged);
  const usdispath = useAppDispatch();
  const [isVisible, setIsvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassWord, setErrorPassword] = useState('');
  

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
    setIsLoading(true);
    if (!res.result) {
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Cảnh báo', 'Lỗi đăng nhập, vui lòng thử lại', [
          {
            text: 'Cancle',
            onPress: () => {
              setIsLoading(false);
            },
          },
        ]);
      }, 5000);
    } else {
      const userCurrent = {
        _id: res.user._id,
        username: res.user.username,
        password: res.user.password,
        email: res.user.email,
        available: res.user.available,
        avatar: res.user.avatar,
        createdat: res.user.createdat,
        phoneNumber: res.user.phonenumber,
      };
      usdispath(SAVE_USER(userCurrent));

      setIsLoading(false);
      usdispath(SET_ISLOGGED(true));
      navigation.navigate('AuthorizedNavigation');
    }
  };

  return (
    <View style={styles.container}>
      <LoadingDialog isVisible={isLoading} />
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
          onChangeText={text => {
            setErrorPhoneNumber(
              isValidPhoneNumber(text) == true
                ? ''
                : 'SDT chưa đúng định dạng',
            );
            setPhoneNumber(text);
          }}
          style={styles.txtBtn}></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={{width: 25, height: 25}}
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
      <Text style={styles.txtError}>
        {errorPassWord},{errorPhoneNumber}
      </Text>
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
