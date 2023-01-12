import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabAppNavigation from './src/navigation/TabAppNavigation';
import StackAuthNavigation from './src/navigation/StackAuthNavigation';
import {useAppDispatch, useAppSelector} from './src/store/hooks/hooks';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getUser} from './src/store/slices/auth/authSlice';
import {Text, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ErrorToast, SuccessToast} from 'react-native-toast-message';
import useTheme from './src/hooks/useTheme';
import ToastNotification from './src/components/molecules/ToastNotification';

const Main = () => {
  const dispatch = useAppDispatch();
  const {userAuth} = useAppSelector(state => state.authUser);
  const {colors} = useTheme();

  const toastConfig = {
    customToast: ({props}: any) => (
      <ToastNotification
        message={props.message}
        borderLeftColor={props.borderLeftColor}
        icon={props.icon}
      />
    ),
  };

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
      <Toast config={toastConfig} visibilityTime={2500} />
    </NavigationContainer>
  );
};

export default Main;
