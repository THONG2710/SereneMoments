import {
  Alert,
  FlatList,
  Image,
  Pressable,
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
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {
  DiaryModel,
  FriendModel,
  MomentModel,
  UserModel,
} from '../../../Models/Model';
import {getDataFromStorage, setDataToStorage} from '../../../Service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_MYMOMENTS} from '../../../Redux/Action/MomentActions';
import {SAVE_MYFRIENDS} from '../../../Redux/Action/FriendsActions';
import {SAVE_MYDIARIES} from '../../../Redux/Action/DiaryActions';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import ButtonText from '../../../Components/Buttons/ButtonText';
import {Colors} from '../../../Resource/colors';

const Profile: React.FC<ProfileProps> = props => {
  const {navigation} = props;
  const {idUser} = props.route.params;
  const useDispatch = useAppDispatch();
  const [diaries, setdiaries] = useState<DiaryModel[]>([]);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [friends, setfriends] = useState<FriendModel[]>([]);
  const [user, setUser] = useState<UserModel>();
  const myFriends = useAppSelector(state => state.Friends.myFriends);
  const [status, setStatus] = useState(1);
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const dispatch = useAppDispatch();
  const [visibleAdd, setvisibleAdd] = useState(false);

  useEffect(() => {
    onGetUser();
    onCheckFriend();
    onGetSent();
  }, []);

  // kiểm tra xem có phải bạn bè không
  const onCheckFriend = () => {
    const res = myFriends.filter(friend => {
      return friend._id == idUser;
    });
    if (res.length > 0) {
      setStatus(3);
      getAll();
    }
  };

  // lấy thông tin người dùng
  const onGetUser = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/users/getUserById?id=' + idUser,
    );
    if (res.result) {
      setUser(res.user);
    }
  };

  // lấy danh sách đã gửi yêu cầu từ database
  const onGetSent = async () => {
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/getOtherUsersSentRequest?id=' +
          myAccount._id,
      );
      if (res.result) {
        const response = res.users;
        const listUser: UserModel[] = [];
        response.forEach((result: {user: UserModel; friend: FriendModel}) => {
          listUser.push(result.user);
        });
        const result = listUser.filter((user: UserModel) => {
          return user._id == idUser;
        });

        if (result.length > 0) {
          setStatus(2);
        }
      }
    } catch (error) {
      console.log('get sent error: ', error);
    }
  };

  const getAll = async () => {
    getDiaries();
    getMoments();
    getFriends();
  };

  // lấy nhật kí
  const getDiaries = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/diary/getDiariesByIdUser?id=' +
          idUser,
      );
      if (response.result) {
        setdiaries(response.diaries);
      }
    } catch (error) {
      console.log('get diaries failled: ' + error);
    }
  };

  // lấy khoảnh khắc
  const getMoments = async () => {
    try {
      const response = await getData(
        'http://' + ID_ADRESS + ':3000/api/moment/getMomentsById?id=' + idUser,
      );
      if (response.result) {
        setmoments(response.moments);
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
          idUser,
      );
      if (response.result) {
        setfriends(response.friends);
      }
    } catch (error) {
      console.log('get friends failled: ' + error);
    }
  };

  // xử lí label
  const onSetLabel = (status: number): string => {
    switch (status) {
      case 1:
        return 'Kết bạn';
      case 2:
        return 'Hủy yêu cầu';
      case 3:
        return 'Hủy kết bạn';
      default:
        return '';
    }
  };

  // kết bạn
  const onAddFriend = async (friendid: string) => {
    setvisibleAdd(true);
    const requestedat = new Date().getTime();
    const userid = myAccount._id;
    const status = 2;
    const newRequest = {userid, friendid, requestedat, status};
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/friend/addFriend',
      newRequest,
    );
    if (res) {
      console.log(res.ask);
      setvisibleAdd(false);
    }
  };

  // hủy yêu cầu kết bạn
  const onCancelRequest = async () => {
    setvisibleAdd(true);
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/findRequest?myId=' +
          myAccount._id +
          '&friendId=' +
          idUser,
      );
      if (res.result) {
        const response = await postData(
          'http://' +
            ID_ADRESS +
            ':3000/api/friend/cancelRequest/' +
            res.request._id,
          {},
        );
        if (response.result) {
          // const list = myFriends.filter(item => item._id !== idUser);
          // dispatch(SAVE_MYFRIENDS(list));
          console.log('delete success: ' + response);
          setvisibleAdd(false);
        }
      }
    } catch (error) {}
  };

  // hủy kết bạn
  const onCancelFriend = async () => {
    setvisibleAdd(true);
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/findFriendRequest?myId=' +
          myAccount._id +
          '&friendId=' +
          idUser,
      );
      if (res.result) {
        const response = await postData(
          'http://' +
            ID_ADRESS +
            ':3000/api/friend/cancelRequest/' +
            res.request._id,
          {},
        );
        if (response.result) {
          const list = myFriends.filter(item => item._id !== idUser);
          dispatch(SAVE_MYFRIENDS(list));
          console.log('delete success: ' + response);
          setvisibleAdd(false);
        }
      }
    } catch (error) {}
  };

  // xử lí nút kết bạn
  const onHandleAdFrriend = (status: number) => {
    switch (status) {
      case 1:
        onAddFriend(idUser);
        setStatus(2);
        break;
      case 2:
        onCancelRequest();
        setStatus(1);
      case 3:
        onCancelFriend();
        setStatus(1);
        break;
      default:
        break;
    }
  };

  return (
    //CONTAINER
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../Resource/images/btn_back.png')}></Image>
      </TouchableOpacity>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.background}>
          <Image
            style={styles.imgAVT}
            source={
              user?.avatar
                ? {uri: user?.avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
        </View>
        <Text style={styles.textName}>{user?.username}</Text>
        <ButtonText
          visible={visibleAdd}
          buttonStyle={
            status == 1
              ? {marginTop: 10}
              : {backgroundColor: Colors.GRAY, marginTop: 10}
          }
          label={onSetLabel(status)}
          onPress={() => onHandleAdFrriend(status)}
        />
      </View>

      {/* CENTER */}
      {/* CENTER TOP */}
      <View style={styles.centerTop}>
        <View style={styles.diaries}>
          <TouchableOpacity style={styles.itemContentOne}>
            <View style={styles.itemContentLeft}>
              <Image
                style={styles.imageItem}
                source={require('../../../Resource/images/icon_diary.png')}></Image>
              <Text style={styles.textItem}>Nhật ký</Text>
            </View>
            <Text style={styles.notificationItem}>{diaries.length}</Text>
          </TouchableOpacity>

          {/* <View>
            <FlatList
              data={diaries}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <Pressable>
                  <Image
                    style={styles.img}
                    source={
                      item.diary
                        ? {uri: item.diary}
                        : require('../../../Resource/images/img.jpg')
                    }
                  />
                </Pressable>
              )}
            />
          </View> */}
        </View>

        <TouchableOpacity style={styles.itemContentTwo}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_moment.png')}></Image>
            <Text style={styles.textItem}>Khoảnh khắc</Text>
          </View>
          <Text style={styles.notificationItem}>{moments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContentThree}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_friends_d.png')}></Image>
            <Text style={styles.textItem}>Bạn bè</Text>
          </View>
          <Text style={styles.notificationItem}>{friends.length}</Text>
        </TouchableOpacity>
      </View>
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

  diaries: {
    width: '100%',
  },

  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  btnStyle: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
    left: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 50,
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
