import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

const chatScreen = props => {
  const {navigation} = props;
  const pressHandler = () => {
    Alert.alert(
      'Xóa bạn bè',
      'Bạn có chắc chắn muốn hủy kết bạn với người này không ?',
      [
        {text: 'Chấp nhận', onPress: () => console.log('Đã hủy kết bạn')},
        {text: 'Hủy', onPress: () => console.log('...')},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text3}> Tin nhắn</Text>
      </View>
      <TextInput style={styles.textInput} placeholder="Tìm kiếm..."></TextInput>

      <View>
        <Text style={styles.text4}>Gần đây</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('BoxChat')}
        onLongPress={() => pressHandler()}>
        <Image
          source={require('./assets/images/Ellipse3.png')}
          style={styles.image6}></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton2}
        onPress={() => navigation.navigate('BoxChat')}>
        <Image
          source={require('./assets/images/Ellipse3.png')}
          style={styles.image6}></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton3}
        onPress={() => navigation.navigate('BoxChat')}>
        <Image
          source={require('./assets/images/Ellipse3.png')}
          style={styles.image6}></Image>
        <TouchableOpacity>
          <Text style={styles.text1}>Nguyễn Ngọc Bảo Sơn</Text>
          <Text style={styles.text2}>Xin chào</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default chatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  textInput: {
    position: 'absolute',
    width: 354,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    top: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  viewButton: {
    //left : 20,
    flexDirection: 'row',
    position: 'absolute',
    width: 354,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    top: 150,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  viewButton2: {
    //left : 20,
    flexDirection: 'row',
    position: 'absolute',
    width: 354,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    top: 230,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  viewButton3: {
    //left : 20,
    flexDirection: 'row',
    position: 'absolute',
    width: 354,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    top: 310,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  text1: {
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#176B87',
  },

  text2: {
    left: 10,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666666',
  },
  text3: {
    width: 354,
    height: 40,
    left: 0,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    top: 22,
  },

  text4: {
    width: 354,
    height: 40,
    left: 0,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    top: 80,
  },
});
