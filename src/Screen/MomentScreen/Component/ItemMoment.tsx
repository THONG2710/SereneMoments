import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  CommentsModel,
  LikesModel,
  MomentModel,
  UserModel,
} from '../../../Models/Model';
import {onConvertEpochtime} from '../../../Service/Service';
import {ID_ADRESS, getData, postData} from '../../../Service/RequestMethod';
import Modal from 'react-native-modal/dist/modal';
import CommentDialog from '../../../Components/Dialogs/CommentDialog';
import {useAppSelector} from '../../../Redux/Hook';
import VideoPlayer from 'react-native-video-player';
import {Colors} from '../../../Resource/colors';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

interface ItemMomentProps extends ViewProps {
  moment: MomentModel;
  onPress: (id: string) => void;
  onMoveToProfile: (id: string) => void;
}

const ItemMoment: React.FC<ItemMomentProps> = props => {
  const {moment, onPress, onMoveToProfile} = props;
  const [user, setuser] = useState<UserModel>();
  const [comments, setcomments] = useState<CommentsModel[]>([]);
  const [likes, setLikes] = useState<LikesModel[]>([]);
  const myAccount = useAppSelector(state => state.Authentication.myAccount);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isAvailableLike, setIsAvailableLike] = useState<boolean>(false);
  const [idLiked, setIdLiked] = useState<string>('');
  const [myComment, setMyComment] = useState<string>('');

  // lấy thông tin người dùng
  const onGetUser = async () => {
    const res = await getData(
      'http://' + ID_ADRESS + ':3000/api/users/getUserById?id=' + moment.userid,
    );
    if (res) {
      setuser(res.user);
    }
  };

  // lấy lượt bình luận
  const onGetComments = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/comments/getComments/' + moment._id,
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
        'http://' + ID_ADRESS + ':3000/api/likes/getLikes/' + moment._id,
      );
      if (res.result) {
        const response = res.likes;
        setLikes(response);
        for (const like of response) {
          if (myAccount._id === like.userid) {
            setIdLiked(like._id);
          }
        }
      }
    } catch (error) {
      console.log('failed to get likes');
    }
  };

  // xử lí thích khoảnh khắc
  const onHandleLikeMoment = async () => {
    const date = Math.floor(new Date().getTime() / 1000);
    if (!isAvailableLike) {
      const data = {
        userid: myAccount._id,
        momentid: moment._id,
        createdat: date,
      };
      const res = await postData(
        'http://' + ID_ADRESS + ':3000/api/likes/postLike',
        data,
      );
      if (res.result) {
        setIsAvailableLike(true);
        setIdLiked(res.likes._id);
        setIsRefresh(!isRefresh);
      }
    } else {
      const res = await postData(
        'http://' + ID_ADRESS + ':3000/api/likes/updateLike/' + idLiked,
        {},
      );
      if (res.result) {
        setIsAvailableLike(false);
        setIdLiked('');
        setIsRefresh(!isRefresh);
      }
    }
  };

  // viết bình luận
  const onHandlePostComment = async () => {
    try {
      const date = Math.floor(new Date().getTime() / 1000);
      const data = {
        userid: myAccount._id,
        momentid: moment._id,
        content: myComment,
        createdat: date,
      };
      const res = await postData(
        'http://' + ID_ADRESS + ':3000/api/comments/postComments',
        data,
      );
      if (res.result) {
        setIsRefresh(!isRefresh);
        setMyComment('');
      }
    } catch (error) {
      console.log('failed to post comment: ', error);
    }
  };

  useEffect(() => {
    onGetUser();
    onGetComments();
    onGetLikes();
  }, [isRefresh]);

  return (
    //CONTAINER
    <View style={styles.container}>
      {/* CENTER */}
      <View style={styles.center}>
        {moment.isimage ? (
          <ImageBackground
            source={{uri: moment.content.toString()}}
            resizeMode="cover"
            style={styles.image}
            imageStyle={{borderRadius: 30}}>
            <View style={styles.backgroundTextContent}>
              <Text style={styles.textContent}>{moment.caption}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View>
            <VideoPlayer
              video={{uri: moment.content.toString()}}
              videoWidth={Dimensions.get('screen').width}
              videoHeight={Dimensions.get('screen').height}
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
              <Text style={styles.textContent}>{moment.caption}</Text>
            </View>
          </View>
        )}
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.poster}>
          <View style={styles.namePoster}>
            <TouchableOpacity
              style={styles.backgroundImage}
              onPress={() => onMoveToProfile(user ? user._id.toString() : '')}>
              <Image
                style={styles.imgAVT}
                source={
                  user?.avatar
                    ? {uri: user?.avatar}
                    : require('../../../Resource/images/avatar.png')
                }></Image>
            </TouchableOpacity>
            <Text style={styles.textPoster}>{user?.username}</Text>
          </View>
          <View style={styles.timePoster}>
            <Text style={styles.textTime}>
              {onConvertEpochtime(Number(moment.createdat))}
            </Text>
          </View>
        </View>

        <View style={styles.interact}>
          <TouchableOpacity
            style={styles.interactLeft}
            onPress={onHandleLikeMoment}>
            <Image
              style={styles.imgInteract}
              source={
                idLiked != ''
                  ? require('../../../Resource/images/icon_heart.png')
                  : require('../../../Resource/images/icon_like.png')
              }></Image>
            <Text style={styles.textInteract}>{likes.length}</Text>
          </TouchableOpacity>
          <Image
            style={styles.line}
            source={require('../../../Resource/images/Line.png')}></Image>

          <TouchableOpacity
            style={styles.interactRight}
            onPress={() => onPress(moment._id.toString())}>
            <Image
              style={styles.imgInteract}
              source={require('../../../Resource/images/icon_comment.png')}></Image>
            <Text style={styles.textInteract}>{comments.length}</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={styles.send}>
          <TextInput
            value={myComment}
            onChangeText={value => setMyComment(value)}
            style={styles.ipSend}
            placeholder={`Gửi đến ${user?.username}`}></TextInput>
          <TouchableOpacity
            style={styles.backgroundImageSend}
            onPress={onHandlePostComment}>
            <Image
              style={styles.imgSend}
              source={require('../../../Resource/images/icon_send.png')}></Image>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ItemMoment;

const styles = StyleSheet.create({
  //CONTAINER
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 120,
    backgroundColor: '#B4D4FF',
    zIndex:-1
  },

  //HEADER
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  backgroundImage: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 21,
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
  },

  inputStylesSelected: {
    color: '#176B87',
    fontWeight: 'bold',
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
    width: 40,
    height: 40,
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2 + 30,
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

  textContent: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },

  // FOOTER
  footer: {
    marginTop: 10,
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
    marginTop: 10,
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
});
