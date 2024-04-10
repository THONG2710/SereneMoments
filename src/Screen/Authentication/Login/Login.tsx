import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {LoginProps} from './type';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  GraphRequestCallback,
} from 'react-native-fbsdk-next';
import {Settings, Profile} from 'react-native-fbsdk-next';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {
  SAVE_USER,
  SET_ISLOGGED,
} from '../../../Redux/Action/AuthenticationActions';
import {setDataToStorage} from '../../../Service/Service';

const Login: React.FC<LoginProps> = props => {
  const {navigation} = props;
  Settings.setAppID('3561957340731174');
  Settings.initializeSDK();
  const dispatch = useAppDispatch();

  const onLoginWithAccount = () => {
    navigation.navigate('LoginWithAccount');
  };

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const onLogin = () => {
    navigation.navigate('AuthorizedNavigation');
  };

  // xử lí đăng nhập
  const handleLogin = async (
    username: string,
    password: string,
    email: string,
    avatar: string,
    phonenumber: string,
    createdat: number,
  ) => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/users/checkEmail?email=' + email,
      );
      console.log(res);
      
      if (!res.user) {
        const data = {
          username: username,
          password: password,
          email: email,
          avatar: avatar,
          phonenumber: phonenumber,
          createdat: createdat,
        };
        const response = await postData(
          'http://' + ID_ADRESS + ':3000/api/users/register',
          data,
        );
        if (response.result) {
          const userCurrent = {
            _id: response.user._id,
            username: response.user.username,
            password: response.user.password,
            email: response.user.email,
            available: response.user.available,
            avatar: response.user.avatar,
            createdat: response.user.createdat,
            phoneNumber: response.user.phonenumber,
          };
          dispatch(SAVE_USER(userCurrent));
          setDataToStorage('IS_LOGGED', true);
          setDataToStorage('ACCOUNT', userCurrent);
          dispatch(SET_ISLOGGED(true));
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthorizedNavigation'}],
          });
        }
      } else {
        const response = await getData(
          'http://' +
            ID_ADRESS +
            ':3000/api/users/getAccountByEmail?email=' +
            email,
        );
        if (response.result) {
          const userCurrent = {
            _id: response.user._id,
            username: response.user.username,
            password: response.user.password,
            email: response.user.email,
            available: response.user.available,
            avatar: response.user.avatar,
            createdat: response.user.createdat,
            phoneNumber: response.user.phonenumber,
          };
          dispatch(SAVE_USER(userCurrent));
          setDataToStorage('IS_LOGGED', true);
          setDataToStorage('ACCOUNT', userCurrent);
          dispatch(SET_ISLOGGED(true));
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthorizedNavigation'}],
          });
        }
      }
    } catch (error) {
      console.log('failed to login: ', error);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'user_friends',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken();
        // console.log('Logged in successfully!', tokenData);
        const fetchUserAvatar = async (): Promise<void> => {
          const responseCallback: GraphRequestCallback = (
            error,
            result: any,
          ) => {
            if (error) {
              console.log('Error fetching user avatar:', error);
              // Xử lý lỗi khi không thể lấy thông tin
            } else {
              const {name, email} = result;
              const avatar = result?.picture.data.url;
              const date = Math.floor(Number(new Date().getTime() / 1000));
              handleLogin(name, '', email, avatar, '', date);
            }
          };

          const graphRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'picture.type(large), name, birthday, email',
                },
                access_token: {
                  string: tokenData?.accessToken,
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
      <TouchableOpacity onPress={handleLoginFacebook}>
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
