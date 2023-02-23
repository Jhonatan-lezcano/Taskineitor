import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {getTodoList, loading} from '../store/slices/todoList/todoListSlice';

const useTodoList = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authUser);
  const {isLoading, todoList} = useAppSelector(state => state.todoList);

  useEffect(() => {
    dispatch(loading(true));
    const suscriber = firestore()
      .collection('list')
      .where('userId', '==', user.userId)
      .onSnapshot(querySnapshot => {
        dispatch(
          getTodoList(
            querySnapshot.docs.map(list => ({
              ...list.data(),
              id: list.id,
            })),
          ),
        );
        dispatch(loading(false));
      });
    return () => suscriber();
  }, [user]);

  return {
    isLoading,
    todoList,
  };
};

export default useTodoList;
