import React from 'react';
import ListDiariesScreen from './src/Screen/HomeScreen/ListDiariesScreen/ListDiariesScreen';
import Post from './src/Screen/HomeScreen/components/Post';
import Test from './TestSnapshot';
import TestDragable from './TestDragable';
import CreateDiaryScreen from './src/Screen/HomeScreen/CreateDiaryScreen/CreateDiaryScreen';
import ItemOption from './src/Screen/HomeScreen/components/ItemOption';
import ButtonText from './src/Components/Buttons/ButtonText';

function App(): React.JSX.Element {
  return (
    // <ListDiariesScreen />
    // <Post />
    // <Test/>
    // <TestDragable/>
    <CreateDiaryScreen/>
    // <ItemOption/>
    // <ButtonText/>
  );
}

export default App;
