import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {RegisterProps} from './type';
import {useEffect, useState} from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {text} from 'stream/consumers';
import {
  isValidPassword,
  isValidPhoneNumber,
  isValidRePassword,
} from '../../Validations/Validate';
import {ID_ADRESS, postData} from '../../../Service/RequestMethod';
const Register: React.FC<RegisterProps> = props => {
  const {navigation} = props;
  const [isVisible, setIsvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassWord, setErrorPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');
  const [userName, setUserName] = useState('');

  const onRegisterAccount = async () => {
    if (password === rePassword) {
      try {
        const date = Math.floor(new Date().getTime() / 1000);
        const data = {
          username: userName,
          password: password,
          email: '',
          avatar:
            'https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png',
          phonenumber: phoneNumber,
          createdat: date,
        };
        const res = await postData(
          'http://' + ID_ADRESS + ':3000/api/users/register',
          data,
        );
        if (res.result) {
          Alert.alert('', 'Đăng kí thành công', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('LoginWithAccount');
              },
            },
          ]);
        }
      } catch (error) {
        console.log('failed to register: ', error);
      }
    }
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
          source={require('../../../Resource/images/img_logo2.png')}
        />
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_user_r.png')}
        />
        <TextInput
          onChangeText={value => setUserName(value)}
          style={styles.txtBtn}
          placeholder="Nhập tên"></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_phone.png')}
        />
        <TextInput
          keyboardType="number-pad"
          onChangeText={text => {
            setErrorPhoneNumber(
              isValidPhoneNumber(text) == true
                ? ''
                : 'Số điện thoại chưa đúng định dạng',
            );
            setPhoneNumber(text);
          }}
          style={styles.txtBtn}
          placeholder="Nhập số điện thoại"></TextInput>
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
      {/* <Text style={styles.txtError}>{errorPassWord}</Text> */}
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
            setRePassword(text);
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
