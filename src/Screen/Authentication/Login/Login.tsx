import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {LoginProps} from './type';
import {useAppSelector} from '../../../Redux/Hook';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {Settings, Profile} from 'react-native-fbsdk-next';

const Login: React.FC<LoginProps> = props => {
  const {navigation} = props;
  const is_logged = useAppSelector(state => state.Authentication.isLogged);
  Settings.setAppID('3561957340731174');
  Settings.initializeSDK();

  const onLoginWithAccount = () => {
    navigation.navigate('LoginWithAccount');
  };

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const onLogin = () => {
    navigation.navigate('AuthorizedNavigation');
  };

  const handleLogout = async () => {
    try {
      await LoginManager.logOut();
      console.log('Logged out successfully!');
      // Xử lý logout thành công
    } catch (error) {
      console.log('Logout error:', error);
      // Xử lý lỗi logout
    }
  };

  const handleLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken();
        console.log('Logged in successfully!', tokenData);
        const fetchUserAvatar = async () => {
          const responseCallback = (error, result) => {
            if (error) {
              console.log('Error fetching user avatar:', error);
              // Xử lý lỗi khi không thể lấy thông tin
            } else {
              console.log('User avatar:', result.picture.data.url);
              // Xử lý thông tin avatar
            }
          };

          const graphRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'picture.type(large)',
                },
                access_token: {
                  string: tokenData.accessToken,
                },
              },
            },
            responseCallback,
          );

          new GraphRequestManager().addRequest(graphRequest).start();
        };

        fetchUserAvatar();
        // Xử lý đăng nhập thành công
      }
    } catch (error) {
      console.log('Login error:', error);
      // Xử lý lỗi đăng nhập
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sayHello}>Xin chào.</Text>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../Resource/images/logo.png')}
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
      <TouchableOpacity onPress={handleLogin}>
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
