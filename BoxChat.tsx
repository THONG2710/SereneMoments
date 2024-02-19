import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';

const BoxChatScreen = (props) => {
  
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewButton}>
        <TouchableOpacity onPress={() => navigation.navigate('chat')}>
          <Image
            source={require('../SereneMoments/assets/images/btn_back.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../SereneMoments/assets/images/title_name.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../SereneMoments/assets/images/btn_menu.png')}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.boxView}>
        <Image
          source={require('../SereneMoments/assets/images/message_1.png')}
          style={styles.text1}></Image>
        <Image
          source={require('../SereneMoments/assets/images/message_2.png')}
          style={styles.text2}></Image>
        <Image
          source={require('../SereneMoments/assets/images/reply.png')}
          style={styles.text3}></Image>
        <Image
          source={require('../SereneMoments/assets/images/message_3.png')}
          style={styles.text4}></Image>
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
    top: 90,
    width: 400,
    height: 600,
   // backgroundColor: '#F94747',
  },
  text1: {
    left: 340,
  },

  text2: {
    top : 5,
    left: 247,
  },

  text3: {
    top : 15,
  },
  text4: {
    top : 15,
    left: 336,
  },
});
