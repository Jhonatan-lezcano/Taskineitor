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
  const {colors} = useTheme();

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
      })
      .then(() => {
        Toast.show({
          type: 'customToast',
          props: {
            message: 'Task created successfully',
            borderLeftColor: colors.alertColors.success,
            icon: CheckIcon,
          },
        });
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
      })
      .then(() => {
        const todo = list.todos.filter((item, i) => i === index);
        Toast.show({
          type: 'customToast',
          props: {
            message: todo[0].completed ? 'Pending task' : 'Task completed',
            borderLeftColor: todo[0].completed
              ? colors.alertColors.warning
              : colors.alertColors.success,
            icon: todo[0].completed ? AlertTriangleIcon : CheckIcon,
          },
        });
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
      })
      .then(() => {
        Toast.show({
          type: 'customToast',
          props: {
            message: 'Now the task is in process',
            borderLeftColor: colors.alertColors.update,
            icon: RefreshCircleIcon,
          },
        });
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
      })
      .then(() => {
        Toast.show({
          type: 'customToast',
          props: {
            message: 'deleted task',
            borderLeftColor: colors.alertColors.danger,
            icon: AlertCircleIcon,
          },
        });
      });

    dispatch(
      addCurrentTodos({
        ...list,
        todos: list.todos.filter((item, i) => i !== index),
      }),
    );
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
