import React from 'react';
import HomeScreen from './src/Screen/HomeScreen/HomeScreen';
import MomentScreen from './src/Screen/MomentScreen/MomentScreen';
import Login from './src/Screen/Authentication/Login/Login';
import Register from './src/Screen/Authentication/Register/Register';
import ChangePass from './src/Screen/Authentication/ChangePass/ChangePass';
import LoginEmail from './src/Screen/Authentication/LoginEmail/LoginEmail';

function App(): JSX.Element {
  return (
    // <HomeScreen></HomeScreen>
    // <Login></Login>
    // <Register></Register>
    // <ChangePass></ChangePass>
    <LoginEmail></LoginEmail>
  ); 
}

export default App;
