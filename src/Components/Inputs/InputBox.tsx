import {
  Alert,
  Dimensions,
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../Resource/colors';
import ButtonIcon from '../Buttons/ButtonIcon';

interface InputBoxProps extends ViewProps {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ImageStyle>;
}

const InputBox: React.FC<InputBoxProps> = props => {
  const {placeholder} = props;
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={placeholder} />
      <ButtonIcon
        styles={styles.btn_search}
        url={require('../../Resource/images/icon_search2.png')}
      />
    </View>            
  );
};

export default InputBox;    

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 3*2.1,
    height: 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
  },

  btn_search: {
    width: 25,
    height: 25,
    margin: 10,
    resizeMode: 'contain',
  },
});
