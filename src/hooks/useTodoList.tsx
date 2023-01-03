import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {useAppSelector} from '../store/hooks/hooks';

const useTodoList = () => {
  const {user} = useAppSelector(state => state.authUser);
  useEffect(() => {
    const suscriber = firestore()
      .collection('list')
      .where('userId', '==', user.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(list => console.log(list.data()));
      });
    return () => suscriber();
  }, []);

  return {};
};

export default useTodoList;
