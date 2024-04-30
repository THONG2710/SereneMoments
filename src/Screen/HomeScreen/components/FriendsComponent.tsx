import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemFriend from '../../../Components/Items/ItemFriend';
import TextButton from '../../../Components/Buttons/TextButton';
import {Colors} from '../../../Resource/colors';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {useAppDispatch, useAppSelector} from '../../../Redux/Hook';
import {UserModel} from '../../../Models/Model';
import { SAVE_MYFRIENDS } from '../../../Redux/Action/FriendsActions';

interface FriendsComponentProps extends ViewProps {
  onMyFriends: () => void;
  onOtherUsers: () => void;
  isRefresh: boolean;
  onMoveToProfile: (id: string) => void;
}

const FriendsComponent: React.FC<FriendsComponentProps> = props => {
  const {onMyFriends, onOtherUsers, isRefresh, onMoveToProfile} = props;
  const [friends, setfriends] = useState<UserModel[]>([]);
  const user = useAppSelector(state => state.Authentication.myAccount);
  const dispatch = useAppDispatch();

  //  lấy bạn bè
  const getFriends = async () => {
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/friend/getInforFriendsById?id=' +
        user._id,
    );
    if (res.result) {
      setfriends(res.friends);
      dispatch(SAVE_MYFRIENDS(res.friends))
    }
  };

  useEffect(() => {
    getFriends();
  }, [isRefresh]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextButton
          onPress={onMyFriends}
          style={styles.ButtonFriend}
          label="Bạn bè"
        />
        <TextButton
          onPress={onOtherUsers}
          style={styles.buttonMore}
          label="Xem thêm"
        />
      </View>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={friends}
          renderItem={({item}) => (
            <ItemFriend onPress={(id) => onMoveToProfile(id)} information={item} />
          )}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </View>
  );
};

export default FriendsComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
  },

  ButtonFriend: {
    fontWeight: 'bold',
    color: Colors.DARK_BLUE,
    fontSize: 18,
  },

  buttonMore: {
    color: Colors.DARK_BLUE,
  },
});
