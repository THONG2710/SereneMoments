import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FindUserProps} from './type';
import {Colors} from '../../../Resource/colors';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import InputBox from '../../../Components/Inputs/InputBox';
import {UserModel} from '../../../Models/Model';
import ItemRequest from '../components/ItemRequest';
import ItemUser from '../components/ItemUser';

const FindUser: React.FC<FindUserProps> = props => {
  const [listUser, setListUser] = useState<UserModel[]>([]);
  const {navigation} = props;
  const {users} = props.route.params;

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setListUser(users);
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
        <InputBox onChangeText={() => {}} placeholder="Tìm kiếm..." />
      </View>
      {/* body */}
      <View style={styles.body}>
        {listUser.length > 0 ? (
          <FlatList
            data={listUser}
            renderItem={({item}) => (
              <ItemUser
                onCancelRequest={() => {}}
                onHandlePress={() => {}}
                user={item}
              />
            )}
            keyExtractor={item => item._id.toString()}
          />
        ) : (
          <View style={styles.listEmty}>
            <Text>Không có kết quả</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FindUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //   header
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
  },

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

  //   body
  body: {
    flex: 1,
  },

  listEmty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
