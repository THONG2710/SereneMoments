import {Alert, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {styles} from './style';
import InputBox from '../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import Post from '../components/Post';
import {ListDiarieProps} from './type';
import { useAppSelector } from '../../../Redux/Hook';

const ListDiariesScreen: React.FC<ListDiarieProps> = props => {
  const {navigation} = props;
  const is_logged = useAppSelector(state => state.Authentication.isLogged);

  const onCreateNewDiary = () => {
    navigation.navigate('CreateDiaryScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <InputBox placeholder="Tìm kiếm..." />
        <ButtonIcon
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_bell.png')}
        />
        <ButtonIcon
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_add.png')}
          onPress={onCreateNewDiary}
        />
      </View>
      <Post />
    </View>
  );
};

export default ListDiariesScreen;
