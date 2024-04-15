import {Dimensions, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {Colors} from '../../Resource/colors';
import ButtonIcon from '../Buttons/ButtonIcon';
import Slider from '@react-native-community/slider';

interface DialogSettingItemDiaryProps extends ViewProps {
  onCancel: () => void;
}

const DialogSettingItemDiary: React.FC<DialogSettingItemDiaryProps> = props => {
  const {onCancel} = props;
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('../../Resource/images/icon_close.png')}
      />
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="red"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default DialogSettingItemDiary;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    marginLeft: -20,
    backgroundColor: Colors.WHITE,
    height: Dimensions.get('screen').height / 2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Dimensions.get('screen').height / 2,
  },

  btnClose: {
    width: 30,
    height: 30,
    marginLeft: Dimensions.get('screen').width - 40,
    marginTop: 10,
  },
});
