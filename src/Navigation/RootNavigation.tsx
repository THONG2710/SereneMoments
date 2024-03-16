import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigation from './AuthenticationNavigation';
import AuthorizedNavigation from './AuthorizedNavigation';
import {RootParamlist} from '../StoryBoard/RootStoryboard';
import {Provider} from 'react-redux';
import {store} from '../Redux/Store';
import {useAppDispatch, useAppSelector} from '../Redux/Hook';
import {getDataFromStorage} from '../Service/Service';
import {SAVE_USER} from '../Redux/Action/AuthenticationActions';
import LoadingScreen from '../Components/Screen/LoadingScreen';

const stack = createStackNavigator<RootParamlist>();

const RootNavigation = () => {
  const [isLogged, setIsLogged] = useState<any>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const getStorage = async () => {
    setIsLoading(true);
    const jsonValue = await getDataFromStorage('IS_LOGGED');
    const value = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (value) {
      setIsLogged(value);
      console.log(value);
      const jsonAccount = await getDataFromStorage('ACCOUNT');
      const account = jsonAccount != null ? JSON.parse(jsonAccount) : null;
      if (account != null) {
        dispatch(SAVE_USER(account));
      }
      setIsLoading(false);
      return value;
    }
    setIsLoading(false);
    return false;
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <stack.Navigator screenOptions={{headerShown: false}}>
          {isLogged ? (
            <stack.Screen
              name="AuthorizedNavigation"
              component={AuthorizedNavigation}
            />
          ) : (
            <stack.Screen
              name="AuthenticationNavigation"
              component={AuthenticationNavigation}
            />
          )}
        </stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
