import {Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import { Colors } from '../../../Resource/colors';

interface ItemOptionProps  {
    item: {_id: number; label: string; icon: any};
    itemStyle?: StyleProp<ViewStyle>;
    onPress?: (status: any) => void;
}

const ItemOption: React.FC<ItemOptionProps> = (props) => {
  const { item, itemStyle, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, itemStyle]}>
      <Image style={styles.iconImage} source={item.icon}/>
      <Text style={styles.txtLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default ItemOption;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        width: 100,
    },

    iconImage: {
        width: 20,
        height: 20,
    },

    txtLabel: {
        fontSize: 14,
        color: Colors.WHITE,
    },
});
