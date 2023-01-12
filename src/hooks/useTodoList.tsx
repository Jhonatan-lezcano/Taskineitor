import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {infoToast} from '../store/slices/toastNotification/toastNotificationSlice';
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

const SUCCESS_TYPE = 'Success';
const WARNING_TYPE = 'Warning';
const DANGER_TYPE = 'Danger';
const UPDATE_TYPE = 'Update';

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
      })
      .then(() => {
        dispatch(
          infoToast({
            type: SUCCESS_TYPE,
            message: 'Task created successfully!',
          }),
        );
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
        dispatch(
          infoToast({
            type: SUCCESS_TYPE,
            message: 'Task completed!',
          }),
        );
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
        dispatch(
          infoToast({
            type: UPDATE_TYPE,
            message: 'Now the task is in process',
          }),
        );
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
        dispatch(
          infoToast({
            type: DANGER_TYPE,
            message: 'Task deleted successfully',
          }),
        );
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
