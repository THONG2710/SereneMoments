import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileProps} from './type';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {
  SAVE_USER,
  SET_ISLOGGED,
} from '../../../Redux/Action/AuthenticationActions';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {
  DiaryModel,
  FriendModel,
  MomentModel,
  TodoList,
} from '../../../Models/Model';
import {getDataFromStorage, setDataToStorage} from '../../../Service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_MYMOMENTS} from '../../../Redux/Action/MomentActions';
import {SAVE_MYFRIENDS} from '../../../Redux/Action/FriendsActions';
import {SAVE_MYDIARIES} from '../../../Redux/Action/DiaryActions';
import Dialog from '../../Dialog/Dialog';
import {LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Colors} from '../../../Resource/colors';
import {SAVE_TODOLIST} from '../../../Redux/Action/WorkAction';

const Profile: React.FC<ProfileProps> = props => {
  const {navigation} = props;
  const useDispatch = useAppDispatch();
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const [diaries, setdiaries] = useState<DiaryModel[]>([]);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [friends, setfriends] = useState<FriendModel[]>([]);
  const [todoList, setTodoList] = useState<TodoList[]>([]); // [todoList, setTodoList
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // lấy nhật kí
  const getDiaries = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/diary/getDiariesByIdUser?id=' +
          myAccount._id,
      );
      if (response.result) {
        setdiaries(response.diaries);
        useDispatch(SAVE_MYDIARIES(response.diaries));
      }
    } catch (error) {
      console.log('get diaries failled: ' + error);
    }
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
        setmoments(response.moments);
        useDispatch(SAVE_MYMOMENTS(response.moments));
      }
    } catch (error) {
      console.log('get moment failled: ' + error);
    }
  };

  //  lấy bạn bè
  const getFriends = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/getInforFriendsById?id=' +
          myAccount._id,
      );
      if (response.result) {
        setfriends(response.friends);
        useDispatch(SAVE_MYFRIENDS(response.friends));
      }
    } catch (error) {
      console.log('get friends failled: ' + error);
    }
  };

  // lấy todolist
  const getListTodo = async () => {
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/todolist/getTodolistByIdUser?id=' +
          myAccount._id,
      );
      if (res.result) {
        setTodoList(res.todolist);
        useDispatch(SAVE_TODOLIST(res.todolist));
      }
    } catch (error) {
      console.log('getListTodo failled: ' + error);
    }
  };

  // đến trang khoảnh khắc
  const onMoveToMoment = () => {
    navigation.navigate('MomentHistor');
  };

  // đến trang bạn bè
  const onMoveToMyFriends = () => {
    navigation.navigate('MyFriends');
  };

  //đến todo list
  const onMoveToTodoList = () => {
    navigation.navigate('TodoList');
  };

  // đến trang nhật kí của tôi
  const onMoveToMyDiary = () => {
    navigation.navigate('DiariesHistory');
  };
  useEffect(() => {
    getDiaries();
    getMoments();
    getFriends();
    getListTodo();
  }, []);

  // xử lí đăng xuất
  const onHandleLogout = async () => {
    getDataFromStorage('IS_LOGGED').then(data => {
      AsyncStorage.removeItem('IS_LOGGED').then(() => {
        setDataToStorage('IS_LOGGED', false);
      });
    });
    getDataFromStorage('ACCOUNT').then(data => {
      AsyncStorage.removeItem('ACCOUNT').then(() => {
        setDataToStorage('ACCOUNT', null);
      });
    });
    const user = {
      _id: '',
      username: '',
      password: '',
      email: '',
      available: false,
      avatar: '',
      createdat: 0,
      phoneNumber: '',
      isavailable: false,
    };
    useDispatch(SAVE_USER(user));
    await LoginManager.logOut();
    await GoogleSignin.signOut();
    console.log('Logged out successfully!');
    const parentNavigation = navigation.getParent();
    const grandParentNavigation = parentNavigation?.getParent();

    if (grandParentNavigation) {
      grandParentNavigation.reset({
        index: 0,
        routes: [{name: 'AuthenticationNavigation'}],
      });
    }
  };

  // chỉnh sửa thông tin cá nhân
  const onEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    //CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.background}>
          <Image
            style={styles.imgAVT}
            source={
              myAccount.avatar
                ? {uri: myAccount.avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
        </View>
        <Text style={styles.textName}>{myAccount.username}</Text>
        <TouchableOpacity style={styles.backgroundEdit} onPress={onEditProfile}>
          <Text style={styles.textEdit}>Sửa đổi thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* CENTER */}
      {/* CENTER TOP */}
      <View style={styles.centerTop}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Của bạn</Text>
          <Image
            style={styles.imgTitle}
            source={require('../../../Resource/images/icon_user_d.png')}></Image>
        </View>
        <TouchableOpacity
          style={styles.itemContentOne}
          onPress={onMoveToMyDiary}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_diary.png')}></Image>
            <Text style={styles.textItem}>Nhật ký</Text>
          </View>
          <Text style={styles.notificationItem}>{diaries.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContentTwo}
          onPress={onMoveToMoment}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_moment.png')}></Image>
            <Text style={styles.textItem}>Khoảnh khắc</Text>
          </View>
          <Text style={styles.notificationItem}>{moments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContentTwo}
          onPress={onMoveToTodoList}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon-list.png')}></Image>
            <Text style={styles.textItem}>Công việc</Text>
          </View>
          <Text style={styles.notificationItem}>{todoList.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContentThree}
          onPress={onMoveToMyFriends}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_friends_d.png')}></Image>
            <Text style={styles.textItem}>Bạn bè</Text>
          </View>
          <Text style={styles.notificationItem}>{friends?.length}</Text>
        </TouchableOpacity>
      </View>
      {/* CENTERBOTTOM */}
      <View style={styles.centerBot}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Cài đặt</Text>
          <Image
            style={styles.imgTitle}
            source={require('../../../Resource/images/icon_setting_d.png')}></Image>
        </View>

        {myAccount.password == '' ? (
          <TouchableOpacity
            disabled={true}
            style={[
              styles.itemContentOne,
              {backgroundColor: Colors.LIGHT_GRAY},
            ]}>
            <View style={styles.itemContentLeft}>
              <Image
                style={styles.imageItem}
                source={require('../../../Resource/images/icon_password.png')}></Image>
              <Text style={styles.textItem}>Đặt mật khẩu</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.itemContentOne}>
            <View style={styles.itemContentLeft}>
              <Image
                style={styles.imageItem}
                source={require('../../../Resource/images/icon_password.png')}></Image>
              <Text style={styles.textItem}>Đặt mật khẩu</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_setting.png')}></Image>
            <Text style={styles.textItem}>Đặt mặc định</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Tài khoản</Text>
          <Image
            style={styles.imgTitle}
            source={require('../../../Resource/images/icon_warning.png')}></Image>
        </View>
        <TouchableOpacity
          style={styles.itemContentOne}
          onPress={() => setShowAlert(true)}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_logout.png')}></Image>
            <Text style={styles.textItem}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_delete.png')}></Image>
            <Text style={[styles.textItem, {color: 'red'}]}>Xóa tài khoản</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Dialog
        message="Bạn có muốn đăng xuất ?"
        title="Thông báo!"
        isvisible={showAlert}
        onConfirm={onHandleLogout}
        onCancel={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F9FF',
    flex: 1,
  },
  //HEADER

  header: {
    alignItems: 'center',
    marginTop: 20,
  },

  background: {
    width: 110,
    height: 110,
    backgroundColor: '#86B6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'relative',
  },

  imgAVT: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  backgroundAdd: {
    position: 'absolute',
    backgroundColor: '#86B6F6',
    width: 22,
    height: 22,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    right: 5,
  },

  imgAdd: {
    width: 15,
    height: 15,
  },

  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#176B87',
    marginTop: 10,
  },

  backgroundEdit: {
    backgroundColor: '#499EDC',
    borderRadius: 20,
    marginTop: 5,
  },

  textEdit: {
    padding: 10,
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
  //CENTER
  centerTop: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  centerBot: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 10,
  },

  textTitle: {
    color: '#176B87',
    fontSize: 14,
    fontWeight: 'bold',
  },

  imgTitle: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },

  imgSetting: {
    width: 20,
    height: 20,
    marginLeft: 3,
  },

  itemContentOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },

  itemContentTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 2,
  },

  itemContentThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E6FF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 2,
  },

  itemContentLeft: {
    flexDirection: 'row',
  },

  textItem: {
    marginLeft: 10,
    color: '#176B87',
    fontWeight: '500',
  },

  imageItem: {
    width: 20,
    height: 20,
  },

  notificationItem: {
    color: '#176B87',
    fontSize: 14,
    fontWeight: '400',
  },
  //FOOTER
  footer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
