import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DetailTodoListHistoryProps} from './type';
import {ID_ADRESS, getData} from '../../../Service/RequestMethod';
import {ItemTodolist} from '../../../Models/Model';
import ButtonIcon from '../../../Components/Buttons/ButtonIcon';
import { Colors } from '../../../Resource/colors';

const DetailTodoListHistory: React.FC<DetailTodoListHistoryProps> = props => {
  const {id} = props.route.params;
  const {navigation} = props;
  const [finishedWorks, setfinishedWorks] = useState<ItemTodolist[]>([]);
  const [unfinishedWorks, setUnfinishedWorks] = useState<ItemTodolist[]>([]);
  const [isVisibleFinishWorks, setisVisibleFinishWorks] = useState(false);

  // lấy danh sách công việc
  const onGetItems = async () => {
    try {
      const res = await getData(
        'http://' + ID_ADRESS + ':3000/api/itemTodo/getItemByTodo?id=' + id,
      );
      if (res.result) {
        setfinishedWorks(res.item.finished);
        setUnfinishedWorks(res.item.unfinished);
      }
    } catch (error) {
      console.log('failed to get items: ' + error);
    }
  };

  useEffect(() => {
    onGetItems();
  }, []);

  // quay lại
  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    // CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ButtonIcon
          onPress={onGoBack}
          styles={styles.iconBack}
          url={require('../../../Resource/images/icon_back3.png')}
        />
      </View>
      {/* CENTER */}

      {unfinishedWorks.length > 0 || finishedWorks.length > 0 ? (
        <ScrollView style={styles.center}>
          {unfinishedWorks.length > 0 && (
            <Text style={styles.textUnfinished}>Chưa hoàn thành</Text>
          )}
          {/* TASK UNFINISHED */}
          {unfinishedWorks.length > 0 && (
            <View style={styles.itemTask}>
              {unfinishedWorks.map((item: ItemTodolist) => (
                <View key={item._id.toString()} style={styles.task}>
                  {/* Checkbox code */}
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() =>{}}></TouchableOpacity>
                  <Text style={styles.textTask}>{item.content}</Text>
                </View>
              ))}
            </View>
          )}

          {/* TASK FINISHED */}
          {finishedWorks.length > 0 && (
            <TouchableOpacity
              style={styles.finishTitle}
              onPress={() => {}}>
              <Text style={styles.textFinished}>Đã hoàn thành</Text>
              <Image
                source={require('../../../Resource/Image2/ic_down.png')}
                style={
                  isVisibleFinishWorks
                    ? styles.downFinish
                    : [styles.downFinish, {transform: [{rotate: '270deg'}]}]
                }
              />
            </TouchableOpacity>
          )}

          {finishedWorks.length > 0 && isVisibleFinishWorks ? (
            <View style={styles.itemTask}>
              {finishedWorks.map((item: ItemTodolist) => (
                <TouchableOpacity
                  onPress={() => {}}
                  key={item._id.toString()}
                  style={styles.finished}>
                  <Image
                    source={require('../../../Resource/images/icon_checked.png')}
                    style={styles.checked}
                  />
                  <Text style={styles.textTaskFinished}>{item.content}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.centerWhileEmty}>
          <Text>Không có công việc nào</Text>
        </View>
      )}
    </View>
  );
};

export default DetailTodoListHistory;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#EBF0F7',
  },
  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.BLUE,
    height: 60,
    width: '100%',
  },

  iconBack: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },

  backgroundHeader: {
    backgroundColor: '#86B6F6',
    width: Dimensions.get('screen').width - 30,
    height: 100,
    borderRadius: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '60%',
    marginLeft: 20,
  },

  imgHeader: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  // CENTER
  center: {
    flex: 0.7,
    marginHorizontal: 20,
    marginTop: 20,
  },

  centerWhileEmty: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textUnfinished: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#176B87',
  },

  itemTask: {
    marginTop: 10,
  },

  task: {
    flexDirection: 'row',
    marginHorizontal: 3,
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#86B6F6',
    margin: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textTask: {
    color: '#000',
    fontSize: 14,
    padding: 7,
    fontWeight: '500',
    marginLeft: 10,
  },

  check: {
    color: 'black',
  },

  finishTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    width: '50%',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#176B87',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  finished: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },

  textFinished: {
    fontSize: 16,
    fontWeight: '500',
    color: '#176B87',
    marginLeft: 10,
  },

  downFinish: {
    width: 16,
    height: 16,
    marginRight: 5,
  },

  checked: {
    width: 25,
    height: 25,
    margin: 5,
    marginTop: 5,
  },

  textTaskFinished: {
    color: '#848484',
    textDecorationLine: 'line-through',
  },

  // FOOTER
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 30,
  },

  addTodo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  addInput: {
    height: 40,
  },

  btnAdd: {
    backgroundColor: '#499EDC',
    borderRadius: 10,
  },

  textAdd: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
