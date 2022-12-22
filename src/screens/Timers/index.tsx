import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/useTheme';

const Timers = () => {
  const {containerScreen} = useTheme();
  return (
    <View style={containerScreen.container}>
      <Text>Timer</Text>
    </View>
  );
};

export default Timers;

const styles = StyleSheet.create({});
