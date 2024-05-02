import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
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
import {setDataToStorage} from '../../../Service/Service';

const LoginWithAccount: React.FC<LoginWithAccountProps> = props => {
  const {navigation} = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const is_logged = useAppSelector(state => state.Authentication.isLogged);
  const usdispath = useAppDispatch();
  const [isVisible, setIsvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeVisiblePassword = () => {
    setIsvisible(!isVisible);
    setIsLoading(false);
  };

  const onForgotPassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const onHandleLogin = () => {
    const phoneNumberPattern = /^(08|09|03|05|07)\d{8}$/;
    if (phoneNumber == '' || password == '') {
      Alert.alert('', 'Vui lòng điền đầy đủ thông tin');
    } else if (!phoneNumberPattern.test(phoneNumber)) {
      Alert.alert('', 'Số điện thoại không hợp lệ')
    } else {
      onLogin()
    }
  };

  const onLogin = async () => {
    const data = {phoneNumber: phoneNumber, password: password};
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/users/loginWithPhoneNumber',
      data,
    );
    setIsLoading(true);
    console.log(res.user);

    if (res.result) {
      if (res.user[0].available && res.user[0]._id !== '') {
        const userCurrent = {
          _id: res.user[0]._id,
          username: res.user[0].username,
          password: res.user[0].password,
          email: res.user[0].email,
          available: res.user[0].available,
          avatar: res.user[0].avatar,
          createdat: res.user[0].createdat,
          phoneNumber: res.user[0].phonenumber,
        };
        usdispath(SAVE_USER(userCurrent));
        setDataToStorage('IS_LOGGED', true);
        setDataToStorage('ACCOUNT', userCurrent);
        setIsLoading(false);
        usdispath(SET_ISLOGGED(true));
        navigation.getParent()?.reset({
          index: 0,
          routes: [{name: 'AuthorizedNavigation'}],
        });
      }
      if (res.user[0]._id === '') {
        Alert.alert(
          'Cảnh báo',
          'Tài khoản hoặc mật khẩu của bạn không chính xác, vui lòng thử lại',
          [
            {
              text: 'Cancle',
              onPress: () => {
                setIsLoading(false);
              },
            },
          ],
        );
      } else {
        Alert.alert('', 'Tài khoản hiện tại không thể sử dụng', [
          {
            text: 'Đóng',
            onPress: () => {
              setIsLoading(false);
              setPhoneNumber('');
              setPassword('');
            },
          },
        ]);
      }
    }
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
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LoadingDialog isVisible={isLoading} />
      <Text style={styles.sayHello}>Xin chào.</Text>
      <Text style={styles.sayHello2}>Đăng nhập vào Semo ^.^</Text>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../Resource/images/logo.png')}
        />
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_phone.png')}
        />
        <TextInput
          value={phoneNumber}
          placeholder="Số điện thoại"
          onChangeText={setPhoneNumber}
          style={styles.txtBtn}></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={{width: 25, height: 25, tintColor: '#59AEEF'}}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput
          value={password}
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
      <TouchableOpacity onPress={onHandleLogin}>
        <View style={styles.btnLogin}>
          <Text style={styles.txtBtn2}>Đăng nhập</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerNote}>
        <Text style={styles.txtNote}>Quên mật khẩu ?</Text>
        <TouchableOpacity disabled={true} onPress={onForgotPassword}>
          <Text style={styles.btnNote}>Bấm vào đây</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginWithAccount;
