import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MomentModel} from '../../Models/Model';
import {Colors} from '../../Resource/colors';

interface ItemMyMomentProps {
  onPress: () => void;
  moment: MomentModel;
}

const ItemMyMoment: React.FC<ItemMyMomentProps> = props => {
  const {onPress, moment} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      key={moment._id.toString()}
      style={styles.itemHistory}>
      {moment.isimage ? (
        <Image
          style={styles.imgHistory}
          source={
            moment.content
              ? {uri: moment.content}
              : require('../../Resource/images/img.jpg')
          }
        />
      ) : (
        <View style={styles.playGroup}>
          <Image
            style={styles.iconPlay}
            source={require('../../Resource/images/icon_play.png')}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemMyMoment;

const styles = StyleSheet.create({
  itemHistory: {
    marginTop: 8,
  },

  imgHistory: {
    width: 120,
    height: 120,
    backgroundColor: '#ccc',
    marginLeft: 8,
  },

  playGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    width: 120,
    height: 120,
    marginLeft: 8,
  },

  iconPlay: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
