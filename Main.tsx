import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabAppNavigation from './src/navigation/TabAppNavigation';
import StackAuthNavigation from './src/navigation/StackAuthNavigation';
import {useAppDispatch, useAppSelector} from './src/store/hooks/hooks';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getUser} from './src/store/slices/auth/authSlice';
import {Text, View} from 'react-native';
import ToastNotification from './src/components/molecules/ToastNotification';

const Main = () => {
  const dispatch = useAppDispatch();
  const {userAuth} = useAppSelector(state => state.authUser);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        await firestore()
          .collection('usernames')
          .where('userId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            const dataUsername = querySnapshot.docs.map(list => ({
              ...list.data(),
            }));
            dispatch(getUser(dataUsername[0]));
          });
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {userAuth ? <TabAppNavigation /> : <StackAuthNavigation />}
      <ToastNotification />
    </NavigationContainer>
  );
};

export default Main;
