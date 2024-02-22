import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {LoginProps} from './type';
import {useAppSelector} from '../../../Redux/Hook';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import { Settings, Profile } from 'react-native-fbsdk-next';

const Login: React.FC<LoginProps> = props => {
  const {navigation} = props;
  const is_logged = useAppSelector(state => state.Authentication.isLogged);
  Settings.setAppID('3561957340731174');
  Settings.initializeSDK();

  useEffect(() => {
    console.log(is_logged);

    is_logged ? navigation.navigate('AuthorizedNavigation') : null;
  }, []);

  const onLoginWithAccount = () => {
    navigation.navigate('LoginWithAccount');
  };

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
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
            const currentProfile = Profile.getCurrentProfile().then(
              function(currentProfile) {
                if (currentProfile) {
                  console.log("The current logged user is: " +
                    currentProfile.name
                    + ". His profile id is: " +
                    currentProfile.userID
                  );
                }
              }
            );
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
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
