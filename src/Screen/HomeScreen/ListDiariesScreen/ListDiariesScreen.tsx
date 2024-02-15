import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import InputBox from '../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import Post from '../components/Post';

const ListDiariesScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <InputBox placeholder='Tìm kiếm...'/>
        <ButtonIcon styles={styles.header_btnICon} url={require('../../../Resource/images/icon_bell.png')} />
        <ButtonIcon styles={styles.header_btnICon} url={require('../../../Resource/images/icon_add.png')} />
      </View>
      <Post/>
    </View>
  );
};

export default ListDiariesScreen;
