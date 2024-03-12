import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import InputBox from '../../../Components/Inputs/InputBox';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import Post from '../components/Post';
import {ListDiarieProps} from './type';
import {useAppSelector} from '../../../Redux/Hook';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {DiaryModel} from '../../../Models/Model';
import FriendsComponent from '../components/FriendsComponent';

const ListDiariesScreen: React.FC<ListDiarieProps> = props => {
  const {navigation} = props;
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [listDiaries, setListDiaries] = useState<DiaryModel[]>([]);
  const [refreshing, setrefreshing] = useState(false);

  // di chuyển đến trang tạo nhật kí
  const onCreateNewDiary = () => {
    navigation.navigate('CreateDiaryScreen');
  };

  //  di chuyển đến trang người lạ
  const onOtherUsers = () => {
    navigation.navigate('OtherUsers');
  }

  // di chuyển đến trang bạn bè
  const onMyFriends = () => {
    navigation.navigate('ListFriends');
  };

  // lấy nhật kí từ database
  const getDiaries = async () => {
    const result = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/diary/getDiariesMyFriends?id=' +
        user._id,
    );
    if (result.diaries) {
      setListDiaries(result.diaries);
      setrefreshing(false);
    }
  };

  useEffect(() => {
    getDiaries();
  }, [refreshing]);

  // tải lại trang 
  const onRefresh = () => {
    setrefreshing(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <InputBox placeholder="Tìm kiếm..." />
        <ButtonIcon
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_bell.png')}
        />
        <ButtonIcon
          styles={styles.header_btnICon}
          url={require('../../../Resource/images/icon_add.png')}
          onPress={onCreateNewDiary}
        />
      </View>
      {/* list */}
      <FlatList
        ListHeaderComponent={<FriendsComponent isRefresh={refreshing} onOtherUsers={onOtherUsers} onMyFriends={onMyFriends}/>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={listDiaries}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Post diary={item} />}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default ListDiariesScreen;
