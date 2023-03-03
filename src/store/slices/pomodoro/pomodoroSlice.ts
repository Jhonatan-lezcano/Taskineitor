import {createSlice} from '@reduxjs/toolkit';
import {Todo, TodoList} from '../todoList/todoListSlice';

type TimerMode = 'work' | 'break';

interface InitialState {
  timerCount: number;
  numberOfTimersCompleted: number;
  isTimerRunning: boolean;
  timerMode: TimerMode;
  list: TodoList;
  associatedTask: Todo;
  modalStopPomodoro: boolean;
}

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;

const initialState: InitialState = {
  timerCount: FOCUS_TIME_MINUTES,
  numberOfTimersCompleted: 0,
  isTimerRunning: false,
  timerMode: 'work',
  list: {
    id: '',
    color: '',
    createAt: 0,
    name: '',
    todos: [],
    userId: 'string',
  },
  associatedTask: {
    id: '',
    completed: false,
    createAt: 0,
    description: '',
    label: 0,
    name: '',
  },
  modalStopPomodoro: false,
};

export const pomodoroSlice = createSlice({
  name: 'Pomodoro',
  initialState,
  reducers: {
    startTimer: state => {
      return {
        ...state,
        timerCount: state.timerCount - 1000,
      };
    },
    changeTimerValue: (state, action) => {
      return {
        ...state,
        timerCount: action.payload,
      };
    },
    handlerTimerInterval: (state, action) => {
      return {
        ...state,
        timerInterval: action.payload,
      };
    },
    changeTimerModeValue: (state, action) => {
      return {
        ...state,
        timerMode: action.payload,
      };
    },
    setIsTimerRunning: state => ({
      ...state,
      isTimerRunning: !state.isTimerRunning,
    }),
    setAssociateTask: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setModalStopPomodoro: state => ({
      ...state,
      modalStopPomodoro: !state.modalStopPomodoro,
    }),
    setNumberOfTimersCompleted: (state, action) => ({
      ...state,
      numberOfTimersCompleted: action.payload,
    }),
  },
});

export const {
  startTimer,
  handlerTimerInterval,
  changeTimerValue,
  changeTimerModeValue,
  setIsTimerRunning,
  setAssociateTask,
  setModalStopPomodoro,
  setNumberOfTimersCompleted,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
