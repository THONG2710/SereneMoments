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
import React, {useState} from 'react';

const TodoList = () => {
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [checked, setChecked] = useState([]);

  const [dataToDoList, setDataToDoList] = useState([
    {
      _id: '1',
      task: 'Công việc hằng ngày',
    },
    {
      _id: '2',
      task: 'Công việc quan trọng',
    },
  ]);

  function pickTodo(selectedTasks: any) {
    if (checked.includes(selectedTasks)) {
      setChecked(checked.uns(task => task !== selectedTasks));
      setCompletedTasks(completedTasks.uns(task => task !== selectedTasks));
    } else {
      setChecked(checked => checked.concat(selectedTasks));
      setCompletedTasks(completedTasks => completedTasks.concat(selectedTasks));
    }
  }

  function pickUnfinished(task: any) {
    setCompletedTasks(completedTasks.filter(item => item !== task));
    setChecked(checked => checked.filter(item => item !== task));
    // Check if the task is already in the dataToDoList
    const isTaskExist = dataToDoList.some(item => item.task === task);
    if (!isTaskExist) {
      setDataToDoList(dataToDoList => [
        ...dataToDoList,
        {_id: String(dataToDoList.length + 1), task},
      ]);
    }
  }

  function handleAddTask() {
    if (newTask.trim() !== '') {
      const newId = String(dataToDoList.length + 1);
      const newTaskObj = {
        _id: newId,
        task: newTask.trim(),
      };
      setDataToDoList([newTaskObj, ...dataToDoList]); // 
      setNewTask('');
    }
  }

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

      <ScrollView style={styles.center}>
        <Text style={styles.textUnfinished}>Chưa hoàn thành</Text>
        {/* TASK UNFINISHED */}
        <View style={styles.itemTask}>
          {dataToDoList.map(
            item =>
              !checked.includes(item.task) && (
                <View key={item._id} style={styles.task}>
                  {/* Checkbox code */}
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => pickTodo(item.task)}></TouchableOpacity>
                  <Text style={styles.textTask}>{item.task}</Text>
                </View>
              ),
          )}
        </View>

        {/* TASK FINISHED */}
        <TouchableOpacity
          style={styles.finishTitle}
          onPress={() => setShowCompletedTasks(!showCompletedTasks)}>
          <Text style={styles.textFinished}>Đã hoàn thành</Text>
          <Image
            source={require('../../Resource/Image2/ic_check.png')}
            style={styles.downFinish}
          />
        </TouchableOpacity>
        {showCompletedTasks && (
          <View style={styles.itemTask}>
            {completedTasks.map(task => (
              <TouchableOpacity
                key={task}
                style={styles.finished}
                onPress={() => pickUnfinished(task)}>
                <Image
                  source={require('../../Resource/Image2/ic_down.png')}
                  style={styles.checked}
                />
                <Text style={styles.textTaskFinished}>{task}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

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
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddTask}>
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
    flex: 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    paddingBottom:10
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
    width:45,
    height:40,
    backgroundColor: '#499EDC',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  textAdd: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
