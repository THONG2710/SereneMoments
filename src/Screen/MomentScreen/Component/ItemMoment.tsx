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
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {MomentModel, UserModel} from '../../../Models/Model';
import {onConvertEpochtime} from '../../../Service/Service';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

interface ItemMomentProps extends ViewProps {
  moment: MomentModel;
}

const ItemMoment: React.FC<ItemMomentProps> = props => {
  const [selected, setSelected] = useState('');
  const data = [{key: '1', value: 'Nguyễn Quang Trường'}];
  const {moment} = props;
  const [user, setuser] = useState<UserModel>();

  // lấy thông tin người dùng
  const onGetUser = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/users/getUserById?id=' + moment.userid,
    );
    if (res) {
      setuser(res.user);
    }
  };

  useEffect(() => {
    onGetUser();
  }, []);

  return (
    //CONTAINER
    <ScrollView style={styles.container}>
      {/* CENTER */}
      <View style={styles.center}>
        <ImageBackground
          source={{uri: moment.content.toString()}}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{borderRadius: 30}}>
          <View style={styles.backgroundTextContent}>
            <Text style={styles.textContent}>{moment.caption}</Text>
          </View>
        </ImageBackground>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.poster}>
          <View style={styles.namePoster}>
            <View style={styles.backgroundImage}>
              <Image style={styles.imgAVT} source={{uri: user?.avatar}}></Image>
            </View>
            <Text style={styles.textPoster}>{user?.username}</Text>
          </View>
          <View style={styles.timePoster}>
            <Text style={styles.textTime}>
              {onConvertEpochtime(Number(moment.createdat))}
            </Text>
          </View>
        </View>

        <View style={styles.interact}>
          <TouchableOpacity style={styles.interactLeft}>
            <Image
              style={styles.imgInteract}
              source={require('../../../Resource/images/icon_heart.png')}></Image>
            <Text style={styles.textInteract}>30</Text>
          </TouchableOpacity>
          <Image
            style={styles.line}
            source={require('../../../Resource/images/Line.png')}></Image>

          <TouchableOpacity style={styles.interactRight}>
            <Image
              style={styles.imgInteract}
              source={require('../../../Resource/images/icon_comment.png')}></Image>
            <Text style={styles.textInteract}>64</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={styles.send}>
          <TextInput
            style={styles.ipSend}
            placeholder={`Gửi đến ${user?.username}`}></TextInput>
          <TouchableOpacity style={styles.backgroundImageSend}>
            <Image
              style={styles.imgSend}
              source={require('../../../Resource/images/icon_send.png')}></Image>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ItemMoment;

const styles = StyleSheet.create({
  //CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
    marginTop: 30,
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
    left: 80,
  },

  selectedList: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0,
    width: 200,
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
    width: 200,
    fontWeight: 'bold',
    zIndex: 1,
  },

  textDropdownStyles: {
    color: '#176B87',
    fontWeight: '500',
  },

  imgAVT: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  backgroundImageMN: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgMN: {
    width: 28,
    height: 28,
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
    marginTop: 10,
    borderRadius: 30,
  },

  backgroundTextContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  textContent: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },

  // FOOTER
  footer: {
    marginTop: 10,
  },

  poster: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  namePoster: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textPoster: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#000',
  },

  timePoster: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textTime: {
    marginHorizontal: 2,
    fontWeight: '500',
  },

  interact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  interactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },

  interactRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },

  imgInteract: {
    width: 24,
    height: 24,
  },

  textInteract: {
    color: '#000',
    fontWeight: '500',
    marginLeft: 5,
  },

  line: {
    width: 1,
  },

  send: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  ipSend: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: w - w * 0.25,
    height: 40,
    paddingLeft: 20,
    fontWeight: 'bold',
  },

  backgroundImageSend: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  imgSend: {
    width: 25,
    height: 25,
  },
});
