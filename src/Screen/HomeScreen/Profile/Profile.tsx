import {
  Alert,
  Image,
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
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {DiaryModel, FriendModel, MomentModel} from '../../../Models/Model';
import {getDataFromStorage, setDataToStorage} from '../../../Service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_MYMOMENTS} from '../../../Redux/Action/MomentActions';
import {SAVE_MYFRIENDS} from '../../../Redux/Action/FriendsActions';
import {SAVE_MYDIARIES} from '../../../Redux/Action/DiaryActions';

const Profile: React.FC<ProfileProps> = props => {
  const {navigation} = props;
  const useDispatch = useAppDispatch();
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const [diaries, setdiaries] = useState<DiaryModel[]>([]);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [friends, setfriends] = useState<FriendModel[]>([]);

  // lấy nhật kí
  const getDiaries = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/diary/getDiariesByIdUser?id=' +
          myAccount._id,
      );
      if (response.result) {
        setdiaries(response.diaries);
        useDispatch(SAVE_MYDIARIES(response.diaries));
      }
    } catch (error) {
      console.log('get diaries failled: ' + error);
    }
  };

  // lấy khoảnh khắc
  const getMoments = async () => {
    try {
      const response = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/moment/getMomentsById?id=' +
          myAccount._id,
      );
      if (response.result) {
        setmoments(response.moments);
        useDispatch(SAVE_MYMOMENTS(response.moments));
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
          myAccount._id,
      );
      if (response.result) {
        setfriends(response.friends);
        useDispatch(SAVE_MYFRIENDS(response.friends));
      }
    } catch (error) {
      console.log('get friends failled: ' + error);
    }
  };

  return (
    //CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.background}>
          <Image
            style={styles.imgAVT}
            source={
              myAccount.avatar
                ? {uri: myAccount.avatar}
                : require('../../../Resource/images/avatar.png')
            }></Image>
        </View>
        <Text style={styles.textName}>{myAccount.username}</Text>
      </View>

      {/* CENTER */}
      {/* CENTER TOP */}
      <View style={styles.centerTop}>
        <TouchableOpacity style={styles.itemContentOne}>
          <View style={styles.itemContentLeft}>
            <Image
              style={styles.imageItem}
              source={require('../../../Resource/images/icon_diary.png')}></Image>
            <Text style={styles.textItem}>Nhật ký</Text>
          </View>
          <Text style={styles.notificationItem}>{diaries.length}</Text>
        </TouchableOpacity>

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
