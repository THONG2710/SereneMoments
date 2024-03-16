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
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {DiariesHistorProps} from './type';
import {Colors} from '../../../Resource/colors';
import Deck_Swiper from 'react-native-deck-swiper';
import { useAppSelector } from '../../../Redux/Hook';
import { DiaryModel } from '../../../Models/Model';
import ItemMyDiary from '../../../Components/Items/ItemMyDiary';

const DiariesHistory: React.FC<DiariesHistorProps> = props => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [diaries, setDiaries] = useState<DiaryModel[]>([]);
  const myDiaries = useAppSelector(state => state.Diary.myDiary);

  // quay trở lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setDiaries(myDiaries);
  }, [])
  

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
        <TouchableOpacity
          style={styles.btnOpenDatePicker}
          onPress={() => setOpen(true)}>
          <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      {/* CENTER */}
      <DatePicker
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
      />
      <View style={styles.center}>
          <Deck_Swiper
            infinite={true}
            cards={myDiaries}
            renderCard={(diary, index) => <ItemMyDiary diary={diary}/>}
            onSwiped={diaryIndex => {
              console.log(diaryIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize={3}>
          </Deck_Swiper>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}></View>
    </View>
  );
};

export default DiariesHistory;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    // flex: 1,
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

const History = [
  {
    _id: '1',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('05/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '2',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('05/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '3',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('12/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '4',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('26/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '5',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('14/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '6',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('05/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '7',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('29/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '8',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('17/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '9',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('11/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '10',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '11',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '12',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '13',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '14',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '15',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },

  {
    _id: '16',
    imgHistory: require('../../../Resource/Image2/avt.jpg'),
    date: moment('04/03/2024', 'DD/MM/YYYY').toDate(),
  },
];
