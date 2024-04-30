import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './style';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import {Shadow} from 'react-native-shadow-2';
import ItemOption from '../components/ItemOption';
import ButtonText from '../../../Components/Buttons/ButtonText';
import {CreateDiaryProps} from './type';
import ViewShot from 'react-native-view-shot';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/storage';
import Modal from 'react-native-modal';
import DialogOptions from '../components/DialogOptions';
import Draggable from 'react-native-draggable';
import ButtonDragable from '../../../Components/Buttons/ButtonDragable';
import DialogText from '../components/DialogText';
import {useAppSelector} from '../../../Redux/Hook';
import {ID_ADRESS, postData} from '../../../Service/RequestMethod';
import LoadingDialog from '../../../Components/Dialogs/LoadingDialog';
import {Colors} from '../../../Resource/colors';
import DialogBackground from '../components/DialogBackground';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import DialogPrivacy from '../components/DialogPrivacy';
import DialogConfirmSuccess from '../../Dialog/DialogConfirmSuccess';
import DialogTime from '../components/DialogTime';
import {
  onConvertDay,
  onConvertEpochtime,
  onFormatNumber,
} from '../../../Service/Service';
import {TextTrackType} from 'react-native-video';

const listOptions = [
  {
    _id: 2,
    label: 'Nhãn dán',
    icon: require('../../../Resource/images/icon_sticker.png'),
  },
  {
    _id: 3,
    label: 'Văn bản',
    icon: require('../../../Resource/images/icon_text.png'),
  },
  {
    _id: 4,
    label: 'Hình ảnh',
    icon: require('../../../Resource/images/icon_image.png'),
  },
  {
    _id: 5,
    label: 'Nền',
    icon: require('../../../Resource/images/icon_background.png'),
  },
  {
    _id: 6,
    label: 'Thời gian',
    icon: require('../../../Resource/images/icon_date.png'),
  },
];

