import {StyleSheet, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import Pomodoro from '../Pomodoro';
import FlowTime from '../FlowTime';
import {useAppSelector} from '../../store/hooks/hooks';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {TIMER_POMODORO} from '../../utils/constants';

const Timers = () => {
  const {containerScreen} = useTheme();
  const {timerScreens} = useAppSelector(state => state.timers);
  return (
    <NativeViewGestureHandler>
      <View style={containerScreen.container}>
        {timerScreens === TIMER_POMODORO ? <Pomodoro /> : <FlowTime />}
      </View>
    </NativeViewGestureHandler>
  );
};

export default Timers;

const styles = StyleSheet.create({});
