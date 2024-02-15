import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {RegisterProps} from './type';

const Register: React.FC<RegisterProps> = props => {
  const {navigation} = props;

  const onRegisterAccount = () => {
    navigation.navigate('LoginWithAccount');
  };

  const onLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.btnRegister}>
        <Image
          style={styles.imgIcon}
          source={require('../../../Resource/images/icon_key.png')}
        />
        <TextInput style={styles.txtBtn} secureTextEntry={true}></TextInput>
      </View>
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
    </View>
  );
};

export default Register;
