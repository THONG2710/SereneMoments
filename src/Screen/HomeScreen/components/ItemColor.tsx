import {Pressable, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {Colors} from '../../../Resource/colors';

interface ItemColorProps extends ViewProps {
  color: string;
}

const ItemColor: React.FC<ItemColorProps> = props => {
  const {color} = props;
  return (
    <Pressable>
      <View style={[styles.container, {backgroundColor: color}]}></View>
    </Pressable>
  );
};

export default ItemColor;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginHorizontal: 12,
  },
});
