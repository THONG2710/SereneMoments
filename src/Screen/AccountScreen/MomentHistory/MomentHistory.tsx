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
  RefreshControl,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import moment from 'moment';
import {MomentHistorProps} from './type';
import {Colors} from '../../../Resource/colors';
import {useAppSelector} from '../../../Redux/Hook';
import ItemMyMoment from '../../../Components/Items/ItemMyMoment';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {MomentModel} from '../../../Models/Model';
import {useDispatch} from 'react-redux';

const MomentHistory: React.FC<MomentHistorProps> = props => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [moments, setMoments] = useState<MomentModel[]>([]);
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const [refresh, setRefresh] = useState(false);

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  // lấy khoảnh khắc
  const getMoments = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/moment/getMomentsById?id=' +
          myAccount._id,
      );
      if (response.result) {
        setMoments(response.moments);
        setRefresh(false);
      }
    } catch (error) {
      console.log('get moment failled: ' + error);
    }
  };

  const onMoveDetailMomentHistory = (id: string) => {
    navigation.navigate('DetailMomentHistory', {id: id});
  };

  useEffect(() => {
    getMoments();
  }, [refresh]);

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
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(!refresh)}
            />
          }
          numColumns={3}
          data={moments}
          renderItem={({item}) => (
            <ItemMyMoment
              moment={item}
              onPress={() => onMoveDetailMomentHistory(item._id.toString())}
            />
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
