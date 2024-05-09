import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {DetailMomentHistoryProps} from './type';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {CommentsModel, LikesModel, MomentModel} from '../../../Models/Model';
import {useAppSelector} from '../../../Redux/Hook';
import {onConvertEpochtime} from '../../../Service/Service';
import CommentDialog from '../../../Components/Dialogs/CommentDialog';
import Modal from 'react-native-modal/dist/modal';
import VideoPlayer from 'react-native-video-player';
import {Colors} from '../../../Resource/colors';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const DetailMomentHistory: React.FC<DetailMomentHistoryProps> = props => {
  const {navigation} = props;
  const {id} = props.route.params;
  const [moment, setMoment] = useState<MomentModel>();
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [comments, setcomments] = useState<CommentsModel[]>([]);
  const [likes, setLikes] = useState<LikesModel[]>([]);
  const [idLiked, setIdLiked] = useState<string>('');
  const [myComment, setMyComment] = useState<string>('');
  const [isAvailableLike, setIsAvailableLike] = useState<boolean>(false);
  const [isVisibleCommentDialog, setisVisibleCommentDialog] = useState(false);
  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  const getMoment = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/moment/getAMoment?id=' + id,
      );
      if (res.result) {
        setMoment(res.moments);
      }
    } catch (error) {
      console.log('Error getting moment: ' + error);
    }
  };

  // lấy lượt bình luận
  const onGetComments = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/comments/getComments/' + id,
      );
      if (res.result) {
        setcomments(res.comments);
      }
    } catch (error) {
      console.log('failed to get comments');
    }
  };

  // lấy lượt thích
  const onGetLikes = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/likes/getLikes/' + id,
      );
      if (res.result) {
        const response = res.likes;
        setLikes(response);
        for (const like of response) {
          if (user._id === like.userid) {
            setIdLiked(like._id);
            setIsAvailableLike(true);
          }
        }
      }
    } catch (error) {
      console.log('failed to get likes');
    }
  };

  // đóng dialog
  const onCancelCommentDialog = () => {
    setisVisibleCommentDialog(false);
  };

  useEffect(() => {
    getMoment();
    onGetLikes();
    onGetComments();
  }, []);

  return (
    //CONTAINER
    <ScrollView style={styles.container}>
      <Modal
        onBackdropPress={onCancelCommentDialog}
        isVisible={isVisibleCommentDialog}
        children={<CommentDialog idMoment={id} />}
      />
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backgroundImage} onPress={onGoBack}>
          <Image
            style={styles.imgAVT}
            source={require('../../../Resource/images/icon_back2.png')}></Image>
        </TouchableOpacity>

        <View style={styles.backgroundImageMN}>
          <View>
            <Image
              style={styles.imgMN}
              source={require('../../../Resource/images/icon_menu.png')}></Image>
          </View>
        </View>
      </View>

      {/* CENTER */}
      {moment?.isimage ? (
        <View style={styles.center}>
          <ImageBackground
            source={
              moment?.content
                ? {uri: moment.content}
                : require('../../../Resource/images/img.jpg')
            }
            resizeMode="cover"
            style={styles.image}
            imageStyle={{borderRadius: 30}}>
            <View style={styles.backgroundTextContent}>
              <Text style={styles.textContent}>{moment?.caption}</Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View>
          <VideoPlayer
            video={{uri: moment?.content?.toString()}}
            videoWidth={Dimensions.get('screen').width}
            videoHeight={Dimensions.get('screen').height / 2}
            thumbnail={
              user?.avatar
                ? {uri: user.avatar}
                : require('../../../Resource/images/avatar.png')
            }
            endThumbnail={
              user?.avatar
                ? {uri: user.avatar}
                : require('../../../Resource/images/avatar.png')
            }
            disableControlsAutoHide={true}
            style={styles.videoStyle}
          />
          <View style={styles.backgroundTextContentVideo}>
            <Text style={styles.textContent}>{moment?.caption}</Text>
          </View>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.poster}>
          <View style={styles.namePoster}>
            <View style={styles.backgroundImage}>
              <Image
                style={styles.imgAVT}
                source={
                  user.avatar
                    ? {uri: user.avatar}
                    : require('../../../Resource/images/avatar.png')
                }></Image>
            </View>
            <Text style={styles.textPoster}>{user.username}</Text>
          </View>
          <View style={styles.timePoster}>
            <Text style={styles.textTime}>
              {onConvertEpochtime(Number(moment?.createdat))}
            </Text>
          </View>
        </View>

        <View style={styles.interact}>
          <View style={styles.interactLeft}>
            <Image
              style={styles.imgInteract}
              source={
                idLiked != ''
                  ? require('../../../Resource/images/icon_heart.png')
                  : require('../../../Resource/images/icon_like.png')
              }></Image>
            <Text style={styles.textInteract}>{likes.length}</Text>
          </View>
          <Image
            style={styles.line}
            source={require('../../../Resource/images/Line.png')}></Image>

          <TouchableOpacity
            style={styles.interactRight}
            onPress={() => setisVisibleCommentDialog(true)}>
            <Image
              style={styles.imgInteract}
              source={require('../../../Resource/images/icon_comment.png')}></Image>
            <Text style={styles.textInteract}>{comments.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailMomentHistory;

const styles = StyleSheet.create({
  //CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#B4D4FF',
  },

  //HEADER
  header: {
    marginHorizontal: 25,
    marginVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  backgroundImage: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    alignItems: 'center',
    left: 80,
  },

  selectedList: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0,
    width: 200,
    fontFamily: 'Helvetica',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputStylesSelected: {
    color: '#176B87',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  dropdownStylesSelected: {
    backgroundColor: 'white',
    borderWidth: 0,
    width: 200,
    fontWeight: 'bold',
    zIndex: 1,
  },

  textDropdownStyles: {
    color: '#176B87',
    fontWeight: '500',
  },

  imgAVT: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },

  backgroundImageMN: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgMN: {
    width: 28,
    height: 28,
  },

  //CENTER
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },

  image: {
    justifyContent: 'flex-end',
    width: 350,
    height: 400,
    marginTop: 10,
    borderRadius: 30,
  },

  backgroundTextContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  textContent: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },

  // FOOTER
  footer: {
    marginTop: 30,
  },

  poster: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  namePoster: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textPoster: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#000',
  },

  timePoster: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textTime: {
    marginHorizontal: 2,
    fontWeight: '500',
  },

  interact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  interactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },

  interactRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },

  imgInteract: {
    width: 24,
    height: 24,
  },

  textInteract: {
    color: '#000',
    fontWeight: '500',
    marginLeft: 5,
  },

  line: {
    width: 1,
    height: 25,
  },

  send: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  ipSend: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: w - w * 0.25,
    height: 40,
    paddingLeft: 20,
    fontWeight: 'bold',
  },

  backgroundImageSend: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 15, // chỉ dùng cho Android
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  imgSend: {
    width: 25,
    height: 25,
  },

  // video
  videoStyle: {
    borderRadius: 20,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2 + 30,
    backgroundColor: Colors.WHITE,
    marginLeft: 5,
  },

  backgroundTextContentVideo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 30,
    paddingHorizontal: 10,
    position: 'absolute',
    width: '100%',
    top: 10,
  },
});
