import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NotificationProps} from './type';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {NotificationSchema, RealmContext} from '../../../Models/ChatSchema';
import {useAppSelector} from '../../../Redux/Hook';
import {BSON} from 'realm';
import ItemNotification from '../../../Components/Items/ItemNotification';

const {useQuery, useRealm} = RealmContext;

const NotificationScreen: React.FC<NotificationProps> = props => {
  const {navigation} = props;
  const realm = useRealm();
  const user = useAppSelector(state => state.Authentication.myAccount);

  const notifications = useQuery(NotificationSchema, notis => {
    return notis
      .filtered('receiver == $0', new BSON.ObjectId(user._id.toString()))
      .sorted('createdat');
  });

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(NotificationSchema));
    });
  }, [realm]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.iconBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          data={notifications}
          renderItem={({item}) => <ItemNotification item={item} />}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  //   header
  header: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BLUE,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  iconBack: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },

  body: {
    flex: 1,
  },
});
