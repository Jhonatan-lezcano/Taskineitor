import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import SignIn from './src/screens/SignIn';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
