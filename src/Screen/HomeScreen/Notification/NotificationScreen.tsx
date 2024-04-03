import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NotificationProps} from './type';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';

const NotificationScreen: React.FC<NotificationProps> = props => {
  const {navigation} = props;

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.iconBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  //   header
  header: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BLUE,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  iconBack: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
