import Login from '../Screen/Authentication/Login/Login';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePass from '../Screen/Authentication/ChangePass/ChangePass';
import LoginWithAccount from '../Screen/Authentication/LoginWithAccount/LoginWithAccount';
import Register from '../Screen/Authentication/Register/Register';
import {AuthenticationParamlist} from '../StoryBoard/AuthenticationStoryboard';
import React from 'react';
import AuthorizedNavigation from './AuthorizedNavigation';

const stack = createStackNavigator<AuthenticationParamlist>();

const AuthenticationNavigation: React.FC = () => {
  return (
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="LoginScreen" component={Login} />
        <stack.Screen name="ChangePasswordScreen" component={ChangePass} />
        <stack.Screen name="LoginWithAccount" component={LoginWithAccount} />
        <stack.Screen name="RegisterScreen" component={Register} />
        <stack.Screen name="AuthorizedNavigation" component={AuthorizedNavigation} />
      </stack.Navigator>
  );
};

export default AuthenticationNavigation;
