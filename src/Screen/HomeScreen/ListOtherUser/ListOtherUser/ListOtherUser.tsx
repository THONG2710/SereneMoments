import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputBox from '../../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../../Resource/colors';
import {ID_ADRESS, getData, postData} from '../../../../Service/RequestMethod';
import {RequestModel, UserModel} from '../../../../Models/Model';
import {useAppSelector} from '../../../../Redux/Hook';
import ItemUser from '../../components/ItemUser';
import {ListOtherUsersProps} from './type';
import {startAfter} from 'firebase/firestore';

const ListOtherUser: React.FC<ListOtherUsersProps> = props => {
  const {navigation} = props;
  const [otherUsers, setotherUsers] = useState<UserModel[]>([]);
  const [usersSentRequest, setusersSentRequest] = useState<RequestModel[]>([]);
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [refresh, setrefresh] = useState<boolean>(false);
  const friends = useAppSelector(state => state.Friends.myFriends);

  // quay trở lại
  const onGoBack = () => {
    navigation.goBack();
  };

  //  lấy người lạ
  const getOtherUsers = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/friend/getOtherUsers/' + user._id,
    );

    if (res.result) {
      const list: UserModel[] = [];
      const users = res.users;
      if (users.length > 0 && friends.length > 0) {
        users.forEach((user: UserModel, index: number) => {
          friends.forEach((friend: UserModel) => {
            user._id == friend._id ? null : list.push(user);
          });
        });
        setotherUsers(list);
      } else {
        setotherUsers(users);
      }
    }
  };

  //  lấy danh sách người đã gửi yêu cầu
  const getUserSentRequest = async () => {
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/friend/getOtherUsersSentRequest?id=' +
        user._id,
    );
    if (res) {
      const users = res.users;
      users.forEach((user: UserModel, index: number) => {
        friends.forEach((friend: UserModel) => {
          if (user._id === friend._id) {
            users.slice(index, 1);
          }
        });
      });
      setusersSentRequest(users);
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
      setrefresh(!refresh);
    }
  };

  // hủy kết bạn
  const onCancelRequest = async (idRequest: string) => {
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/friend/cancelRequest/' + idRequest,
      {},
    );
    if (res) {
      console.log(res.result);
      setrefresh(!refresh);
    }
  };

  // đến trang profile
  const onMoveToProfile = (id: string) => {
    console.log('sss');

    navigation.getParent()?.navigate('Profile', {idUser: id});
  };

  useEffect(() => {
    getOtherUsers();
    getUserSentRequest();
  }, [refresh]);

  return (
    <View style={styles.container}>
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {usersSentRequest.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.title}>Gần đây</Text>
            {usersSentRequest.map(item => {
              return (
                <ItemUser
                  onPress={id => onMoveToProfile(id)}
                  key={item.user._id.toString()}
                  onCancelRequest={() =>
                    onCancelRequest(item.friend._id.toString())
                  }
                  onHandlePress={id => onAddFriend(id)}
                  isSent={true}
                  user={item.user}
                />
              );
            })}
          </View>
        )}
        <View style={styles.listContainer}>
          <Text style={styles.title}>Thêm bạn mới</Text>
          {otherUsers.map(item => {
            return (
              <ItemUser
                onPress={id => onMoveToProfile(id)}
                key={item._id.toString()}
                onCancelRequest={() => null}
                onHandlePress={id => onAddFriend(id)}
                isSent={false}
                user={item}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListOtherUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  // header

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DARK_BLUE,
  },

  //   body
  body: {
    flex: 1,
  },

  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  bottomWidth: {
    borderBottomWidth: 2,
    borderColor: '#DAEAF2',
    paddingTop: 15,
  },
});
