import {
  ButtonProps,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../Resource/colors';

interface ButtonTextProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  visible?: boolean;
}

const ButtonText: React.FC<ButtonTextProps> = props => {
  const {label, onPress, buttonStyle, visible} = props;
  return (
    <Pressable
      disabled={visible}
      onPress={onPress}
      style={[styles.container, buttonStyle]}>
      <Text style={styles.labelStyle}>{label}</Text>
    </Pressable>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    backgroundColor: Colors.BLUE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
