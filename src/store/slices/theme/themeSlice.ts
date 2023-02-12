import {createSlice} from '@reduxjs/toolkit';
import {lightMode} from '../../../theme/colors';

export interface AlertColors {
  update: string;
  success: string;
  danger: string;
  warning: string;
}

export interface Colors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  OnSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  alertColors: AlertColors;
}

export interface ThemeState {
  dark: boolean;
  colors: Colors;
}

interface InitialState {
  preferences: string;
  theme: ThemeState;
}

const initialState: InitialState = {
  preferences: '',
  theme: lightMode,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
    setPreferences: (state, action) => {
      return {
        ...state,
        preferences: action.payload,
      };
    },
  },
});

export const {setTheme, setPreferences} = themeSlice.actions;

export default themeSlice.reducer;
