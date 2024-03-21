import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect} from 'react';
import {DiaryModel} from '../../Models/Model';
import {onConvertEpochtime} from '../../Service/Service';
import { Colors } from '../../Resource/colors';

interface ItemMyDiaryProps extends ViewProps {
  diary: DiaryModel;
}

const ItemMyDiary: React.FC<ItemMyDiaryProps> = props => {
  const {diary} = props;

  useEffect(() => {
    console.log(diary.diary);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txtDate}>{onConvertEpochtime(Number(diary.createdat))}</Text>
      <Image
        style={styles.img}
        source={
          diary.diary
            ? {uri: diary.diary}
            : require('../../Resource/images/img.jpg')
        }
      />
    </View>
  );
};

export default ItemMyDiary;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height - 300,
    marginTop: -40,
    borderRadius: 20,
  },

  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  txtDate: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.WHITE,
    paddingVertical: 20,
    borderRadius: 20,
  }
});
