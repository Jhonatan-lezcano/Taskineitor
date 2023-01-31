import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  time: number;
  countTimers: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  isTimerRunning: boolean;
}

const initialState: InitialState = {
  time: 0,
  countTimers: 0,
  timerInterval: null,
  isTimerRunning: false,
};

export const pomodoroSlice = createSlice({
  name: 'Pomodoro',
  initialState,
  reducers: {},
});

export const {} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
