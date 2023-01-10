import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {
  addCurrentTodos,
  getTodoList,
  loading,
  TodoList,
} from '../store/slices/todoList/todoListSlice';

interface TodoForm {
  description: string;
  name: string;
}

const DEFAULT_LABEL = 0;
const DEFAULT_COMPLETED = false;
const DEFAULT_CREATEAT = Date.now();

const PENDING = 0;
const IN_PROCESS = 1;
const COMPLETE = 2;

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

  const createTodo = (data: TodoForm, list: TodoList) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: [
          ...list.todos,
          {
            ...data,
            label: DEFAULT_LABEL,
            completed: DEFAULT_COMPLETED,
            createAt: DEFAULT_CREATEAT,
          },
        ],
      });
    dispatch(
      addCurrentTodos({
        ...list,
        todos: [
          ...list.todos,
          {
            ...data,
            label: DEFAULT_LABEL,
            completed: DEFAULT_COMPLETED,
            createAt: DEFAULT_CREATEAT,
          },
        ],
      }),
    );
  };

  const todoComplete = (list: TodoList, index: number) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.map((item, i) =>
          i === index
            ? {
                ...item,
                completed: !item.completed,
                label: item.completed === true ? PENDING : COMPLETE,
              }
            : {...item},
        ),
      });

    dispatch(
      addCurrentTodos({
        ...list,
        todos: list.todos.map((item, i) =>
          i === index
            ? {
                ...item,
                completed: !item.completed,
                label: item.completed === true ? PENDING : COMPLETE,
              }
            : {...item},
        ),
      }),
    );
  };

  const todoInProcess = (list: TodoList, index: number) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.map((item, i) =>
          i === index
            ? {
                ...item,
                completed: item.completed ? !item.completed : item.completed,
                label: IN_PROCESS,
              }
            : {...item},
        ),
      });

    dispatch(
      addCurrentTodos({
        ...list,
        todos: list.todos.map((item, i) =>
          i === index
            ? {
                ...item,
                completed: item.completed ? !item.completed : item.completed,
                label: IN_PROCESS,
              }
            : {...item},
        ),
      }),
    );
  };

  const deleteTodo = (list: TodoList, index: number) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.filter((item, i) => i !== index),
      });

    dispatch(
      addCurrentTodos({
        ...list,
        todos: list.todos.filter((item, i) => i !== index),
      }),
    );
    console.log(index, list);
  };

  return {
    isLoading,
    todoList,
    createTodo,
    todoComplete,
    todoInProcess,
    deleteTodo,
  };
};

export default useTodoList;
