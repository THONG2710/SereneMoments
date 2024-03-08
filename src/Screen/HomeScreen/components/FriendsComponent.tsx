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
import {useAppSelector} from '../../../Redux/Hook';
import {UserModel} from '../../../Models/Model';

const list = [
  {
    id: 1,
    avatar: require('../../../Resource/images/avatar.png'),
    name: 'thong',
  },
  {
    id: 2,
    avatar: require('../../../Resource/images/avatar.png'),
    name: 'thong',
  },
  {
    id: 3,
    avatar: require('../../../Resource/images/avatar.png'),
    name: 'thong',
  },
  {
    id: 4,
    avatar: require('../../../Resource/images/avatar.png'),
    name: 'thong',
  },
  {
    id: 5,
    avatar: require('../../../Resource/images/avatar.png'),
    name: 'thong',
  },
];

interface FriendsComponentProps extends ViewProps {}

const FriendsComponent: React.FC<FriendsComponentProps> = props => {
  const [friends, setfriends] = useState<UserModel[]>([]);
  const user = useAppSelector(state => state.Authentication.myAccount);

  //  lấy bạn bè

  const getFriends = async () => {
    const res = await getData(
      'http://' +
        ID_ADRESS +
        ':3000/api/friend/getInforFriendsById?id=' +
        user._id,
    );
    if (res) {
      setfriends(res.friends);
    }
  };

  useEffect(() => {
    console.log(user._id);
    getFriends();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextButton style={styles.ButtonFriend} label="Bạn bè" />
        <TextButton style={styles.buttonMore} label="Xem thêm" />
      </View>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={friends}
          renderItem={({item}) => <ItemFriend information={item}/>}
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
