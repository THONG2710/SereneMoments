import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type ItemBottomHomeProp = {
  icon: any;
  label?: string;
  isFocused?: boolean;
};

const ItemBottomHome: React.FC<ItemBottomHomeProp> = props => {
  const {icon, label, isFocused} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        // tintColor={}
        source={icon}
      />
      <Text style={[styles.label]}>{label}</Text>
    </View>
  );
};

export default ItemBottomHome;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: -10
  },

  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 2,
  },

  label: {
    fontSize: 12,
    color: 'black',
  },
});
