import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  userAuth: boolean;
}
const initialState: AuthState = {
  userAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuth: state => {
      state.userAuth = !state.userAuth;
    },
  },
});

export const {isAuth} = authSlice.actions;

export default authSlice.reducer;
