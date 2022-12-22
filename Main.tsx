import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabAppNavigation from './src/navigation/TabAppNavigation';
import StackAuthNavigation from './src/navigation/StackAuthNavigation';
import {useAppSelector} from './src/store/hooks/hooks';

const Main = () => {
  const {userAuth} = useAppSelector(state => state.authUser);

  return (
    <NavigationContainer>
      {userAuth ? <TabAppNavigation /> : <StackAuthNavigation />}
    </NavigationContainer>
  );
};

export default Main;
