import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MomentModel} from '../../../Models/Model';
import ItemMoment from '../Component/ItemMoment';
import SwiperFlatList from 'react-native-swiper-flatlist';
import TakeMoment from '../TakeMoment/TakeMoment';
import Modal from 'react-native-modal/dist/modal';
import CommentDialog from '../../../Components/Dialogs/CommentDialog';
import {ShowMomentProps} from './type';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {SAVE_MYFRIENDMOMENTS} from '../../../Redux/Action/MomentActions';
import {namedQuery} from 'firebase/firestore';

const ShowMoments: React.FC<ShowMomentProps> = props => {
  const [isVisibleCommentDialog, setisVisibleCommentDialog] = useState(false);
  const [idMoment, setIdMoment] = useState<string>('');
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [moments, setmoments] = useState<MomentModel[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const dispatch = useAppDispatch();
  const {navigation} = props;

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
      setIsRefresh(false);
    }
  };

  // tải lại trang
  const onRefresh = () => {
    setIsRefresh(true);
  };

  useEffect(() => {
    getMoments();
  }, [isRefresh]);

  // mở dialog comment
  const onOpenCommentDialog = (id: string) => {
    setIdMoment(id);
    setisVisibleCommentDialog(true);
  };

  // đóng dialog
  const onCancelCommentDialog = () => {
    setisVisibleCommentDialog(false);
  };

  // đến trang profile
  const onMoveToProfile = (id: string) => {
    navigation.navigate('Profile', {id: id});
  };

  return (
    <View style={styles.container}>
      {/* dialog */}
      <Modal
        onBackdropPress={onCancelCommentDialog}
        isVisible={isVisibleCommentDialog}
        children={<CommentDialog idMoment={idMoment} />}
      />
      <SwiperFlatList
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<TakeMoment onRefresh={onRefresh} />}
        horizontal={false}
        data={moments}
        renderItem={({item}) => (
          <ItemMoment
            onMoveToProfile={id => onMoveToProfile(id)}
            onPress={id => onOpenCommentDialog(id)}
            moment={item}
          />
        )}
      />
    </View>
  );
};

export default ShowMoments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
