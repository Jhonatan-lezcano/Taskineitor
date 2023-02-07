import {StyleSheet, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import Pomodoro from '../../components/templates/Pomodoro';
import FlowTime from '../../components/templates/FlowTime';
import {useAppSelector} from '../../store/hooks/hooks';

const TIMER_POMODORO = 'pomodoro';
const TIMER_FLOWTIME = 'flowTime';
const Timers = () => {
  const {containerScreen} = useTheme();
  const {timerScreens} = useAppSelector(state => state.timers);
  return (
    <View style={containerScreen.container}>
      {timerScreens === TIMER_POMODORO ? <Pomodoro /> : <FlowTime />}
    </View>
  );
};

export default Timers;

const styles = StyleSheet.create({});
