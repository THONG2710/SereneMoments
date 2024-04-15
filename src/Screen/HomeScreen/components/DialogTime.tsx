import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';

const types = [
  {
    _id: 0,
    img: require('../../../Resource/images/normal.png'),
  },
  {
    _id: 1,
    img: require('../../../Resource/images/simplify.png'),
  },
  {
    _id: 2,
    img: require('../../../Resource/images/style.png'),
  },
  {
    _id: 3,
    img: require('../../../Resource/images/art.png'),
  },
  {
    _id: 4,
    img: require('../../../Resource/images/simple2.png'),
  },
];

interface DialogTimeProps extends ViewProps {
  onCancel: () => void;
  onChooseTime: (item: number) => void;
}

const DialogTime: React.FC<DialogTimeProps> = props => {
  const {onCancel, onChooseTime} = props;
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('./../../../Resource/images/icon_close.png')}
      />
      <FlatList
        data={types}
        style={{marginBottom: 50}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={{width: '100%', alignItems: 'center', paddingVertical: 10}}>
            <ButtonIcon onPress={() => onChooseTime(item._id)} url={item.img} />
          </View>
        )}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default DialogTime;

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
});
