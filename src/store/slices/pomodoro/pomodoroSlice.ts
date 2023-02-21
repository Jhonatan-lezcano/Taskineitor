import {createSlice} from '@reduxjs/toolkit';
import {Todo} from '../todoList/todoListSlice';

type TimerMode = 'work' | 'break';

export interface AssociatedTask {
  index: number;
  task: Todo | null;
}

interface InitialState {
  timerCount: number;
  numberOfTimersCompleted: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  isTimerRunning: boolean;
  timerMode: TimerMode;
  associatedTask: AssociatedTask | null;
  modalStopPomodoro: boolean;
}

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;

const initialState: InitialState = {
  timerCount: FOCUS_TIME_MINUTES,
  numberOfTimersCompleted: 0,
  timerInterval: null,
  isTimerRunning: false,
  timerMode: 'work',
  associatedTask: null,
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
        associatedTask: action.payload,
      };
    },
    setModalStopPomodoro: state => ({
      ...state,
      modalStopPomodoro: !state.modalStopPomodoro,
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
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
