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
}

const TextButton: React.FC<TextButtonProps> = props => {
  const {label, style} = props;
  return (
    <Pressable>
      <Text style={style}>{label}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
