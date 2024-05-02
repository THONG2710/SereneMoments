import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import InputBox from '../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import Post from '../components/Post';
import {ListDiarieProps} from './type';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {DiaryModel} from '../../../Models/Model';
import FriendsComponent from '../components/FriendsComponent';
import {SAVE_ID_TODOLIST} from '../../../Redux/Action/WorkAction';
import DialogConfirmSuccess from '../../Dialog/DialogConfirmSuccess';

const ListDiariesScreen: React.FC<ListDiarieProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [listDiaries, setListDiaries] = useState<DiaryModel[]>([]);
  const [refreshing, setrefreshing] = useState(false);
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();

  // tìm kiếm người dùng
  const onFindFromDatabase = async () => {
    if (search != '') {
      if (Number(search)) {
        const res = await getData(
          'http://' +
            ID_ADRESS +
            ':3000/api/users/findUserByPhoneNumber?phoneNumber=' +
            search +
            '&id=' +
            user._id,
        );
        if (res.result) {
          setSearch('');
          navigation.navigate('findUser', {users: res.user});
        }
      } else {
        const res = await getData(
          'http://' +
            ID_ADRESS +
            ':3000/api/users/findUserByName?name=' +
            search +
            '&id=' +
            user._id,
        );
        if (res.result) {
          setSearch('');
          navigation.navigate('findUser', {users: res.user});
        }
      }
    }
  };

  // di chuyển tới trang cá nhân của người khác
  const onMoveToProfile = (id: string) => {
    navigation.navigate('Profile', {idUser: id});
  };

  // di chuyển đến trang tạo nhật kí
  const onCreateNewDiary = () => {
    navigation.navigate('CreateDiaryScreen');
  };

  //  di chuyển đến trang người lạ
  const onOtherUsers = () => {
    navigation.navigate('OtherUsers');
  };

  // di chuyển đến trang bạn bè
  const onMyFriends = () => {
    navigation.navigate('ListFriends');
  };

  // Di chuyển đến trang thông báo
  const onNotifications = () => {
    navigation.navigate('Notification');
  };

  // lấy nhật kí từ database
  const getDiaries = async () => {
    const result = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/diary/getDiariesMyFriends?id=' +
        user._id,
    );
    if (result.diaries) {
      setListDiaries(result.diaries);
      setrefreshing(false);
    }
  };

  // tạo một todolist
  const onCreateTodolist = async () => {
    const date = Math.floor(Number(new Date().getTime() / 1000));
    const data = {userid: user._id, createdat: date};
    const url = 'http://' + ID_ADRESS + ':3000/api/todolist/createToDoList';
    const res = await postData(url, data);
    console.log(url, data);
    if (res.result) {
      console.log('success');
      dispatch(SAVE_ID_TODOLIST(res.todolist._id));
    } else {
      console.log('failed to create todolist');
      const url =
        'http://' +
        ID_ADRESS +
        ':3000/api/todolist/getTodolist?userid=' +
        user._id +
        '&createdat=' +
        date;
      const res = await getData(url);
      // console.log(url);
      if (res.result) {
        console.log('successfull for get id');
        console.log(res.todolist);
        dispatch(SAVE_ID_TODOLIST(res.todolist._id));
      }
    }
  };

  useEffect(() => {
    getDiaries();
    onCreateTodolist();
  }, [refreshing]);

  // tải lại trang
  const onRefresh = () => {
    setrefreshing(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <InputBox
          value={search}
          onChangeText={value => setSearch(value)}
          onSearch={onFindFromDatabase}
          placeholder="Tìm kiếm..."
        />
        <ButtonIcon
          onPress={onNotifications}
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_bell.png')}
        />
        <ButtonIcon
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_add.png')}
          onPress={onCreateNewDiary}
        />
      </View>
      {/* list */}
      <FlatList
        ListHeaderComponent={
          <FriendsComponent
            onMoveToProfile={id => onMoveToProfile(id)}
            isRefresh={refreshing}
            onOtherUsers={onOtherUsers}
            onMyFriends={onMyFriends}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={listDiaries}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Post onPress={id => onMoveToProfile(id)} diary={item} />
        )}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default ListDiariesScreen;
