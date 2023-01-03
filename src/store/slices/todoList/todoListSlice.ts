import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';

interface Todo {
  completed: boolean;
  createAt: FirebaseFirestoreTypes.Timestamp;
  description: string;
  label: number;
  name: string;
}

export interface List {
  color: string;
  createAt: FirebaseFirestoreTypes.Timestamp | null;
  name: string;
  todos: Todo[];
  userId: string;
}

const initialState: List = {
  color: '',
  createAt: null,
  name: '',
  todos: [],
  userId: '',
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
});

export const {} = todoListSlice.actions;

export default todoListSlice.reducer;