const CreateDiaryScreen: React.FC<CreateDiaryProps> = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  const inputRef = useRef<TextInput>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const [content, setContent] = useState<string>('');
  const [components, setComponents] = useState<React.ReactNode[]>();
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);
  const [childs, setChilds] = useState<React.ReactElement[]>([]);
  const [reRender, setReRender] = useState(false);
  const [itemKey, setItemKey] = useState<Number[]>([]);
  const [isVisibleDialogText, setisVisibleDialogText] =
    useState<boolean>(false);
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isVisibleConfirmDialog, setisVisibleConfirmDialog] = useState(false);
  const [font, setfont] = useState<string>('inter');
  const [textSize, settextSize] = useState<number>(14);
  const [textColor, settextColor] = useState<string>(Colors.BLACK);
  const [isVisibleDialogBackground, setisVisibleDialogBackground] =
    useState<boolean>(false);
  const [backgroundColor, setbackgroundColor] = useState<string>(Colors.WHITE);
  const [isVisiblePrivacy, setIsVisiblePrivacy] = useState(false);
  const [privacy, setPrivacy] = useState(2);
  const [showAlert, setShowAlert] = useState(false);
  const [isVisibleDialogTime, setisVisibleDialogTime] = useState(false);
  const [day, setday] = useState(0);
  const [date, setdate] = useState(0);
  const [month, setmonth] = useState(0);
  const [year, setyear] = useState(0);
  const [customTime, setCustomTime] = useState(0);
  const [isVisibleRefresh, setisVisibleRefresh] = useState(false);

  // chọn ảnh từ thư viện
  const getImageFromLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        // Hình ảnh đã được chọn thành công
        if (response.assets && response.assets[0]) {
          const source = {uri: response.assets[0].uri};
          onCreateOneItem({uri: source.uri});
        }
        // Thực hiện xử lý hình ảnh ở đây
      }
    });
  };

  // chọn quyền riêng tư
  const onSetPrivacy = () => {
    setIsVisiblePrivacy(true);
  };

  // chọn font chữ
  const onSelectFont = (fontselected: string) => {
    console.log(fontselected);
    setfont(fontselected);
  };

  // chọn size chữ
  const onSelectFontSize = (textSize: number) => {
    settextSize(textSize);
  };

  // chọn màu chữ
  const onSelectColor = (color: string) => {
    settextColor(color);
  };

  // chọn màu nền
  const onSelectBackground = (color: string) => {
    setbackgroundColor(color);
  };

  // chọn thời gian
  const onSelectTime = (selected: number) => {
    setCustomTime(selected);
  };

  // xóa một item trên diary
  const onDeleteItem = (id: Number) => {
    console.log(childs);
    console.log(id);

    const newChilds = [...childs];
    const newItemKey = [...itemKey];
    newChilds.splice(Number(id), 1);
    newItemKey.splice(Number(id), 1);
    setItemKey(newItemKey);
    setChilds(newChilds);
    setReRender(!reRender);
  };

  // tạo ra một item trên diary
  const onCreateOneItem = (Item: any) => {
    let key = Number(itemKey.length + 1);
    setItemKey([...itemKey, key]);
    const newChild = (
      <ButtonDragable
        onChange={size => console.log(size)}
        onDelete={() => onDeleteItem(key)}
        key={key.toString()}
        isSlected={true}
        component={Item}
      />
    );
    setChilds([...childs, newChild]);
    setIsVisibleDialog(false);
    setReRender(!reRender);
  };

  useEffect(() => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setday(day);
    setmonth(month);
    setyear(year);
    setdate(date.getDate());
  }, [reRender]);

  // đăng bài
  const onCreateDiary = () => {
    inputRef.current?.blur();
    setisLoading(true);
    viewShotRef.current?.capture().then(uri => {
      const reference = firebase
        .storage()
        .ref()
        .child(new Date().getTime() + '.png');
      const upload = reference.putFile(uri);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.log('Upload error:', error);
        },
        () => {
          upload.snapshot?.ref.getDownloadURL().then(async downloadURL => {
            const date = new Date().getTime() / 1000;
            const data = {
              userid: user._id.toString(),
              diary: downloadURL.toString(),
              createdat: date,
              privacy: privacy,
            };
            const res = await postData(
              'http://' + ID_ADRESS + ':3000/api/diary/createDiary',
              data,
            );
            if (res.result) {
              setisLoading(false);
              setChilds([]);
              setReRender(!reRender);
              setContent('');
              navigation.goBack();
            }
          });
        },
      );
    });
  };

  // quay trở lại màn hình trước
  const onBack = () => {
    navigation.goBack();
  };

  // cài đặt trạng thái của các tùy chọn
  const setStatusFilter = (status: string) => {
    setStatus(status);
  };

  // focus vào textinput để viết nội dung
  const onFocusInContent = () => {
    inputRef.current?.focus();
  };

  // render ra các tùy chọn
  const RenderOptions = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.options}>
        {listOptions.map(e => (
          <ItemOption
            onPress={() => {
              setStatusFilter(e.label);
              if (e.label === 'Nhãn dán') {
                setIsVisibleDialog(true);
                setisVisibleDialogText(false);
                setisVisibleDialogBackground(false);
                setisVisibleDialogTime(false);
              }
              if (e.label === 'Văn bản') {
                setIsVisibleDialog(false);
                setisVisibleDialogText(true);
                setisVisibleDialogBackground(false);
                setisVisibleDialogTime(false);
              }
              if (e.label === 'Nền') {
                setIsVisibleDialog(false);
                setisVisibleDialogText(false);
                setisVisibleDialogBackground(true);
                setisVisibleDialogTime(false);
              }
              if (e.label === 'Hình ảnh') {
                getImageFromLibrary();
              }
              if (e.label === 'Thời gian') {
                setIsVisibleDialog(false);
                setisVisibleDialogText(false);
                setisVisibleDialogBackground(false);
                setisVisibleDialogTime(true);
              }
            }}
            itemStyle={[status === e.label ? styles.optionActive : {}]}
            key={e._id}
            item={e}
          />
        ))}
      </ScrollView>
    );
  };

  // đóng dialog nhãn dán
  const onCancelSticker = () => {
    setIsVisibleDialog(false);
  };

  // đóng dialog văn bản
  const onCancelText = () => {
    setisVisibleDialogText(false);
  };

  // Đóng dialog background
  const onCancelBackground = () => {
    setisVisibleDialogBackground(false);
  };

  // đóng dialog thời gian
  const onCancelDialogTime = () => {
    setisVisibleDialogTime(false);
  };

  // đến trang profile
  const onRefresh = () => {
    setChilds([]);
    setContent('');
    setisVisibleRefresh(false);
  };

  // xử lí icon quyền riêng tư
  const onHandlePrivacy = (privacy: number) => {
    switch (privacy) {
      case 1:
        return require('../../../Resource/images/icon_editPrivate.png');
      case 2:
        return require('../../../Resource/images/icon_friends2.png');
      case 3:
        return require('../../../Resource/images/icon_earth.png');
    }
  };

  return (
    <View style={styles.container}>
      {/* dialog */}
      {/* dialog sticker */}
      <Modal
        onBackdropPress={onCancelSticker}
        animationIn={'bounce'}
        isVisible={isVisibleDialog}
        children={
          <DialogOptions
            onCreateItem={item => onCreateOneItem(item.uri)}
            onCancel={onCancelSticker}
          />
        }
      />
      {/* dialog text */}
      <Modal
        onBackdropPress={onCancelText}
        animationIn={'bounce'}
        isVisible={isVisibleDialogText}
        children={
          <DialogText
            onSelectColor={value => onSelectColor(value)}
            textSize={textSize}
            onSelectFontSize={size => onSelectFontSize(size)}
            onSelectFont={fontselected => onSelectFont(fontselected)}
            onCancel={onCancelText}
          />
        }
      />
      {/* dialog background */}
      <Modal
        onBackdropPress={onCancelBackground}
        isVisible={isVisibleDialogBackground}
        children={
          <DialogBackground
            onSelectBackground={color => onSelectBackground(color)}
            onCancel={onCancelBackground}
          />
        }
      />
      {/* dialog loading */}
      <LoadingDialog isVisible={isLoading} />

      {/* cài đặt quyền riêng tư */}
      <Modal
        onBackdropPress={() => setIsVisiblePrivacy(false)}
        children={
          <DialogPrivacy
            onSetPrivacy={privacy => setPrivacy(privacy)}
            onCancel={() => setIsVisiblePrivacy(false)}
          />
        }
        isVisible={isVisiblePrivacy}
      />

      {/* Dialog time  */}
      <Modal
        onBackdropPress={onCancelDialogTime}
        isVisible={isVisibleDialogTime}
        children={
          <DialogTime
            onChooseTime={selected => onSelectTime(selected)}
            onCancel={onCancelDialogTime}
          />
        }
      />
      {/* header */}
      <View style={styles.topComponent}>
        <View style={styles.header}>
          <View style={styles.hdLeft}>
            <Shadow style={styles.hdl_shadow} distance={2} offset={[0, 5]}>
              <Pressable
                style={styles.hdl_btn}
                onPress={() => setisVisibleRefresh(true)}>
                <Image
                  source={require('../../../Resource/images/icon_refresh.png')}
                  style={styles.hdl_img}
                />
              </Pressable>
            </Shadow>
          </View>
          <View style={styles.hdRight}>
            <ButtonIcon
              onPress={onSetPrivacy}
              styles={[
                privacy == 1 && styles.hdr_btnPrivate,
                privacy == 2 && {width: 35, height: 35},
                privacy == 3 && {width: 30, height: 30},
              ]}
              url={onHandlePrivacy(privacy)}
            />
            <ButtonIcon
              styles={styles.hdr_btnClose}
              url={require('../../../Resource/images/icon_add.png')}
              onPress={() => setShowAlert(true)}
            />
          </View>
        </View>
        {RenderOptions()}
      </View>
      {/* body */}
      <Pressable style={styles.body} onPress={onFocusInContent}>
        <ViewShot style={{backgroundColor: 'red'}} ref={viewShotRef}>
          <Shadow distance={7} offset={[5, 5]} style={styles.bodyShadow}>
            <View
              style={[styles.customize, {backgroundColor: backgroundColor}]}>
              <View style={styles.timeGroup}>
                {/* kiểu bình thường */}
                {customTime == 0 ? (
                  <View style={styles.normalTimeGroup}>
                    <Text
                      style={[
                        styles.normalTimeTxt,
                        {
                          fontFamily: font,
                          fontSize: textSize > 20 ? 20 : textSize,
                          color: textColor,
                        },
                      ]}>
                      {onConvertDay(day)}
                    </Text>
                    <Text
                      style={[
                        styles.normalTimeTxt,
                        {
                          fontFamily: font,
                          fontSize: textSize > 20 ? 20 : textSize,
                          color: textColor,
                        },
                      ]}>
                      {' '}
                      ngày {onFormatNumber(date)}
                    </Text>
                    <Text
                      style={[
                        styles.normalTimeTxt,
                        {
                          fontFamily: font,
                          fontSize: textSize > 20 ? 20 : textSize,
                          color: textColor,
                        },
                      ]}>
                      {' '}
                      tháng {onFormatNumber(month)}
                    </Text>
                    <Text
                      style={[
                        styles.normalTimeTxt,
                        {
                          fontFamily: font,
                          fontSize: textSize > 20 ? 20 : textSize,
                          color: textColor,
                        },
                      ]}>
                      {' '}
                      năm {year}
                    </Text>
                  </View>
                ) : null}
                {/* kiểu tối giản */}
                {customTime == 1 ? (
                  <View style={styles.simplifyTimeGroup}>
                    <View style={styles.simplifyUp}>
                      <Text
                        style={[styles.simplifyTimetxt, {color: textColor}]}>
                        {onConvertDay(day)}
                      </Text>
                      <Text
                        style={[styles.simplifyTimetxt, {color: textColor}]}>
                        {' '}
                        ngày {onFormatNumber(date)}
                      </Text>
                    </View>
                    <View style={styles.simplifyDown}>
                      <Text
                        style={[styles.simplifyTimetxt, {color: textColor}]}>
                        {' '}
                        tháng {onFormatNumber(month)}
                      </Text>
                      <Text
                        style={[styles.simplifyTimetxt, {color: textColor}]}>
                        {' '}
                        năm {year}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {/* cách điệu */}
                {customTime == 2 ? (
                  <View style={styles.styleTimeGroup}>
                    <Text style={[styles.styleDaytxt, {color: textColor}]}>
                      {onConvertDay(day)}
                    </Text>
                    <View
                      style={[
                        styles.styleDateGroup,
                        {backgroundColor: textColor},
                      ]}>
                      <Text style={styles.styleTimetxt}>
                        Ngày {onFormatNumber(date)}
                      </Text>
                      <Text style={styles.styleTimetxt}>
                        {' '}
                        tháng {onFormatNumber(month)}
                      </Text>
                      <Text style={styles.styleTimetxt}>
                        {' '}
                        năm {onFormatNumber(year)}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {/* nghệ thuật */}
                {customTime == 3 ? (
                  <View style={styles.artTimeGroup}>
                    <Text style={styles.artDateTxt}>
                      {onFormatNumber(date)}
                    </Text>
                    <Text style={styles.artMonthtxt}>
                      Tháng {onFormatNumber(month)}
                    </Text>
                    <Text style={styles.artYearTxt}>{year}</Text>
                  </View>
                ) : null}
                {/* Đơn giản 2 */}
                {customTime == 4 ? (
                  <View style={styles.simpleTimeGroup2}>
                    <View style={styles.simpleSmallGroup2}>
                      <Text style={styles.simpleDateTxt2}>
                        {onFormatNumber(date)}
                      </Text>
                      <Text style={styles.simpleMonthTxt2}>
                        {onFormatNumber(month)}
                      </Text>
                      <Text style={styles.simpleYearTxt2}>{year}</Text>
                    </View>
                    <Text style={styles.simpleDayTxt}>{onConvertDay(day)}</Text>
                  </View>
                ) : null}
              </View>
              <TextInput
                style={{
                  fontFamily: font,
                  fontSize: textSize,
                  color: textColor,
                  zIndex: 1,
                }}
                onChangeText={(value: string) => setContent(value)}
                ref={inputRef}
                multiline
                value={content}
              />
              {childs}
            </View>
          </Shadow>
        </ViewShot>
      </Pressable>
      {/* footer */}
      <View style={styles.footer}>
        <ButtonText
          onPress={() => setisVisibleConfirmDialog(true)}
          label="Lưu"
        />
      </View>

      {/* Xác nhận Đăng */}
      <DialogConfirmSuccess
        txtButton="Đăng"
        message="Bạn có muốn đăng nhật kí này không ?"
        title="Thông báo!"
        isvisible={isVisibleConfirmDialog}
        onConfirm={onCreateDiary}
        onCancel={() => {
          setisVisibleConfirmDialog(false);
        }}
      />

      {/* xác nhận thoát */}
      <DialogConfirmSuccess
        txtButton="Thoát"
        message="Bạn chưa lưu nhật kí ?"
        title="Thông báo!"
        isvisible={showAlert}
        onConfirm={onBack}
        onCancel={() => {
          setShowAlert(false);
        }}
      />

      {/* xác nhận làm mới */}
      <DialogConfirmSuccess
        txtButton="Làm mới"
        message="Bạn muốn làm mới nhật kí ?"
        title="Thông báo!"
        isvisible={isVisibleRefresh}
        onConfirm={onRefresh}
        onCancel={() => {
          setisVisibleRefresh(false);
        }}
      />
    </View>
  );
};

export default CreateDiaryScreen;
