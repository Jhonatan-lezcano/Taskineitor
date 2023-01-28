import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme, AppState, Appearance} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {setTheme} from '../store/slices/theme/themeSlice';
import {darkMode, lightMode} from '../theme/colors';

let flag = true;
const LIGHT = 'light';
const DARK = 'dark';

const useTheme = () => {
  const {dark, colors} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const colorSchema = useColorScheme();

  const defineTheme = async () => {
    const themeUserPreferences = await AsyncStorage.getItem('@Theme');
    console.log(themeUserPreferences);
    if (themeUserPreferences === LIGHT) {
      dispatch(setTheme(lightMode));
    } else if (themeUserPreferences === DARK) {
      dispatch(setTheme(darkMode));
    } else if (!themeUserPreferences) {
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

  const changeTheme = async () => {
    flag = true;
    if (!dark) {
      dispatch(setTheme(darkMode));
      await AsyncStorage.setItem('@Theme', 'dark');
    } else {
      dispatch(setTheme(lightMode));
      await AsyncStorage.setItem('@Theme', 'light');
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

  return {colors, changeTheme, containerScreen, dark};
};

export default useTheme;
