import {Alert, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useState} from 'react';
import Draggable from 'react-native-draggable';

const TestDragable = () => {
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight2, setfontWeight] = useState<TextStyle["fontWeight"]>('normal');
  const onChoose = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'font size 14',
        onPress: () => setFontSize(14),
      },
      {
        text: 'font size 26',
        onPress: () => setFontSize(26),
      },
      {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
    ]);
  };

  const onChoose2 = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'đậm',
        onPress: () => setfontWeight('bold'),
      },
      {
        text: 'nhạt',
        onPress: () => setfontWeight('normal'),
      },
      {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
    ]);
  };
  return (
    <View>
      <Draggable x={50} y={50} onShortPressRelease={onChoose2}>
        <Text style={{fontWeight: fontWeight2}}>Thong</Text>
      </Draggable>
    </View>
  );
};

export default TestDragable;

const styles = StyleSheet.create({});
