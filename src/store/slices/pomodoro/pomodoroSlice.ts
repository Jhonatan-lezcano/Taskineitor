import {createSlice} from '@reduxjs/toolkit';

type TimerMode = 'work' | 'break';

interface InitialState {
  timerCount: number;
  numberOfTimersCompleted: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  isTimerRunning: boolean;
  timerMode: TimerMode;
}

const FOCUS_TIME_MINUTES = 1 * 60 * 1000;

const initialState: InitialState = {
  timerCount: FOCUS_TIME_MINUTES,
  numberOfTimersCompleted: 0,
  timerInterval: null,
  isTimerRunning: false,
  timerMode: 'work',
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
  },
});

export const {
  startTimer,
  handlerTimerInterval,
  changeTimerValue,
  changeTimerModeValue,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
