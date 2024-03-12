import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SenterRequestProps} from './type';
import ButtonIcon from '../../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../../Components/Inputs/InputBox';
import {Colors} from '../../../../Resource/colors';
import {useAppSelector} from '../../../../Redux/Hook';
import {ID_ADRESS, getData, postData} from '../../../../Service/RequestMethod';
import {RequestModel, UserModel} from '../../../../Models/Model';
import ItemUser from '../../components/ItemUser';
import ItemRequest from '../../components/ItemRequest';

const SenterRequest: React.FC<SenterRequestProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [requesters, setRequesters] = useState<RequestModel[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

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
      setIsRefresh(!isRefresh);
    }
  };

  useEffect(() => {
    getSenterRequest();
  }, [isRefresh]);

  return (
    <View style={styles.container}>
      <FlatList
        data={requesters}
        renderItem={({item}) => (
          <ItemRequest
            onAcceptRequest={() => onAcceptRequest(item.friend._id.toString())}
            onCancelRequest={() => onCancelRequest(item.friend._id.toString())}
            user={item.user}
          />
        )}
        keyExtractor={item => item.user._id.toString()}
      />
    </View>
  );
};

export default SenterRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
