import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import Pomodoro from './Pomodoro';

const Timers = () => {
  const {containerScreen} = useTheme();
  return (
    <View style={containerScreen.container}>
      <Pomodoro />
    </View>
  );
};

export default Timers;

const styles = StyleSheet.create({});
