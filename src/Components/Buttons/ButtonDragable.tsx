import {Pressable, StyleSheet, Text, View, ViewProps} from 'react-native';
import React, { useState } from 'react';
import Draggable from 'react-native-draggable';
import {Colors} from '../../Resource/colors';
import ButtonIcon from './ButtonIcon';

interface ButtonDragableProps extends ViewProps {
  isSlected: boolean;
  component: React.ReactNode;
  onDelete?: () => void;
}

const ButtonDragable: React.FC<ButtonDragableProps> = props => {
  const {component, onDelete} = props;
  const [isSlected, setIsSlected] = useState(true);
  return (
    <Draggable x={50} y={50}>
      <Pressable onPress={() => setIsSlected(!isSlected)}>
        {isSlected ? (
          <ButtonIcon
            styleBtn={styles.btnClose}
            onPress={onDelete}
            styles={styles.iconbtn}
            url={require('../../Resource/images/icon_close2.png')}
          />
        ) : null}
        <View style={isSlected ? styles.container : null}>{component}</View>
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
    zIndex: -5
  },

  btnClose: {
    position: 'absolute',
    top: -7,
    right: -7,
    backgroundColor: Colors.WHITE,
    zIndex: 100,
  },

  iconbtn: {
    width: 20,
    height: 20,
  }
});
