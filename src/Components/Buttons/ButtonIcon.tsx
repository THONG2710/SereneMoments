import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface ButtonIconProps extends ViewProps {
  url: any;
  styles?: StyleProp<ImageStyle>;
  onPress?: () => void;
  styleBtn?: StyleProp<ViewStyle>;
}

const ButtonIcon: React.FC<ButtonIconProps> = props => {
  const {styles, onPress, url, styleBtn} = props;
  return (
    <Pressable style={styleBtn} onPress={onPress}>
      <Image style={styles} source={url} />
    </Pressable>
  );
};

export default ButtonIcon;
