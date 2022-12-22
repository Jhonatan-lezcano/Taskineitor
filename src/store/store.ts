import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import themeSlice from './slices/theme/themeSlice';

const rootReducer = combineReducers({
  authUser: authSlice,
  theme: themeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
