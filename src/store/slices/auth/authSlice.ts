import {createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  userAuth: boolean;
  user: User;
}
const initialState: AuthState = {
  userAuth: false,
  user: {
    id: '',
    username: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuth: state => {
      state.userAuth = !state.userAuth;
    },
    getUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const {isAuth, getUser} = authSlice.actions;

export default authSlice.reducer;
