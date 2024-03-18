import { ButtonProps, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '../../Resource/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonUnfriendProps extends ViewProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const ButtonUnfriend: React.FC<ButtonUnfriendProps> = props => {
  const { label, onPress, buttonStyle } = props;
  return (
    <LinearGradient style={styles.add} colors={['#53C3F3', '#60C8E9', '#97D4EB']}>

      <Pressable onPress={onPress} style={[styles.container, buttonStyle]}>
        <Text style={styles.labelStyle}>{label}</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default ButtonUnfriend;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },

  add:
  {
    borderRadius:10
  }
});
