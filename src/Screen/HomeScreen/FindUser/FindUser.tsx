import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FindUserProps} from './type';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../Components/Inputs/InputBox';
import {FriendModel, UserModel} from '../../../Models/Model';
import ItemRequest from '../components/ItemRequest';
import ItemUser from '../components/ItemUser';
import {useAppSelector} from '../../../Redux/Hook';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import ItemFind from '../components/ItemFind';

const FindUser: React.FC<FindUserProps> = props => {
  const [listUser, setListUser] = useState<UserModel[]>([]);
  const {navigation} = props;
  const {users} = props.route.params;
  const friends = useAppSelector(state => state.Friends.myFriends);
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [listFriends, setListFriends] = useState<UserModel[]>([]);
  const [search, setSearch] = useState<string>('');

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  // lấy danh sách đã gửi yêu cầu từ database
  const onGetSent = async (list: UserModel[]) => {
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/getOtherUsersSentRequest?id=' +
          user._id,
      );
      if (res.result) {
        const response = res.users;
        const listSent: UserModel[] = [];
        response.forEach((users: {user: UserModel; friend: FriendModel}) => {
          list.forEach(user => {
            if (user._id === users.user._id) {
              console.log(users.user._id);
              listSent.push(users.user);
            }
          });
        });
        console.log(listSent);
      }
    } catch (error) {
      console.log('get sent error: ', error);
    }
  };

  // Xử lí bạn bè
  const onHandleFriends = (users: UserModel[]) => {
    const list: UserModel[] = [];
    users.forEach((user, index) => {
      friends.forEach(friend => {
        if (friend._id === user._id) {
          list.push(friend);
          users.splice(index, 1);
        }
      });
      setListFriends(list);
      setListUser(users);
    });
    onGetSent(listUser);
  };

  useEffect(() => {
    onHandleFriends(users);
  }, []);

  // render myfriend
  const onRenderFriends = (list: UserModel[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={({item}) => (
          <ItemFind
            onPress={() => navigation.navigate('Profile', {idUser: item._id})}
            user={item}
          />
        )}
        keyExtractor={item => item._id}
      />
    );
  };

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
          onHandleFriends(res.user);
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
          onHandleFriends(res.user);
        }
      }
    }
  };

  // kết bạn
  const onAddFriend = async (friendid: string) => {
    const requestedat = new Date().getTime();
    const userid = user._id;
    const status = 2;
    const newRequest = {userid, friendid, requestedat, status};
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/friend/addFriend',
      newRequest,
    );
    if (res) {
      console.log(res.ask);
    }
  };

  // Đến trang profile
  const onMoveToProfile = (id: string) => {
    navigation.navigate('Profile', {idUser: id});
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.btnBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <InputBox
          onSearch={onFindFromDatabase}
          onChangeText={value => setSearch(value)}
          placeholder="Tìm kiếm..."
        />
      </View>
      {/* body */}
      <View style={styles.body}>
        {listUser.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => onRenderFriends(listFriends)}
            data={listUser}
            renderItem={({item}) => (
              <ItemFind user={item} onPress={id => onMoveToProfile(id)} />
            )}
            keyExtractor={item => item._id.toString()}
          />
        ) : (
          <View style={styles.listEmty}>
            <Text>Không có kết quả</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FindUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //   header
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
  },

  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    paddingHorizontal: 20,
  },

  btnBack: {
    width: 30,
    height: 30,
  },

  //   body
  body: {
    flex: 1,
  },

  listEmty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
