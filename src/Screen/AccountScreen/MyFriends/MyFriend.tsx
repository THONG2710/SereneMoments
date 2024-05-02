import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dialog from '../../Dialog/Dialog';
import AwesomeAlert from 'react-native-awesome-alerts';
import DialogConfirmSuccess from '../../Dialog/DialogConfirmSuccess';
import DialogConfirmFailure from '../../Dialog/DialogConfirmFailure';
import {UserModel} from '../../../Models/Model';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import ButtonText from '../../../Components/Buttons/ButtonText';
import {MyFriendsProps} from './type';
import LinearButtonCancel from '../../../Components/Buttons/LinearButtonCancel';
import ButtonUnfriend from '../../../Components/Buttons/ButtonUnFriend';
import {SAVE_MYFRIENDS} from '../../../Redux/Action/FriendsActions';

const MyFriend: React.FC<MyFriendsProps> = props => {
  const {navigation} = props;
  const [showAlert, setShowAlert] = useState(false);
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<UserModel>();
  const user = useAppSelector(state => state.Authentication.myAccount);
  const myFriends = useAppSelector(state => state.Friends.myFriends);
  const dispatch = useAppDispatch();

  //   quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setFriends(myFriends);
  }, []);

  //   xóa bạn bè
  const handleDeleteFriend = (friend: UserModel) => {
    setSelectedFriend(friend);
    setShowAlert(true);
  };

  //   xác nhận xóa bạn bè
  const handleConfirmDelete = async () => {
    const updatedFriends = friends.filter(
      item => item._id !== selectedFriend?._id,
    );
    setFriends(updatedFriends);
    try {
      const res = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/findFriendRequest?myId=' +
          user._id +
          '&friendId=' +
          selectedFriend?._id,
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
          const list = friends.filter(item => item._id !== selectedFriend?._id);
          dispatch(SAVE_MYFRIENDS(list));
          console.log('delete success: ' + response);
        }
        setSelectedFriend(undefined);
        setShowAlert(false);
      }
    } catch (error) {}
  };

  //   hiện danh sách bạn bè
  const renderItemFriend = (item: UserModel) => {
    return (
      <View key={item._id.toString()} style={styles.itemFriend}>
        <View style={styles.itemFriendLeft}>
          <Image
            style={styles.imgAvatar}
            source={
              item.avatar
                ? {uri: item.avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
          <View style={styles.friend}>
            <Text style={styles.nameFriend}>{item.username}</Text>
            {/* <Text style={styles.manutalFriend}>{item.manutalFriend}</Text> */}
          </View>
        </View>
        <ButtonUnfriend
          onPress={() => handleDeleteFriend(item)}
          buttonStyle={styles.btnStyle}
          label="Xóa"
        />
      </View>
    );
  };
  return (
    // CONTAINER
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* <View style={styles.search}>
          <TouchableOpacity>
            <Image
              style={styles.imgSearchFriend}
              source={require('../../../Resource/Image2/search.png')}></Image>
          </TouchableOpacity>
          <TextInput
            style={styles.ipSearchFriend}
            placeholder="Tìm kiếm bạn bè"></TextInput>
        </View> */}
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.iconHead}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <Text style={styles.headerTitle}>Bạn bè</Text>

        <ButtonIcon
          styles={styles.iconHead}
          url={require('../../../Resource/images/icon_search3.png')}
        />
      </View>
      {/* CENTER */}
      <View style={styles.center}>
        <Text style={styles.sumFriend}>{friends.length} bạn bè</Text>
        {friends.map(item => renderItemFriend(item))}
      </View>

      <Dialog
        message="Bạn muốn xóa người này không?"
        title="Xóa bạn bè !"
        isvisible={showAlert}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowAlert(false);
        }}></Dialog>
    </ScrollView>
  );
};

export default MyFriend;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F1F9FF',
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    height: 60,
    paddingHorizontal: 15,
  },

  iconHead: {
    width: 30,
    height: 30,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E1E3',
    marginTop: 10,
    borderRadius: 20,
  },

  imgSearchFriend: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },

  ipSearchFriend: {
    height: 45,
    fontSize: 14,
  },

  btnStyle: {
    width: 70,
    height: 40,
  },

  // CENTER
  center: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  sumFriend: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },

  itemFriend: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemFriendLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameFriend: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },

  manutalFriend: {
    fontWeight: '400',
    color: '#666666',
  },

  itemFriendRight: {
    width: 25,
    height: 25,
  },

  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },

  friend: {
    marginLeft: 10,
  },

  btn: {
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginHorizontal: 100,
    marginVertical: 100,
  },

  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  // DIALOG
});
