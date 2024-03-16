import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Style';
import {SelectList} from 'react-native-dropdown-select-list';
import ItemMoment from './Component/ItemMoment';
import TakeAMoment from './Component/TakeMoment';
import Swiper from 'react-native-swiper';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../Redux/Hook';
import {MomentModel, UserModel} from '../../Models/Model';
import {MomentScreenProps} from './Type';
import ShowMoments from './Component/ShowMoments';
import { SAVE_MYFRIENDMOMENTS } from '../../Redux/Action/MomentActions';

const MomentScreen: React.FC<MomentScreenProps> = () => {
  const [selected, setSelected] = useState('');
  const data = [{key: '1', value: 'Nguyễn Quang Trường'}];
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [infor, setinfor] = useState<UserModel>();
  const [isRefresh, setIsRefresh] = useState(false);
  const dispatch = useAppDispatch();

  // lấy khoảnh khắc
  const getMoments = async () => {
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/moment/getFriendMoments?id=' +
        user._id,
    );
    if (res.result) {
      setmoments(res.moments);
      dispatch(SAVE_MYFRIENDMOMENTS(res.moments));
    }
  };

  useEffect(() => {
    getMoments();
  }, [isRefresh]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* body */}
      {/* <Swiper
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsPagination={false}
        loop={false}> */}
        <TakeAMoment />
        <ShowMoments moments={moments}/>
      {/* </Swiper> */}
    </ScrollView>
  );
};

export default MomentScreen;
