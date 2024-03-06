import {
  Dimensions,
  FlatList,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';

interface DialogProps extends ViewProps {
  onCancel?: () => void;
  onCreateItem: (item: any) => void;
}

const listIcons = [
  {
    id: 1,
    uri: require('../../../Resource/images/book.png'),
  },
  {
    id: 2,
    uri: require('../../../Resource/images/creativity.png'),
  },
  {
    id: 3,
    uri: require('../../../Resource/images/gold-star.png'),
  },
  {
    id: 4,
    uri: require('../../../Resource/images/light-bulb.png'),
  },
  {
    id: 5,
    uri: require('../../../Resource/images/rainbow.png'),
  },
  {
    id: 6,
    uri: require('../../../Resource/images/reading.png'),
  },
  {
    id: 7,
    uri: require('../../../Resource/images/to-do-list.png'),
  },
  {
    id: 8,
    uri: require('../../../Resource/images/snow.png'),
  },
  {
    id: 9,
    uri: require('../../../Resource/images/love-letter.png'),
  },
  {
    id: 10,
    uri: require('../../../Resource/images/birthday-cakes.png'),
  },
];

const DialogOptions: React.FC<DialogProps> = props => {
  const {onCancel, onCreateItem} = props;
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('./../../../Resource/images/icon_close.png')}
      />
      <FlatList
        data={listIcons}
        style={styles.listStyle}
        numColumns={4}
        renderItem={({item}) => (
          <ButtonIcon
            styles={{width: 50, height: 50, margin: 22}}
            url={item.uri}
            onPress={() => {onCreateItem(item)}}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default DialogOptions;

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

  listStyle: {},
});
