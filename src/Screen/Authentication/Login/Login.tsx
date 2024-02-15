import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {LoginProps} from './type';

const Login: React.FC<LoginProps> = props => {
  const {navigation} = props;

  const onLoginWithAccount = () => {
    navigation.navigate('LoginWithAccount');
  }

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const onLogin = () => {
    navigation.navigate('AuthorizedNavigation');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.sayHello}>Xin chào.</Text>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../Resource/images/img_logo.png')}
        />
      </View>
      <TouchableOpacity onPress={onLogin}>
        <View style={styles.btnLogin}>
          <Image
            style={styles.imgIcon}
            source={require('../../../Resource/images/icon_email.png')}
          />
          <Text style={styles.txtBtn}>Đăng nhập bằng gmail</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogin}>
        <View style={styles.btnLogin}>
          <Image
            style={styles.imgIcon}
            source={require('../../../Resource/images/icon_facebook.png')}
          />
          <Text style={styles.txtBtn}>Đăng nhập bằng facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLoginWithAccount}>
        <View style={styles.btnLogin}>
          <Image
            style={styles.imgIcon}
            source={require('../../../Resource/images/icon_user.png')}
          />
          <Text style={styles.txtBtn}>Đăng nhập bằng tài khoản</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerRegister}>
        <Text style={styles.txtRegister}>Bạn chưa có tài khoản ?</Text>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.register}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.txtNote}>Tiếp tục và đồng ý với các</Text>
      <TouchableOpacity>
        <Text style={styles.btnNote}>điều khoản & chính sách riêng tư</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
