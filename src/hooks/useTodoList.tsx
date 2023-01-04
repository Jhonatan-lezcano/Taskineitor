import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  getTodoList,
  loading,
  Todo,
} from '../store/slices/todoList/todoListSlice';

const useTodoList = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authUser);
  const {isLoading, todoList} = useAppSelector(state => state.todoList);
  useEffect(() => {
    dispatch(loading(!isLoading));
    const suscriber = firestore()
      .collection('list')
      .where('userId', '==', user.userId)
      .onSnapshot(querySnapshot => {
        const result = querySnapshot.docs.map(list => ({
          ...list.data(),
          createAt: list.data().createAt.toMillis(),
          todos: list.data().todos.map((todo: Todo) => ({
            ...todo,
            createAt: todo.createAt.toMillis(),
          })),
          id: list.id,
        }));
        dispatch(getTodoList(result));
        dispatch(loading(!isLoading));
      });
    return () => suscriber();
  }, []);

  return {isLoading, todoList};
};

export default useTodoList;
