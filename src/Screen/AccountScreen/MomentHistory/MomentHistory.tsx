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
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import moment from 'moment';
import {MomentHistorProps} from './type';
import {Colors} from '../../../Resource/colors';
import {useAppSelector} from '../../../Redux/Hook';

const MomentHistory: React.FC<MomentHistorProps> = props => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const moments = useAppSelector(state => state.Moment.myMoments);

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

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
        {/* <FlatList
          data={History}
          renderItem={({item}) => {
            if (item.date.toDateString() === selectedDate.toDateString()) {
              return (
                <TouchableOpacity key={item._id} style={styles.itemHistory}>
                  <Image style={styles.imgHistory} source={item.imgHistory} />
                </TouchableOpacity>
              );
            }
            return null;
          }}
          keyExtractor={item => item._id}
          numColumns={3}
        /> */}
        <FlatList
          numColumns={3}
          data={moments}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item._id.toString()}
              style={styles.itemHistory}>
              <Image
                style={styles.imgHistory}
                source={
                  item.content
                    ? {uri: item.content}
                    : require('../../../Resource/images/img.jpg')
                }
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id.toString()}
        />
      </View>
      {/* FOOTER */}
      <View style={styles.footer}></View>
    </View>
  );
};

export default MomentHistory;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
    marginLeft: 10,
  },

  textDate: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  btnOpenDatePicker: {
    width: Dimensions.get('screen').width - 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.WHITE,
  },
  // CENTER
  center: {
    paddingBottom: 160,
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
