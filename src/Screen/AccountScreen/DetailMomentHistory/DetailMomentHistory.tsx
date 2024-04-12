import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const DetailMomentHistory = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [selected, setSelected] = useState("");
  const [heart, setHeart] = useState(false)
  const Liked = () => {
    setHeart(!heart)
  }
  const data = [
    { key: '1', value: 'Nguyễn Trường' },
  ]
  return (
    //CONTAINER
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.backgroundImage}>
          <Image style={styles.imgAVT} source={require('../../../Resource/images/avatar.png')}></Image>
        </View>
       
        <View style={styles.backgroundImageMN}>
          <View >
            <Image style={styles.imgMN} source={require('../../../Resource/images/icon_menu.png')}></Image>
          </View>
        </View>
      </View>

      {/* CENTER */}
      <View style={styles.center}>
        <ImageBackground source={require('../../../Resource/images/img.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 30 }}>
          <View style={styles.backgroundTextContent}>
            <Text style={styles.textContent}>Em người yêu cũ</Text>
          </View>
        </ImageBackground>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.poster}>
          <View style={styles.namePoster}>
            <View style={styles.backgroundImage}>
              <Image style={styles.imgAVT} source={require('../../../Resource/images/avatar.png')}></Image>
            </View>
            <Text style={styles.textPoster}>Trường sad boy</Text>
          </View>
          <View style={styles.timePoster}>
            <Text style={styles.textTime}>15:30</Text>
            <Text style={styles.textTime}>21/01/2024</Text>
          </View>
        </View>

        <View style={styles.interact}>
          <View style={styles.interactLeft} >
            <Image style={styles.imgInteract} source={require('../../../Resource/Image2/hearted.png')}></Image>
            <Text style={styles.textInteract}>30</Text>
          </View>
          <Image style={styles.line} source={require('../../../Resource/images/Line.png')}></Image>

          <View style={styles.interactRight}>
            {/* <Image style={styles.imgInteract} source={{ uri: COMMENT }}></Image> */}
            <Text style={styles.textInteract}>64</Text>
          </View>
        </View>


      </View>
    </ScrollView>
  )
}

export default DetailMomentHistory

const styles = StyleSheet.create({
  //CONTAINER
  container:
  {
    flex: 1,
    backgroundColor: '#B4D4FF'

  },

  //HEADER
  header:
  {
    marginHorizontal: 25,
    marginVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  backgroundImage:
  {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center'
  },

  dropdownContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    alignItems: 'center',
    left: 80
  },

  selectedList:
  {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0,
    width: 200,
    fontFamily: 'Helvetica',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputStylesSelected:
  {
    color: '#176B87',
    fontWeight: 'bold',
    marginHorizontal: 10

  },

  dropdownStylesSelected:
  {
    backgroundColor: 'white',
    borderWidth: 0,
    width: 200,
    fontWeight: 'bold',
    zIndex: 1
  },

  textDropdownStyles:
  {
    color: '#176B87',
    fontWeight: '500'
  },

  imgAVT:
  {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  backgroundImageMN:
  {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center'
  },

  imgMN:
  {
    width: 28,
    height: 28,
  },

  //CENTER
  center:
  {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },

  image: {
    justifyContent: 'flex-end',
    width: 350,
    height: 400,
    marginTop: 10,
    borderRadius: 30,

  },

  backgroundTextContent:
  {
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
    padding: 10
  },

  // FOOTER
  footer:
  {
    marginTop: 30

  },

  poster:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,

  },

  namePoster:
  {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textPoster:
  {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#000',
  },

  timePoster:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },

  textTime:
  {
    marginHorizontal: 2,
    fontWeight: '500'
  },

  interact:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,

  },

  interactLeft:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,

  },

  interactRight:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },

  imgInteract:
  {
    width: 24,
    height: 24
  },

  textInteract:
  {
    color: '#000',
    fontWeight: '500',
    marginLeft: 5
  },

  line:
  {
    width: 1,
    height:25
  },

  send:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20
  },

  ipSend:
  {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: w - w * 0.25,
    height: 40,
    paddingLeft: 20,
    fontWeight: 'bold'
  },

  backgroundImageSend:
  {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },

  imgSend:
  {
    width: 25,
    height: 25
  }
})