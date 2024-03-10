import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppSelector} from '../../../Redux/Hook';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const TakeMoment = () => {
  const [selected, setSelected] = useState('');
  const data = [
    {key: '1', value: 'Bạn bè'},
    {key: '2', value: 'Mọi người'},
  ];
  const user = useAppSelector(state => state.Authentication.myAccount);
  return (
    // CONTAINER
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundImage}>
          <Image style={styles.imgAVT} source={{uri: user.avatar}}></Image>
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
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
        </View>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.textSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* CENTER */}
      <View style={styles.center}>
        <ImageBackground
          source={require('../../../Resource/images/img.png')}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{borderRadius: 30}}>
          <View style={styles.backgroundTextContent}>
            <TextInput style={styles.textContent}></TextInput>
          </View>
        </ImageBackground>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerHeader}>
          <TouchableOpacity>
            <Image
              style={styles.imgLeftRight}
              source={require('../../../Resource/images/img_library.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.imgTakePhoto}
              source={require('../../../Resource/images/take.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
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
