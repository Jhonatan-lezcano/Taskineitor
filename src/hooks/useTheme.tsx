import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme, AppState, Appearance} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {setPreferences, setTheme} from '../store/slices/theme/themeSlice';
import {darkMode, lightMode} from '../theme/colors';

let flag = true;

const LIGHT = 'light';
const DARK = 'dark';
const SYSTEM = 'system';

type ThemeOptions = 'light' | 'dark' | 'system';

const useTheme = () => {
  const {
    preferences,
    theme: {colors, dark},
  } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const defineTheme = async () => {
    const themeUserPreferences = await AsyncStorage.getItem('@Theme');
    dispatch(setPreferences(themeUserPreferences));
    if (themeUserPreferences === LIGHT) {
      dispatch(setTheme(lightMode));
    } else if (themeUserPreferences === DARK) {
      dispatch(setTheme(darkMode));
    } else if (!themeUserPreferences || themeUserPreferences === SYSTEM) {
      if (!themeUserPreferences) {
        await AsyncStorage.setItem('@Theme', SYSTEM);
      }
      AppState.addEventListener('change', status => {
        if (status === 'active') {
          Appearance.getColorScheme() === 'light'
            ? dispatch(setTheme(lightMode))
            : dispatch(setTheme(darkMode));
        }
      });
    }
  };

  useEffect(() => {
    if (flag) {
      defineTheme();
      console.log('ay mi madre');
      flag = false;
    }
  }, []);

  const changeTheme = async (theme: ThemeOptions) => {
    flag = true;
    await AsyncStorage.setItem('@Theme', theme);
    dispatch(setPreferences(theme));
    if (theme === LIGHT) {
      dispatch(setTheme(lightMode));
    } else if (theme === DARK) {
      dispatch(setTheme(darkMode));
    } else if (theme === SYSTEM) {
      colorScheme === 'light'
        ? dispatch(setTheme(lightMode))
        : dispatch(setTheme(darkMode));
    }
  };

  const containerScreen = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return {colors, changeTheme, containerScreen, dark, preferences};
};

export default useTheme;
