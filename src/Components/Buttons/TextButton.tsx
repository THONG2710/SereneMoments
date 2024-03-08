import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';

interface TextButtonProps extends ViewProps {
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const TextButton: React.FC<TextButtonProps> = props => {
  const {label, style, onPress} = props;
  return (
    <Pressable onPress={onPress}>
      <Text style={style}>{label}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
