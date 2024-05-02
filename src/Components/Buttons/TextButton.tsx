import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';

interface TextButtonProps{
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const TextButton: React.FC<TextButtonProps> = props => {
  const {label, style, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
