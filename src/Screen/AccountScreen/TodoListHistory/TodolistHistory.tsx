import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Colors} from '../../../Resource/colors';
import LinearGradient from 'react-native-linear-gradient';
import {TodolistHistoryProps} from './type';

const TodolistHistory: React.FC<TodolistHistoryProps> = props => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleOpenDatePicker = () => {
    setOpen(true);
  };

  // quay lại màn hình trước
  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Image
            style={styles.imgSearch}
            source={require('../../../Resource/images/icon_back3.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenDatePicker}
          style={styles.btnOpenDatePicker}>
          <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textTitle}>Lịch sử công việc</Text>

      {/* CENTER */}
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.center}>
        <View>
          {History.map((item, i) => (
            <TouchableOpacity style={styles.listDateTodo} key={item._id}>
              <LinearGradient
                style={styles.background}
                colors={['#53C3F3', '#60C8E9', '#97D4EB']}>
                <Text style={styles.columns}>{i + 1}.</Text>
                <Text style={styles.date}>{item.date}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}></View>
    </ScrollView>
  );
};

export default TodolistHistory;

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

  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    fontSize: 20,
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

  listDateTodo: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  background: {
    width: '95%',
    flexDirection: 'row',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
  },
  columns: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    width: 30,
    color: '#fff',
  },

  date: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#fff',
  },

  columnWrapper: {},
  // FOOTER
  footer: {},
});

const History = [
  {
    _id: '1',
    date: '24/08/2024',
  },

  {
    _id: '2',

    date: '24/08/2024',
  },

  {
    _id: '3',

    date: '24/08/2024',
  },

  {
    _id: '4',

    date: '24/08/2024',
  },

  {
    _id: '5',

    date: '24/08/2024',
  },
  {
    _id: '6',
    date: '24/08/2024',
  },

  {
    _id: '7',

    date: '24/08/2024',
  },

  {
    _id: '8',

    date: '24/08/2024',
  },

  {
    _id: '9',

    date: '24/08/2024',
  },

  {
    _id: '10',

    date: '24/08/2024',
  },
];
