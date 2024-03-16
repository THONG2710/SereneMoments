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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppSelector} from '../../../Redux/Hook';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {firebase} from '@react-native-firebase/storage';
import {UserModel} from '../../../Models/Model';

const TakeMoment: React.FC = () => {
  const [selected, setSelected] = useState('');
  const [uriImage, setUriImage] = useState<any>('');
  const [caption, setCaption] = useState<string>('');
  const [description, setdescription] = useState('');
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [data, setData] = useState<{value: string; key: string}[]>([]);
  // const data = [
  //   {key: '1', value: 'Bạn bè'},
  //   {key: '2', value: 'Mọi người'},
  // ];
  const user = useAppSelector(state => state.Authentication.myAccount);

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
          setdescription('image');
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
            setdescription('image');
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
          setdescription('video');
        }
      }
    });
  };

  // đăng khoảnh khắc
  const postMoment = async (content: string) => {
    if (description !== '') {
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
            const createdat = new Date().getTime();
            const cation = caption;
            const moment = {userid, createdat, cation, downloadURL, description};
            const res = await postData(
              'http://' + ID_ADRESS + ':3000/api/moment/createMoment',
              moment,
            );
            if (res) {
              console.log(moment);
              setCaption('');
              setUriImage(null);
            }
          });
        },
      );
    } else {
      Alert.alert('Vui lòng chọn ảnh');
    }
  };

  // lấy danh sách bạn bè
  const onGetMyFriends = async () => {
    // const res = await getData(
    //   'http://' +
    //     ID_ADRESS +
    //     ':3000/api/friend/getInforFriendsById?id=' +
    //     user._id,
    // );
    // if (res.result) {
    //   const users = res.friends;
    //   setTimeout(() => {
    //     for (const user of users) {
    //       const newData = {key: user._id.toString(), value: user.username};
    //       console.log(newData);
    //       setData([...data, newData]);
    //     }
    //   }, 1000);
    // }
  };

  // tải lại trang
  const onRefresh = () => {
    setIsRefresh(!isRefresh);
  };

  useEffect(() => {
    onGetMyFriends();
  }, [isRefresh]);

  return (
    // CONTAINER
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
      }>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundImage}>
          <Image
            style={styles.imgAVT}
            source={
              user.avatar
                ? {uri: user.avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          {data && (
            <SelectList
              boxStyles={styles.selectedList}
              inputStyles={styles.inputStylesSelected}
              dropdownStyles={styles.dropdownStylesSelected}
              dropdownTextStyles={styles.textDropdownStyles}
              setSelected={(value: React.SetStateAction<string>) =>
                setSelected(value)
              }
              data={data}
              save="value"
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.save}
          onPress={() => postMoment(uriImage)}>
          <Text style={styles.textSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* CENTER */}
      <View style={styles.center}>
        <ImageBackground
          source={
            uriImage
              ? {uri: uriImage}
              : require('../../../Resource/images/img.jpg')
          }
          resizeMode="cover"
          style={styles.image}
          imageStyle={{borderRadius: 30}}>
          <View style={styles.backgroundTextContent}>
            <TextInput
              value={caption}
              onChangeText={value => setCaption(value)}
              style={styles.textContent}></TextInput>
          </View>
        </ImageBackground>
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

        <View style={styles.seeMore}>
          <TouchableOpacity>
            <Text style={styles.textSeeMore}>Xem thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.imgSeeMore}
              source={require('../../../Resource/images/icon_down.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    left: 120,
  },

  selectedList: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0,
    width: 110,
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
    width: 110,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginHorizontal: 15,
    borderRadius: 30,
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
    marginVertical: 10,
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
});
