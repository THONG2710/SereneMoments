import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {Shadow} from 'react-native-shadow-2';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {DiaryModel, UserModel} from '../../../Models/Model';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {onConvertEpochtime} from '../../../Service/Service';

interface PostProps extends ViewProps {
  diary: DiaryModel;
  onPress: (id: string) => void;
}

const Post: React.FC<PostProps> = props => {
  const [user, setuser] = useState<UserModel>();
  const {diary, onPress} = props;

  useEffect(() => {
    const getUser = async () => {
      const result = await getData(
        'http://' +
          ID_ADRESS +
          ':3000/api/users/getUserById?id=' +
          diary.userid,
      );
      if (result.user) {
        setuser(result.user);
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* avatar */}
        <View style={styles.hd_avatar}>
          <Shadow style={styles.hd_shadow} distance={2} offset={[0, 5]}>
            <Pressable style={styles.hdA_btn} onPress={() => onPress(user?._id.toString() || '')}>
              {user?.avatar ? (
                <Image source={{uri: user?.avatar}} style={styles.hdA_img} />
              ) : (
                <Image
                  source={require('../../../Resource/images/avatar.png')}
                  style={styles.hdA_img}
                />
              )}
            </Pressable>
          </Shadow>
        </View>
        {/* infor */}
        <View style={styles.hd_infor}>
          <Text style={styles.hdi_txtName}>{user?.username}</Text>
          <View style={styles.hdi_smallContainer}>
            <ButtonIcon
              styles={styles.hdi_iconfr}
              url={
                diary.privacy === 2
                  ? require('../../../Resource/images/icon_friends.png')
                  : require('../../../Resource/images/icon_public.png')
              }
            />
            <Text style={styles.hdi_txtStatus}>
              {diary.privacy === 2 ? 'Bạn bè' : 'Công khai'}
            </Text>
          </View>
          <Text style={styles.hdi_txtDate}>
            {onConvertEpochtime(Number(diary.createdat))}
          </Text>
        </View>
        {/* menu */}
        <View style={styles.hd_menu}>
          <Shadow distance={4} offset={[0, 3]} style={styles.hdm_shadow}>
            <ButtonIcon
              url={require('../../../Resource/images/icon_menu.png')}
            />
          </Shadow>
        </View>
      </View>
      {/* body */}
      <Image source={{uri: diary.diary.toString()}} style={styles.body}></Image>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ============ avatar =================
  hd_avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hd_shadow: {
    borderRadius: 50,
  },

  hdA_img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 10,
  },

  hdA_btn: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.WHITE,
  },

  // ========= infor =================================
  hd_infor: {
    flex: 4,
  },

  hdi_smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  hdi_txtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DARK_BLUE,
  },

  hdi_iconfr: {
    width: 15,
    height: 15,
  },

  hdi_txtStatus: {
    color: Colors.BLUE_TXT,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  hdi_txtDate: {
    fontSize: 12,
  },

  // ============ menu =================================
  hd_menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hdm_shadow: {
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },

  // ================= body =================================
  body: {
    width: '95%',
    height: (Dimensions.get('screen').height / 10) * 6.5,
    borderWidth: 1,
    marginTop: 20,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
