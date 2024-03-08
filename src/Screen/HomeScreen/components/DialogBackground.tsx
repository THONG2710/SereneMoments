import {
  Dimensions,
  FlatList,
  InteractionManager,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';

interface DialogBackgroundProps extends ViewProps {
  onCancel: () => void;
  onSelectBackground: (color: string) => void;
}

const listBackgroundColors = [
  {
    id: 1,
    color: Colors.WHITE,
  },
  {
    id: 2,
    color: Colors.BLACK,
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
    color: Colors.YELLOW,
  },
  {
    id: 6,
    color: Colors.GREEN,
  },
  {
    id: 7,
    color: Colors.RED,
  },
  {
    id: 8,
    color: Colors.LIGHT_PINK,
  },
  {
    id: 9,
    color: Colors.LIGHT_BLUE2,
  },
];

const DialogBackground: React.FC<DialogBackgroundProps> = props => {
  const {onCancel, onSelectBackground} = props;
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={onCancel}
        styles={styles.btnClose}
        url={require('./../../../Resource/images/icon_close.png')}
      />
      <View style={styles.styleList}>
        <FlatList
          numColumns={3}
          data={listBackgroundColors}
          renderItem={({item}) => (
            <Pressable
              onPress={() => onSelectBackground(item.color)}
              style={[styles.itemView, {backgroundColor: item.color}]}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default DialogBackground;

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

  styleList: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemView: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
