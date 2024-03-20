import {
  FlatList,
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
import {ListFriendsProps} from './type';
import {UserModel} from '../../../Models/Model';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import ButtonText from '../../../Components/Buttons/ButtonText';
import {SAVE_MYFRIENDS} from '../../../Redux/Action/FriendsActions';
import LoadingScreen from '../../../Components/Screen/LoadingScreen';
import InputBox from '../../../Components/Inputs/InputBox';

const ListFriend: React.FC<ListFriendsProps> = props => {
  const {navigation} = props;
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<UserModel>();
  const user = useAppSelector(state => state.Authentication.myAccount);
  const dispatch = useAppDispatch();
  const myFriends = useAppSelector(state => state.Friends.myFriends);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<UserModel[]>([]);

  //   quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  // tìm bạn bè
  const onFindFriend = () => {
    if (search != '') {
      const content = search.toLocaleLowerCase();
      const resFriends: UserModel[] = [];
      myFriends.filter(item => {
        const itemName = item.username.toLocaleLowerCase();
        if (itemName.includes(content)) {
          resFriends.push(item);
        }
      });
      setFriends(resFriends);
    }
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
    setShowAlert(false);
    setisRefreshing(true);
    const updatedFriends = myFriends.filter(
      item => item._id !== selectedFriend?._id,
    );
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/friend/findFriendRequest?myId=' +
        user._id +
        '&friendId=' +
        selectedFriend?._id,
    );
    if (res.result) {
      const id = res.request._id;
      const response = await postData(
        'http://' + ID_ADRESS + ':3000/api/friend/cancelRequest/' + id,
        {},
      );
      if (response.result) {
        console.log('delete request successful');
        dispatch(SAVE_MYFRIENDS(updatedFriends));
        setSelectedFriend(undefined);
        setisRefreshing(false);
      }
    }
  };

  //   hiện danh sách bạn bè
  const renderItemFriend = (item: UserModel) => {
    return (
      <View key={item._id.toString()} style={styles.itemFriend}>
        <View style={styles.itemFriendLeft}>
          <Image style={styles.imgAvatar} source={{uri: item.avatar}}></Image>
          <View style={styles.friend}>
            <Text style={styles.nameFriend}>{item.username}</Text>
          </View>
        </View>
        <ButtonText
          onPress={() => handleDeleteFriend(item)}
          buttonStyle={styles.btnStyle}
          label="Xóa"
        />
      </View>
    );
  };
  return (
    // CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.btnBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <InputBox
          onSearch={onFindFriend}
          onChangeText={value => setSearch(value)}
          placeholder="Tìm kiếm..."
        />
      </View>
      {/* CENTER */}
      {isRefreshing ? (
        <LoadingScreen />
      ) : friends.length > 0 ? (
        <View style={styles.center}>
          <Text style={styles.sumFriend}>{friends.length} bạn bè</Text>
          <FlatList
            data={friends}
            renderItem={({item}) => renderItemFriend(item)}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Không có kết quả</Text>
        </View>
      )}

      <Dialog
        message="Bạn có chắc chắn muốn xóa người này không"
        title="Xóa bạn bè !"
        isvisible={showAlert}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowAlert(false);
        }}></Dialog>
    </View>
  );
};

export default ListFriend;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F1F9FF',
  },

  // HEADER
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
