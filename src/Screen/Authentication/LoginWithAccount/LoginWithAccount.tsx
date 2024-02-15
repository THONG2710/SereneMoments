import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {LoginWithAccountProps} from './type';

const LoginWithAccount: React.FC<LoginWithAccountProps> = props => {
  const {navigation} = props;

  const onForgotPassword = () => {
    navigation.navigate('ChangePasswordScreen');
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
          source={require('../../../Resource/images/icon_email2.png')}
        />
        <TextInput style={styles.txtBtn}></TextInput>
      </View>
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput style={styles.txtBtn} secureTextEntry={true}></TextInput>
      </View>
      <TouchableOpacity>
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
