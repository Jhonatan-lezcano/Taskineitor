import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks/hooks';
import {setTheme} from '../store/slices/theme/themeSlice';
import {darkMode, lightMode} from '../theme/colors';

const useTheme = () => {
  const {dark, colors} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const changeTheme = () => {
    if (!dark) return dispatch(setTheme(darkMode));
    dispatch(setTheme(lightMode));
  };

  const containerScreen = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return {colors, changeTheme, containerScreen};
};

export default useTheme;
