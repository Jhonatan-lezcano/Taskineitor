import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Types = 'Success' | 'Update' | 'Warning' | 'Danger';
interface InitialState {
  type: Types;
  message: string;
}

export const initialStateToast: InitialState = {
  type: 'Success',
  message: '',
};

export const toastNotificationSlice = createSlice({
  name: 'toastNotification',
  initialState: initialStateToast,
  reducers: {
    infoToast: (state, action: PayloadAction<InitialState>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const {infoToast} = toastNotificationSlice.actions;

export default toastNotificationSlice.reducer;
