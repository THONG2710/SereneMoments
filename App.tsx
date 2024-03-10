import React from 'react';
import HomeScreen from './src/Screen/HomeScreen/HomeScreen';
import MomentScreen from './src/Screen/MomentScreen/MomentScreen';
import Login from './src/Screen/Authentication/Login/Login';
import Register from './src/Screen/Authentication/Register/Register';
import ChangePass from './src/Screen/Authentication/ChangePass/ChangePass';
import LoginEmail from './src/Screen/Authentication/LoginWithAccount/LoginWithAccount';
import AuthenticationNavigation from './src/Navigation/AuthenticationNavigation';
import AuthorizedNavigation from './src/Navigation/AuthorizedNavigation';
import Profile from './src/Screen/AccountScreen/Profile/Profile';
import RootNavigation from './src/Navigation/RootNavigation';
import ItemMoment from './src/Screen/MomentScreen/Component/TakeMoment';
import TakeAMoment from './src/Screen/MomentScreen/Component/ItemMoment';
import TestSnapshot from './TestSnapshot';
import TestDragable from './TestDragable';
import { AppProvider, RealmProvider, UserProvider } from '@realm/react';
import Test from './RealmWrapper';
import RealmWrapper from './RealmWrapper';
import Chat from './src/Screen/ChatScreen/Chat/Chat';

function App(): JSX.Element {
  return (
    // <HomeScreen></HomeScreen>
    // <Login></Login>
    // <Register></Register>
    // <ChangePass></ChangePass>
    // <LoginEmail></LoginEmail>
    // <AuthenticationNavigation/>
    // <AuthorizedNavigation/>
    // <Profile/>
    // <RealmProvider>
      <RootNavigation/>
    // </RealmProvider>
    // <HomeScreen/>
    // <ItemMoment/>
    // <TakeAMoment/>
    // <TestSnapshot/>
    // <TestDragable/>
    // <Chat/>
  ); 
}

export default App;
