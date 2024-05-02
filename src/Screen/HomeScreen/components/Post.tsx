import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Colors} from '../../../Resource/colors';
import {Shadow} from 'react-native-shadow-2';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import {DiaryModel, UserModel} from '../../../Models/Model';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import {onConvertEpochtime} from '../../../Service/Service';
import Modal from 'react-native-modal';
import TextButton from '../../../Components/Buttons/TextButton';
import {useAppSelector} from '../../../Redux/Hook';
import DialogConfirmSuccess from '../../Dialog/DialogConfirmSuccess';

const reasonList = [
  {
    _id: 1,
    reason: 'Không tôn trọng tôn giáo',
  },
  {
    _id: 2,
    reason: 'Đả kích chính trị',
  },
  {
    _id: 3,
    reason: 'Quấy rối/ Phân biệt đối xử',
  },
  {
    _id: 4,
    reason: 'Vi phạm bản quyền',
  },
  {
    _id: 5,
    reason: 'Xúc phạm cá nhân',
  },
  {
    _id: 6,
    reason: 'Vi phạm pháp luật',
  },
];

interface PostProps {
  diary: DiaryModel;
  onPress: (id: string) => void;
}

const Post: React.FC<PostProps> = props => {
  const [user, setuser] = useState<UserModel>();
  const {diary, onPress} = props;
  const [isVisibleRPort, setIsVisibleReport] = useState(false);
  const [isVisibleDialogReason, setIsVisibleDialogReason] = useState(false);
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const [isVisibleReport, setisVisibleReport] = useState(false);
  const [reasonSelected, setReasonSelected] = useState('');

  // đóng dialog báo cáo
  const onCloseDialogReport = () => {
    setIsVisibleReport(false);
    setIsVisibleDialogReason(false);
    setisVisibleReport(false);
  };

  // mở dialog nguyên do
  const onOpenDialogReason = () => {
    setIsVisibleReport(false);
    setIsVisibleDialogReason(true);
  };

  // báo cáo
  const onReportDiary = async () => {
    try {
      const date = Math.floor(Number(new Date().getTime() / 1000));
      const data = {
        idDiary: diary._id,
        userid: myAccount._id,
        created: date,
        reason: reasonSelected,
        status: true,
      };
      console.log(data);

      const res = await postData(
        'http://' + ID_ADRESS + ':3000/api/report/createReport',
        data,
      );
      if (res.result) {
        setIsVisibleReport(false);
        setIsVisibleDialogReason(false);
        setisVisibleReport(false);
      }
    } catch (error) {
      console.log('failed to report diary: ', error);
    }
  };

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

  return diary.isavailable ? (
    <View style={styles.container}>
      <DialogConfirmSuccess
        isvisible={isVisibleReport}
        txtButton="Báo cáo"
        message="Bạn muốn báo cáo bài viết này?"
        title="Thông báo"
        onConfirm={() => onReportDiary()}
        onCancel={() => onCloseDialogReport()}
      />

      {/* Header */}
      <View style={styles.header}>
        {/* avatar */}
        <View style={styles.hd_avatar}>
          <Shadow style={styles.hd_shadow} distance={2} offset={[0, 5]}>
            <Pressable
              style={styles.hdA_btn}
              onPress={() => onPress(user?._id.toString() || '')}>
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
        {/* cửa sổ báo cáo */}
        <Modal
          onBackdropPress={onCloseDialogReport}
          isVisible={isVisibleRPort}
          children={
            <View style={styles.dialogContainer}>
              <TouchableOpacity
                style={styles.btnDialog}
                onPress={onOpenDialogReason}>
                <Text style={styles.txtDialog}>
                  Báo cáo bài nhật kí của {user?.username}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
        {/* cửa sổ lí do */}
        <Modal
          onBackdropPress={onCloseDialogReport}
          isVisible={isVisibleDialogReason}
          children={
            <View style={styles.DialogReasonContainer}>
              <FlatList
                data={reasonList}
                renderItem={({item}) => (
                  <TextButton
                    onPress={() => {
                      onCloseDialogReport();
                      setisVisibleReport(true);
                      setReasonSelected(item.reason);
                    }}
                    style={styles.btnDialogReason}
                    label={item.reason}
                  />
                )}
                keyExtractor={item => item._id.toString()}
              />
            </View>
          }
        />
        <TouchableOpacity
          style={styles.hd_menu}
          onPress={() => setIsVisibleReport(!isVisibleRPort)}>
          <Shadow distance={4} offset={[0, 3]} style={styles.hdm_shadow}>
            <ButtonIcon
              url={require('../../../Resource/images/icon_menu.png')}
            />
          </Shadow>
        </TouchableOpacity>
      </View>
      {/* body */}
      <Image source={{uri: diary.diary.toString()}} style={styles.body}></Image>
    </View>
  ) : null;
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
    marginRight: 10,
    zIndex: 10,
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

  dialogContainer: {
    width: Dimensions.get('screen').width,
    height: 40,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    marginLeft: -20,
  },

  btnDialog: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    height: 35,
    justifyContent: 'center',
  },

  txtDialog: {
    color: Colors.BLACK,
    fontSize: 16,
  },

  // DialogReasonContainer
  DialogReasonContainer: {
    width: Dimensions.get('screen').width - 90,
    height: Dimensions.get('screen').height / 3,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
    left: 30,
  },

  btnDialogReason: {
    color: Colors.BLACK,
    width: '100%',
    marginVertical: 7,
    fontSize: 16,
    textAlign: 'left',
  },
});
