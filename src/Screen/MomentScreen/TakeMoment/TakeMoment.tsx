import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppSelector} from '../../../Redux/Hook';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {firebase} from '@react-native-firebase/storage';
import {MomentModel, UserModel} from '../../../Models/Model';
import {Colors} from '../../../Resource/colors';
import VideoPlayer from 'react-native-video-player';
import LoadingDialog from '../../../Components/Dialogs/LoadingDialog';

interface TakeMomentProps extends ViewProps {
  onRefresh: () => void;
}

const TakeMoment: React.FC<TakeMomentProps> = props => {
  const [selected, setSelected] = useState('');
  const [uriImage, setUriImage] = useState<any>('');
  const [caption, setCaption] = useState<string>('');
  const [data, setData] = useState<{value: string; key: string}[]>([]);
  const friends = useAppSelector(state => state.Friends.myFriends);
  const [isImage, setIsImage] = useState<boolean>(true);
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [friendsMoment, setFriendsMoment] = useState<MomentModel[]>([]);
  const [inForFriend, setInforFriend] = useState<UserModel>();

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
          setUriImage(source.uri);
          setIsImage(true);
        }
      }
    });
  };

  // chụp ảnh
  const onTakeAPhoto = () => {
    launchCamera(
      {mediaType: 'photo', includeBase64: false, quality: 0.8},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error:', response.errorMessage);
        } else {
          // Hình ảnh đã được chọn thành công
          if (response.assets && response.assets.length > 0) {
            const source = {uri: response.assets[0].uri};
            console.log(source.uri);
            setUriImage(source.uri);
            setIsImage(true);
          }
        }
      },
    );
  };

  // chọn video
  const getVideoFromLibrary = () => {
    launchImageLibrary({mediaType: 'video'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        // Hình ảnh đã được chọn thành công
        if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          setUriImage(source.uri);
          setIsImage(false);
        }
      }
    });
  };

  // Xác nhận đăng
  const onConfirmPostMoment = (content: string) => {
    Alert.alert('', 'Bạn có muốn đăng tải khoảnh khắc này không ?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng',
        onPress: () => postMoment(content),
      },
    ]);
  };

  // đăng khoảnh khắc
  const postMoment = async (content: string) => {
    setIsRefresh(true);
    if (isImage) {
      const reference = firebase
        .storage()
        .ref()
        .child(new Date().getTime() + '.png');
      const upload = reference.putFile(content);
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
            const userid = user._id;
            const createdat = Math.floor(Number(new Date().getTime() / 1000));
            const cation = caption;
            const moment = {
              userid: userid,
              createdat: createdat,
              caption: cation,
              content: downloadURL,
              description: '',
              isimage: isImage,
            };
            const res = await postData(
              'http://' + ID_ADRESS + ':3000/api/moment/createMoment',
              moment,
            );
            if (res) {
              onSetUp();
            }
          });
        },
      );
    } else {
      const reference = firebase
        .storage()
        .ref()
        .child(new Date().getTime() + '.mp4');
      const upload = reference.putFile(content);
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
            const userid = user._id;
            const createdat = new Date().getTime() / 1000;
            const cation = caption;
            const moment = {
              userid: userid,
              createdat: createdat,
              caption: cation,
              content: downloadURL,
              description: '',
              isimage: isImage,
            };
            const res = await postData(
              'http://' + ID_ADRESS + ':3000/api/moment/createMoment',
              moment,
            );
            if (res) {
              onSetUp();
            }
          });
        },
      );
    }
  };

  // lấy danh sách bạn bè
  const onGetMyFriends = async () => {
    const newFriends = [];
    for (let index = 0; index < friends.length; index++) {
      const newData = {
        key: friends[index]._id.toString(),
        value: friends[index].username,
      };
      newFriends.push(newData);
    }
    setData(newFriends);
  };

  // làm mới trang
  const onSetUp = () => {
    setSelected('');
    setUriImage('');
    setCaption('');
    setIsImage(true);
    setIsRefresh(false);
  };

  // lấy moment theo bạn bè
  const getMomentByFriends = async (id: string) => {
    try {
      console.log(id);
    } catch (error) {}
  };

  useEffect(() => {
    onGetMyFriends();
  }, []);

  return (
    // CONTAINER
    <View style={styles.container}>
      {/* dialog */}
      <LoadingDialog isVisible={isRefresh} />
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundImage} onPress={onSetUp}>
          <Image
            style={styles.imgAVT}
            source={require('../../../Resource/images/icon_refresh.png')}></Image>
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          {data && (
            <SelectList
              boxStyles={styles.selectedList}
              inputStyles={styles.inputStylesSelected}
              dropdownStyles={styles.dropdownStylesSelected}
              dropdownTextStyles={styles.textDropdownStyles}
              setSelected={(value: React.SetStateAction<string>) => {
                getMomentByFriends(value.toString());
                setSelected(value);
              }}
              data={data}
              save={'value'}
            />
          )}
        </View>
        <TouchableOpacity
          style={
            uriImage != ''
              ? styles.save
              : [styles.save, {backgroundColor: Colors.GRAY}]
          }
          disabled={uriImage != '' ? false : true}
          onPress={() => onConfirmPostMoment(uriImage)}>
          <Text style={styles.textSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* CENTER */}
      {selected != '' ? (
        <View style={{flex: 1}}></View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.center}>
            {isImage ? (
              <ImageBackground
                source={
                  uriImage
                    ? {uri: uriImage}
                    : require('../../../Resource/images/img.jpg')
                }
                resizeMode="cover"
                style={styles.image}
                imageStyle={{
                  borderRadius: 30,
                  width: Dimensions.get('screen').width,
                  marginLeft: -15,
                }}>
                <View style={styles.backgroundTextContent}>
                  <TextInput
                    value={caption}
                    onChangeText={value => setCaption(value)}
                    style={styles.textContent}></TextInput>
                </View>
              </ImageBackground>
            ) : (
              <View>
                <VideoPlayer
                  video={{uri: uriImage}}
                  videoWidth={Dimensions.get('screen').width}
                  videoHeight={Dimensions.get('screen').height}
                  thumbnail={
                    user?.avatar
                      ? {uri: user.avatar}
                      : require('../../../Resource/images/avatar.png')
                  }
                  endThumbnail={
                    user?.avatar
                      ? {uri: user.avatar}
                      : require('../../../Resource/images/avatar.png')
                  }
                  disableControlsAutoHide={true}
                  style={styles.videoStyle}
                />
                <View style={styles.backgroundTextContentVideo}>
                  <TextInput
                    value={caption}
                    onChangeText={value => setCaption(value)}
                    style={styles.textContent}></TextInput>
                </View>
              </View>
            )}
          </View>
          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.footerHeader}>
              <TouchableOpacity onPress={getImageFromLibrary}>
                <Image
                  style={styles.imgLeftRight}
                  source={require('../../../Resource/images/img_library.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={onTakeAPhoto}>
                <Image
                  style={styles.imgTakePhoto}
                  source={require('../../../Resource/images/take.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={getVideoFromLibrary}>
                <Image
                  style={styles.imgLeftRight}
                  source={require('../../../Resource/images/img_video.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default TakeMoment;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
  },

  //HEADER
  header: {
    marginHorizontal: 15,
    marginVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  backgroundImage: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    alignItems: 'center',
    left: Dimensions.get('screen').width / 6,
  },

  selectedList: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0,
    width: Dimensions.get('screen').width / 2,
    fontFamily: 'Helvetica',
    height: 45,
  },

  inputStylesSelected: {
    color: '#176B87',
    fontWeight: 'bold',
  },

  dropdownStylesSelected: {
    backgroundColor: 'white',
    borderWidth: 0,
    width: Dimensions.get('screen').width / 2,
    fontWeight: 'bold',
  },

  textDropdownStyles: {
    color: '#176B87',
    fontWeight: '500',
  },

  save: {
    backgroundColor: '#499EDC',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 70,
    borderRadius: 10,
  },

  textSave: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  imgAVT: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  //CENTER

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },

  image: {
    justifyContent: 'flex-end',
    width: Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height / 2 + 30,
    borderRadius: 30,
  },

  backgroundTextContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    borderRadius: 30,
  },

  backgroundTextContentVideo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    borderRadius: 30,
    position: 'absolute',
    top: 10,
    width: Dimensions.get('screen').width - 32,
    left: 16,
  },

  textContent: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //FOOTER

  footer: {
    marginHorizontal: 45,
    marginVertical: 50,
  },

  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imgLeftRight: {
    width: 50,
    height: 50,
  },

  imgTakePhoto: {
    width: 80,
    height: 80,
  },

  seeMore: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  textSeeMore: {
    color: '#176B87',
    fontWeight: 'bold',
    fontSize: 16,
  },

  imgSeeMore: {
    width: 30,
    height: 30,
    transform: [{rotate: '180deg'}],
  },

  // video
  videoStyle: {
    borderRadius: 20,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2 + 30,
    backgroundColor: Colors.WHITE,
    marginLeft: 5,
  },
});
