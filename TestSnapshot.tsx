import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import {useRef, useState} from 'react';

const TestSnapshot = () => {
  const viewShot = useRef(null);
  const [uri, setUri] = useState('');
  const captureScreen = () => {
    viewShot.current.capture().then(uri => {
      console.log(uri);
      
      setUri(uri);
    });
  };
  return (
    <View style={styles.container}>
      <ViewShot ref={viewShot} style={styles.viewShot}>
        <View style={{width: 200, height: 200, backgroundColor: 'red'}} >
            <Text>Thông làm đấy</Text>
        </View>
      </ViewShot>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={captureScreen} style={styles.btn}>
          <Text style={styles.btnTxt}>CAPTURE</Text>
        </TouchableOpacity>
      </View>
      {uri ? (
        <View style={styles.previewContainer}>
          <Text>Preview</Text>
          <Image
            source={{uri: uri}}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

export default TestSnapshot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewShot: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 8,
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  //   previewContainer
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#000',
  },
  previewImage: {width: 200, height: 200, backgroundColor: '#fff'},
});
