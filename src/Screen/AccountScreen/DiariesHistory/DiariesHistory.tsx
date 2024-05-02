import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {DiariesHistorProps} from './type';
import {Colors} from '../../../Resource/colors';
import Deck_Swiper from 'react-native-deck-swiper';
import {useAppSelector} from '../../../Redux/Hook';
import {DiaryModel} from '../../../Models/Model';
import ItemMyDiary from '../../../Components/Items/ItemMyDiary';

const DiariesHistory: React.FC<DiariesHistorProps> = props => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [diaries, setDiaries] = useState<DiaryModel[]>([]);
  const myDiaries = useAppSelector(state => state.Diary.myDiary);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [diary, setDiary] = useState<DiaryModel>();

  // quay trở lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setDiaries(myDiaries);
  }, []);

  return (
    // CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Image
            style={styles.imgSearch}
            source={require('../../../Resource/images/icon_back3.png')}></Image>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btnOpenDatePicker}
          onPress={() => setOpen(true)}>
          <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity> */}
      </View>
      {/* CENTER */}
      {/* <DatePicker
        aria-disabled={true}
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setSelectedDate(date);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      <View style={styles.center}>
        {myDiaries.length > 0 ? (
          <Deck_Swiper
            // infinite={true}
            cards={myDiaries}
            renderCard={(diary, index) => (
              <Pressable
                onPress={() => {
                  setDiary(diary), setModalVisible(true);
                }}>
                <ItemMyDiary diary={diary} />
              </Pressable>
            )}
            onSwiped={diaryIndex => {
              console.log(diaryIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'#00000'}
            stackSize={3}></Deck_Swiper>
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            Bạn chưa có nhật ký nào
          </Text>
        )}
      </View>
      {/* FOOTER */}
      <View style={styles.footer}></View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: 'black',
            marginTop: -40,
          }}>
          <Image
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
              resizeMode: 'contain',
            }}
            source={
              diary?.diary
                ? {uri: diary.diary}
                : require('../../../Resource/images/img.jpg')
            }
          />
        </Pressable>
      </Modal>
    </View>
  );
};

export default DiariesHistory;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
  },
  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    height: 60,
    width: '100%',
  },

  itemHistory: {
    marginTop: 8,
  },

  imgSearch: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },

  btnOpenDatePicker: {
    width: Dimensions.get('screen').width - 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.WHITE,
  },

  ipSearch: {
    height: 45,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
    color: '#606060',
  },

  textDate: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // CENTER
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgHistory: {
    width: 120,
    height: 120,
    backgroundColor: '#ccc',
    marginLeft: 8,
  },

  columnWrapper: {},
  // FOOTER
  footer: {},
});
