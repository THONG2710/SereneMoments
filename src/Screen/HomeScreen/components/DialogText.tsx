import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import ItemColor from './ItemColor';
import InputSpinner from 'react-native-input-spinner';
import ButtonText from '../../../Components/Buttons/ButtonText';
import TextButton from '../../../Components/Buttons/TextButton';
import {assets} from '../../../../react-native.config';

interface DialogTextProps extends ViewProps {
  onCancel?: () => void;
  onSelectFont: (fonts: string) => void;
  onSelectFontSize: (size: number) => void;
  onSelectColor: (color: string) => void;
  textSize: number;
}

const listColors = [
  {
    id: 1,
    color: Colors.BLACK,
  },
  {
    id: 2,
    color: Colors.WHITE,
  },
  {
    id: 3,
    color: Colors.BLUE,
  },
  {
    id: 4,
    color: Colors.BROWN,
  },
  {
    id: 5,
    color: Colors.PINK,
  },
  {
    id: 6,
    color: Colors.ORANGE,
  },
  {
    id: 7,
    color: Colors.GREEN,
  },
];

const listFonts = [
  {
    id: 1,
    fonts: 'inter',
  },
  {
    id: 2,
    fonts: 'Times New Roman',
  },
  {
    id: 3,
    fonts: 'dancingScript',
  },
  {
    id: 4,
    fonts: 'PinyonScript-Regular',
  },
  {
    id: 5,
    fonts: 'Lobster-Regular',
  },
  {
    id: 6,
    fonts: 'SedgwickAve-Regular',
  },
  {
    id: 7,
    fonts: 'BodoniModa-VariableFont_opsz,wght',
  },
  {
    id: 8,
    fonts: 'Fuggles-Regular',
  },
  {
    id: 9,
    fonts: 'ComforterBrush-Regular',
  },
  {
    id: 10,
    fonts: 'Hurricane-Regular',
  },
  {
    id: 11,
    fonts: 'OoohBaby-Regular',
  },
  {
    id: 12,
    fonts: 'Parisienne-Regular',
  },
  {
    id: 13,
    fonts: 'Playball-Regular',
  },
  {
    id: 14,
    fonts: 'Sacramento-Regular',
  },
  {
    id: 15,
    fonts: 'Yellowtail-Regular',
  },
];

const DialogText: React.FC<DialogTextProps> = props => {
  const {onCancel, onSelectFont, onSelectFontSize, onSelectColor, textSize} = props;
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('./../../../Resource/images/icon_close.png')}
      />
      {/* color */}
      <View style={styles.txtColorContainer}>
        <Text style={styles.txtTitle}>Màu chữ</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listColors}
          renderItem={({item}) => <ItemColor onPress={() => onSelectColor(item.color)} color={item.color} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      {/* size */}
      <View style={styles.fontSizeContainer}>
        <Text style={styles.txtTitle}>Kích thước</Text>
        <InputSpinner
          onChange={value => {
            onSelectFontSize(Number(value));
          }}
          value={textSize}
          style={styles.inputStyle}
          skin="clean"
        />
      </View>
      {/* stroke */}
      <View style={styles.strokeContainer}>
        <Text style={styles.txtTitle}>Nét chữ</Text>
        <View style={styles.stroke}>
          <TextButton style={styles.txtStrokeN} label="N" />
          <TextButton style={styles.txtStrokeB} label="B" />
          <TextButton style={styles.txtStrokeI} label="I" />
        </View>
      </View>
      {/* font */}
      <View style={styles.fontsContainer}>
        <Text style={styles.txtTitle}>Kiểu chữ</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listFonts}
          renderItem={({item}) => (
            <TextButton
              onPress={() => onSelectFont(item.fonts)}
              style={[styles.itemFont, {fontFamily: item.fonts}]}
              label="aA"
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default DialogText;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    marginLeft: -20,
    backgroundColor: Colors.WHITE,
    height: Dimensions.get('screen').height / 2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Dimensions.get('screen').height / 2,
  },

  btnClose: {
    width: 30,
    height: 30,
    marginLeft: Dimensions.get('screen').width - 40,
    marginTop: 10,
  },

  //   title
  txtTitle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
  },

  //   text color
  txtColorContainer: {
    alignItems: 'center',
  },

  // input
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },

  inputStyle: {
    borderWidth: 1,
    width: 150,
    marginLeft: 30,
  },

  // stroke
  strokeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stroke: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    justifyContent: 'space-around',
    marginLeft: 40,
  },

  txtStrokeN: {
    fontSize: 16,
    color: Colors.BLACK,
  },

  txtStrokeB: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },

  txtStrokeI: {
    fontSize: 16,
    color: Colors.BLACK,
    fontStyle: 'italic',
  },

  // fonts
  fontsContainer: {},

  itemFont: {
    color: Colors.BLACK,
    marginHorizontal: 15,
    fontSize: 24,
  },
});
