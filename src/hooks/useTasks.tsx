import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch} from '../store/hooks/hooks';
import AlertCircleIcon from '../assets/svgs/AlertCircleIcon';
import AlertTriangleIcon from '../assets/svgs/AlertTriangleIcon';
import CheckIcon from '../assets/svgs/CheckIcon';
import RefreshCircleIcon from '../assets/svgs/RefreshCircleIcon';
import useTheme from './useTheme';
import {
  addCurrentTodos,
  TodoList,
} from '../store/slices/todoList/todoListSlice';
import {showToastMessage} from '../utils/helpers';
import {COMPLETE, IN_PROCESS, PENDING} from '../utils/constants';

interface TodoForm {
  description: string;
  name: string;
}

const useTasks = () => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();

  const createTodo = (data: TodoForm, list: TodoList) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: [...list.todos, data],
      })
      .then(() => {
        dispatch(
          addCurrentTodos({
            ...list,
            todos: [...list.todos, data],
          }),
        );
        showToastMessage(
          colors.alertColors.success,
          CheckIcon,
          'Task created successfully',
        );
      });
  };

  const todoComplete = (list: TodoList, idItem: string) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.map(item =>
          item.id === idItem
            ? {
                ...item,
                completed: !item.completed,
                label: item.completed ? PENDING : COMPLETE,
              }
            : {...item},
        ),
      })
      .then(() => {
        const todo = list.todos.filter(item => item.id === idItem);
        const color = todo[0].completed
          ? colors.alertColors.warning
          : colors.alertColors.success;
        const icon = todo[0].completed ? AlertTriangleIcon : CheckIcon;
        const message = todo[0].completed ? 'Pending task' : 'Task completed';

        showToastMessage(color, icon, message);
      });
    dispatch(
      addCurrentTodos({
        ...list,
        todos: list.todos.map(item =>
          item.id === idItem
            ? {
                ...item,
                completed: !item.completed,
                label: item.completed ? PENDING : COMPLETE,
              }
            : {...item},
        ),
      }),
    );
  };

  const todoInProcess = (list: TodoList, idItem: string) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.map(item =>
          item.id === idItem
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
          addCurrentTodos({
            ...list,
            todos: list.todos.map(item =>
              item.id === idItem
                ? {
                    ...item,
                    completed: item.completed
                      ? !item.completed
                      : item.completed,
                    label: IN_PROCESS,
                  }
                : {...item},
            ),
          }),
        );
        showToastMessage(
          colors.alertColors.update,
          RefreshCircleIcon,
          'Now the task is in process',
        );
      });
  };

  const deleteTodo = (list: TodoList, idItem: string) => {
    firestore()
      .collection('list')
      .doc(list.id)
      .update({
        todos: list.todos.filter(item => item.id !== idItem),
      })
      .then(() => {
        dispatch(
          addCurrentTodos({
            ...list,
            todos: list.todos.filter(item => item.id !== idItem),
          }),
        );
        showToastMessage(
          colors.alertColors.danger,
          AlertCircleIcon,
          'Deleted task',
        );
      });
  };
  return {todoComplete, todoInProcess, deleteTodo, createTodo};
};

export default useTasks;
