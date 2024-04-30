import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Draggable from 'react-native-draggable';
import {Colors} from '../../Resource/colors';
import ButtonIcon from './ButtonIcon';
import Modal from 'react-native-modal';
import DialogSettingItemDiary from '../Dialogs/DialogSettingItemDiary';
import CheckBox from 'react-native-check-box';

interface ButtonDragableProps extends ViewProps {
  isSlected: boolean;
  component: any;
  onDelete?: () => void;
  onChange: (size: number) => void;
}

const ButtonDragable: React.FC<ButtonDragableProps> = props => {
  const {component, onDelete, onChange} = props;
  const [isSlected, setIsSlected] = useState(true);
  const [size, setsize] = useState(50);
  const [rotate, setRotate] = useState(0);
  const [tranform, setTranform] = useState(0);

  useEffect(() => {
    onChange(size);
  }, [size]);

  return (
    <Draggable x={150} y={50}>
      <Pressable
        onLongPress={onDelete}
        style={{transform: [{rotate: rotate + 'deg'}]}}
        onPress={() => setIsSlected(!isSlected)}>
        <Modal
          backdropColor="rgba(0,0,0,0,0)"
          onBackdropPress={() => setIsSlected(!isSlected)}
          isVisible={isSlected}
          children={
            <DialogSettingItemDiary
              currentCheck={tranform == 180 ? false : true}
              currentRotate={rotate}
              currentSize={size}
              onChangeTranform={value => setTranform(value ? 180 : 0)}
              onDelete={onDelete}
              onChangeRotate={value => {
                setRotate(value);
              }}
              onChangeSize={value => {
                setsize(value);
              }}
              onCancel={() => setIsSlected(!isSlected)}
            />
          }
        />

        <View style={[isSlected ? styles.container : null]}>
          <Image
            style={{
              width: size,
              height: size,
              transform: [{rotateY: tranform + 'deg'}],
            }}
            source={component}
          />
        </View>
      </Pressable>
    </Draggable>
  );
};

export default ButtonDragable;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    padding: 10,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    zIndex: -5,
  },

  btnClose: {
    position: 'absolute',
    top: -7,
    right: -7,
    backgroundColor: Colors.WHITE,
    zIndex: 100,
    borderRadius: 50,
  },

  iconbtn: {
    width: 20,
    height: 20,
  },
});
