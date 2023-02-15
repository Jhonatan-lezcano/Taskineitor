import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AlertCircleIcon from '../assets/svgs/AlertCircleIcon';
import AlertTriangleIcon from '../assets/svgs/AlertTriangleIcon';
import CheckIcon from '../assets/svgs/CheckIcon';
import RefreshCircleIcon from '../assets/svgs/RefreshCircleIcon';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  addCurrentTodos,
  getTodoList,
  loading,
  TodoList,
} from '../store/slices/todoList/todoListSlice';
import useTheme from './useTheme';

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
