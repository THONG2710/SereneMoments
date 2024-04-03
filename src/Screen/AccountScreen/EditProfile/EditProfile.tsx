import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {EditProfileProps} from './type';
import {Colors} from '../../../Resource/colors';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';
import {ID_ADRESS, postData} from '../../../Service/RequestMethod';
import {useDispatch} from 'react-redux';
import {SAVE_USER} from '../../../Redux/Action/AuthenticationActions';
import DialogConfirmSuccess from '../../Dialog/DialogConfirmSuccess';

const EditProfile: React.FC<EditProfileProps> = props => {
  const {navigation} = props;
  const [username, setUsername] = useState<string>();
  const [phonenumber, setPhonenumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [avatar, setAvatar] = useState<any>('');
  const user = useAppSelector(state => state.Authentication.myAccount);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  //   quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setUsername(user.username);
    setPhonenumber(user.phoneNumber);
    setEmail(user.email);
    setAvatar(user.avatar);
  }, []);

  // chọn ảnh từ thư viện
  const getImageFromLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        // Hình ảnh đã được chọn thành công
        if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          setAvatar(source.uri);
        }
      }
    });
  };

  // cài đặt thông tin tài khoản
  const onSetUpAccount = async (Navatar?: string) => {
    const data = {
      id: user._id,
      username: username,
      email: email,
      avatar: Navatar ? Navatar : avatar,
      phonenumber: phonenumber,
    };
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/users/updateUser',
      data,
    );
    if (res.result) {
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
      dispatch(SAVE_USER(userCurrent));
      setShowAlert(true);
    }
  };

  // xử lí cập nhật tài khoản
  const onUpdateAccount = async () => {
    if (avatar != user.avatar) {
      const reference = firebase
        .storage()
        .ref()
        .child(new Date().getTime() + '.png');
      const upload = reference.putFile(avatar);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.log('Upload error:', error);
        },
        () => {
          upload.snapshot?.ref.getDownloadURL().then(async downloadURL => {
            setAvatar(downloadURL);
            onSetUpAccount(downloadURL);
          });
        },
      );
    } else {
      console.log('not change');
      onSetUpAccount();
    }
  };

  return (
    // CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundBack} onPress={onGoBack}>
          <Image
            style={styles.back}
            source={require('../../../Resource/images/icon_back.png')}></Image>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Chỉnh sửa hồ sơ</Text>
      </View>
      {/* CENTER */}
      <View style={styles.center}>
        <View style={styles.background}>
          <Image
            style={styles.imgAVT}
            source={
              avatar
                ? {uri: avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
          <TouchableOpacity
            style={styles.backgroundAdd}
            onPress={getImageFromLibrary}>
            <Image
              style={styles.imgAdd}
              source={require('../../../Resource/images/icon_add.png')}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.textCenter}>
          Thay đổi một chút về bản thân bạn !!!
        </Text>

        <View style={styles.backgroundEdit}>
          <Image
            style={styles.imgEdit}
            source={require('../../../Resource/images/icon_user2.png')}></Image>
          <View style={styles.label}></View>
          <View style={styles.contentEdit}>
            <Text style={styles.textEdit}>Họ và tên</Text>
            <TextInput
              onChangeText={value => setUsername(value)}
              style={styles.ipEdit}
              placeholderTextColor={'#000'}>
              {username}
            </TextInput>
          </View>
        </View>

        <View style={styles.backgroundEdit}>
          <Image
            style={styles.imgEdit}
            source={require('../../../Resource/images/icon_phone2.png')}></Image>
          <View style={styles.label}></View>
          <View style={styles.contentEdit}>
            <Text style={styles.textEdit}>Số điện thoại</Text>
            <TextInput
              onChangeText={value => setPhonenumber(value)}
              style={styles.ipEdit}
              placeholderTextColor={'#000'}>
              {phonenumber}
            </TextInput>
          </View>
        </View>

        <View style={styles.backgroundEdit}>
          <Image
            style={styles.imgEdit}
            source={require('../../../Resource/images/icon_mail.png')}></Image>
          <View style={styles.label}></View>
          <View style={styles.contentEdit}>
            <Text style={styles.textEdit}>Email</Text>
            <TextInput
              onChangeText={value => setEmail(value)}
              style={styles.ipEdit}
              placeholderTextColor={'#000'}>
              {email}
            </TextInput>
          </View>
        </View>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnEdit} onPress={onUpdateAccount}>
          <Text style={styles.textUpdate}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
      <DialogConfirmSuccess
        message="Cập nhật thành công"
        title="Thông báo!"
        isvisible={showAlert}
        onConfirm={onGoBack}
        onCancel={() => {
          setShowAlert(false);
        }} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F1F9FF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backgroundBack: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#919090',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF0F7',
  },

  back: {
    width: 18,
    height: 18,
  },

  textHeader: {
    width: '85%',
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  background: {
    width: 110,
    height: 110,
    backgroundColor: '#86B6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'relative',
  },

  imgAVT: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.WHITE,
  },

  backgroundAdd: {
    position: 'absolute',
    backgroundColor: '#86B6F6',
    width: 22,
    height: 22,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    right: 5,
  },

  imgAdd: {
    width: 15,
    height: 15,
  },
  // CENTER
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  textCenter: {
    color: '#000',
    marginVertical: 20,
  },

  backgroundEdit: {
    borderWidth: 3,
    borderColor: '#A2C6F7',
    width: '95%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  imgEdit: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },

  label: {
    width: 1,
    height: 40,
    backgroundColor: '#000',
    marginLeft: 20,
  },

  contentEdit: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
  },

  textEdit: {
    color: '#CDC7C7',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 2,
    bottom: -5,
  },

  ipEdit: {
    height: 37,
    width: 250,
    fontSize: 14,
  },
  // FOOTER
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  btnEdit: {
    backgroundColor: '#66A7FF',
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textUpdate: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 35,
  },
});
