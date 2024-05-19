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

interface InputBoxProps  {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ImageStyle>;
  onSearch?: () => void;
  onChangeText: (value: string ) => void;
  value?: string;
}

const InputBox: React.FC<InputBoxProps> = props => {
  const {placeholder, onSearch, onChangeText, value} = props;
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={(value) => onChangeText(value.toString())} style={styles.input} placeholder={placeholder} />
      <ButtonIcon
        onPress={onSearch}
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
