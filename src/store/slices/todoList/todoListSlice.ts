import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';

interface date {
  nanoseconds: number;
  seconds: number;
}

export interface Todo {
  completed: boolean;
  createAt: number;
  description: string;
  label: number;
  name: string;
}

export interface TodoList {
  id: string;
  color: string;
  createAt: number;
  name: string;
  todos: Todo[];
  userId: string;
}

interface InitialState {
  isLoading: boolean;
  todoList: TodoList[];
  currentTodos: TodoList;
}

const initialState: InitialState = {
  isLoading: false,
  todoList: [],
  currentTodos: {
    id: '',
    color: '',
    createAt: 0,
    name: '',
    todos: [],
    userId: '',
  },
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    getTodoList: (state, action) => {
      return {
        ...state,
        todoList: action.payload,
      };
    },
    loading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    addCurrentTodos: (state, action) => {
      return {
        ...state,
        currentTodos: action.payload,
      };
    },
  },
});

export const {getTodoList, loading, addCurrentTodos} = todoListSlice.actions;

export default todoListSlice.reducer;
