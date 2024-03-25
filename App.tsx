import React from 'react';
import RootNavigation from './src/Navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store';
import {MenuProvider} from 'react-native-popup-menu';
import 'react-native-get-random-values';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MenuProvider>
        <RootNavigation />
      </MenuProvider>
    </Provider>
  );
}

export default App;
