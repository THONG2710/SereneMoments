import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';

const BoxChatScreen = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewButton}>
        <TouchableOpacity onPress={() => navigation.navigate('chat')}>
          <Image
            source={require('../SereneMoments/assets/images/btn_back.png')}></Image>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.viewName}>
            <Image
              style={styles.imageView}
              source={require('../SereneMoments/assets/images/Ellipse3.png')}></Image>
            <Text style={styles.textName}>Sơn</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../SereneMoments/assets/images/btn_menu.png')}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.boxView}>
        <View style={styles.messagesRight}>
          <View>
            <Text style={styles.mesTextRight}>Xin chào</Text>
          </View>
        </View>
        <View style={styles.messagesLeft}>
          <View>
            <Text style={styles.mesTextLeft}>Mình có quen nhau không? ?</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton1}>
        <TouchableOpacity>
          <Image
            source={require('../SereneMoments/assets/images/btn_send.png')}></Image>
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm..."></TextInput>

        <TouchableOpacity>
          <Image
            source={require('../SereneMoments/assets/images/btn_url.png')}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default BoxChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  viewName: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 4,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 5,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft:6,
  },

  viewButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 24,
    width: 347,
    height: 30,
  },

  viewButton1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 700,
    width: 365,
    height: 40,
  },

  textInput: {
    width: 250,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },

  boxView: {
    marginTop: 75,
    width: '100%',
    padding: 20,
  },

  messagesRight: {
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#4913F6',
    maxWidth: '80%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 15,
    paddingHorizontal: 10,
  },

  messagesLeft: {
    paddingVertical: 10,
    marginVertical: 16,
    backgroundColor: 'white',
    maxWidth: '80%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  mesTextLeft: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mesTextRight: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageView: {
    width: 25,
    height: 25,
    borderRadius: 3,
  },
  text1: {
    left: 340,
  },

  text2: {
    top: 5,
    left: 247,
  },

  text3: {
    top: 15,
  },
  text4: {
    top: 15,
    left: 336,
  },
  
});
