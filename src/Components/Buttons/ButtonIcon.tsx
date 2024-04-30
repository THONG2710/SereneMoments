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
  uri?: string;
  tintColor?: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = props => {
  const {styles, onPress, url, styleBtn, uri, tintColor} = props;
  return (
    <Pressable style={styleBtn} onPress={onPress}>
      <Image tintColor={tintColor} style={styles} source={url} />
    </Pressable>
  );
};

export default ButtonIcon;
