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
import {ItemTodolist, ResponseTodo} from '../../Models/Model';
import {useAppDispatch, useAppSelector} from '../../Redux/Hook';
import {ID_ADRESS, getData, postData} from '../../Service/RequestMethod';
import {SET_ISCREATETODAY} from '../../Redux/Action/WorkAction';

const TodoList = () => {
  // function pickTodo(selectedTasks: any) {
  //   if (checked.includes(selectedTasks)) {
  //     setChecked(checked.filter(task => task !== selectedTasks));
  //     setCompletedTasks(completedTasks.filter(task => task !== selectedTasks));
  //   } else {
  //     setChecked(checked => checked.concat(selectedTasks));
  //     setCompletedTasks(completedTasks => completedTasks.concat(selectedTasks));
  //   }
  // }
  // function pickUnfinished(task: any) {
  //   setCompletedTasks(completedTasks.filter(item => item !== task));
  //   setChecked(checked => checked.filter(item => item !== task));
  //   // Check if the task is already in the dataToDoList
  //   const isTaskExist = dataToDoList.some(item => item.task === task);
  //   if (!isTaskExist) {
  //     setDataToDoList(dataToDoList => [
  //       ...dataToDoList,
  //       {_id: String(dataToDoList.length + 1), task},
  //     ]);
  //   }
  // }
  // function handleAddTask() {
  //   if (newTask.trim() !== '') {
  //     const newId = String(dataToDoList.length + 1);
  //     const newTaskObj = {
  //       _id: newId,
  //       task: newTask.trim(),
  //     };
  //     setDataToDoList([...dataToDoList, newTaskObj]);
  //     setNewTask('');
  //   }
  // }

  //
  const [newTask, setNewTask] = useState('');
  const [unfinishedWorks, setUnfinishedWorks] = useState<ItemTodolist[]>([]);
  const [finishedWork, setfinishedWork] = useState<ItemTodolist[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [listTodo, setListTodo] = useState<ResponseTodo>();
  const user = useAppSelector(state => state.Authentication.myAccount);
  const [idToday, setIdToday] = useState<string>();

  // lấy todolist
  const getTodoList = async () => {
    const date = new Date().getTime();
    const url =
      'http://' +
      ID_ADRESS +
      ':3000/api/todolist/getTodolist?id=' +
      user._id +
      '&createdat=' +
      date;
    const res = await getData(url);
    if (res.result) {
      setListTodo(res.todolist);
      console.log(res.todolist);
      setUnfinishedWorks(res.unfinishedWork);
      setfinishedWork(res.finishedWork);
    }
  };

  // tạo một todolist
  const onCreateTodolist = async () => {
    const date = new Date().getTime();
    const data = {userid: user._id, createdat: date};
    const url = 'http://' + ID_ADRESS + ':3000/api/todolist/createToDoList';
    const res = await postData(url, data);
    if (res.result) {
      setIdToday(res.todolist._id);
      setIsRefresh(!isRefresh);
      onCreateWork(res?.todolist?._id);
      console.log('success');
    }
  };

  //  kiểm tra list hôm nay
  const onCheckTodoList = async () => {
    const date = new Date().getTime();
    const url =
      'http://' +
      ID_ADRESS +
      ':3000/api/todolist/getCheckTodolist?id=' +
      user._id +
      '&createdat=' +
      date;
    const res = await getData(url);
    console.log(url);

    if (res.result) {
      console.log('Đã có todolist cho ngày hôm nay');
      onCreateWork(res?.todolist?._id);
    } else {
      console.log('Chưa có todolist cho ngày hôm nay');
      onCreateTodolist();
    }
  };

  // tạo một item work
  const onCreateWork = async (idTodo: string) => {
    const data = {
      status: false,
      content: newTask,
      description: '',
      todoid: idTodo,
    };
    console.log(data);
    const res = await postData(
      'http://' + ID_ADRESS + ':3000/api/itemTodo/createItem',
      data,
    );
    if (res) {
      setNewTask('');
      setIsRefresh(!isRefresh);
    }
  };

  useEffect(() => {
    getTodoList();
  }, [isRefresh]);

  return (
    // CONTAINER
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.backgroundHeader}>
          <Text style={styles.textHeader}>Cố gắng hoàn thành bạn nhé !</Text>
          <Image
            source={require('../../Resource/Image2/imgtodo.png')}
            style={styles.imgHeader}></Image>
        </View>
      </View>
      {/* CENTER */}

      {listTodo ? (
        <ScrollView style={styles.center}>
          {unfinishedWorks && (
            <Text style={styles.textUnfinished}>Chưa hoàn thành</Text>
          )}
          {/* TASK UNFINISHED */}
          {unfinishedWorks && (
            <View style={styles.itemTask}>
              {unfinishedWorks.map((item: ItemTodolist) => (
                <View key={item._id.toString()} style={styles.task}>
                  {/* Checkbox code */}
                  <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                  <Text style={styles.textTask}>{item.content}</Text>
                </View>
              ))}
            </View>
          )}

          {/* TASK FINISHED */}
          {finishedWork && (
            <TouchableOpacity style={styles.finishTitle}>
              <Text style={styles.textFinished}>Đã hoàn thành</Text>
              <Image
                source={require('../../Resource/Image2/ic_check.png')}
                style={styles.downFinish}
              />
            </TouchableOpacity>
          )}

          {finishedWork && (
            <View style={styles.itemTask}>
              {finishedWork.map((item: ItemTodolist) => (
                <TouchableOpacity
                  key={item._id.toString()}
                  style={styles.finished}>
                  <Image
                    source={require('../../Resource/Image2/ic_down.png')}
                    style={styles.checked}
                  />
                  <Text style={styles.textTaskFinished}>{item.content}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.centerWhileEmty}>
          <Text>Chưa có gì cho ngày hôm nay</Text>
        </View>
      )}

      {/* FOOTER */}
      {/* ADD TODOLIST */}
      <View style={styles.footer}>
        <View style={styles.addTodo}>
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
          <TextInput
            style={styles.addInput}
            placeholder="Kế hoạch gì nhờ..."
            placeholderTextColor={'#848484'}
            onChangeText={text => setNewTask(text)}
            value={newTask}></TextInput>
        </View>
        <TouchableOpacity style={styles.btnAdd} onPress={onCheckTodoList}>
          <Text style={styles.textAdd}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#EBF0F7',
  },
  // HEADER
  header: {
    // flex: 0.17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    backgroundColor: 'red',
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
    padding: 5,
    fontWeight: '500',
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
