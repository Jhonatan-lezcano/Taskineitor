import {createSlice} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
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
  taskPreview: Todo | null;
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
  taskPreview: null,
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    getTodoList: (state, action) => ({
      ...state,
      todoList: action.payload,
    }),
    loading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    addCurrentTodos: (state, action) => ({
      ...state,
      currentTodos: action.payload,
    }),
    setTaskPreview: (state, action) => ({
      ...state,
      taskPreview: action.payload,
    }),
  },
});

export const {getTodoList, loading, addCurrentTodos, setTaskPreview} =
  todoListSlice.actions;

export default todoListSlice.reducer;
