import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {Shadow} from 'react-native-shadow-2';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface PostProps extends ViewProps {

}

const Post: React.FC<PostProps> = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* avatar */}
        <View style={styles.hd_avatar}>
          <Shadow style={styles.hd_shadow} distance={2} offset={[0, 5]}>
            <ButtonIcon
              styleBtn={styles.hdA_btn}
              styles={styles.hdA_img}
              url={require('../../../Resource/images/avatar2.png')}
            />
          </Shadow>
        </View>
        {/* infor */}
        <View style={styles.hd_infor}>
          <Text style={styles.hdi_txtName}>Nguyễn Quang Trường</Text>
          <View style={styles.hdi_smallContainer}>
            <ButtonIcon
              styles={styles.hdi_iconfr}
              url={require('../../../Resource/images/icon_friends.png')}
            />
            <Text style={styles.hdi_txtStatus}>Bạn bè</Text>
          </View>
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
      <View style={styles.body}> 

      </View>
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
    width: 20,
    height: 20,
  },

  hdi_txtStatus: {
    color: Colors.BLUE_TXT,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
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
    height: '85%',
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
  }
});
