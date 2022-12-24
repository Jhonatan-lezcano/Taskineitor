import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useTheme from '../../hooks/useTheme';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {getUser} from '../../store/slices/auth/authSlice';

const Home = () => {
  const {containerScreen} = useTheme();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authUser);

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
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log(user);

  return (
    <View style={containerScreen.container}>
      <Text>{user.username}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
