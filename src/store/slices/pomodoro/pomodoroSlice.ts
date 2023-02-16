import {createSlice} from '@reduxjs/toolkit';
import {Todo} from '../todoList/todoListSlice';

type TimerMode = 'work' | 'break';

interface InitialState {
  timerCount: number;
  numberOfTimersCompleted: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  isTimerRunning: boolean;
  timerMode: TimerMode;
  associatedTask: Todo | null;
}

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;

const initialState: InitialState = {
  timerCount: FOCUS_TIME_MINUTES,
  numberOfTimersCompleted: 0,
  timerInterval: null,
  isTimerRunning: false,
  timerMode: 'work',
  associatedTask: null,
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
    setIsTimerRunning: state => {
      return {
        ...state,
        isTimerRunning: !state.isTimerRunning,
      };
    },
    setAssociateTask: (state, action) => {
      return {
        ...state,
        associatedTask: action.payload,
      };
    },
  },
});

export const {
  startTimer,
  handlerTimerInterval,
  changeTimerValue,
  changeTimerModeValue,
  setIsTimerRunning,
  setAssociateTask,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
