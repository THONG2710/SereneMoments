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

const listOptions = [
  {
    _id: 1,
    label: 'Mẫu sẵn',
    icon: require('../../../Resource/images/icon_model.png'),
  },
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

  // chọn ảnh từ thư viện
  const getImageFromLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        // Hình ảnh đã được chọn thành công
        const source = {uri: response.assets[0].uri};
        onCreateOneItem(<Image style={{width: 50, height: 50}} source={{uri: source.uri}}/>)
        // Thực hiện xử lý hình ảnh ở đây
      }
    });
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

  // xác nhận đăng
  const onConfirmPostDiary = () => {
    Alert.alert('Xác nhận', 'Bạn muốn đăng bài này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng',
        onPress: () => onCreateDiary(),
      },
    ]);
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
  const onCreateOneItem = (Item: React.ReactElement) => {
    let key = Number(itemKey.length + 1);
    setItemKey([...itemKey, key]);
    const newChild = (
      <ButtonDragable
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

  useEffect(() => {}, [reRender]);

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
            const date = new Date();
            const data = {
              userid: user._id.toString(),
              diary: downloadURL.toString(),
              createdat: date.getTime(),
              privacy: 2,
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
              }
              if (e.label === 'Văn bản') {
                setIsVisibleDialog(false);
                setisVisibleDialogText(true);
                setisVisibleDialogBackground(false);
              }
              if (e.label === 'Nền') {
                setIsVisibleDialog(false);
                setisVisibleDialogText(false);
                setisVisibleDialogBackground(true);
              }
              if (e.label === 'Hình ảnh') {
                getImageFromLibrary();
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

  return (
    <View style={styles.container}>
      {/* dialog */}
      {/* dialog sticker */}
      <Modal
        animationIn={'bounce'}
        isVisible={isVisibleDialog}
        children={
          <DialogOptions
            onCreateItem={item =>
              onCreateOneItem(
                <Image style={{width: 50, height: 50}} source={item.uri} />,
              )
            }
            onCancel={onCancelSticker}
          />
        }
      />
      {/* dialog text */}
      <Modal
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
      {/* header */}
      <View style={styles.topComponent}>
        <View style={styles.header}>
          <View style={styles.hdLeft}>
            <Shadow style={styles.hdl_shadow} distance={2} offset={[0, 5]}>
              <Pressable style={styles.hdl_btn}>
                <Image source={{uri: user.avatar}} style={styles.hdl_img} />
              </Pressable>
            </Shadow>
          </View>
          <View style={styles.hdRight}>
            <ButtonIcon
              styles={styles.hdr_btnPrivate}
              url={require('../../../Resource/images/icon_editPrivate.png')}
            />

            <ButtonIcon
              styles={styles.hdr_btnClose}
              url={require('../../../Resource/images/icon_add.png')}
              onPress={onBack}
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
              <TextInput
                style={{fontFamily: font, fontSize: textSize, color: textColor}}
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
        <ButtonText onPress={onConfirmPostDiary} label="Lưu" />
      </View>
    </View>
  );
};

export default CreateDiaryScreen;
