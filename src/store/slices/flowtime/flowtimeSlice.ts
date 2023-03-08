import {createSlice} from '@reduxjs/toolkit';
import {Todo, TodoList} from '../todoList/todoListSlice';
import {
  DEFAULT_BREAK_TIME_MINUTES,
  DEFAULT_FOCUS_TIME_MINUTES,
  TIMER_MODE_WORK,
} from '../../../utils/constants';

type TimerMode = 'work' | 'break';

interface PreferencesFlowtime {
  workingTime: number;
  breakTime: number;
}

interface InitialState {
  timerCount: number;
  isTimerRunning: boolean;
  timerMode: TimerMode;
  list: TodoList;
  associatedTask: Todo;
  modalStopFlowtime: boolean;
  preferences: PreferencesFlowtime;
}

const initialState: InitialState = {
  timerCount: DEFAULT_FOCUS_TIME_MINUTES,
  isTimerRunning: false,
  timerMode: TIMER_MODE_WORK,
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
  modalStopFlowtime: false,
  preferences: {
    workingTime: DEFAULT_FOCUS_TIME_MINUTES,
    breakTime: DEFAULT_BREAK_TIME_MINUTES,
  },
};

export const flowtimeSlice = createSlice({
  name: 'Flowtime',
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
    setModalStopFlowtime: state => ({
      ...state,
      modalStopFlowtime: !state.modalStopFlowtime,
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
  },
});

export const {
  startTimer,
  changeTimerValue,
  changeTimerModeValue,
  setIsTimerRunning,
  setAssociateTask,
  setModalStopFlowtime,
  setWorkingTimePreference,
  setBreakTimePreference,
} = flowtimeSlice.actions;

export default flowtimeSlice.reducer;
