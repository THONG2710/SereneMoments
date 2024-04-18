import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Resource/colors';
import ButtonIcon from '../Buttons/ButtonIcon';
import Slider from '@react-native-community/slider';
import CheckBox from 'react-native-check-box';

interface DialogSettingItemDiaryProps extends ViewProps {
  onCancel: () => void;
  onChangeSize: (value: number) => void;
  onChangeRotate: (value: number) => void;
  onDelete?: () => void;
  onChangeTranform: (value: boolean) => void;
  currentSize: number;
  currentRotate: number;
  currentCheck: boolean;
}

const DialogSettingItemDiary: React.FC<DialogSettingItemDiaryProps> = props => {
  const {
    onCancel,
    onChangeSize,
    onChangeRotate,
    onDelete,
    onChangeTranform,
    currentSize,
    currentRotate,
    currentCheck,
  } = props;
  const [size, setSize] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [isSelectedCheckbox, setisSelectedCheckbox] = useState(false);

  const onHandleChangeTranform = () => {
    setisSelectedCheckbox(!isSelectedCheckbox);
    return onChangeTranform(isSelectedCheckbox);
  };

  useEffect(() => {
    setSize(currentSize);
    setRotate(currentRotate);
    setisSelectedCheckbox(currentCheck);
  }, []);

  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('../../Resource/images/icon_close.png')}
      />
      <View style={styles.resizeGroup}>
        <Text style={styles.txtOptions}>Kích thước</Text>
        <Slider
          thumbTintColor={Colors.BLUE}
          style={{width: '70%', height: 40}}
          minimumValue={50}
          maximumValue={700}
          step={5}
          onValueChange={value => {
            setSize(value);
            onChangeSize(value);
          }}
          value={size}
          minimumTrackTintColor={Colors.BLUE}
          // maximumTrackTintColor="#000000"
        />
      </View>

      <View style={styles.resizeGroup}>
        <Text style={styles.txtOptions}>Xoay</Text>
        <Slider
          thumbTintColor={Colors.BLUE}
          style={{width: '70%', height: 40}}
          minimumValue={0}
          maximumValue={360}
          step={1}
          onValueChange={value => {
            setRotate(value);
            onChangeRotate(value);
          }}
          value={rotate}
          minimumTrackTintColor={Colors.BLUE}
        />
      </View>

      <View style={styles.resizeGroup}>
        <Text style={styles.txtOptions}>Lật</Text>
        <CheckBox
          checkBoxColor={Colors.BLUE}
          style={{flex: 1, padding: 10}}
          onClick={onHandleChangeTranform}
          isChecked={isSelectedCheckbox}
        />
      </View>

      <View style={styles.deleteGroup}>
        <Pressable style={styles.btnDelete} onPress={onDelete}>
          <Text style={styles.txtDelete}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DialogSettingItemDiary;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    marginLeft: -20,
    backgroundColor: Colors.WHITE,
    height: Dimensions.get('screen').height / 3.5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: (Dimensions.get('screen').height / 4) * 2.6,
  },

  btnClose: {
    width: 30,
    height: 30,
    marginLeft: Dimensions.get('screen').width - 40,
    marginTop: 10,
  },

  deleteGroup: {
    width: '100%',
    alignItems: 'center',
  },

  btnDelete: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.RED,
    borderRadius: 10,
  },

  txtDelete: {
    fontSize: 16,
    color: Colors.WHITE,
  },

  resizeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  txtOptions: {
    color: Colors.BLACK,
    fontSize: 16,
    width: 100,
  },
});
