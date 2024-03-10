import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ListOtherUsersProps} from './type';
import InputBox from '../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {UserModel} from '../../../Models/Model';
import {useAppSelector} from '../../../Redux/Hook';
import ItemUser from '../components/ItemUser';

const ListOtherUser: React.FC<ListOtherUsersProps> = props => {
  const {navigation} = props;
  const [otherUsers, setotherUsers] = useState<UserModel[]>([]);
  const [usersSentRequest, setusersSentRequest] = useState<UserModel[]>([]);
  const user = useAppSelector(state => state.Authentication.myAccount);

  // quay trở lại
  const onGoBack = () => {
    navigation.goBack();
  };

  //  lấy người lạ
  const getOtherUsers = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/friend/getOtherUsers',
    );
    if (res.result) {
      setotherUsers(res.users);
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
      setusersSentRequest(res.users);
    }
  };

  useEffect(() => {
    getOtherUsers();
    getUserSentRequest();
  }, []);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.btnBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
        <InputBox placeholder="Tìm bạn mới..." />
      </View>
      {/* body */}
      <View style={styles.body}>
        {usersSentRequest.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.title}>Gần đây</Text>
            <FlatList
              data={usersSentRequest}
              renderItem={({item}) => <ItemUser isSent={true} user={item} />}
              keyExtractor={item => item._id.toString()}
            />
          </View>
        )}
        <View style={styles.listContainer}>
          <Text style={styles.title}>Bạn mới</Text>
          <FlatList
            data={otherUsers}
            renderItem={({item}) => <ItemUser isSent={false} user={item} />}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      </View>
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
});
