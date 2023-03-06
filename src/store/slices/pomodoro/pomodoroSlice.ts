import {createSlice} from '@reduxjs/toolkit';
import {
  DEFAULT_BREAK_TIME_MINUTES,
  DEFAULT_FOCUS_TIME_MINUTES,
} from '../../../utils/constants';
import {Todo, TodoList} from '../todoList/todoListSlice';
import {LONG_BREAK_TIME_MINUTES} from '../../../utils/constants';

type TimerMode = 'work' | 'break';

interface PreferencesTimers {
  workingTime: number;
  breakTime: number;
  longBreakTime: number;
}

interface InitialState {
  timerCount: number;
  numberOfTimersCompleted: number;
  isTimerRunning: boolean;
  timerMode: TimerMode;
  list: TodoList;
  associatedTask: Todo;
  modalStopPomodoro: boolean;
  preferences: PreferencesTimers;
}

const initialState: InitialState = {
  timerCount: DEFAULT_FOCUS_TIME_MINUTES,
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
  preferences: {
    workingTime: DEFAULT_FOCUS_TIME_MINUTES,
    breakTime: DEFAULT_BREAK_TIME_MINUTES,
    longBreakTime: LONG_BREAK_TIME_MINUTES,
  },
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
    setWorkingTimePreference: (state, action) => ({
      ...state,
      preferences: {
        ...state.preferences,
        workingTime: action.payload,
      },
    }),
    setBreakTimePreference: (state, action) => ({
      ...state,
      preferences: {
        ...state.preferences,
        breakTime: action.payload,
      },
    }),
    setLongBreakTimePreference: (state, action) => ({
      ...state,
      preferences: {
        ...state.preferences,
        longBreakTime: action.payload,
      },
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
  setWorkingTimePreference,
  setBreakTimePreference,
  setLongBreakTimePreference,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
