import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TimerScreens = 'pomodoro' | 'flowTime';

interface InitialState {
  timerScreens: TimerScreens;
}

const initialState: InitialState = {
  timerScreens: 'pomodoro',
};

const timersSlice = createSlice({
  name: 'timerScreens',
  initialState,
  reducers: {
    setTimerScreens: (state, action: PayloadAction<TimerScreens>) => {
      return {
        ...state,
        timerScreens: action.payload,
      };
    },
  },
});

export const {} = timersSlice.actions;

export default timersSlice.reducer;
