import {NavigationContainer} from '@react-navigation/native';
import Login from '../Screen/Authentication/Login/Login';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePass from '../Screen/Authentication/ChangePass/ChangePass';
import LoginWithAccount from '../Screen/Authentication/LoginWithAccount/LoginWithAccount';
import Register from '../Screen/Authentication/Register/Register';
import {AuthenticationParamlist} from '../StoryBoard/AuthenticationStoryboard';

const stack = createStackNavigator<AuthenticationParamlist>();

const AuthenticationNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="LoginScreen" component={Login} />
        <stack.Screen name="ChangePasswordScreen" component={ChangePass} />
        <stack.Screen name="LoginWithAccount" component={LoginWithAccount} />
        <stack.Screen name="RegisterScreen" component={Register} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationNavigation;
