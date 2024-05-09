import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SenterRequestProps} from './type';
import ButtonIcon from '../../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../../Components/Inputs/InputBox';
import {Colors} from '../../../../Resource/colors';
import {useAppDispatch, useAppSelector} from '../../../../Redux/Hook';
import {ID_ADRESS, getData, postData} from '../../../../Service/RequestMethod';
import {RequestModel, UserModel} from '../../../../Models/Model';
import ItemUser from '../../components/ItemUser';
import ItemRequest from '../../components/ItemRequest';
import {SAVE_MYFRIENDS} from '../../../../Redux/Action/FriendsActions';

const SenterRequest: React.FC<SenterRequestProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [requesters, setRequesters] = useState<RequestModel[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // lấy danh sách người đã gửi yêu cầu
  const getSenterRequest = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/friend/getUsersRequest/' + user._id,
    );
    if (res) {
      setRequesters(res.users);
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
      setIsRefresh(!isRefresh);
    }
  };

  // chấp nhận kết bạn
  const onAcceptRequest = async (id: string) => {
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/friend/acceptRequest/' + id,
      {},
    );
    if (res) {
      console.log(res.ask);
      //   lấy danh sách bạn bè từ database
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/friend/getInforFriendsById?id=' +
          user._id,
      );
      if (response.result) {
        dispatch(SAVE_MYFRIENDS(res.friends));
        setIsRefresh(!isRefresh);
      }
    }
  };

  useEffect(() => {
    getSenterRequest();
  }, [isRefresh]);

  return (
    <View style={styles.container}>
      {requesters.length > 0 ? (
        <FlatList
          data={requesters}
          renderItem={({item}) => (
            <ItemRequest
              onAcceptRequest={() =>
                onAcceptRequest(item.friend._id.toString())
              }
              onCancelRequest={() =>
                onCancelRequest(item.friend._id.toString())
              }
              user={item.user}
            />
          )}
          keyExtractor={item => item.user._id.toString()}
        />
      ) : (
        <Text style={styles.text}>Không có yêu cầu nào</Text>
      )}
    </View>
  );
};

export default SenterRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
