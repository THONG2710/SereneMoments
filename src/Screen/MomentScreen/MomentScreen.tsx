import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Style';
import {SelectList} from 'react-native-dropdown-select-list';
import ItemMoment from './Component/ItemMoment';
import TakeAMoment from './Component/TakeMoment';
import Swiper from 'react-native-swiper';
import {ID_ADRESS, getData} from '../../Service/RequestMethod';
import {useAppSelector} from '../../Redux/Hook';
import {MomentModel, UserModel} from '../../Models/Model';

const MomentScreen = () => {
  const [selected, setSelected] = useState('');
  const data = [{key: '1', value: 'Nguyễn Quang Trường'}];
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [infor, setinfor] = useState<UserModel>();

  // lấy khoảnh khắc 
  const getMoments = async () => {
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/moment/getFriendMoments?id=' +
        user._id,
    );
    if (res) {
      setmoments(res.moments);
    }
  };

  useEffect(() => {
    getMoments();
  }, []);

  return (
    <View style={styles.container}>
      {/* body */}
      <Swiper
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsPagination={false}
        loop={false}>
        <TakeAMoment />
        {moments.map(moment => (
          <ItemMoment moment={moment} />
        ))}
      </Swiper>
    </View>
  );
};

export default MomentScreen;
